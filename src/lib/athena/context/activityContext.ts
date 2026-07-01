export interface AthenaActivitySummary {
  activitiesThisWeek: number
  weekDistance: number
  daysSinceLastActivity?: number
}

export function buildActivityContext(input: AthenaActivitySummary): AthenaActivitySummary {
  return {
    activitiesThisWeek: input.activitiesThisWeek,
    weekDistance: input.weekDistance,
    daysSinceLastActivity: input.daysSinceLastActivity,
  }
}