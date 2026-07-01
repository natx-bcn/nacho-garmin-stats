export type AthenaTrainingRecommendation =
  | 'rest'
  | 'recovery_run'
  | 'easy_run'
  | 'tempo_run'
  | 'quality_session'
  | 'long_run'
  | 'strength'

export type AthenaDecisionPriority =
  | 'recover'
  | 'maintain'
  | 'build_aerobic_base'
  | 'build_threshold'
  | 'reduce_risk'
  | 'race_preparation'

export interface AthenaDecision {
  trainingAllowed: boolean
  recommendation: AthenaTrainingRecommendation
  priority: AthenaDecisionPriority
  confidence: number
  reason: string
  expectedEffect: string
}