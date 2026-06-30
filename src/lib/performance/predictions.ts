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
  const reference =
    pickReference(records.best10k) ??
    pickReference(records.best5k) ??
    pickReference(records.bestHalf) ??
    pickReference(records.longestRun)

  return {
    fiveK: buildPrediction('5K', 5, reference),
    tenK: buildPrediction('10K', 10, reference),
    half: buildPrediction('Media', 21.097, reference),
    marathon: buildPrediction('Maratón', 42.195, reference),
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
    sourceLabel: `Basado en ${formatDistance(reference.distanceKm)}`,
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
) {
  const ratio =
    Math.max(sourceDistanceKm, targetDistanceKm) /
    Math.min(sourceDistanceKm, targetDistanceKm)

  if (ratio <= 1.25) return 92
  if (ratio <= 1.75) return 84
  if (ratio <= 2.5) return 72
  if (ratio <= 4) return 58

  return 42
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
  if (Math.abs(distanceKm - 21.097) < 0.5) return 'media maratón'
  if (distanceKm >= 20) return `${distanceKm.toFixed(1)} km`

  return `${distanceKm.toFixed(1)} km`
}