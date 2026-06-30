#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import os
import sys
import time
from datetime import datetime
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / ".env")


DEFAULT_CACHE = {
    "lastSync": None,
    "lastActivityId": None,
    "totalActivities": 0,
    "version": 1,
}


def get_api():
    try:
        import garminconnect
    except ImportError:
        print("ERROR: garminconnect not installed. Run: pip install -r requirements.txt")
        sys.exit(1)

    email = os.getenv("GARMIN_EMAIL")
    password = os.getenv("GARMIN_PASSWORD")

    if not email or not password:
        print("ERROR: Set GARMIN_EMAIL and GARMIN_PASSWORD")
        sys.exit(1)

    api = garminconnect.Garmin(email, password)

    try:
        api.login()
    except garminconnect.GarminConnectAuthenticationError as e:
        print(f"Authentication failed: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Login error: {e}")
        sys.exit(1)

    print(f"Logged in as {email}")
    return api


def load_json(path: Path, default):
    if not path.exists():
        return default

    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"WARNING: Could not read {path}: {e}")
        return default


def save_json(path: Path, data):
    path.parent.mkdir(parents=True, exist_ok=True)

    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))


def fetch_activities(api, limit: int | None, since: str | None, existing_ids: set[str], full: bool) -> list:
    print("Fetching activity list...")

    raw: list = []
    start = 0
    chunk = 100

    force_full = full or not existing_ids or len(existing_ids) < 100

    if limit:
        batch = api.get_activities(0, limit)
        raw.extend(batch or [])
    else:
        while True:
            batch = api.get_activities(start, chunk)

            if not batch:
                break

            raw.extend(batch)

            print(f"Fetched {len(raw)} activities so far...")

            if not force_full:
                batch_ids = {
                    str(a.get("activityId") or a.get("id"))
                    for a in batch
                    if a.get("activityId") or a.get("id")
                }

                if batch_ids & existing_ids:
                    print("Reached already synced activities. Stopping incremental fetch.")
                    break

            if len(batch) < chunk:
                break

            start += chunk
            time.sleep(0.3)

    if since:
        raw = [a for a in raw if (a.get("startTimeLocal") or "") >= since]

    print(f"Total activities fetched from Garmin: {len(raw)}")
    return raw


def _try(fn, *args, label="", **kwargs):
    for attempt in range(3):
        try:
            return fn(*args, **kwargs)
        except Exception as e:
            if attempt < 2:
                time.sleep(2**attempt)
            else:
                if label:
                    print(f"WARNING: {label}: {e}")
                return None


def fetch_activity_details(api, activity_id: int) -> dict:
    result = _try(api.get_activity_details, activity_id, label=f"details {activity_id}")
    return result or {}


def fetch_activity_hr_zones(api, activity_id: int) -> list:
    result = _try(
        api.get_activity_hr_in_timezones,
        activity_id,
        label=f"hr_zones {activity_id}",
    )
    return result or []


def fetch_activity_splits(api, activity_id: int) -> dict:
    result = _try(api.get_activity_splits, activity_id, label=f"splits {activity_id}")
    return result or {}


