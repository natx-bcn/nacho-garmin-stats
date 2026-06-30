export type TrainingType =
  | 'recovery'
  | 'easy'
  | 'tempo'
  | 'threshold'
  | 'vo2max'
  | 'intervals'
  | 'race'
  | 'long'
  | 'strength'
  | 'padbol'
  | 'other'

export type TrainingEffect =
  | 'aerobic'
  | 'anaerobic'
  | 'mixed'

export type RaceFocus =
  | '5K'
  | '10K'
  | '21K'
  | '42K'
  | 'General'

export type ActivityTag =
  | 'easy'
  | 'recovery'
  | 'quality'
  | 'tempo'
  | 'threshold'
  | 'vo2max'
  | 'intervals'
  | 'longRun'
  | 'race'
  | 'strength'
  | 'padbol'
  | 'negativeSplit'
  | 'pb'

export type ActivityAnalysis = {

  trainingType: TrainingType

  trainingEffect: TrainingEffect

  intensityScore: number

  fatigueScore: number

  recoveryHours: number

  qualityScore: number

  raceFocus: RaceFocus

  tags: ActivityTag[]
}