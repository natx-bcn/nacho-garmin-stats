import type { WorkoutDecision } from '../models/WorkoutDecision'
import type { AthenaRecommendation } from './athenaRecommendation'

type BuildAthenaRecommendationInput = {
  decision: WorkoutDecision
  confidence: number
  reasoning: string[]
  tomorrow: string
}

export function buildAthenaRecommendation({
  decision,
  confidence,
  reasoning,
  tomorrow,
}: BuildAthenaRecommendationInput): AthenaRecommendation {
  return {
    headline: getHeadline(decision),
    workout: {
        type: decision.type,
        label: getWorkoutLabel(decision.type),
        duration: decision.duration > 0 ? `${decision.duration} min` : 'Descanso',
        zone: decision.zone,
        objective: decision.objective,
    },
    risk: decision.risk,
    confidence,
    expectedImpact: {
        ctl: `+${decision.ctlImpact.toFixed(1)}`,
        fatigue: decision.fatigueImpact,
        tomorrowReady: decision.tomorrowReady,
    },
    reasoning,
    tomorrow,
    description: getDescription(decision),
    session: decision.session,
}
}

function getHeadline(decision: WorkoutDecision): string {
  switch (decision.type) {
    case 'rest':
      return 'Hoy toca proteger la recuperación.'
    case 'recovery':
      return 'Hoy toca bajar fatiga.'
    case 'easy':
      return 'Hoy toca sumar sin forzar.'
    case 'tempo':
      return 'Hoy puedes construir forma.'
    case 'intervals':
      return 'Hoy puedes trabajar intensidad.'
    case 'long_run':
      return 'Hoy puedes sumar resistencia.'
    case 'strength':
      return 'Hoy toca reforzar el cuerpo.'
  }
}

function getWorkoutLabel(type: WorkoutDecision['type']): string {
  switch (type) {
    case 'rest':
      return 'Descanso'
    case 'recovery':
      return 'Recuperación'
    case 'easy':
      return 'Rodaje Z2'
    case 'tempo':
      return 'Tempo'
    case 'intervals':
      return 'Series'
    case 'long_run':
      return 'Tirada larga'
    case 'strength':
      return 'Fuerza'
  }
}

function getDescription(decision: WorkoutDecision): string {
  switch (decision.type) {
    case 'rest':
      return 'No necesitas sumar carga hoy. Prioriza descanso, movilidad suave y llegar mejor a mañana.'
    case 'recovery':
      return 'Sesión muy cómoda para facilitar recuperación sin añadir fatiga relevante.'
    case 'easy':
      return 'Rodaje cómodo para mantener continuidad y seguir construyendo base aeróbica.'
    case 'tempo':
      return 'Trabajo de umbral controlado para mejorar sin generar una fatiga excesiva.'
    case 'intervals':
      return 'Sesión de intensidad para mejorar velocidad y tolerancia al esfuerzo.'
    case 'long_run':
      return 'Trabajo aeróbico largo para consolidar resistencia y capacidad de sostener carga.'
    case 'strength':
      return 'Sesión de fuerza para mejorar estabilidad, economía y prevención de lesiones.'
  }
}