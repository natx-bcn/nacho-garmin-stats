import { analyzeReadiness } from '../analyzer'
import { evaluateCoach } from '../coach'
import type { AthenaContext } from '../models'

export function runAthena(context: AthenaContext) {
  const readiness = analyzeReadiness(context)
  const coach = evaluateCoach(context)

  return {
    readiness,
    coach,
  }
}