import { useMemo } from 'react'
import { useActivityStore } from '../stores/activityStore'

type RacePrediction = {
  label: string
  distanceKm: number
  predictedSeconds: number
  predictedTime: string
  confidence: 'alta' | 'media' | 'baja'
  source: string
}

export default function useRacePredictions() {
  const activities = useActivityStore(s => s.activities)

  return useMemo(() => {
    const runningActivities = activities
      .filter(a =>
        a.sport === 'running' &&
        a.distance > 0 &&
        a.duration > 0
      )
      .slice(0, 80)

    const bestReference = getBestReferenceActivity(runningActivities)

    if (!bestReference) {
      return []
    }

    return [
      buildPrediction('5K', 5, bestReference),
      buildPrediction('10K', 10, bestReference),
      buildPrediction('Media', 21.097, bestReference),
      buildPrediction('Maratón', 42.195, bestReference),
    ]
  }, [activities])
}

function getBestReferenceActivity(activities: any[]) {
  const candidates = activities
    .filter(a => a.distance >= 4.5)
    .map(a => {
      const distanceKm = a.distance
      const durationSeconds = a.duration
      const estimated5kSeconds = predictTime(durationSeconds, distanceKm, 5)

      return {
        distanceKm,
        durationSeconds,
        estimated5kSeconds,
        title: a.title,
        startTime: a.startTime,
      }
    })
    .sort((a, b) => a.estimated5kSeconds - b.estimated5kSeconds)

  return candidates[0] ?? null
}

function buildPrediction(
  label: string,
  targetDistanceKm: number,
  reference: {
    distanceKm: number
    durationSeconds: number
    title: string
    startTime: string
  },
): RacePrediction {
  const predictedSeconds = predictTime(
    reference.durationSeconds,
    reference.distanceKm,
    targetDistanceKm,
  )

  return {
    label,
    distanceKm: targetDistanceKm,
    predictedSeconds,
    predictedTime: formatRaceTime(predictedSeconds),
    confidence: getConfidence(reference.distanceKm, targetDistanceKm),
    source: reference.title,
  }
}

function predictTime(
  sourceSeconds: number,
  sourceDistanceKm: number,
  targetDistanceKm: number,
) {
  const exponent = 1.06
  return sourceSeconds * Math.pow(targetDistanceKm / sourceDistanceKm, exponent)
}

function getConfidence(sourceDistanceKm: number, targetDistanceKm: number) {
  const ratio = Math.max(sourceDistanceKm, targetDistanceKm) / Math.min(sourceDistanceKm, targetDistanceKm)

  if (ratio <= 1.5) return 'alta'
  if (ratio <= 3.5) return 'media'
  return 'baja'
}

function formatRaceTime(seconds: number) {
  const total = Math.round(seconds)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60

  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  return `${m}:${String(s).padStart(2, '0')}`
}