export interface AthenaContext {
  // Fitness & carga
  ctl: number
  atl: number
  tsb: number

  // Carga semanal
  weeklyLoad: number
  lastWeekLoad: number
  weekDistance: number
  activitiesThisWeek: number

  // Perfil del bloque actual
  isAerobicFocused: boolean

  // Recuperación / descanso
  daysSinceLastActivity?: number
  sleepScore?: number
  hrvStatus?: 'low' | 'balanced' | 'high' | 'unknown'

  // Métricas fisiológicas
  vo2max?: number
  restingHeartRate?: number
  lactateThresholdPace?: string
  lactateThresholdHeartRate?: number

  // Contexto de entrenamiento
  upcomingRace?: {
    name: string
    date: string
    distanceKm: number
  }

  // Datos opcionales para futuras versiones
  notes?: string[]
}