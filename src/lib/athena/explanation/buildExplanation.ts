import type { AthenaScore } from '../score/evaluateScore'

export interface AthenaExplanation {
  title: string
  summary: string
  reasons: string[]
}

export function buildExplanation(
  score: AthenaScore,
): AthenaExplanation {
  const reasons: string[] = []

  if (score.recovery >= 80) {
    reasons.push(
      `Recuperación excelente (${score.recovery}/100).`,
    )
  } else if (score.recovery < 50) {
    reasons.push(
      `Recuperación insuficiente (${score.recovery}/100).`,
    )
  }

  if (score.fatigue >= 70) {
    reasons.push(
      `Fatiga bien controlada (${score.fatigue}/100).`,
    )
  } else {
    reasons.push(
      `Existe fatiga acumulada (${score.fatigue}/100).`,
    )
  }

  if (score.risk >= 70) {
    reasons.push(
      `El riesgo actual es bajo (${score.risk}/100).`,
    )
  } else {
    reasons.push(
      `Conviene vigilar el riesgo (${score.risk}/100).`,
    )
  }

  switch (score.trend) {
    case 100:
      reasons.push('La tendencia es claramente positiva.')
      break

    case 50:
      reasons.push('La tendencia es estable.')
      break

    default:
      reasons.push('La tendencia reciente es negativa.')
  }

  return {
    title: 'Athena Decision',

    summary: `Confianza ${score.confidence}% · Score global ${score.overall}/100`,

    reasons,
  }
}