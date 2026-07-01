import type { AthenaContext, AthenaInsight } from '../models'

export function analyzeAthenaInsights(context: AthenaContext): AthenaInsight[] {
  const {
    tsb,
    ctl,
    atl,
    weeklyLoad,
    lastWeekLoad,
    activitiesThisWeek,
    daysSinceLastActivity = 0,
  } = context

  const insights: AthenaInsight[] = []

  if (activitiesThisWeek >= 4) {
    insights.push({
      id: 'weekly-consistency',
      severity: 'positive',
      title: 'Buena consistencia semanal',
      description: `Has entrenado ${activitiesThisWeek} días esta semana. Mantienes una buena continuidad.`,
      priority: 90,
    })
  }

  if (activitiesThisWeek === 0) {
    insights.push({
      id: 'no-activity-week',
      severity: 'warning',
      title: 'Semana sin actividad',
      description: 'Todavía no has registrado entrenamientos esta semana. Conviene reactivar con una sesión suave.',
      priority: 95,
    })
  }

  if (lastWeekLoad > 0) {
    const loadChange = ((weeklyLoad - lastWeekLoad) / lastWeekLoad) * 100

    if (loadChange >= 25) {
      insights.push({
        id: 'load-spike',
        severity: 'warning',
        title: 'Subida fuerte de carga',
        description: `Tu carga semanal ha subido un ${Math.round(loadChange)}% respecto a la semana pasada. Vigila la fatiga.`,
        priority: 100,
      })
    } else if (loadChange >= 10) {
      insights.push({
        id: 'load-growth',
        severity: 'neutral',
        title: 'Carga en crecimiento',
        description: `Tu carga semanal ha aumentado un ${Math.round(loadChange)}% respecto a la semana pasada.`,
        priority: 70,
      })
    } else if (loadChange <= -25) {
      insights.push({
        id: 'load-drop',
        severity: 'neutral',
        title: 'Semana de descarga',
        description: `Tu carga semanal ha bajado un ${Math.abs(Math.round(loadChange))}% respecto a la semana pasada.`,
        priority: 65,
      })
    }
  }

  if (tsb < -25) {
    insights.push({
      id: 'high-fatigue',
      severity: 'warning',
      title: 'Fatiga acumulada alta',
      description: 'Tu forma está muy negativa. Hoy Athena priorizaría recuperación o movilidad.',
      priority: 100,
    })
  } else if (tsb > 10) {
    insights.push({
      id: 'fresh-state',
      severity: 'positive',
      title: 'Buena frescura',
      description: 'Tu fatiga está controlada. Es un buen momento para entrenar con intención.',
      priority: 75,
    })
  }

  if (atl > ctl * 1.35 && ctl > 0) {
    insights.push({
      id: 'fatigue-rising',
      severity: 'warning',
      title: 'Fatiga creciendo rápido',
      description: 'La fatiga reciente está creciendo bastante más rápido que tu fitness. Conviene no encadenar sesiones duras.',
      priority: 90,
    })
  }

  if (daysSinceLastActivity >= 4) {
    insights.push({
      id: 'return-to-training',
      severity: 'neutral',
      title: 'Reactivar progresivamente',
      description: `Llevas ${daysSinceLastActivity} días sin actividad. Mejor volver con una sesión suave.`,
      priority: 80,
    })
  }

  if (insights.length === 0) {
    insights.push({
      id: 'stable-week',
      severity: 'positive',
      title: 'Semana estable',
      description: 'Tus métricas principales están dentro de un rango razonable. Mantén la planificación prevista.',
      priority: 50,
    })
  }

  return insights
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 5)
}