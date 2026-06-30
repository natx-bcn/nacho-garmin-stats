import { classifyTraining } from './classifyTraining'
import { calculateIntensity } from './calculateIntensity'
import type { ActivityAnalysis, TrainingEffect, RaceFocus, ActivityTag } from './types'

type RawActivity = {
  sport: string
  title: string
  distance: number
  duration: number
  avgHR?: number | null
  avgPace?: number | null
  tss?: number | null
}

export function analyzeActivity(activity: RawActivity): ActivityAnalysis {
  const trainingType = classifyTraining(activity)
  const intensityScore = calculateIntensity(activity)

  const trainingEffect: TrainingEffect =
    trainingType === 'intervals' || trainingType === 'vo2max'
      ? 'anaerobic'
      : trainingType === 'tempo' || trainingType === 'threshold' || trainingType === 'race'
        ? 'mixed'
        : 'aerobic'

  const raceFocus: RaceFocus =
    trainingType === 'vo2max' || trainingType === 'intervals'
      ? '5K'
      : trainingType === 'tempo' || trainingType === 'threshold'
        ? '10K'
        : trainingType === 'long'
          ? '21K'
          : 'General'

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

  return {
    trainingType,
    trainingEffect,
    intensityScore,
    fatigueScore: Math.min(100, Math.round(intensityScore * 0.75)),
    recoveryHours: Math.max(8, Math.round(intensityScore * 0.5)),
    qualityScore: tags.includes('quality') ? intensityScore : 0,
    raceFocus,
    tags,
  }
}