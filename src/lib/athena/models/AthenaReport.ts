import type { AthenaAnalysis } from './AthenaAnalysis'
import type { AthenaScores } from './AthenaScores'
import type { AthenaStatus } from './AthenaStatus'

export interface AthenaReport {
  status: AthenaStatus

  scores: AthenaScores

  analysis: AthenaAnalysis

  coach: ReturnType<typeof import('../coach').evaluateCoach>

  insights: string[]

  predictions: string[]
}