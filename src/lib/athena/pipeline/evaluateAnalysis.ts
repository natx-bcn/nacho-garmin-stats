import type {
  AthenaAnalysis,
  AthenaContext,
} from '../models'

import { evaluateRecovery } from '../analysis/recovery'
import { evaluateFatigue } from '../analysis/fatigue'

export function evaluateAnalysis(
  context: AthenaContext,
): Pick<AthenaAnalysis, 'recovery' | 'fatigue'> {
  const recovery = evaluateRecovery(context)
  const fatigue = evaluateFatigue(context)

  return {
    recovery,
    fatigue,
  }
}   