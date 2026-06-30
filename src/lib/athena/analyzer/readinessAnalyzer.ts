import type { AthenaContext } from '../models'
import type { ReadinessLevel } from '../types'

export interface ReadinessAnalysis {
  level: ReadinessLevel
  score: number
  confidence: number
  reason: string
}

export function analyzeReadiness(context: AthenaContext): ReadinessAnalysis {
  const { tsb, activitiesThisWeek, weeklyLoad } = context

  let score = 70

  if (tsb >= -10 && tsb <= 10) score += 15
  if (tsb < -20) score -= 25
  if (tsb > 20) score -= 10

  if (activitiesThisWeek >= 3) score += 10
  if (activitiesThisWeek === 0) score -= 20

  if (weeklyLoad > 0) score += 5

  score = Math.max(0, Math.min(100, Math.round(score)))

  let level: ReadinessLevel = 'Productive'
  let reason = 'Carga y fatiga en rango productivo.'

  if (score >= 85) {
    level = 'Ready'
    reason = 'Fatiga controlada y buena disponibilidad para entrenar.'
  } else if (score >= 65) {
    level = 'Productive'
    reason = 'Estado adecuado para seguir acumulando entrenamiento.'
  } else if (score >= 45) {
    level = 'Caution'
    reason = 'Conviene vigilar la fatiga antes de añadir más intensidad.'
  } else {
    level = 'Recovery'
    reason = 'La prioridad debería ser recuperar antes de volver a cargar.'
  }

  return {
    level,
    score,
    confidence: 80,
    reason,
  }
}