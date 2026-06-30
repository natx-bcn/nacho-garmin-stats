import type { ReadinessAnalysis } from '../analyzer'
import type { TrainingStateAnalysis } from '../analyzer'

export interface AthenaStatus {
  readiness: ReadinessAnalysis
  trainingState: TrainingStateAnalysis
}