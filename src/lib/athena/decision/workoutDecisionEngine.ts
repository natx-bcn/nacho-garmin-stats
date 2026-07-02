import type { AthenaContext } from '../context/AthenaContext'
import type { WorkoutDecision } from '../models/WorkoutDecision'
import { buildWorkoutSession } from '../workouts/buildWorkoutSession'

export function decideWorkout(context: AthenaContext): WorkoutDecision {
  const readiness = context.readiness.score
  const fatigue = context.fatigue.score
  const risk = context.risk.score
  const loadBalance = context.load.balance
  const isBuilding = context.trend.score > 0

  const excellentRecovery = readiness >= 85 && fatigue <= 30 && risk <= 30
  const goodRecovery = readiness >= 70 && fatigue <= 45
  const acceptableRecovery = readiness >= 60 && fatigue <= 60
  const highFatigue = fatigue >= 75 || loadBalance > 25
  const mediumFatigue = fatigue >= 60 || loadBalance > 15
  const lowRisk = risk <= 30
  const mediumRisk = risk <= 55
  const positiveTrend = isBuilding && loadBalance <= 10

  if (risk >= 80 || readiness < 35) {
    return makeDecision('rest', 0, 'Z1', 'Recuperación completa', 'Muy bajo', 0, 'Muy baja', 'Alta')
  }

  if (highFatigue) {
    return makeDecision('recovery', 30, 'Z1', 'Bajar fatiga', 'Bajo', 0, 'Muy baja', 'Alta')
  }

  if (excellentRecovery && lowRisk && positiveTrend) {
    return makeDecision('tempo', 45, 'Z3', 'Umbral', 'Controlado', 0.5, 'Media', 'Estable')
  }

  if (goodRecovery && mediumRisk && loadBalance <= 10) {
    return makeDecision('long_run', 75, 'Z2', 'Base aeróbica', 'Controlado', 0.7, 'Media', 'Estable')
  }

  if (goodRecovery && lowRisk) {
    return makeDecision('intervals', 45, 'Z4', 'Velocidad', 'Controlado', 0.6, 'Alta', 'Baja')
  }

  if (acceptableRecovery && !mediumFatigue) {
    return makeDecision('easy', 45, 'Z2', 'Base aeróbica', 'Bajo', 0.3, 'Baja', 'Estable')
  }

  return makeDecision('easy', 35, 'Z2', 'Mantener continuidad', 'Controlado', 0.1, 'Baja', 'Estable')
}

function makeDecision(
  type: WorkoutDecision['type'],
  duration: number,
  zone: WorkoutDecision['zone'],
  objective: string,
  risk: WorkoutDecision['risk'],
  ctlImpact: number,
  fatigueImpact: WorkoutDecision['fatigueImpact'],
  tomorrowReady: WorkoutDecision['tomorrowReady']
): WorkoutDecision {
  const baseDecision = {
    type,
    duration,
    zone,
    objective,
    risk,
    ctlImpact,
    fatigueImpact,
    tomorrowReady,
  }

  return {
    ...baseDecision,
    session: buildWorkoutSession(baseDecision),
  }
}