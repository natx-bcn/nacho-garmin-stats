import { classifyTraining } from './classifyTraining'
import { calculateIntensity } from './calculateIntensity'
import type { ActivityAnalysis, TrainingEffect } from './types'
import { calculateFatigue } from './calculateFatigue'
import { calculateRecovery } from './calculateRecovery'
import { buildTags } from './buildTags'
import { detectRaceFocus } from './detectRaceFocus'

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

	const fatigueScore = calculateFatigue({
	  trainingType,
	  intensityScore,
	  duration: activity.duration,
	  tss: activity.tss,
	})

	const recoveryHours = calculateRecovery({
	  trainingType,
	  fatigueScore,
	  intensityScore,
	})

  const trainingEffect: TrainingEffect =
    trainingType === 'intervals' || trainingType === 'vo2max'
      ? 'anaerobic'
      : trainingType === 'tempo' || trainingType === 'threshold' || trainingType === 'race'
        ? 'mixed'
        : 'aerobic'

  const raceFocus = detectRaceFocus(trainingType)
  const tags = buildTags(trainingType)

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
    fatigueScore,
	recoveryHours,
    qualityScore: tags.includes('quality') ? intensityScore : 0,
    raceFocus,
    tags,
  }
}