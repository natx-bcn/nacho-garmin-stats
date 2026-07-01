export interface AthenaTrainingSummary {
  ctl: number
  atl: number
  tsb: number
  weeklyLoad: number
  lastWeekLoad: number
  isAerobicFocused: boolean
}

export function buildTrainingContext(input: AthenaTrainingSummary): AthenaTrainingSummary {
  return {
    ctl: input.ctl,
    atl: input.atl,
    tsb: input.tsb,
    weeklyLoad: input.weeklyLoad,
    lastWeekLoad: input.lastWeekLoad,
    isAerobicFocused: input.isAerobicFocused,
  }
}