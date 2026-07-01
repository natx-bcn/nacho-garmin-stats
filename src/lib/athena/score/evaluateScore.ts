import type {
  AthenaFatigue,
  AthenaRecovery,
  AthenaRisk,
  AthenaTrend,
} from '../models'
import { DEFAULT_SCORE_WEIGHTS } from '../config'

export interface AthenaScore {
  overall: number

  confidence: number

  recovery: number

  fatigue: number

  risk: number

  trend: number
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)))
}

export function evaluateScore(
  recovery: AthenaRecovery,
  fatigue: AthenaFatigue,
  risk: AthenaRisk,
  trend: AthenaTrend,
): AthenaScore {
  let score = 0

  const w = DEFAULT_SCORE_WEIGHTS

  score += recovery.score * w.recovery
  score += (100 - fatigue.score) * w.fatigue
  score += (100 - risk.score) * w.risk

  let trendScore = 0

  switch (trend.direction) {
    case 'up':
      trendScore = 100
      break

    case 'stable':
      trendScore = 50
      break

    case 'down':
      trendScore = 0
      break
  }

  score += trendScore * w.trend

  score = clamp(score)

    const recoveryScore = recovery.score

    const fatigueScore = 100 - fatigue.score

    const riskScore = 100 - risk.score

    const trendScoreNormalized =
    trend.direction === 'up'
        ? 100
        : trend.direction === 'stable'
        ? 50
        : 0

  return {
    overall: score,

    confidence: clamp(
        (recoveryScore +
        fatigueScore +
        riskScore +
        trendScoreNormalized) /
        4,
    ),

    recovery: recoveryScore,

    fatigue: fatigueScore,

    risk: riskScore,

    trend: trendScoreNormalized,
    }
}