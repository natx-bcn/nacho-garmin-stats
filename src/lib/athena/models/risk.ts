export interface AthenaRisk {
  level: 'low' | 'moderate' | 'high'
  score: number
  reason: string
}