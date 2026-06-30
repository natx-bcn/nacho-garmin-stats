type RawActivity = {
  startTime: string
  distance: number
  duration: number
  tss?: number | null
  sport: string
}

export type PerformanceLoad = {
  currentWeek: {
    sessions: number
    distanceKm: number
    durationSec: number
    tss: number
  }
  previousWeek: {
    sessions: number
    distanceKm: number
    durationSec: number
    tss: number
  }
  ratio: number
}

export function buildPerformanceLoad(activities: RawActivity[]): PerformanceLoad {
  const now = new Date()
  const currentWeekStart = getStartOfWeek(now)

  const previousWeekStart = new Date(currentWeekStart)
  previousWeekStart.setDate(previousWeekStart.getDate() - 7)

  const currentWeek = activities.filter(a => {
    const date = new Date(a.startTime)
    return date >= currentWeekStart
  })

  const previousWeek = activities.filter(a => {
    const date = new Date(a.startTime)
    return date >= previousWeekStart && date < currentWeekStart
  })

  const current = summarize(currentWeek)
  const previous = summarize(previousWeek)

  return {
    currentWeek: current,
    previousWeek: previous,
    ratio: previous.tss > 0 ? current.tss / previous.tss : 1,
  }
}

function summarize(activities: RawActivity[]) {
  return {
    sessions: activities.length,
    distanceKm: activities.reduce((sum, a) => sum + normalizeDistance(a.distance), 0),
    durationSec: activities.reduce((sum, a) => sum + Number(a.duration || 0), 0),
    tss: activities.reduce((sum, a) => sum + Number(a.tss || 0), 0),
  }
}

function normalizeDistance(distance: number) {
  return distance > 1000 ? distance / 1000 : distance
}

function getStartOfWeek(date: Date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}


export type WeekLoadPoint = {
  week: string
  tss: number
  distance: number
  duration: number
  sessions: number
}

export function buildWeeklyLoad(
  activities: RawActivity[],
  windowWeeks = 16,
): WeekLoadPoint[] {
  const weeks: WeekLoadPoint[] = []
  const now = new Date()
  const currentWeekStart = getStartOfWeek(now)

  for (let i = windowWeeks - 1; i >= 0; i--) {
    const weekStart = new Date(currentWeekStart)
    weekStart.setDate(currentWeekStart.getDate() - i * 7)

    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 7)

    const weekActivities = activities.filter(activity => {
      const date = new Date(activity.startTime)
      return date >= weekStart && date < weekEnd
    })

    weeks.push({
      week: formatWeekLabel(weekStart),
      tss: weekActivities.reduce((sum, a) => sum + Number(a.tss || 0), 0),
      distance: weekActivities.reduce((sum, a) => sum + normalizeDistance(a.distance), 0),
      duration: weekActivities.reduce((sum, a) => sum + Number(a.duration || 0), 0),
      sessions: weekActivities.length,
    })
  }

  return weeks
}

function formatWeekLabel(date: Date) {
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  })
}