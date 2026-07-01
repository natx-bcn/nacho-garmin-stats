import type { AthenaStatus } from './AthenaStatus'
import type { AthenaCoach } from './AthenaCoach'
import type { AthenaDailyBrief } from './AthenaDailyBrief'
import type { AthenaInsight } from './AthenaInsight'
import type { AthenaScores } from './AthenaScores'
import type { AthenaReadiness } from './readiness'
import type { AthenaRecovery } from './recovery'
import type { AthenaFatigue } from './fatigue'
import type { AthenaFitness } from './fitness'
import type { AthenaTrend } from './trend'
import type { AthenaRisk } from './risk'
import type { AthenaPriorities } from './priorities'
import type { AthenaPrediction } from './prediction'
import type { AthenaExplanation } from '../explanation/buildExplanation'

export interface AthenaAnalysis {
  status: AthenaStatus
  readiness: AthenaReadiness
  recovery: AthenaRecovery
  fatigue: AthenaFatigue
  fitness: AthenaFitness
  trend: AthenaTrend
  risk: AthenaRisk
  coach: AthenaCoach
  priorities: AthenaPriorities
  prediction: AthenaPrediction
  brief: AthenaDailyBrief
  insights: AthenaInsight[]
  scores: AthenaScores
  explanation: AthenaExplanation
}