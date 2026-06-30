export type TrainingStatus =
  | 'Peak'
  | 'Productive'
  | 'Maintaining'
  | 'Recovery'
  | 'Overreaching'
  | 'Detraining'

export type WorkoutRecommendation =
  | 'Rest'
  | 'Recovery Run'
  | 'Easy Run'
  | 'Tempo'
  | 'Intervals'
  | 'Long Run'

export type CoachColor =
  | 'green'
  | 'blue'
  | 'yellow'
  | 'orange'
  | 'red'

export interface CoachInput {
  ctl: number
  atl: number
  tsb: number
  weeklyLoad?: number
  activitiesThisWeek?: number
  daysSinceLastActivity?: number
}

export interface CoachResult {
  status: TrainingStatus
  recommendation: WorkoutRecommendation
  reason: string
  confidence: number
  color: CoachColor
}