import { runAthena } from './engine'
import type { AthenaContext } from './models'

export function evaluateAthena(context: AthenaContext) {
  return runAthena(context)
}