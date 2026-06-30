#!/usr/bin/env python3

from __future__ import annotations

"""
Garmin Connect → local JSON sync script.

Usage:
  python sync.py
  python sync.py --limit 20
  python sync.py --since 2024-01-01
  python sync.py --limit 30 --no-gpx

Credentials are read from ../.env or environment variables:
  GARMIN_EMAIL
  GARMIN_PASSWORD

Output:
  ../public/data/activities.json
  ../public/data/stats.json
  ../public/data/activity_{id}.json
"""

import argparse
import json
import os
import sys
import time
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / ".env")


def get_api():
    """Authenticate and return a Garmin Connect API client."""
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


def fetch_activities(api, limit: int | None, since: str | None) -> list:
    """Download the activity list from Garmin Connect."""
    print("Fetching activity list...")

    if limit:
        raw = api.get_activities(0, limit)
    else:
        raw = []
        start = 0
        chunk = 100

        while True:
            batch = api.get_activities(start, chunk)
            if not batch:
                break

            raw.extend(batch)
            print(f"Fetched {len(raw)} activities so far...")

            if len(batch) < chunk:
                break

            start += chunk
            time.sleep(0.3)

    if since:
        raw = [a for a in raw if (a.get("startTimeLocal") or "") >= since]

    print(f"Total activities fetched from Garmin: {len(raw)}")
    return raw


def _try(fn, *args, label="", **kwargs):
    """Call fn(*args, **kwargs) with retries."""
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
    """Return [[lat, lon], ...] from GPX download, or [] on failure."""
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


def merge_summaries(existing: list, fresh: list) -> list:
    """
    Merge previous activities with freshly fetched Garmin activities.
    Fresh data wins when IDs overlap.
    """
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
    """Compute global stats that don't change per-activity."""
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
        "syncedAt": __import__("datetime").datetime.now().isoformat(),
    }


def main():
    parser = argparse.ArgumentParser(description="Sync Garmin activities to local JSON")
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        help="Max recent activities to sync",
    )
    parser.add_argument(
        "--since",
        type=str,
        default=None,
        help="Only sync activities after this date YYYY-MM-DD",
    )
    parser.add_argument(
        "--no-gpx",
        action="store_true",
        help="Skip GPS data download",
    )

    args = parser.parse_args()

    from normalizer import normalize_detail, normalize_summary

    output_dir = Path(__file__).parent.parent / "public" / "data"
    output_dir.mkdir(parents=True, exist_ok=True)

    api = get_api()

    raw_activities = fetch_activities(api, args.limit, args.since)

    fresh_summaries = []

    for raw in raw_activities:
        try:
            summary = normalize_summary(raw)
            if summary.get("id"):
                fresh_summaries.append(summary)
        except Exception as e:
            print(f"WARNING: Failed to normalize activity {raw.get('activityId')}: {e}")

    existing_summaries = load_json(output_dir / "activities.json", [])
    all_summaries = merge_summaries(existing_summaries, fresh_summaries)

    save_json(output_dir / "activities.json", all_summaries)

    print(
        f"Saved {len(all_summaries)} total activity summaries "
        f"({len(fresh_summaries)} fresh checked) → public/data/activities.json"
    )

    print(f"\nFetching details for {len(fresh_summaries)} recent activities...")

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
    save_json(output_dir / "stats.json", stats)

    print("\nDone!")
    print(f"Total historical activities: {len(all_summaries)}")
    print("Saved stats → public/data/stats.json")


if __name__ == "__main__":
    main()