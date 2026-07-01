export interface AthenaRecoverySummary {
  daysSinceLastActivity?: number

  sleepScore?: number

  hrvStatus?: 'low' | 'balanced' | 'high' | 'unknown'

  restingHeartRate?: number
}

export function buildRecoveryContext(
  input: AthenaRecoverySummary,
): AthenaRecoverySummary {
  return {
    daysSinceLastActivity: input.daysSinceLastActivity,
    sleepScore: input.sleepScore,
    hrvStatus: input.hrvStatus,
    restingHeartRate: input.restingHeartRate,
  }
}