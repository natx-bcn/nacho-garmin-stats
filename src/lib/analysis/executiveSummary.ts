export type ExecutiveSummaryData = {
  weeklyLoad: number
  previousWeeklyLoad: number
  activities: number
  recoveryHours: number
}

export type ExecutiveSummary = {
  title: string
  summary: string
  recommendation: string
}

export function generateExecutiveSummary(
  data: ExecutiveSummaryData
): ExecutiveSummary {
  const loadChange =
    data.previousWeeklyLoad === 0
      ? 0
      : ((data.weeklyLoad - data.previousWeeklyLoad) /
          data.previousWeeklyLoad) *
        100

  let summary = ''

  if (loadChange > 10) {
    summary =
      'La carga semanal está aumentando respecto a la semana anterior, lo que indica una progresión positiva.'
  } else if (loadChange < -10) {
    summary =
      'La carga semanal ha disminuido. Puede ser una semana de descarga o una reducción del volumen.'
  } else {
    summary =
      'La carga semanal se mantiene estable respecto a la semana anterior.'
  }

  let recommendation = ''

  if (data.recoveryHours < 12) {
    recommendation =
      'Prioriza una sesión suave o descanso antes del próximo entrenamiento exigente.'
  } else {
    recommendation =
      'Puedes mantener la planificación prevista sin aumentar la intensidad.'
  }

  return {
    title: 'Executive Summary',
    summary,
    recommendation,
  }
}