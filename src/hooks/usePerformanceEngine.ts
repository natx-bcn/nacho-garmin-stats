import { useMemo } from 'react'
import { useActivityStore } from '../stores/activityStore'
import { buildPerformanceRecords } from '../lib/performance/records'
import { buildPerformanceTrend } from '../lib/performance/trend'
import { buildPerformanceConsistency } from '../lib/performance/consistency'
import { buildPerformancePredictions } from '../lib/performance/predictions'
import { buildPerformanceGoals } from '../lib/performance/goals'
import { buildPerformanceLoad, buildWeeklyLoad } from '../lib/performance/load'

export default function usePerformanceEngine() {
  const activities = useActivityStore(s => s.activities)

  return useMemo(() => {
    const records = buildPerformanceRecords(activities)
    const load = buildPerformanceLoad(activities)
	const trend = buildPerformanceTrend(activities)
	const consistency = buildPerformanceConsistency(activities)
	const predictions = buildPerformancePredictions(records)
	const goals = buildPerformanceGoals(activities)
	const weeklyLoad = buildWeeklyLoad(activities, 16)
	
    return {
      activities,
      totalActivities: activities.length,

      records,
      best5k: records.best5k,
      best10k: records.best10k,
      bestHalf: records.bestHalf,
      longestRun: records.longestRun,

      load,
	  trend,
	  predictions,
	  consistency,
	  goals,
	  weeklyLoad,
      currentWeek: load.currentWeek,
      previousWeek: load.previousWeek,
      loadRatio: load.ratio,
    }
  }, [activities])
}