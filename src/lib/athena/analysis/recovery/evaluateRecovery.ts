import type { AthenaContext, AthenaRecovery } from '../../models'

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value))
}

export function evaluateRecovery(
  context: AthenaContext,
): AthenaRecovery {
  let score = 70

  if (context.daysSinceLastActivity !== undefined) {
    if (context.daysSinceLastActivity >= 2) score += 15
    else if (context.daysSinceLastActivity === 1) score += 8
    else score -= 8
  }

  if (context.sleepScore !== undefined) {
    score += (context.sleepScore - 70) * 0.3
  }

  if (context.hrvStatus === 'high') score += 8
  if (context.hrvStatus === 'balanced') score += 4
  if (context.hrvStatus === 'low') score -= 10

  score = clamp(Math.round(score))

  let level: AthenaRecovery['level']

  if (score >= 80) level = 'excellent'
  else if (score >= 65) level = 'good'
  else if (score >= 45) level = 'moderate'
  else level = 'poor'

  return {
    score,
    level,
    reason: `Recuperación estimada del ${score}% a partir del descanso y los indicadores disponibles.`,
  }
}