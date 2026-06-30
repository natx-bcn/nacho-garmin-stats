type RawActivity = {
  sport: string
  title: string
  distance: number
  duration: number
  avgHR?: number | null
  avgPace?: number | null
  tss?: number | null
}

export type ActivityTrainingType =
  | 'easy'
  | 'quality'
  | 'long'
  | 'strength'
  | 'padbol'
  | 'other'

export type ActivityAnalysis = {
  trainingType: ActivityTrainingType
  intensityLabel: 'Suave' | 'Moderada' | 'Alta'
  isQuality: boolean
  isLongRun: boolean
  isStrength: boolean
  isPadbol: boolean
}

export function analyzeActivity(activity: RawActivity): ActivityAnalysis {
  const title = activity.title.toLowerCase()
  const distanceKm = normalizeDistance(activity.distance)
  const durationMin = activity.duration / 60
  const avgHR = activity.avgHR ?? 0
  const tss = activity.tss ?? 0

  const isStrength =
    title.includes('fuerza') ||
    title.includes('strength') ||
    title.includes('gym')

  const isPadbol = title.includes('padbol')

  const isLongRun =
    activity.sport === 'running' &&
    (distanceKm >= 12 || durationMin >= 75)

  const isQuality =
    activity.sport === 'running' &&
    (
      avgHR >= 160 ||
      tss >= 70 ||
      title.includes('series') ||
      title.includes('tempo') ||
      title.includes('interval')
    )

  if (isStrength) {
    return buildResult('strength', 'Moderada')
  }

  if (isPadbol) {
    return buildResult('padbol', 'Alta')
  }

  if (isLongRun) {
    return buildResult('long', 'Moderada')
  }

  if (isQuality) {
    return buildResult('quality', 'Alta')
  }

  if (activity.sport === 'running') {
    return buildResult('easy', avgHR > 150 ? 'Moderada' : 'Suave')
  }

  return buildResult('other', tss >= 60 ? 'Alta' : 'Moderada')
}

function buildResult(
  trainingType: ActivityTrainingType,
  intensityLabel: ActivityAnalysis['intensityLabel'],
): ActivityAnalysis {
  return {
    trainingType,
    intensityLabel,
    isQuality: trainingType === 'quality',
    isLongRun: trainingType === 'long',
    isStrength: trainingType === 'strength',
    isPadbol: trainingType === 'padbol',
  }
}

function normalizeDistance(distance: number) {
  return distance > 1000 ? distance / 1000 : distance
}