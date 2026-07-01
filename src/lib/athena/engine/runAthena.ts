import { analyzeReadiness, analyzeTrainingState } from '../analyzer'
import { evaluateAthenaCoach } from '../coach'
import { analyzeAthenaInsights } from '../insights'

import type { AthenaContext, AthenaReport } from '../models'
import { generateDailyBrief } from '../brief'
import { evaluateRecovery } from '../analysis/recovery'
import { evaluateFatigue } from '../analysis/fatigue'

export function runAthena(context: AthenaContext): AthenaReport {
  const readiness = analyzeReadiness(context)
  const recovery = evaluateRecovery(context)
  const fatigue = evaluateFatigue(context)
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
        trend: {
            direction: 'stable',
            label: 'Tendencia estable',
            reason: 'Athena calculará la tendencia avanzada en una fase posterior.',
        },
        risk: {
            level: context.tsb < -15 ? 'high' : context.tsb < -5 ? 'moderate' : 'low',
            score: context.tsb < -15 ? 80 : context.tsb < -5 ? 50 : 20,
            reason:
            context.tsb < -15
                ? 'La forma está muy negativa y aumenta el riesgo de fatiga acumulada.'
                : context.tsb < -5
                ? 'Hay cierta carga acumulada, pero todavía parece manejable.'
                : 'La carga actual parece bien tolerada.',
        },
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