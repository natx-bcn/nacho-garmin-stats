export interface RunnerStatusAnalysis {
  label: string
  description: string
  color: string
  icon: string
}

export function analyzeRunnerStatus(
  tsb: number,
  weekTss: number,
  lastWeekTss: number,
): RunnerStatusAnalysis {
  if (tsb < -25) {
    return {
      label: 'Sobrecarga',
      description: 'Fatiga alta acumulada',
      color: '#ef4444',
      icon: 'AlertTriangle',
    }
  }

  if (tsb < -12) {
    return {
      label: 'Carga alta',
      description: 'Entrenando fuerte',
      color: '#f97316',
      icon: 'Flame',
    }
  }

  if (lastWeekTss > 0 && weekTss > lastWeekTss * 1.3) {
    return {
      label: 'Subida de carga',
      description: 'Semana exigente',
      color: '#eab308',
      icon: 'TrendingUp',
    }
  }

  if (tsb > 10) {
    return {
      label: 'Descansado',
      description: 'Listo para apretar',
      color: '#22c55e',
      icon: 'Zap',
    }
  }

  return {
    label: 'Productivo',
    description: 'Buen equilibrio carga-recuperación',
    color: '#3b82f6',
    icon: 'Activity',
  }
}