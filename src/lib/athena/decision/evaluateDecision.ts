import { evaluateScore } from '../score'

import type { AthenaDecision } from './decisionTypes'
import type { AthenaDecisionInput } from './decisionTypes'

export function evaluateDecision(
  input: AthenaDecisionInput,
): AthenaDecision {
  const { recovery, fatigue, risk, trend } = input

  const score = evaluateScore(
    recovery,
    fatigue,
    risk,
    trend,
  )

  if (score.overall >= 85) {
    return {
      trainingAllowed: true,
      recommendation: 'quality_session',
      priority: 'build_threshold',
      confidence: score.confidence,
      reason: 'Estado excelente para realizar calidad.',
      expectedEffect:
        'Máxima adaptación al entrenamiento.',
    }
  }

  if (score.overall >= 70) {
    return {
      trainingAllowed: true,
      recommendation: 'tempo_run',
      priority: 'maintain',
      confidence: score.confidence,
      reason: 'Buen equilibrio entre carga y recuperación.',
      expectedEffect:
        'Consolidar la mejora aeróbica.',
    }
  }

  if (score.overall >= 55) {
    return {
      trainingAllowed: true,
      recommendation: 'easy_run',
      priority: 'maintain',
      confidence: score.confidence,
      reason: 'Carga controlada.',
      expectedEffect:
        'Mantener consistencia.',
    }
  }

  if (score.overall >= 40) {
    return {
      trainingAllowed: true,
      recommendation: 'recovery_run',
      priority: 'reduce_risk',
      confidence: score.confidence,
      reason: 'Fatiga moderada.',
      expectedEffect:
        'Favorecer la recuperación activa.',
    }
  }

  return {
    trainingAllowed: false,
    recommendation: 'rest',
    priority: 'recover',
    confidence: score.confidence,
    reason: 'Riesgo elevado y recuperación insuficiente.',
    expectedEffect:
      'Reducir la fatiga acumulada.',
  }
}