export interface RunnerStatusAnalysis {
  title: string
  subtitle: string
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
      title: 'Sobrecarga',
      subtitle: 'Fatiga alta acumulada',
      color: '#ef4444',
      icon: 'AlertTriangle',
    }
  }

  if (tsb < -12) {
    return {
      title: 'Carga alta',
      subtitle: 'Entrenando fuerte',
      color: '#f97316',
      icon: 'Flame',
    }
  }

  if (lastWeekTss > 0 && weekTss > lastWeekTss * 1.3) {
    return {
      title: 'Subida de carga',
      subtitle: 'Semana exigente',
      color: '#eab308',
      icon: 'TrendingUp',
    }
  }

  if (tsb > 10) {
    return {
      title: 'Descansado',
      subtitle: 'Listo para apretar',
      color: '#22c55e',
      icon: 'Zap',
    }
  }

  return {
    title: 'Productivo',
    subtitle: 'Buen equilibrio carga-recuperación',
    color: '#3b82f6',
    icon: 'Activity',
  }
}