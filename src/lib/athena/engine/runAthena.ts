import { analyzeReadiness, analyzeTrainingState } from '../analyzer'
import { evaluateAthenaCoach } from '../coach'
import { analyzeAthenaInsights } from '../insights'

import type { AthenaContext, AthenaReport } from '../models'
import { generateDailyBrief } from '../brief'

export function runAthena(context: AthenaContext): AthenaReport {
  const readiness = analyzeReadiness(context)
  const trainingState = analyzeTrainingState(context)

 const coach = evaluateAthenaCoach(context, readiness)
 const insights = analyzeAthenaInsights(context)

 const brief = generateDailyBrief(
  readiness,
  coach,
  insights,
)

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

    insights,

    predictions: [],

    brief,
    
  }
}