export type WorkoutType =
  | 'rest'
  | 'recovery'
  | 'easy'
  | 'tempo'
  | 'intervals'
  | 'long_run'
  | 'strength'

export type WorkoutStep = {
  label: string
  detail: string
}

export interface WorkoutDecision {
  type: WorkoutType
  duration: number
  zone: 'Z1' | 'Z2' | 'Z3' | 'Z4'
  objective: string
  risk: 'Muy bajo' | 'Bajo' | 'Controlado' | 'Medio' | 'Alto'
  ctlImpact: number
  fatigueImpact: 'Muy baja' | 'Baja' | 'Media' | 'Alta'
  tomorrowReady: 'Alta' | 'Estable' | 'Baja'

  session: {
    warmup: WorkoutStep
    main: WorkoutStep[]
    cooldown: WorkoutStep
  }
}