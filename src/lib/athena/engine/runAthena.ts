import { analyzeReadiness, analyzeTrainingState } from '../analyzer'
import { analyzeAthenaInsights } from '../insights'

import { evaluateScore } from '../score'
import { buildExplanation } from '../explanation'

import type { AthenaContext, AthenaReport } from '../models'
import { generateDailyBrief } from '../brief'
import { evaluateRecovery } from '../analysis/recovery'
import { evaluateFatigue } from '../analysis/fatigue'
import { evaluateRisk } from '../analysis/risk'
import { evaluateTrend } from '../analysis/trend'
import {  evaluateDecision,  mapDecisionToCoach,} from '../decision'

export function runAthena(context: AthenaContext): AthenaReport {
  const readiness = analyzeReadiness(context)

    const recovery = evaluateRecovery(context)

    const fatigue = evaluateFatigue(context)

    const trainingState = analyzeTrainingState(context)

    const risk = evaluateRisk(recovery, fatigue)

    const trend = evaluateTrend(context)

    const decision = evaluateDecision({
    recovery,
    fatigue,
    risk,
    trend,
    })

    const score = evaluateScore(
        recovery,
        fatigue,
        risk,
        trend,
        )

    const explanation = buildExplanation(score)

    const coach = mapDecisionToCoach(decision)

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

    analysis: {
        status: {
            readiness,
            trainingState,
        },
        readiness,
        recovery,
        fatigue,
        fitness: {
            ctl: context.ctl,
            atl: context.atl,
            tsb: context.tsb,
        },
        trend,
        risk,
        coach,
        priorities: {
            primary: coach.recommendation,
            reason: coach.reason,
        },
        prediction: {
            tomorrow: 'Athena podrá predecir tu estado de mañana en una fase posterior.',
            expectedEffect: coach.reason,
        },
        brief,
        insights,
        explanation,
        scores: {
            training: Math.round(context.ctl ?? 0),
            recovery: readiness.score,
            consistency: 75,
            fitness: Math.round(context.ctl ?? 0),
        },
    },

    coach,

    insights,

    predictions: [],

    brief,

  }
}