import type { CoachInput, CoachResult } from './coachTypes'

export function evaluateCoach(input: CoachInput): CoachResult {
  const { ctl, atl, tsb, weeklyLoad = 0, activitiesThisWeek = 0, daysSinceLastActivity } = input

  const hasRecentActivity =
    daysSinceLastActivity == null || daysSinceLastActivity <= 3

  const loadRatio = ctl > 0 ? atl / ctl : 1
  const lowActivity = activitiesThisWeek <= 1
  const highFatigue = atl > ctl * 1.25
  const lowFitness = ctl > 0 && ctl < 20
  const highWeeklyLoad = weeklyLoad > ctl * 7 * 1.25
  const detraining = daysSinceLastActivity != null && daysSinceLastActivity >= 5

  const confidence = calculateConfidence(input)

  if (detraining || lowActivity) {
    return {
      status: 'Detraining',
      recommendation: hasRecentActivity ? 'Easy Run' : 'Recovery Run',
      reason:
        'Hay poca actividad reciente. Conviene volver con una sesión suave para recuperar continuidad sin generar fatiga innecesaria.',
      confidence,
      color: 'blue',
    }
  }

  if (tsb <= -20 || highFatigue || highWeeklyLoad) {
    return {
      status: 'Overreaching',
      recommendation: 'Rest',
      reason:
        'La fatiga acumulada es elevada respecto a tu nivel de forma. Hoy es mejor descansar o hacer movilidad para evitar sobrecarga.',
      confidence,
      color: 'red',
    }
  }

  if (tsb <= -10 || loadRatio > 1.15) {
    return {
      status: 'Recovery',
      recommendation: 'Recovery Run',
      reason:
        'La carga reciente está por encima de tu base habitual. Reduce intensidad y prioriza recuperación activa.',
      confidence,
      color: 'yellow',
    }
  }

  if (tsb >= 12 && ctl >= 35 && hasRecentActivity) {
    return {
      status: 'Peak',
      recommendation: 'Intervals',
      reason:
        'Tienes buena forma, fatiga controlada y actividad reciente. Es un buen momento para una sesión exigente.',
      confidence,
      color: 'green',
    }
  }

  if (tsb >= 3 && !lowFitness) {
    return {
      status: 'Productive',
      recommendation: 'Tempo',
      reason:
        'Tu equilibrio entre forma y fatiga es positivo. Puedes hacer una sesión de calidad sin asumir demasiado riesgo.',
      confidence,
      color: 'green',
    }
  }

  return {
    status: 'Maintaining',
    recommendation: 'Easy Run',
    reason:
      'Estás en una zona estable. Un rodaje suave ayuda a mantener la consistencia y consolidar la carga.',
    confidence,
    color: 'blue',
  }
}

function calculateConfidence(input: CoachInput): number {
  let confidence = 70

  if (input.ctl > 0) confidence += 8
  if (input.atl > 0) confidence += 8
  if (input.weeklyLoad != null && input.weeklyLoad > 0) confidence += 6
  if (input.activitiesThisWeek != null) confidence += 4
  if (input.daysSinceLastActivity != null) confidence += 4

  return Math.min(confidence, 96)
}