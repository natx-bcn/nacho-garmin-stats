export interface AthenaContext {
  ctl: number
  atl: number
  tsb: number

  weeklyLoad: number
  lastWeekLoad: number

  weekDistance: number

  activitiesThisWeek: number

  isAerobicFocused: boolean

  daysSinceLastActivity?: number
}