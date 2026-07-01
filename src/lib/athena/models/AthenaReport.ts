import type { AthenaAnalysis } from './AthenaAnalysis'
import type { AthenaScores } from './AthenaScores'
import type { AthenaStatus } from './AthenaStatus'
import type { AthenaCoach } from './AthenaCoach'
import type { AthenaInsight } from './AthenaInsight'
import type { AthenaDailyBrief } from './AthenaDailyBrief'

export interface AthenaReport {
  status: AthenaStatus

  scores: AthenaScores

  analysis: AthenaAnalysis

  coach: AthenaCoach

  insights: AthenaInsight[]

  predictions: string[]

  brief: AthenaDailyBrief
  
}