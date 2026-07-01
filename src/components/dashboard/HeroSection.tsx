import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'
import { Activity, ShieldCheck, Sparkles, Zap } from 'lucide-react'

import Logo from './Logo'
import FormBadge from '../FormBadge'
import type { AthenaReport } from '../../lib/athena/models'

interface HeroSectionProps {
  athena: AthenaReport
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
  athena,
  week,
  ctl,
  atl,
  tsb,
  vo2max,
  lastSync,
  sparkPoints,
}: HeroSectionProps) {
  const readiness = athena.status.readiness
  const trainingState = athena.status.trainingState

  const tsbColor =
    tsb > 10
      ? '#22c55e'
      : tsb > -5
        ? '#38bdf8'
        : tsb > -15
          ? '#eab308'
          : tsb > -25
            ? '#f97316'
            : '#ef4444'

  return (
    <section className="relative overflow-hidden rounded-[2.25rem] border border-cyan-300/20 bg-slate-950 p-6 shadow-2xl shadow-cyan-950/20 sm:p-8 lg:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.28),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.22),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.2),rgba(2,6,23,0.95))]" />

      <div className="absolute inset-x-0 bottom-0 h-56 opacity-40">
        <svg
          viewBox="0 0 1200 280"
          className="absolute bottom-0 h-full w-full text-cyan-950"
          preserveAspectRatio="none"
        >
          <path
            d="M0 245L110 150L210 195L355 85L520 178L675 108L830 162L990 62L1200 178V280H0Z"
            fill="currentColor"
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <Logo />

          <div className="flex flex-col gap-3 md:items-end">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              V6 Athena Home
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                Synced
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                Sync: {lastSync}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
              <Zap className="h-3.5 w-3.5 text-cyan-300" />
              Athena · {readiness.level} · {readiness.score}/100
            </p>

            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
              Buenos días, Nacho 👋
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-xl">
              {readiness.reason}{' '}
              <span className="font-semibold text-cyan-200">
                Estado actual: {trainingState.state}.
              </span>
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Semana
                </div>
                <div className="mt-1 text-3xl font-black text-white">
                  {week.distance.toFixed(1)}
                  <span className="ml-1 text-sm text-slate-400">km</span>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Sesiones
                </div>
                <div className="mt-1 text-3xl font-black text-white">
                  {week.count}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  TSS
                </div>
                <div className="mt-1 text-3xl font-black text-white">
                  {week.tss.toFixed(0)}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Estado de forma
                </div>

                <div className="mt-2 flex items-center gap-3">
                  <span
                    className="text-5xl font-black"
                    style={{
                      color: tsbColor,
                      textShadow: `0 0 34px ${tsbColor}66`,
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
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    VO₂max
                  </div>
                  <div className="mt-2 text-4xl font-black text-purple-300">
                    {vo2max}
                  </div>
                  <div className="text-xs text-slate-500">ml/kg/min</div>
                </div>
              )}
            </div>

            <div className="h-28">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={sparkPoints}
                  margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                  <defs>
                    <linearGradient id="heroCtlV6" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="heroAtlV6" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fb923c" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <XAxis dataKey="date" hide />

                  <Tooltip
                    contentStyle={{
                      background: '#020617',
                      border: '1px solid rgba(148,163,184,.25)',
                      borderRadius: 14,
                      fontSize: 11,
                    }}
                    formatter={(v: unknown, n: unknown) => [String(v), String(n)]}
                  />

                  <Area
                    type="monotone"
                    dataKey="ctl"
                    name="Fitness"
                    stroke="#38bdf8"
                    strokeWidth={2.5}
                    fill="url(#heroCtlV6)"
                    dot={false}
                  />

                  <Area
                    type="monotone"
                    dataKey="atl"
                    name="Fatiga"
                    stroke="#fb923c"
                    strokeWidth={1.8}
                    fill="url(#heroAtlV6)"
                    dot={false}
                    strokeDasharray="4 3"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <MiniMetric label="Fitness" value={ctl.toFixed(0)} />
              <MiniMetric label="Fatiga" value={atl.toFixed(0)} />
              <MiniMetric label="Forma" value={tsb > 0 ? `+${tsb.toFixed(0)}` : tsb.toFixed(0)} />
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-xs text-slate-500">
          <Activity size={14} className="text-cyan-300" />
          Athena First · los datos importantes, antes del ruido.
        </div>
      </div>
    </section>
  )
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/35 px-3 py-3">
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-lg font-black text-slate-100">{value}</div>
    </div>
  )
}