export type InsightSeverity = 'positive' | 'neutral' | 'warning'

export type Insight = {
  id: string
  title: string
  description: string
  severity: InsightSeverity
}

export type InsightInput = {
  weeklyLoad: number
  previousWeeklyLoad: number
  recoveryHours: number
  weeklyActivities: number
}

export function generateInsights(
  data: InsightInput
): Insight[] {
  const insights: Insight[] = []

  const loadVariation =
    data.previousWeeklyLoad === 0
      ? 0
      : ((data.weeklyLoad - data.previousWeeklyLoad) /
          data.previousWeeklyLoad) *
        100

  if (loadVariation > 10) {
    insights.push({
      id: 'load-increase',
      title: 'Carga en aumento',
      description:
        'La carga semanal ha aumentado respecto a la semana anterior.',
      severity: 'positive',
    })
  }

  if (loadVariation < -10) {
    insights.push({
      id: 'load-drop',
      title: 'Semana de descarga',
      description:
        'La carga semanal ha disminuido respecto a la semana anterior.',
      severity: 'neutral',
    })
  }

  if (data.recoveryHours < 12) {
    insights.push({
      id: 'recovery',
      title: 'Recuperación insuficiente',
      description:
        'Conviene priorizar descanso o un entrenamiento suave.',
      severity: 'warning',
    })
  }

  if (data.weeklyActivities >= 4) {
    insights.push({
      id: 'consistency',
      title: 'Buena consistencia',
      description:
        'Has mantenido una buena frecuencia de entrenamiento esta semana.',
      severity: 'positive',
    })
  }

  return insights
}