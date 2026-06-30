type RawActivity = {
  startTime: string
  sport: string
  distance: number
  duration: number
  tss?: number | null
}

export type PerformanceTrend = {
  status: 'improving' | 'stable' | 'declining'
  label: 'Mejorando' | 'Estable' | 'Bajando'
  score: number
  current30: {
    sessions: number
    distanceKm: number
    tss: number
    avgPaceSecKm: number | null
  }
  previous30: {
    sessions: number
    distanceKm: number
    tss: number
    avgPaceSecKm: number | null
  }
}

export function buildPerformanceTrend(activities: RawActivity[]): PerformanceTrend {
  const now = new Date()

  const current30 = activities.filter(activity => {
    const days = diffDays(now, new Date(activity.startTime))
    return days >= 0 && days <= 30
  })

  const previous30 = activities.filter(activity => {
    const days = diffDays(now, new Date(activity.startTime))
    return days > 30 && days <= 60
  })

  const current = summarize(current30)
  const previous = summarize(previous30)

  const volumeScore = compareHigherIsBetter(current.distanceKm, previous.distanceKm)
  const tssScore = compareHigherIsBetter(current.tss, previous.tss)
  const paceScore = compareLowerIsBetter(current.avgPaceSecKm, previous.avgPaceSecKm)

  const score = Math.round((volumeScore + tssScore + paceScore) / 3)

  if (score >= 15) {
    return {
      status: 'improving',
      label: 'Mejorando',
      score,
      current30: current,
      previous30: previous,
    }
  }

  if (score <= -15) {
    return {
      status: 'declining',
      label: 'Bajando',
      score,
      current30: current,
      previous30: previous,
    }
  }

  return {
    status: 'stable',
    label: 'Estable',
    score,
    current30: current,
    previous30: previous,
  }
}

function summarize(activities: RawActivity[]) {
  const running = activities.filter(a => a.sport === 'running' && a.distance > 0 && a.duration > 0)

  const distanceKm = activities.reduce((sum, a) => sum + normalizeDistance(a.distance), 0)
  const tss = activities.reduce((sum, a) => sum + Number(a.tss || 0), 0)

  const runningDistance = running.reduce((sum, a) => sum + normalizeDistance(a.distance), 0)
  const runningDuration = running.reduce((sum, a) => sum + Number(a.duration || 0), 0)

  return {
    sessions: activities.length,
    distanceKm,
    tss,
    avgPaceSecKm: runningDistance > 0 ? runningDuration / runningDistance : null,
  }
}

function compareHigherIsBetter(current: number, previous: number) {
  if (previous <= 0 && current > 0) return 20
  if (previous <= 0) return 0

  return ((current - previous) / previous) * 100
}

function compareLowerIsBetter(current: number | null, previous: number | null) {
  if (current == null || previous == null || previous <= 0) return 0

  return ((previous - current) / previous) * 100
}

function normalizeDistance(distance: number) {
  return distance > 1000 ? distance / 1000 : distance
}

function diffDays(a: Date, b: Date) {
  return Math.floor((a.getTime() - b.getTime()) / 86400000)
}