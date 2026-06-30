export type TrainingScoreInput = {
  weeklyLoad: number
  activitiesThisWeek: number
  tsb: number
}

export function calculateTrainingScore({
  weeklyLoad,
  activitiesThisWeek,
  tsb,
}: TrainingScoreInput): number {
  let score = 0

  // Carga semanal (0-40)
  score += Math.min(40, weeklyLoad / 10)

  // Frecuencia (0-30)
  score += Math.min(30, activitiesThisWeek * 6)

  // Balance de fatiga (0-30)
  if (tsb >= -10 && tsb <= 10) {
    score += 30
  } else if (tsb >= -20 && tsb < -10) {
    score += 20
  } else if (tsb > 10 && tsb <= 20) {
    score += 20
  } else {
    score += 10
  }

  return Math.round(Math.min(score, 100))
}