export interface AthenaInsight {
  id: string
  severity: 'positive' | 'neutral' | 'warning'
  title: string
  description: string
  priority: number
}