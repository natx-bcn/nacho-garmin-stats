import {
  Activity,
  Brain,
  HeartPulse,
  Mountain,
  TrendingUp,
} from 'lucide-react'

interface QuickStatusRowProps {
  ctl: number
  atl: number
  tsb: number
  vo2Max?: number
  readiness: number
}

export default function QuickStatusRow({
  ctl,
  atl,
  tsb,
  vo2Max,
  readiness,
}: QuickStatusRowProps) {
  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      <Status
        icon={<Brain size={18} />}
        label="Readiness"
        value={readiness.toFixed(0)}
        color="text-cyan-300"
      />

      <Status
        icon={<TrendingUp size={18} />}
        label="Fitness"
        value={ctl.toFixed(0)}
        color="text-blue-300"
      />

      <Status
        icon={<HeartPulse size={18} />}
        label="Fatiga"
        value={atl.toFixed(0)}
        color="text-orange-300"
      />

      <Status
        icon={<Mountain size={18} />}
        label="Forma"
        value={`${tsb > 0 ? '+' : ''}${tsb.toFixed(0)}`}
        color={
          tsb > 5
            ? 'text-green-300'
            : tsb > -10
              ? 'text-cyan-300'
              : 'text-orange-300'
        }
      />

      <Status
        icon={<Activity size={18} />}
        label="VO₂max"
        value={vo2Max?.toFixed(1) ?? '--'}
        color="text-purple-300"
      />
    </section>
  )
}

function Status({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
}) {
  return (
    <div className="group rounded-2xl border border-slate-700/40 bg-slate-900/55 px-4 py-3 transition-all hover:border-cyan-400/30 hover:bg-slate-900">
      <div className="mb-2 flex items-center justify-between">
        <div className={color}>{icon}</div>

        <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
          {label}
        </div>
      </div>

      <div className={`text-3xl font-black ${color}`}>
        {value}
      </div>
    </div>
  )
}