export interface AthenaFatigue {
  score: number

  level:
    | 'minimal'
    | 'low'
    | 'moderate'
    | 'high'

  reason: string
}