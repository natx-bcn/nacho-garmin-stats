import type { AthenaReport } from '../models/AthenaReport'
import type { AthenaViewModel } from './AthenaViewModel'

import { buildRecommendation } from './builders/recommendationBuilder'
import { buildReadiness } from './builders/readinessBuilder'


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

function buildHeroReasons(report: AthenaReport): string[] {
  const { recovery, risk, trend, readiness } = report.analysis

  const reasons: string[] = []

  if (recovery.score >= 60) {
    reasons.push('Has recuperado bien la carga reciente.')
  } else {
    reasons.push('La recuperación aún no es óptima, pero está controlada.')
  }

  if (risk.score < 50) {
    reasons.push('El riesgo actual es bajo.')
  } else {
    reasons.push('El riesgo requiere prudencia.')
  }

  if (trend.label.toLowerCase().includes('descend')) {
    if (readiness.score >= 75) {
      reasons.push('Aunque la tendencia baja, la recuperación compensa.')
    } else {
      reasons.push('La tendencia reciente aconseja controlar la intensidad.')
    }
  } else {
    reasons.push('La tendencia permite seguir progresando.')
  }

  return reasons
}

export function presentAthena(
  report: AthenaReport,
): AthenaViewModel {
  const readiness = buildReadiness(report.analysis.readiness.score)

  return {
   hero: {
    title: 'Athena Score',

    score: readiness.score,

    label:
        readiness.score >= 90
        ? 'Excelente para entrenar'
        : readiness.score >= 75
            ? 'Muy buen momento'
            : readiness.score >= 60
            ? 'Buen estado'
            : readiness.score >= 40
                ? 'Entrena con control'
                : 'Prioriza la recuperación',

    subtitle:
        readiness.score >= 90
        ? 'Tienes una ventana muy favorable para entrenar.'
        : readiness.score >= 75
            ? 'Hoy puedes aprovechar una sesión productiva.'
            : readiness.score >= 60
            ? 'Buen día para seguir sumando.'
            : readiness.score >= 40
                ? 'Mejor controla la intensidad.'
                : 'Recuperar hoy te hará mejorar mañana.',

    summary: 'Mi recomendación para hoy',

    reasons: buildHeroReasons(report),

    status: report.coach.status,
    },

    recommendation: {
        title: 'Hoy haría…',
        description: buildRecommendation(report.coach.recommendation),
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