def fetch_gpx_coords(api, activity_id: int) -> list:
    import re
    import garminconnect

    try:
        gpx_data = api.download_activity(
            activity_id,
            dl_fmt=garminconnect.Garmin.ActivityDownloadFormat.GPX,
        )

        if not gpx_data:
            return []

        text = gpx_data.decode("utf-8", errors="ignore")
        coords = re.findall(r'<trkpt lat="([\d.\-]+)" lon="([\d.\-]+)"', text)

        if len(coords) > 500:
            step = max(1, len(coords) // 500)
            coords = coords[::step]

        return [[float(lat), float(lon)] for lat, lon in coords]

    except Exception:
        return []


def merge_summaries(existing: list, fresh: list) -> list:
    merged = {}

    for item in existing:
        activity_id = item.get("id")
        if activity_id:
            merged[str(activity_id)] = item

    for item in fresh:
        activity_id = item.get("id")
        if activity_id:
            merged[str(activity_id)] = item

    return sorted(
        merged.values(),
        key=lambda x: x.get("startTime", ""),
        reverse=True,
    )


def compute_stats(summaries: list) -> dict:
    by_sport = {}

    for s in summaries:
        sport = s.get("sport", "other")
        by_sport.setdefault(sport, []).append(s)

    vo2max_history = [
        {"date": s["startTime"][:10], "value": s["vo2max"]}
        for s in summaries
        if s.get("vo2max") and s.get("startTime")
    ]

    vo2max_history.sort(key=lambda x: x["date"])

    return {
        "totalActivities": len(summaries),
        "byType": {sport: len(acts) for sport, acts in by_sport.items()},
        "vo2maxHistory": vo2max_history,
        "syncedAt": datetime.now().isoformat(),
    }


def build_cache(summaries: list) -> dict:
    latest = summaries[0] if summaries else None

    return {
        "lastSync": datetime.now().isoformat(),
        "lastActivityId": latest.get("id") if latest else None,
        "totalActivities": len(summaries),
        "version": 1,
    }


def main():
    parser = argparse.ArgumentParser(description="Sync Garmin activities to local JSON")
    parser.add_argument("--limit", type=int, default=None, help="Max recent activities to sync")
    parser.add_argument("--since", type=str, default=None, help="Only sync activities after this date YYYY-MM-DD")
    parser.add_argument("--no-gpx", action="store_true", help="Skip GPS data download")
    parser.add_argument("--full", action="store_true", help="Force full historical sync")

    args = parser.parse_args()

    from normalizer import normalize_detail, normalize_summary

    output_dir = Path(__file__).parent.parent / "public" / "data"
    output_dir.mkdir(parents=True, exist_ok=True)

    activities_path = output_dir / "activities.json"
    stats_path = output_dir / "stats.json"
    cache_path = output_dir / "cache.json"

    existing_summaries = load_json(activities_path, [])
    cache = load_json(cache_path, DEFAULT_CACHE)

    existing_ids = {
        str(item.get("id"))
        for item in existing_summaries
        if item.get("id")
    }

    print(f"Existing local activities: {len(existing_summaries)}")
    print(f"Cache: {cache}")

    api = get_api()

    raw_activities = fetch_activities(
        api=api,
        limit=args.limit,
        since=args.since,
        existing_ids=existing_ids,
        full=args.full,
    )

    fresh_summaries = []

    for raw in raw_activities:
        try:
            summary = normalize_summary(raw)
            if summary.get("id"):
                fresh_summaries.append(summary)
        except Exception as e:
            print(f"WARNING: Failed to normalize activity {raw.get('activityId')}: {e}")

    all_summaries = merge_summaries(existing_summaries, fresh_summaries)

    save_json(activities_path, all_summaries)

    print(
        f"Saved {len(all_summaries)} total activity summaries "
        f"({len(fresh_summaries)} checked) → public/data/activities.json"
    )

    print(f"\nFetching details for {len(fresh_summaries)} checked activities...")

    for i, summary in enumerate(fresh_summaries):
        activity_id = summary["id"]
        detail_path = output_dir / f"activity_{activity_id}.json"

        if detail_path.exists():
            print(f"[{i + 1}/{len(fresh_summaries)}] {activity_id} — cached, skipping")
            continue

        print(
            f"[{i + 1}/{len(fresh_summaries)}] "
            f"Fetching {activity_id} ({summary.get('title', '')})..."
        )

        details = fetch_activity_details(api, activity_id)
        hr_zones = fetch_activity_hr_zones(api, activity_id)
        splits = fetch_activity_splits(api, activity_id)
        gpx_coords = [] if args.no_gpx else fetch_gpx_coords(api, activity_id)

        try:
            full = normalize_detail(summary, details, hr_zones, splits, gpx_coords)
            save_json(detail_path, full)
        except Exception as e:
            print(f"WARNING: Failed to process detail for {activity_id}: {e}")

        time.sleep(0.5)

    stats = compute_stats(all_summaries)
    save_json(stats_path, stats)

    new_cache = build_cache(all_summaries)
    save_json(cache_path, new_cache)

    print("\nDone!")
    print(f"Total historical activities: {len(all_summaries)}")
    print("Saved stats → public/data/stats.json")
    print("Saved cache → public/data/cache.json")


if __name__ == "__main__":
    main()