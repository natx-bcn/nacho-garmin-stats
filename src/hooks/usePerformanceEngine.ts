import { useMemo } from 'react'
import { useActivityStore } from '../stores/activityStore'
import { buildPerformanceRecords } from '../lib/performance/records'

export default function usePerformanceEngine() {
  const activities = useActivityStore(s => s.activities)

  return useMemo(() => {
    const records = buildPerformanceRecords(activities)

    return {
      activities,
      totalActivities: activities.length,

      records,
      best5k: records.best5k,
      best10k: records.best10k,
      bestHalf: records.bestHalf,
      longestRun: records.longestRun,
    }
  }, [activities])
}