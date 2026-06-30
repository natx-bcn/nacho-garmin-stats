import type { TrainingType } from './types'

type FatigueInput = {
  trainingType: TrainingType
  intensityScore: number
  duration: number
  tss?: number | null
}

export function calculateFatigue({
  trainingType,
  intensityScore,
  duration,
  tss,
}: FatigueInput) {
  const durationMin = duration / 60
  const tssValue = tss ?? 0

  let score = intensityScore * 0.55

  score += Math.min(durationMin / 2, 25)
  score += Math.min(tssValue / 3, 20)

  if (trainingType === 'long') score += 12
  if (trainingType === 'intervals') score += 10
  if (trainingType === 'vo2max') score += 12
  if (trainingType === 'race') score += 15
  if (trainingType === 'padbol') score += 8
  if (trainingType === 'strength') score += 6

  return clamp(Math.round(score), 0, 100)
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}