import type {
  BestPerformance,
  PerformanceRecord,
  PerformanceRecords,
} from './records'

export type RacePrediction = {
  label: string
  distanceKm: number
  predictedSeconds: number
  predictedTime: string
  marginSeconds: number
  confidence: number
  confidenceLabel: 'Alta' | 'Media' | 'Baja'
  sourceLabel: string
  sourceTitle: string | null
}

export type PerformancePredictions = {
  fiveK: RacePrediction
  tenK: RacePrediction
  half: RacePrediction
  marathon: RacePrediction
}

export function buildPerformancePredictions(
  records: PerformanceRecords,
): PerformancePredictions {
  return {
    fiveK: buildPrediction(
      '5K',
      5,
      pickReference(records.best5k),
      'Mejor 5K',
    ),

    tenK: buildPrediction(
      '10K',
      10,
      pickReference(records.best10k) ??
        pickReference(records.best5k),
      pickReference(records.best10k) ? 'Mejor 10K' : 'Mejor 5K extrapolado',
    ),

    half: buildPrediction(
      'Media',
      21.097,
      pickReference(records.bestHalf) ??
        pickReference(records.best10k) ??
        pickReference(records.longestRun),
      pickReference(records.bestHalf)
        ? 'Mejor media'
        : pickReference(records.best10k)
          ? 'Mejor 10K extrapolado'
          : 'Tirada larga extrapolada',
    ),

    marathon: buildPrediction(
      'Maratón',
      42.195,
      pickReference(records.longestRun) ??
        pickReference(records.bestHalf) ??
        pickReference(records.best10k),
      pickReference(records.longestRun)
        ? 'Tirada larga extrapolada'
        : pickReference(records.bestHalf)
          ? 'Media extrapolada'
          : '10K extrapolado',
    ),
  }
}

function pickReference(
  performance: BestPerformance,
): PerformanceRecord | null {
  return performance.record
}

function buildPrediction(
  label: string,
  targetDistanceKm: number,
  reference: PerformanceRecord | null,
  sourceType: string,
): RacePrediction {
  if (!reference) {
    return {
      label,
      distanceKm: targetDistanceKm,
      predictedSeconds: 0,
      predictedTime: '–',
      marginSeconds: 0,
      confidence: 0,
      confidenceLabel: 'Baja',
      sourceLabel: 'Sin datos suficientes',
      sourceTitle: null,
    }
  }

  const predictedSeconds = predictTime(
    reference.durationSec,
    reference.distanceKm,
    targetDistanceKm,
  )

  const confidence = calculateConfidence(
    reference.distanceKm,
    targetDistanceKm,
    sourceType,
  )

  const marginSeconds = calculateMargin(
    predictedSeconds,
    confidence,
  )

  return {
    label,
    distanceKm: targetDistanceKm,
    predictedSeconds,
    predictedTime: formatRaceTime(predictedSeconds),
    marginSeconds,
    confidence,
    confidenceLabel: getConfidenceLabel(confidence),
    sourceLabel: `${sourceType} · ${formatDistance(reference.distanceKm)}`,
    sourceTitle: reference.title,
  }
}

function predictTime(
  sourceSeconds: number,
  sourceDistanceKm: number,
  targetDistanceKm: number,
) {
  const exponent = 1.06

  return sourceSeconds * Math.pow(
    targetDistanceKm / sourceDistanceKm,
    exponent,
  )
}

function calculateConfidence(
  sourceDistanceKm: number,
  targetDistanceKm: number,
  sourceType: string,
) {
  const ratio =
    Math.max(sourceDistanceKm, targetDistanceKm) /
    Math.min(sourceDistanceKm, targetDistanceKm)

  let confidence = 90

  if (ratio <= 1.15) confidence = 94
  else if (ratio <= 1.5) confidence = 86
  else if (ratio <= 2.5) confidence = 72
  else if (ratio <= 4) confidence = 56
  else confidence = 40

  if (sourceType.includes('Tirada larga')) confidence -= 10
  if (sourceType.includes('extrapolado')) confidence -= 6
  if (targetDistanceKm >= 42) confidence -= 10

  return Math.max(25, Math.min(95, confidence))
}

function calculateMargin(
  predictedSeconds: number,
  confidence: number,
) {
  const uncertainty =
    confidence >= 85
      ? 0.03
      : confidence >= 70
        ? 0.05
        : confidence >= 55
          ? 0.08
          : 0.12

  return Math.round(predictedSeconds * uncertainty)
}

function getConfidenceLabel(
  confidence: number,
): RacePrediction['confidenceLabel'] {
  if (confidence >= 80) return 'Alta'
  if (confidence >= 60) return 'Media'
  return 'Baja'
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

function formatDistance(distanceKm: number) {
  if (Math.abs(distanceKm - 5) < 0.5) return '5K'
  if (Math.abs(distanceKm - 10) < 0.7) return '10K'
  if (Math.abs(distanceKm - 21.097) < 1.5) return 'media maratón'
  if (distanceKm >= 20) return `${distanceKm.toFixed(1)} km`

  return `${distanceKm.toFixed(1)} km`
}