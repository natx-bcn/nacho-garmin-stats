import { evaluateCoach } from './coach'
import type { AthenaContext } from './models'

export function evaluateAthena(context: AthenaContext) {
  const coach = evaluateCoach(context)

  return {
    coach,
  }
}