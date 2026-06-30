import { useMemo } from 'react'
import { useActivityStore } from '../stores/activityStore'

export default function useWeeklyGoals() {
  const activities = useActivityStore((s) => s.activities)

  return useMemo(() => {
    const today = new Date()

    const monday = new Date(today)
    const day = monday.getDay()

    monday.setDate(
      monday.getDate() - (day === 0 ? 6 : day - 1)
    )

    monday.setHours(0, 0, 0, 0)

    const weekActivities = activities.filter((a) => {
      return new Date(a.startTime) >= monday
    })

    let runningKm = 0
    let runningSessions = 0

    let strengthSessions = 0

    let padbolSessions = 0

    let zone2Minutes = 0
    let totalMinutes = 0

    let qualitySessions = 0

    weekActivities.forEach((a) => {

      if (a.sport === 'running') {

        runningSessions++

        runningKm += a.distance || 0

        if ((a.avgHR ?? 0) > 0) {

          totalMinutes += (a.duration || 0) / 60

          if ((a.avgHR ?? 0) < 145) {
            zone2Minutes += (a.duration || 0) / 60
          }

          if ((a.avgHR ?? 0) > 160) {
            qualitySessions++
          }

        }

      }

      if (
        a.title.toLowerCase().includes('padbol')
      ) {
        padbolSessions++
      }

      if (
        a.title.toLowerCase().includes('strength') ||
        a.title.toLowerCase().includes('fuerza')
      ) {
        strengthSessions++
      }

    })

    const zone2Percent =
      totalMinutes === 0
        ? 0
        : (zone2Minutes / totalMinutes) * 100

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

  }, [activities])
}