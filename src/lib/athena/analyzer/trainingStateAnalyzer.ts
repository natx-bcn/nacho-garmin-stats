import type { AthenaContext } from '../models'
import type { TrainingState } from '../types'

export interface TrainingStateAnalysis {
  state: TrainingState
  confidence: number
  reason: string
}

export function analyzeTrainingState(
  _context: AthenaContext,
): TrainingStateAnalysis {
  return {
    state: 'Building',
    confidence: 100,
    reason: 'Initial Athena implementation.',
  }
}