import type { TrainingType } from './types'

type RecoveryInput = {
  trainingType: TrainingType
  fatigueScore: number
  intensityScore: number
}

export function calculateRecovery({
  trainingType,
  fatigueScore,
  intensityScore,
}: RecoveryInput) {
  let hours = 8

  hours += fatigueScore * 0.45
  hours += intensityScore * 0.15

  if (trainingType === 'race') hours += 12
  if (trainingType === 'long') hours += 8
  if (trainingType === 'intervals') hours += 6
  if (trainingType === 'vo2max') hours += 8
  if (trainingType === 'strength') hours += 4
  if (trainingType === 'padbol') hours += 6

  return clamp(Math.round(hours), 8, 72)
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}