import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'
import { ShieldCheck, Sparkles, Zap } from 'lucide-react'

import Logo from './Logo'
import HeroMetrics from './HeroMetrics'
import WeeklySummary from './WeeklySummary'
import QuickActions from './QuickActions'
import FormBadge from '../FormBadge'

interface HeroSectionProps {
  week: {
    distance: number
    duration: number
    count: number
    calories?: number
    tss: number
  }
  lastWeek: {
    distance: number
  }
  ctl: number
  atl: number
  tsb: number
  vo2max: string | null
  lastSync: string
  sparkPoints: Array<Record<string, unknown>>
}

export default function HeroSection({
  week,
  lastWeek,
  ctl,
  atl,
  tsb,
  vo2max,
  lastSync,
  sparkPoints,
}: HeroSectionProps) {
  const tsbColor =
    tsb > 10
      ? '#22c55e'
      : tsb > -5
        ? '#3b82f6'
        : tsb > -15
          ? '#eab308'
          : tsb > -25
            ? '#f97316'
            : '#ef4444'

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#081321] p-5 shadow-2xl sm:p-7 lg:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.24),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_32%),linear-gradient(135deg,rgba(15,23,42,0.2),rgba(15,23,42,0.85))]" />

      <div className="absolute inset-x-0 bottom-0 h-36 opacity-25">
        <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-cyan-500/10 to-transparent" />
        <svg
          viewBox="0 0 1200 240"
          className="absolute bottom-0 h-full w-full text-slate-700/40"
          preserveAspectRatio="none"
        >
          <path
            d="M0 220L120 140L220 185L360 70L520 170L680 95L830 155L980 55L1200 170V240H0Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <Logo />

          <div className="flex flex-col gap-3 md:items-end">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              v5.4.1
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                Synced
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                Sync: {lastSync}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-7 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-200">
              <Zap className="h-3.5 w-3.5" />
              Dashboard PRO
            </p>

            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
              Buenos días, Nacho 👋
            </h2>

            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
              Has entrenado {week.count} días esta semana. Mantén el equilibrio entre carga,
              recuperación y constancia.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-500">
                  Estado de forma
                </div>

                <div className="mt-1 flex items-center gap-3">
                  <span
                    className="text-4xl font-black"
                    style={{
                      color: tsbColor,
                      textShadow: `0 0 30px ${tsbColor}66`,
                    }}
                  >
                    {tsb > 0 ? '+' : ''}
                    {Math.round(tsb)}
                  </span>

                  <FormBadge tsb={tsb} />
                </div>
              </div>

              {vo2max && (
                <div className="text-right">
                  <div className="text-xs uppercase tracking-wider text-slate-500">
                    VO₂max
                  </div>
                  <div className="text-3xl font-black text-purple-400">{vo2max}</div>
                  <div className="text-xs text-slate-500">ml/kg/min</div>
                </div>
              )}
            </div>

            <div className="h-20">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkPoints} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="heroCTL" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="heroATL" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" hide />
                  <Tooltip
                    contentStyle={{
                      background: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: 8,
                      fontSize: 11,
                    }}
                    formatter={(v: unknown, n: unknown) => [String(v), String(n)]}
                  />
                  <Area
                    type="monotone"
                    dataKey="ctl"
                    name="Fitness"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#heroCTL)"
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="atl"
                    name="Fatiga"
                    stroke="#f97316"
                    strokeWidth={1.5}
                    fill="url(#heroATL)"
                    dot={false}
                    strokeDasharray="3 2"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 flex flex-wrap gap-4">
              <LegendDot color="#3b82f6" label="Fitness" />
              <LegendDot color="#f97316" label="Fatiga" />
            </div>
          </div>
        </div>

        <div className="mb-7">
          <HeroMetrics
            ctl={ctl}
            atl={atl}
            weekTss={week.tss}
            weekDistance={week.distance}
            weekCount={week.count}
          />
        </div>

        <div className="mb-7">
          <WeeklySummary week={week} lastWeek={lastWeek} />
        </div>

        <QuickActions />
      </div>
    </section>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-slate-500">
      <span className="inline-block h-0.5 w-3 rounded" style={{ background: color }} />
      {label}
    </span>
  )
}