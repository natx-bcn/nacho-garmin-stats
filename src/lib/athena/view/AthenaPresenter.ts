import type { AthenaReport } from '../models/AthenaReport'
import type { AthenaViewModel } from './AthenaViewModel'

import { buildRecommendation } from './builders/recommendationBuilder'
import { buildReadiness } from './builders/readinessBuilder'

function buildHeroMessage(report: AthenaReport): string {
  const recommendation = report.coach.recommendation

  if (recommendation.includes('tempo')) {
    return 'Hoy es un buen día para trabajar calidad.'
  }

  if (recommendation.includes('recovery') || recommendation.includes('easy')) {
    return 'Hoy priorizaría recuperar bien.'
  }

  if (recommendation.includes('rest')) {
    return 'Hoy descansaría para asimilar la carga.'
  }

  return 'Hoy elegiría una sesión controlada.'
}

function buildRecommendationDescription(report: AthenaReport): string {
  const recommendation = report.coach.recommendation

  if (recommendation.includes('tempo')) {
    return 'Trabaja el umbral sin generar una fatiga excesiva.'
  }

  if (recommendation.includes('recovery') || recommendation.includes('easy')) {
    return 'Suma minutos fáciles y deja que el cuerpo recupere.'
  }

  if (recommendation.includes('rest')) {
    return 'No necesitas añadir carga hoy. Recuperar también es entrenar.'
  }

  return report.coach.reason
}

function buildReasons(report: AthenaReport): string[] {
  const { recovery, risk, trend } = report.analysis

  return [
    recovery.score >= 60
      ? 'Has recuperado bien.'
      : 'La recuperación todavía necesita margen.',

    trend.label
      ? `La tendencia actual es ${trend.label.toLowerCase()}.`
      : 'La tendencia todavía no muestra una señal clara.',

    risk.score < 50
      ? 'El riesgo actual está controlado.'
      : 'El riesgo merece algo de prudencia.',
  ]
}

function buildTomorrow(report: AthenaReport): string {
  return (
    report.predictions[0] ??
    'Si completas esta sesión, mañana probablemente tocará bajar la carga y consolidar el trabajo.'
  )
}

export function presentAthena(
  report: AthenaReport,
): AthenaViewModel {
  const readiness = buildReadiness(report.analysis.readiness.score)

  return {
    hero: {
      title: 'Athena',
      message: buildHeroMessage(report),
      status: report.coach.status,
    },

    recommendation: {
      title: buildRecommendation(report.coach.recommendation),
      description: buildRecommendationDescription(report),
      confidence: report.coach.confidence,
    },

    readiness,

    metrics: {
      recovery: report.analysis.recovery.score,
      fitness: report.scores.fitness,
      consistency: report.scores.consistency,
    },

    reasons: buildReasons(report),

    insight: report.insights[0]?.title ?? report.coach.reason,

    tomorrow: buildTomorrow(report),
  }
}