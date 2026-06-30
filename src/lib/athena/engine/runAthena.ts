import { analyzeReadiness, analyzeTrainingState } from '../analyzer'
import { evaluateCoach } from '../coach'
import type { AthenaContext, AthenaReport } from '../models'

export function runAthena(context: AthenaContext): AthenaReport {
  const readiness = analyzeReadiness(context)
  const trainingState = analyzeTrainingState(context)

  const coach = evaluateCoach(context)

  return {
    status: {
      readiness,
      trainingState,
    },

    scores: {
      training: 0,
      recovery: 0,
      consistency: 0,
      fitness: 0,
    },

    analysis: {},

    coach,

    insights: [],

    predictions: [],
  }
}