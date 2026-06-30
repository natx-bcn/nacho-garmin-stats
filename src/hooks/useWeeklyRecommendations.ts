import { useMemo } from 'react'
import useWeeklyGoals from './useWeeklyGoals'

export type Recommendation = {
  type: 'success' | 'warning' | 'info'
  text: string
}

export default function useWeeklyRecommendations() {
  const goals = useWeeklyGoals()

  return useMemo(() => {
    const list: Recommendation[] = []

    // Running
    const remainingKm =
      goals.running.target - goals.running.current

    if (remainingKm <= 0) {
      list.push({
        type: 'success',
        text: 'Objetivo de running completado.',
      })
    } else {
      list.push({
        type: 'warning',
        text: `Te faltan ${remainingKm.toFixed(1)} km para completar el objetivo semanal.`,
      })
    }

    // Fuerza

    if (goals.strength.current >= goals.strength.target) {
      list.push({
        type: 'success',
        text: 'Objetivo de fuerza completado.',
      })
    } else {
      list.push({
        type: 'warning',
        text: `Te falta ${
          goals.strength.target - goals.strength.current
        } sesión de fuerza.`,
      })
    }

    // Padbol

    if (goals.padbol.current >= goals.padbol.target) {
      list.push({
        type: 'success',
        text: 'Objetivo de padbol conseguido.',
      })
    }

    // Calidad

    if (goals.quality.current < goals.quality.target) {
      list.push({
        type: 'info',
        text: 'Una sesión de calidad completaría la planificación.',
      })
    }

    // Z2

    if (goals.zone2.current < goals.zone2.target) {
      list.push({
        type: 'info',
        text: 'Conviene añadir más tiempo en Zona 2.',
      })
    }

    return list
  }, [goals])
}