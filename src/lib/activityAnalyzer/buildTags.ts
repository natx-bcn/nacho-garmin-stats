import type { ActivityTag, TrainingType } from './types'

export function buildTags(trainingType: TrainingType): ActivityTag[] {
  const tags: ActivityTag[] = []

  if (trainingType === 'easy') tags.push('easy')
  if (trainingType === 'recovery') tags.push('recovery')
  if (trainingType === 'tempo') tags.push('tempo', 'quality')
  if (trainingType === 'threshold') tags.push('threshold', 'quality')
  if (trainingType === 'vo2max') tags.push('vo2max', 'quality')
  if (trainingType === 'intervals') tags.push('intervals', 'quality')
  if (trainingType === 'race') tags.push('race', 'quality')
  if (trainingType === 'long') tags.push('longRun')
  if (trainingType === 'strength') tags.push('strength')
  if (trainingType === 'padbol') tags.push('padbol')

  return tags
}