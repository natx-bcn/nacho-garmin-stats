import { evaluateCoach } from './coach'

export function evaluateAthena(data: Parameters<typeof evaluateCoach>[0]) {
  const coach = evaluateCoach(data)

  return {
    coach,
  }
}