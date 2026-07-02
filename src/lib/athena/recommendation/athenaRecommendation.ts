import type { WorkoutStep } from '../models/WorkoutDecision'

export type AthenaWorkoutType =
  | 'recovery'
  | 'easy'
  | 'tempo'
  | 'intervals'
  | 'long_run'
  | 'strength'
  | 'rest'

export type AthenaRiskLevel = 'Muy bajo' | 'Bajo' | 'Controlado' | 'Medio' | 'Alto'

export type AthenaZone = 'Z1' | 'Z2' | 'Z3' | 'Z4' | 'Libre'

export type AthenaExpectedImpact = {
  ctl: string
  fatigue: string
  tomorrowReady: string
}

export type AthenaRecommendation = {
  headline: string
  workout: {
    type: AthenaWorkoutType
    label: string
    duration: string
    zone: AthenaZone
    objective: string
  }
  risk: AthenaRiskLevel
  confidence: number
  expectedImpact: AthenaExpectedImpact
  reasoning: string[]
  tomorrow: string
  description: string
  session: {
    warmup: WorkoutStep
    main: WorkoutStep[]
    cooldown: WorkoutStep
  }
}