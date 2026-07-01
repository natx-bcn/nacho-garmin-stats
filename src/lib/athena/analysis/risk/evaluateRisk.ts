import type {
  AthenaFatigue,
  AthenaRecovery,
  AthenaRisk,
} from '../../models'

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value))
}

export function evaluateRisk(
  recovery: AthenaRecovery,
  fatigue: AthenaFatigue,
): AthenaRisk {
  let score = fatigue.score * 0.65 + (100 - recovery.score) * 0.35

  score = clamp(Math.round(score))

  let level: AthenaRisk['level']

  if (score >= 75) level = 'high'
  else if (score >= 45) level = 'moderate'
  else level = 'low'

  return {
    score,
    level,
    reason: `Riesgo calculado a partir de recuperación (${recovery.score}) y fatiga (${fatigue.score}).`,
  }
}