import type { AthenaContext, AthenaTrend } from '../../models'

export function evaluateTrend(
  context: AthenaContext,
): AthenaTrend {
  const diff = context.weeklyLoad - context.lastWeekLoad

  let direction: AthenaTrend['direction']
  let label: string
  let reason: string

  if (diff > 50) {
    direction = 'up'
    label = 'Acumulando carga'
    reason = `La carga semanal ha aumentado ${diff.toFixed(0)} TSS respecto a la semana anterior.`
  } else if (diff < -50) {
    direction = 'down'
    label = 'Recuperando carga'
    reason = `La carga semanal ha bajado ${Math.abs(diff).toFixed(0)} TSS respecto a la semana anterior. Esto favorece la recuperación.`
  } else {
    direction = 'stable'
    label = 'Carga estable'
    reason = `La carga semanal se mantiene estable respecto a la semana anterior.`
  }

  return {
    direction,
    label,
    reason,
  }
}