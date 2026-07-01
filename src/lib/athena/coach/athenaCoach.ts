import type { AthenaContext, AthenaCoach } from '../models'
import type { ReadinessAnalysis } from '../analyzer'

export function evaluateAthenaCoach(  context: AthenaContext,  readiness: ReadinessAnalysis): AthenaCoach {
  const { ctl, atl, tsb, weeklyLoad, activitiesThisWeek, daysSinceLastActivity=0 } = context

  if (readiness.level.toLowerCase().includes('fatiga')) {
        return {
            recommendation: 'Recuperar',
            status: readiness.level,
            reason: readiness.reason,
            confidence: 90,
            color: 'red',
        }
    }

    if (readiness.level.toLowerCase().includes('productivo')) {
        return {
            recommendation: 'Sesión de calidad',
            status: readiness.level,
            reason: readiness.reason,
            confidence: 86,
            color: 'green',
        }
    }

    if (readiness.level.toLowerCase().includes('recuper')) {
        return {
            recommendation: 'Rodaje suave',
            status: readiness.level,
            reason: readiness.reason,
            confidence: 84,
            color: 'yellow',
        }
    }

    if (readiness.level.toLowerCase().includes('fresco')) {
        return {
            recommendation: 'Construir base',
            status: readiness.level,
            reason: readiness.reason,
            confidence: 82,
            color: 'blue',
        }
    }

  if (daysSinceLastActivity >= 4) {
    return {
      recommendation: 'Reactivar suave',
      status: 'Recuperación',
      reason: 'Llevas varios días sin actividad. Lo ideal es volver con una sesión suave para recuperar ritmo sin generar fatiga extra.',
      confidence: 88,
      color: 'yellow',
    }
  }

  if (tsb < -25) {
    return {
      recommendation: 'Descanso o movilidad',
      status: 'Fatiga alta',
      reason: 'La carga acumulada es elevada y tu forma está muy negativa. Hoy conviene priorizar recuperación.',
      confidence: 92,
      color: 'red',
    }
  }

  if (tsb < -12) {
    return {
      recommendation: 'Rodaje suave',
      status: 'Controlar carga',
      reason: 'Hay fatiga acumulada. Puedes entrenar, pero mejor mantener intensidad baja y evitar sesiones exigentes.',
      confidence: 84,
      color: 'yellow',
    }
  }

  if (tsb >= -8 && tsb <= 8 && activitiesThisWeek >= 3) {
    return {
      recommendation: 'Sesión de calidad',
      status: 'Productivo',
      reason: 'Tu carga está equilibrada y ya tienes constancia semanal. Es buen momento para una sesión de calidad controlada.',
      confidence: 86,
      color: 'green',
    }
  }

  if (tsb > 12 && activitiesThisWeek <= 2) {
    return {
      recommendation: 'Construir base',
      status: 'Fresco',
      reason: 'Tienes buena frescura, pero falta algo de continuidad semanal. Un rodaje aeróbico sería una buena opción.',
      confidence: 80,
      color: 'blue',
    }
  }

  if (weeklyLoad < ctl * 3) {
    return {
      recommendation: 'Sumar volumen',
      status: 'Carga baja',
      reason: 'La carga semanal está por debajo de tu nivel habitual. Puedes añadir volumen aeróbico sin forzar demasiado.',
      confidence: 78,
      color: 'blue',
    }
  }

  if (atl > ctl * 1.35) {
    return {
      recommendation: 'Bajar intensidad',
      status: 'Fatiga creciente',
      reason: 'La fatiga reciente está creciendo más rápido que tu fitness. Mejor no acumular otra sesión dura.',
      confidence: 82,
      color: 'yellow',
    }
  }

  return {
    recommendation: 'Mantener plan',
    status: 'Estable',
    reason: 'Tus métricas están dentro de un rango razonable. Mantén la planificación prevista y escucha sensaciones.',
    confidence: 75,
    color: 'green',
  }
}