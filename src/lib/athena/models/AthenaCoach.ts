export interface AthenaCoach {
  recommendation: string
  status: string
  reason: string
  confidence: number
  color: 'blue' | 'green' | 'yellow' | 'red'
}