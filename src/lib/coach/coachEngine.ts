import type { CoachInput, CoachResult } from './coachTypes'

export function evaluateCoach(input: CoachInput): CoachResult {
  const { tsb } = input

  if (tsb >= 15) {
    return {
      status: 'Peak',
      recommendation: 'Intervals',
      reason:
        'Tu nivel de forma es excelente y la fatiga es baja. Es un buen momento para entrenamientos de alta intensidad.',
      confidence: 95,
      color: 'green',
    }
  }

  if (tsb >= 5) {
    return {
      status: 'Productive',
      recommendation: 'Tempo',
      reason:
        'La carga de entrenamiento está equilibrada. Puedes realizar una sesión de calidad.',
      confidence: 92,
      color: 'green',
    }
  }

  if (tsb >= -10) {
    return {
      status: 'Maintaining',
      recommendation: 'Easy Run',
      reason:
        'Mantienes un buen equilibrio entre forma y fatiga. Un rodaje suave ayudará a consolidar el entrenamiento.',
      confidence: 88,
      color: 'blue',
    }
  }

  if (tsb >= -20) {
    return {
      status: 'Recovery',
      recommendation: 'Recovery Run',
      reason:
        'La fatiga empieza a ser elevada. Conviene reducir la intensidad para favorecer la recuperación.',
      confidence: 90,
      color: 'yellow',
    }
  }

  return {
    status: 'Overreaching',
    recommendation: 'Rest',
    reason:
      'La carga acumulada es muy alta. Descansar hoy ayudará a evitar un exceso de fatiga.',
    confidence: 97,
    color: 'red',
  }
}