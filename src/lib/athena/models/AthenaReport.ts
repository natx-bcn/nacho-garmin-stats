export interface AthenaScore {
  value: number
  level: 'Poor' | 'Fair' | 'Good' | 'Excellent'
}

export interface AthenaReport {
  coach: ReturnType<typeof import('../coach').evaluateCoach>

  trainingScore: AthenaScore

  readinessScore: AthenaScore

  consistencyScore: AthenaScore

  recoveryScore: AthenaScore
}