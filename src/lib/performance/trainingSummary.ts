import type { ActivityAnalysis } from '../activityAnalyzer/types'

type ActivityAnalysisItem = ActivityAnalysis & {
  activityId: number | string
  startTime: string
}

export type WeeklyTrainingSummary = {
  qualitySessions: number
  longRuns: number
  strengthSessions: number
  padbolSessions: number
  easySessions: number
  averageIntensity: number
  averageFatigue: number
  averageRecoveryHours: number
}

export function buildWeeklyTrainingSummary(
  activityAnalysis: ActivityAnalysisItem[],
): WeeklyTrainingSummary {
  const weekStart = getStartOfWeek(new Date())

  const week = activityAnalysis.filter(activity => {
    return new Date(activity.startTime) >= weekStart
  })

  return {
    qualitySessions: week.filter(a => a.tags.includes('quality')).length,
    longRuns: week.filter(a => a.tags.includes('longRun')).length,
    strengthSessions: week.filter(a => a.tags.includes('strength')).length,
    padbolSessions: week.filter(a => a.tags.includes('padbol')).length,
    easySessions: week.filter(a => a.tags.includes('easy') || a.tags.includes('recovery')).length,
    averageIntensity: average(week.map(a => a.intensityScore)),
    averageFatigue: average(week.map(a => a.fatigueScore)),
    averageRecoveryHours: average(week.map(a => a.recoveryHours)),
  }
}

function average(values: number[]) {
  if (values.length === 0) return 0

  return Math.round(
    values.reduce((sum, value) => sum + value, 0) / values.length,
  )
}

function getStartOfWeek(date: Date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)

  d.setDate(diff)
  d.setHours(0, 0, 0, 0)

  return d
}