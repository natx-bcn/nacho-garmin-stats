import type { AthenaContext, AthenaTrend } from '../../models'

export function evaluateTrend(
  context: AthenaContext,
): AthenaTrend {
  const diff = context.weeklyLoad - context.lastWeekLoad

  let direction: AthenaTrend['direction']
  let label: string

  if (diff > 50) {
    direction = 'up'
    label = 'Mejorando'
  } else if (diff < -50) {
    direction = 'down'
    label = 'Descendiendo'
  } else {
    direction = 'stable'
    label = 'Estable'
  }

  return {
    direction,
    label,
    reason: `Variación de carga semanal: ${diff.toFixed(0)} TSS.`,
  }
}