import type {
  AthenaCoach,
  AthenaDailyBrief,
  AthenaInsight,
} from '../models'
import type { ReadinessAnalysis } from '../analyzer'

export function generateDailyBrief(
  readiness: ReadinessAnalysis,
  coach: AthenaCoach,
  insights: AthenaInsight[],
): AthenaDailyBrief {
  return {
    headline: `Estado: ${readiness.visual.title}`,

    summary: readiness.reason,

    highlights: insights
      .slice(0, 3)
      .map((i) => i.title),

    recommendation: coach.recommendation,

    prediction:
      'Athena empezará a generar predicciones personalizadas en la siguiente versión.',
  }
}