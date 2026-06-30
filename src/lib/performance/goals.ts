
export type WeeklyGoal = {
  current: number
  target: number
}

export type PerformanceGoals = {
  running: WeeklyGoal
  strength: WeeklyGoal
  padbol: WeeklyGoal
  zone2: WeeklyGoal
  quality: WeeklyGoal
}

type RawActivity = {
  title: string
  sport: string
  distance: number
  duration: number
  avgHR?: number | null
  startTime: string
}

export function buildPerformanceGoals(
  activities: RawActivity[],
): PerformanceGoals {
  const currentWeekStart = getStartOfWeek(new Date())

  const weekActivities = activities.filter(activity => {
    return new Date(activity.startTime) >= currentWeekStart
  })

  let runningKm = 0
  let strengthSessions = 0
  let padbolSessions = 0
  let zone2Minutes = 0
  let totalRunningMinutes = 0
  let qualitySessions = 0

  weekActivities.forEach(activity => {
    const title = activity.title.toLowerCase()

    if (activity.sport === 'running') {
      runningKm += normalizeDistance(activity.distance)

      const durationMinutes = Number(activity.duration || 0) / 60
      totalRunningMinutes += durationMinutes

      if ((activity.avgHR ?? 0) > 0 && (activity.avgHR ?? 0) < 145) {
        zone2Minutes += durationMinutes
      }

      if ((activity.avgHR ?? 0) > 160) {
        qualitySessions += 1
      }
    }

    if (title.includes('fuerza') || title.includes('strength')) {
      strengthSessions += 1
    }

    if (title.includes('padbol')) {
      padbolSessions += 1
    }
  })

  const zone2Percent =
    totalRunningMinutes > 0
      ? (zone2Minutes / totalRunningMinutes) * 100
      : 0

  return {
    running: {
      current: runningKm,
      target: 40,
    },
    strength: {
      current: strengthSessions,
      target: 2,
    },
    padbol: {
      current: padbolSessions,
      target: 2,
    },
    zone2: {
      current: zone2Percent,
      target: 70,
    },
    quality: {
      current: qualitySessions,
      target: 2,
    },
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