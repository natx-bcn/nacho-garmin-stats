import {
  Activity,
  Battery,
  Gauge,
  HeartPulse,
  TrendingUp,
} from 'lucide-react'

import MetricChip from '../ui/MetricChip'
import Panel from '../ui/Panel'

interface QuickStatusRowProps {
  ctl: number
  atl: number
  tsb: number
  vo2Max?: number
  readiness?: number
}

function getFormTone(tsb: number) {
  if (tsb >= 0) return 'good'
  if (tsb > -10) return 'warning'
  return 'danger'
}

function getReadinessTone(readiness: number) {
  if (readiness >= 80) return 'good'
  if (readiness >= 55) return 'warning'
  return 'danger'
}

export default function QuickStatusRow({
  ctl,
  atl,
  tsb,
  vo2Max,
  readiness = 0,
}: QuickStatusRowProps) {
  return (
    <Panel variant="subtle" className="p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <MetricChip
          label="Fitness"
          value={ctl.toFixed(0)}
          icon={<TrendingUp size={18} />}
          tone="info"
        />

        <MetricChip
          label="Fatiga"
          value={atl.toFixed(0)}
          icon={<Activity size={18} />}
          tone="warning"
        />

        <MetricChip
          label="Forma"
          value={tsb > 0 ? `+${tsb.toFixed(0)}` : tsb.toFixed(0)}
          icon={<Gauge size={18} />}
          tone={getFormTone(tsb)}
        />

        <MetricChip
          label="VO2 Max"
          value={vo2Max ?? '—'}
          icon={<HeartPulse size={18} />}
          tone="default"
        />

        <MetricChip
          label="Readiness"
          value={readiness || '—'}
          icon={<Battery size={18} />}
          tone={readiness ? getReadinessTone(readiness) : 'default'}
        />
      </div>
    </Panel>
  )
}