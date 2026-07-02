export type AthenaSignalStatus = 'bad' | 'warning' | 'good' | 'excellent'

export type AthenaContext = {
  readiness: {
    score: number
    status: AthenaSignalStatus
  }

  fatigue: {
    score: number
    status: AthenaSignalStatus
  }

  risk: {
    score: number
    status: AthenaSignalStatus
  }

  trend: {
    score: number
    status: AthenaSignalStatus
  }

  load: {
    ctl: number
    atl: number
    balance: number
    status: AthenaSignalStatus
  }
}