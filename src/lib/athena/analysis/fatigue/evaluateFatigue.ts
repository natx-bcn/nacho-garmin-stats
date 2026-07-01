import type { AthenaContext, AthenaFatigue } from '../../models'

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value))
}

export function evaluateFatigue(
  context: AthenaContext,
): AthenaFatigue {
  const { ctl, atl, tsb } = context

  let score = 0

  // ATL elevado respecto al CTL
  if (ctl > 0) {
    score += ((atl / ctl) - 1) * 50
  }

  // TSB muy negativo aumenta la fatiga
  if (tsb < 0) {
    score += Math.abs(tsb) * 1.8
  }

  score = clamp(Math.round(score))

  let level: AthenaFatigue['level']

  if (score >= 80) level = 'high'
  else if (score >= 55) level = 'moderate'
  else if (score >= 30) level = 'low'
  else level = 'minimal'

  return {
    score,
    level,
    reason: `Fatiga estimada a partir de CTL (${ctl}), ATL (${atl}) y TSB (${tsb.toFixed(1)}).`,
  }
}