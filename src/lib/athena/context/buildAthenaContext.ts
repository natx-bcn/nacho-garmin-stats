import type { AthenaContext } from '../models'

import { buildActivityContext } from './activityContext'
import { buildTrainingContext } from './trainingContext'
import { buildRecoveryContext } from './recoveryContext'
import { buildProfileContext } from './profileContext'

export function buildAthenaContext(
  context: AthenaContext,
): AthenaContext {
  const activity = buildActivityContext({
    activitiesThisWeek: context.activitiesThisWeek,
    weekDistance: context.weekDistance,
    daysSinceLastActivity: context.daysSinceLastActivity,
  })

  const training = buildTrainingContext({
    ctl: context.ctl,
    atl: context.atl,
    tsb: context.tsb,
    weeklyLoad: context.weeklyLoad,
    lastWeekLoad: context.lastWeekLoad,
    isAerobicFocused: context.isAerobicFocused,
  })

  const recovery = buildRecoveryContext({
    daysSinceLastActivity: context.daysSinceLastActivity,
    sleepScore: context.sleepScore,
    hrvStatus: context.hrvStatus,
    restingHeartRate: context.restingHeartRate,
  })

  const profile = buildProfileContext({
    vo2max: context.vo2max,
    lactateThresholdPace: context.lactateThresholdPace,
    lactateThresholdHeartRate: context.lactateThresholdHeartRate,
    upcomingRace: context.upcomingRace,
    notes: context.notes,
  })

  return {
    ...training,
    ...activity,
    ...recovery,
    ...profile,
  }
}