type RawActivity = {
  id: number |string
  title: string
  sport: string
  startTime: string

  distance: number
  duration: number

  avgPace?: number | null
  avgHR?: number | null
  tss?: number | null
}

export type PerformanceRecord = {
  activityId: number | string
  title: string
  date: string

  distanceKm: number
  durationSec: number
  paceSecKm: number

  avgPace?: number | null
  avgHR?: number | null
  tss?: number | null
}

export type BestPerformance = {
  label: string
  distanceKm: number
  record: PerformanceRecord | null
}

export type PerformanceRecords = {
  best5k: BestPerformance
  best10k: BestPerformance
  bestHalf: BestPerformance
  longestRun: BestPerformance
}

export function buildPerformanceRecords(
  activities: RawActivity[],
): PerformanceRecords {

  const runs = activities
    .filter(a => a.sport === 'running')
    .filter(a => a.distance > 0 && a.duration > 0)
    .map(toPerformanceRecord)

  return {

    best5k: findBestDistance(
      runs,
      '5K',
      5,
      0.35,
    ),

    best10k: findBestDistance(
      runs,
      '10K',
      10,
      0.5,
    ),

    bestHalf: findBestDistance(
      runs,
      'Media',
      21.097,
      1.5,
    ),

    longestRun: findLongestRun(runs),

  }

}

function toPerformanceRecord(
  activity: RawActivity,
): PerformanceRecord {

  const distanceKm = normalizeDistance(
    activity.distance,
  )

  return {

    activityId: activity.id,

    title: activity.title,

    date: activity.startTime,

    distanceKm,

    durationSec: activity.duration,

    paceSecKm:
      activity.duration / distanceKm,

    avgPace: activity.avgPace ?? null,

    avgHR: activity.avgHR ?? null,

    tss: activity.tss ?? null,

  }

}

function normalizeDistance(
  distance: number,
): number {

  // Compatible con proyectos que guardan metros o kilómetros

  return distance > 1000
    ? distance / 1000
    : distance

}

function findBestDistance(

  runs: PerformanceRecord[],

  label: string,

  targetKm: number,

  toleranceKm: number,

): BestPerformance {

  const candidates = runs.filter(

    run =>

      Math.abs(
        run.distanceKm - targetKm,
      ) <= toleranceKm,

  )

  if (candidates.length === 0) {

    return {

      label,

      distanceKm: targetKm,

      record: null,

    }

  }

  const best = [...candidates]

    .sort(

      (a, b) =>

        a.durationSec - b.durationSec,

    )[0]

  return {

    label,

    distanceKm: targetKm,

    record: best,

  }

}

function findLongestRun(

  runs: PerformanceRecord[],

): BestPerformance {

  if (runs.length === 0) {

    return {

      label: 'Tirada larga',

      distanceKm: 0,

      record: null,

    }

  }

  const longest = [...runs]

    .sort(

      (a, b) =>

        b.distanceKm - a.distanceKm,

    )[0]

  return {

    label: 'Tirada larga',

    distanceKm: longest.distanceKm,

    record: longest,

  }

}