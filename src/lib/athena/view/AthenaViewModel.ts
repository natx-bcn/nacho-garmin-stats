export interface AthenaViewModel {
  hero: {
    title: string
    message: string
    status: string
  }

  recommendation: {
    title: string
    description: string
    confidence: number
  }

  readiness: {
    score: number
    label: string
  }

  metrics: {
    recovery: number
    fitness: number
    consistency: number
  }

  reasons: string[]

  insight: string

  tomorrow: string
}