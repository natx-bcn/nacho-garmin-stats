import type { RaceFocus, TrainingType } from './types'

export function detectRaceFocus(trainingType: TrainingType): RaceFocus {
  if (trainingType === 'vo2max' || trainingType === 'intervals') return '5K'
  if (trainingType === 'tempo' || trainingType === 'threshold') return '10K'
  if (trainingType === 'long') return '21K'

  return 'General'
}