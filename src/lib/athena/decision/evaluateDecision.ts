import type { AthenaContext } from '../models'
import type { AthenaDecision } from './decisionTypes'

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value))
}

export function evaluateDecision(context: AthenaContext): AthenaDecision {
  const { tsb, ctl, atl, weeklyLoad, lastWeekLoad, activitiesThisWeek } = context

  const loadIncrease =
    lastWeekLoad > 0 ? ((weeklyLoad - lastWeekLoad) / lastWeekLoad) * 100 : 0

  const fatigueIsHigh = tsb < -15 || atl > ctl * 1.35
  const fatigueIsModerate = tsb < -5 || atl > ctl * 1.15
  const loadSpike = loadIncrease > 25
  const lowActivity = activitiesThisWeek <= 1

  if (fatigueIsHigh || loadSpike) {
    return {
      trainingAllowed: false,
      recommendation: 'rest',
      priority: 'recover',
      confidence: clamp(88 + Math.abs(tsb)),
      reason:
        'Athena detecta una carga acumulada elevada o un incremento semanal demasiado agresivo.',
      expectedEffect:
        'Descansar hoy debería reducir fatiga y mejorar tu disponibilidad para el siguiente entrenamiento.',
    }
  }

  if (fatigueIsModerate) {
    return {
      trainingAllowed: true,
      recommendation: 'recovery_run',
      priority: 'reduce_risk',
      confidence: 82,
      reason:
        'Hay fatiga moderada, así que conviene mantener movimiento sin añadir demasiada carga.',
      expectedEffect:
        'Un rodaje muy suave ayudará a recuperar sin comprometer el bloque semanal.',
    }
  }

  if (lowActivity && tsb > 5) {
    return {
      trainingAllowed: true,
      recommendation: 'quality_session',
      priority: 'build_threshold',
      confidence: 78,
      reason:
        'Tienes buena frescura y poca carga reciente, así que puedes asimilar una sesión de calidad.',
      expectedEffect:
        'Una sesión controlada de calidad puede mejorar el umbral sin generar fatiga excesiva.',
    }
  }

  if (context.isAerobicFocused) {
    return {
      trainingAllowed: true,
      recommendation: 'easy_run',
      priority: 'build_aerobic_base',
      confidence: 80,
      reason:
        'El bloque actual parece orientado a base aeróbica y la fatiga está controlada.',
      expectedEffect:
        'Un rodaje fácil consolidará la resistencia aeróbica con bajo riesgo.',
    }
  }

  return {
    trainingAllowed: true,
    recommendation: 'tempo_run',
    priority: 'maintain',
    confidence: 74,
    reason:
      'Las métricas muestran un equilibrio razonable entre carga, forma y fatiga.',
    expectedEffect:
      'Un entrenamiento moderado debería mantener la progresión sin disparar el riesgo.',
  }
}