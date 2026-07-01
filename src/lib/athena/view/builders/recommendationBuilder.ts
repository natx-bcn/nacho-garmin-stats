import { TRAINING_LABELS } from '../labels/training'

export function buildRecommendation(
  recommendation: string,
): string {
  return (
    TRAINING_LABELS[recommendation] ??
    recommendation
  )
}