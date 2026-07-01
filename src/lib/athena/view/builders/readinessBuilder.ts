export interface AthenaReadiness {
  score: number
  label: string
}

export function buildReadiness(
  training: number,
): AthenaReadiness {
  if (training >= 80) {
    return {
      score: training,
      label: 'Excelente disposición',
    }
  }

  if (training >= 60) {
    return {
      score: training,
      label: 'Buen momento para entrenar',
    }
  }

  if (training >= 40) {
    return {
      score: training,
      label: 'Carga controlada',
    }
  }

  return {
    score: training,
    label: 'Conviene recuperar',
  }
}