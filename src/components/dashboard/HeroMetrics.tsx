import type { ReactNode } from 'react'
import { Gauge, ShieldCheck, TrendingUp, Route } from 'lucide-react'

interface HeroMetricsProps {
  ctl: number
  atl: number
  weekTss: number
  weekDistance: number
  weekCount: number
}

export default function HeroMetrics({
  ctl,
  atl,
  weekTss,
  weekDistance,
  weekCount,
}: HeroMetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <HeroMetric title="Fitness" value={Math.round(ctl)} subtitle="CTL · 42 días" icon={<Gauge />} />
      <HeroMetric title="Fatiga" value={Math.round(atl)} subtitle="ATL · 7 días" icon={<ShieldCheck />} />
      <HeroMetric title="Load" value={Math.round(weekTss)} subtitle="TSS esta semana" icon={<TrendingUp />} />
      <HeroMetric title="Weekly" value={`${weekDistance.toFixed(1)} km`} subtitle={`${weekCount} actividades`} icon={<Route />} />
    </div>
  )
}

function HeroMetric({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string
  value: string | number
  subtitle: string
  icon: ReactNode
}) {
  return (
    <div className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-white/10">
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-400">{title}</p>
        <h3 className="mt-1 text-4xl font-black text-white">{value}</h3>
        <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
      </div>

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300 transition group-hover:bg-cyan-400/25">
        <div className="h-7 w-7">{icon}</div>
      </div>
    </div>
  )
}