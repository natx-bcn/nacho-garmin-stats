export interface AthenaProfileSummary {
  vo2max?: number
  lactateThresholdPace?: string
  lactateThresholdHeartRate?: number

  upcomingRace?: {
    name: string
    date: string
    distanceKm: number
  }

  notes?: string[]
}

export function buildProfileContext(
  input: AthenaProfileSummary,
): AthenaProfileSummary {
  return {
    vo2max: input.vo2max,
    lactateThresholdPace: input.lactateThresholdPace,
    lactateThresholdHeartRate: input.lactateThresholdHeartRate,
    upcomingRace: input.upcomingRace,
    notes: input.notes,
  }
}