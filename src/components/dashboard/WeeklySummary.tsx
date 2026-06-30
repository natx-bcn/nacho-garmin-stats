import type { ReactNode } from 'react'
import { CalendarDays, Clock3, Flame, Route, TrendingUp } from 'lucide-react'
import { formatDuration } from '../../utils/formatters'

interface WeeklySummaryProps {
  week: {
    distance: number
    duration: number
    count: number
    calories?: number
  }
  lastWeek: {
    distance: number
  }
}

export default function WeeklySummary({ week, lastWeek }: WeeklySummaryProps) {
  const diff =
    lastWeek.distance > 0
      ? Math.round(((week.distance - lastWeek.distance) / lastWeek.distance) * 100)
      : 0

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
      <div className="mb-5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
        Resumen de la semana
      </div>

      <div className="grid gap-5 md:grid-cols-5">
        <WeekStat icon={<Route />} value={`${week.distance.toFixed(1)} km`} label="Distancia" />
        <WeekStat icon={<Clock3 />} value={formatDuration(week.duration)} label="Tiempo total" />
        <WeekStat icon={<CalendarDays />} value={week.count} label="Actividades" />
        <WeekStat icon={<Flame />} value={`${Math.round(week.calories ?? 0)} kcal`} label="Calorías" />
        <WeekStat icon={<TrendingUp />} value={`${diff}%`} label="vs semana anterior" highlight={diff >= 0 ? 'positive' : 'negative'} />
      </div>
    </div>
  )
}

function WeekStat({
  icon,
  value,
  label,
  highlight,
}: {
  icon: ReactNode
  value: string | number
  label: string
  highlight?: 'positive' | 'negative'
}) {
  const color =
    highlight === 'positive'
      ? 'text-emerald-300'
      : highlight === 'negative'
        ? 'text-orange-300'
        : 'text-cyan-300'

  return (
    <div className="flex items-center gap-4 border-white/10 md:border-r md:last:border-r-0">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 ${color}`}>
        <div className="h-6 w-6">{icon}</div>
      </div>

      <div>
        <div className="text-2xl font-black text-white">{value}</div>
        <div className="text-sm text-slate-400">{label}</div>
      </div>
    </div>
  )
}