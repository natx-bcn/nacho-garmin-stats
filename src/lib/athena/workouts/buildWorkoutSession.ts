import type { WorkoutDecision, WorkoutStep } from '../models/WorkoutDecision'

export function buildWorkoutSession(
  decision: Omit<WorkoutDecision, 'session'>
): WorkoutDecision['session'] {
  switch (decision.type) {
    case 'rest':
      return restSession()

    case 'recovery':
      return recoverySession()

    case 'easy':
      return easySession(decision.duration)

    case 'tempo':
      return tempoSession(decision.duration)

    case 'intervals':
      return intervalsSession(decision.duration)

    case 'long_run':
      return longRunSession(decision.duration)

    case 'strength':
      return strengthSession()
  }
}

function restSession(): WorkoutDecision['session'] {
  return {
    warmup: step('Inicio', 'Descanso total o paseo muy suave'),
    main: [step('Recuperación', 'Prioriza sueño, hidratación y movilidad ligera')],
    cooldown: step('Cierre', 'Sin carga adicional hoy'),
  }
}

function recoverySession(): WorkoutDecision['session'] {
  return {
    warmup: step('Calentamiento', '5 min movilidad suave'),
    main: [step('Bloque principal', '20-25 min muy cómodo en Z1')],
    cooldown: step('Vuelta a la calma', '5 min caminar o estirar suave'),
  }
}

function easySession(duration: number): WorkoutDecision['session'] {
  const mainDuration = Math.max(20, duration - 15)

  return {
    warmup: step('Inicio', '10 min suave'),
    main: [step('Bloque principal', `${mainDuration} min Z2 cómodo`)],
    cooldown: step('Cierre', '5 min muy suave'),
  }
}

function tempoSession(duration: number): WorkoutDecision['session'] {
  const blocks = duration >= 50 ? '3 × 10 min Z3' : '3 × 8 min Z3'

  return {
    warmup: step('Calentamiento', '15 min Z1-Z2 + 3 progresivos suaves'),
    main: [step('Bloque principal', `${blocks} con 2 min suaves`)],
    cooldown: step('Vuelta a la calma', '10 min Z1'),
  }
}

function intervalsSession(duration: number): WorkoutDecision['session'] {
  const blocks = duration >= 50 ? '8 × 2 min Z4' : '6 × 2 min Z4'

  return {
    warmup: step('Calentamiento', '15 min Z1-Z2 + técnica suave'),
    main: [step('Bloque principal', `${blocks} con 2 min suaves`)],
    cooldown: step('Vuelta a la calma', '10 min Z1'),
  }
}

function longRunSession(duration: number): WorkoutDecision['session'] {
  const mainDuration = Math.max(45, duration - 15)

  return {
    warmup: step('Calentamiento', '10 min muy cómodo'),
    main: [step('Bloque principal', `${mainDuration} min Z2 estable, sin apretar`)],
    cooldown: step('Vuelta a la calma', '5 min suave'),
  }
}

function strengthSession(): WorkoutDecision['session'] {
  return {
    warmup: step('Activación', '8-10 min movilidad + core suave'),
    main: [
      step('Fuerza preventiva', 'Glúteo, sóleo, gemelo, core y estabilidad'),
      step('Control', 'Sin llegar al fallo y priorizando técnica'),
    ],
    cooldown: step('Cierre', 'Movilidad suave de cadera, tobillo y gemelo'),
  }
}

function step(label: string, detail: string): WorkoutStep {
  return { label, detail }
}