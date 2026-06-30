import { useMemo } from 'react'
import { useActivityStore } from '../stores/activityStore'
import { buildPerformanceRecords } from '../lib/performance/records'
import { buildPerformanceLoad } from '../lib/performance/load'
import { buildPerformanceTrend } from '../lib/performance/trend'


export default function usePerformanceEngine() {
  const activities = useActivityStore(s => s.activities)

  return useMemo(() => {
    const records = buildPerformanceRecords(activities)
    const load = buildPerformanceLoad(activities)
	const trend = buildPerformanceTrend(activities)

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
      currentWeek: load.currentWeek,
      previousWeek: load.previousWeek,
      loadRatio: load.ratio,
    }
  }, [activities])
}