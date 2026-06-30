type RawActivity = {
  startTime: string
}

export type PerformanceConsistency = {
  sessions7: number
  sessions30: number
  sessions90: number
  activeDays30: number
  currentStreak: number
  score: number
  label: 'Alta' | 'Media' | 'Baja'
}

export function buildPerformanceConsistency(
  activities: RawActivity[],
): PerformanceConsistency {
  const now = new Date()

  const sessions7 = countSessionsSince(activities, now, 7)
  const sessions30 = countSessionsSince(activities, now, 30)
  const sessions90 = countSessionsSince(activities, now, 90)

  const activeDays30 = countActiveDaysSince(activities, now, 30)
  const currentStreak = calculateCurrentStreak(activities, now)

  const score = calculateConsistencyScore({
    sessions30,
    activeDays30,
    currentStreak,
  })

  return {
    sessions7,
    sessions30,
    sessions90,
    activeDays30,
    currentStreak,
    score,
    label: getConsistencyLabel(score),
  }
}

function countSessionsSince(
  activities: RawActivity[],
  now: Date,
  daysBack: number,
) {
  return activities.filter(activity => {
    const days = diffDays(now, new Date(activity.startTime))
    return days >= 0 && days <= daysBack
  }).length
}

function countActiveDaysSince(
  activities: RawActivity[],
  now: Date,
  daysBack: number,
) {
  const activeDays = new Set<string>()

  activities.forEach(activity => {
    const date = new Date(activity.startTime)
    const days = diffDays(now, date)

    if (days >= 0 && days <= daysBack) {
      activeDays.add(toLocalDateKey(date))
    }
  })

  return activeDays.size
}

function calculateCurrentStreak(
  activities: RawActivity[],
  now: Date,
) {
  const activeDays = new Set(
    activities.map(activity =>
      toLocalDateKey(new Date(activity.startTime)),
    ),
  )

  let streak = 0
  const cursor = new Date(now)

  while (activeDays.has(toLocalDateKey(cursor))) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }

  return streak
}

function calculateConsistencyScore({
  sessions30,
  activeDays30,
  currentStreak,
}: {
  sessions30: number
  activeDays30: number
  currentStreak: number
}) {
  const sessionScore = Math.min((sessions30 / 16) * 45, 45)
  const activeDayScore = Math.min((activeDays30 / 20) * 40, 40)
  const streakScore = Math.min((currentStreak / 7) * 15, 15)

  return Math.round(sessionScore + activeDayScore + streakScore)
}

function getConsistencyLabel(
  score: number,
): PerformanceConsistency['label'] {
  if (score >= 75) return 'Alta'
  if (score >= 45) return 'Media'
  return 'Baja'
}

function diffDays(a: Date, b: Date) {
  return Math.floor(
    (startOfDay(a).getTime() - startOfDay(b).getTime()) / 86400000,
  )
}

function startOfDay(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function toLocalDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}