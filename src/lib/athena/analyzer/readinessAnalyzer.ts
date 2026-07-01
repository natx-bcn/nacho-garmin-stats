import type { AthenaContext } from '../models'
import type { ReadinessLevel } from '../types'

export interface ReadinessAnalysis {
  level: ReadinessLevel
  score: number
  confidence: number
  reason: string
  visual: {
    title: string
    subtitle: string
    color: string
    icon: string
    badge: string
  }
}

export function analyzeReadiness(context: AthenaContext): ReadinessAnalysis {
  const { tsb, activitiesThisWeek, weeklyLoad, lastWeekLoad } = context

  let score = 70

  if (tsb >= -10 && tsb <= 10) score += 15
  if (tsb < -20) score -= 25
  if (tsb > 20) score -= 10

  if (activitiesThisWeek >= 3) score += 10
  if (activitiesThisWeek === 0) score -= 20

  if (weeklyLoad > 0) score += 5

  score = Math.max(0, Math.min(100, Math.round(score)))

  let level: ReadinessLevel = 'Productive'
  let reason = 'Carga y fatiga en rango productivo.'

  if (score >= 85) {
    level = 'Ready'
    reason = 'Fatiga controlada y buena disponibilidad para entrenar.'
  } else if (score >= 65) {
    level = 'Productive'
    reason = 'Estado adecuado para seguir acumulando entrenamiento.'
  } else if (score >= 45) {
    level = 'Caution'
    reason = 'Conviene vigilar la fatiga antes de añadir más intensidad.'
  } else {
    level = 'Recovery'
    reason = 'La prioridad debería ser recuperar antes de volver a cargar.'
  }

  const visual = getReadinessVisual({
    tsb,
    weeklyLoad,
    lastWeekLoad,
    level,
  })

  return {
    level,
    score,
    confidence: 80,
    reason,
    visual,
  }
}

function getReadinessVisual({
  tsb,
  weeklyLoad,
  lastWeekLoad,
  level,
}: {
  tsb: number
  weeklyLoad: number
  lastWeekLoad: number
  level: ReadinessLevel
}): ReadinessAnalysis['visual'] {
  if (tsb < -25) {
    return {
      title: 'Sobrecarga',
      subtitle: 'Fatiga alta acumulada',
      color: '#ef4444',
      icon: 'AlertTriangle',
      badge: 'SOBRECARGA',
    }
  }

  if (tsb < -12) {
    return {
      title: 'Carga alta',
      subtitle: 'Entrenando fuerte',
      color: '#f97316',
      icon: 'Flame',
      badge: 'CARGA ALTA',
    }
  }

  if (lastWeekLoad > 0 && weeklyLoad > lastWeekLoad * 1.3) {
    return {
      title: 'Subida de carga',
      subtitle: 'Semana exigente',
      color: '#eab308',
      icon: 'TrendingUp',
      badge: 'SUBIDA',
    }
  }

  if (tsb > 10 || level === 'Ready') {
    return {
      title: 'Descansado',
      subtitle: 'Listo para apretar',
      color: '#22c55e',
      icon: 'Zap',
      badge: 'READY',
    }
  }

  if (level === 'Recovery') {
    return {
      title: 'Recuperación',
      subtitle: 'Prioriza descanso y movilidad',
      color: '#eab308',
      icon: 'ShieldCheck',
      badge: 'RECUPERACIÓN',
    }
  }

  if (level === 'Caution') {
    return {
      title: 'Precaución',
      subtitle: 'Controla la intensidad',
      color: '#f97316',
      icon: 'AlertTriangle',
      badge: 'PRECAUCIÓN',
    }
  }

  return {
    title: 'Productivo',
    subtitle: 'Buen equilibrio carga-recuperación',
    color: '#3b82f6',
    icon: 'Activity',
    badge: 'PRODUCTIVO',
  }
}