export interface PerformanceRecord {
  activityId: number | string
  title: string
  date: string

  distanceKm: number
  durationSec: number

  avgPace?: number
  avgHR?: number
  tss?: number

  sport: string
}

export interface BestPerformance {
  label: string
  distanceKm: number
  record?: PerformanceRecord
}

export interface PerformanceSummary {
  best5k: BestPerformance
  best10k: BestPerformance
  bestHalf: BestPerformance
  longestRun: BestPerformance

  last30Days: {
    runs: number
    km: number
  }

  last90Days: {
    runs: number
    km: number
  }
}