import type { TrainingType } from './types'

type RawActivity = {
  sport: string
  title: string
  distance: number
  duration: number
  avgHR?: number | null
  avgPace?: number | null
  tss?: number | null
}

export function classifyTraining(activity: RawActivity): TrainingType {
  const title = activity.title.toLowerCase()
  const distanceKm = normalizeDistance(activity.distance)
  const durationMin = activity.duration / 60
  const avgHR = activity.avgHR ?? 0
  const tss = activity.tss ?? 0

  if (title.includes('fuerza') || title.includes('strength') || title.includes('gym')) {
    return 'strength'
  }

  if (title.includes('padbol')) {
    return 'padbol'
  }

  if (title.includes('race') || title.includes('cursa') || title.includes('carrera')) {
    return 'race'
  }

  if (activity.sport !== 'running') {
    return 'other'
  }

  if (distanceKm >= 14 || durationMin >= 85) {
    return 'long'
  }

  if (title.includes('series') || title.includes('interval') || title.includes('repeticiones')) {
    return 'intervals'
  }

  if (title.includes('tempo')) {
    return 'tempo'
  }

  if (title.includes('umbral') || title.includes('threshold')) {
    return 'threshold'
  }

  if (avgHR >= 166 || tss >= 85) {
    return 'vo2max'
  }

  if (avgHR >= 158 || tss >= 65) {
    return 'threshold'
  }

  if (avgHR >= 148 || durationMin >= 50) {
    return 'easy'
  }

  return 'recovery'
}

function normalizeDistance(distance: number) {
  return distance > 1000 ? distance / 1000 : distance
}