import type { AthenaCoach } from '../models'
import type { AthenaDecision } from './decisionTypes'

export function mapDecisionToCoach(
  decision: AthenaDecision,
): AthenaCoach {
  return {
    recommendation: decision.recommendation,
    status: decision.trainingAllowed ? 'Ready' : 'Recovery',
    reason: decision.reason,
    confidence: decision.confidence,
    color: getCoachColor(decision),
  }
}

function getCoachColor(
  decision: AthenaDecision,
): AthenaCoach['color'] {
  if (!decision.trainingAllowed) return 'red'

  switch (decision.priority) {
    case 'recover':
    case 'reduce_risk':
      return 'yellow'

    case 'build_threshold':
      return 'green'

    default:
      return 'blue'
  }
}