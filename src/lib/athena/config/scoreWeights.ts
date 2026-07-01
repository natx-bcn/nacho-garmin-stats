export interface AthenaScoreWeights {
  recovery: number
  fatigue: number
  risk: number
  trend: number
}

export const DEFAULT_SCORE_WEIGHTS: AthenaScoreWeights = {
  recovery: 0.35,
  fatigue: 0.30,
  risk: 0.25,
  trend: 0.10,
}