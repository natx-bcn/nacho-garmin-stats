import type { AthenaContext, AthenaSignalStatus } from './AthenaContext'

type BuildAthenaDecisionContextInput = {
  readinessScore: number
  ctl: number
  atl: number
}

export function buildAthenaDecisionContext({
  readinessScore,
  ctl,
  atl,
}: BuildAthenaDecisionContextInput): AthenaContext {
  const loadBalance = atl - ctl
  const fatigueScore = clamp(loadBalance + 50)

  const riskScore =
    readinessScore < 45 ? 75 : readinessScore < 60 ? 55 : 30

  const trendScore = ctl >= atl ? 10 : -10

  return {
    readiness: {
      score: clamp(readinessScore),
      status: getPositiveStatus(readinessScore),
    },
    fatigue: {
      score: fatigueScore,
      status: getNegativeStatus(fatigueScore),
    },
    risk: {
      score: riskScore,
      status: getNegativeStatus(riskScore),
    },
    trend: {
      score: trendScore,
      status: trendScore >= 0 ? 'good' : 'warning',
    },
    load: {
      ctl,
      atl,
      balance: loadBalance,
      status:
        loadBalance > 25
          ? 'bad'
          : loadBalance > 15
            ? 'warning'
            : 'good',
    },
  }
}

function clamp(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)))
}

function getPositiveStatus(score: number): AthenaSignalStatus {
  if (score >= 85) return 'excellent'
  if (score >= 65) return 'good'
  if (score >= 45) return 'warning'
  return 'bad'
}

function getNegativeStatus(score: number): AthenaSignalStatus {
  if (score >= 80) return 'bad'
  if (score >= 60) return 'warning'
  if (score >= 35) return 'good'
  return 'excellent'
}