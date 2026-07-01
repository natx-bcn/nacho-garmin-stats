import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'
import { RefreshCw, ShieldCheck, Sparkles } from 'lucide-react'

import heroBg from '../../assets/athena-hero.jpg'
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
  ctl,
  atl,
  tsb,
  vo2max,
  lastSync,
  sparkPoints,
}: HeroSectionProps) {
  const readiness = athena.status.readiness

  return (
    <section className="relative min-h-[330px] overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-[#081321] shadow-2xl shadow-cyan-950/20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/35" />

      <div className="relative z-10 p-6 lg:p-7">
        <div className="mb-9 flex items-start justify-between gap-6">
          <Logo />

          <div className="flex flex-col items-end gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              <Sparkles size={14} />
              V6 Athena Home
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                <ShieldCheck size={14} />
                Synced
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                Sync: {lastSync}
              </span>

              <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-white/5 text-slate-300">
                <RefreshCw size={14} />
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white xl:text-5xl">
              Buenos días, Nacho 👋
            </h1>

            <p className="mt-1.5 text-base text-slate-300">
                {new Intl.DateTimeFormat('es-ES', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                })
                    .format(new Date())
                    .replace(/^./, (char) => char.toUpperCase())}
            </p>

            <div className="mt-6">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                Athena Ready
              </p>

              <div className="mt-1.5 flex items-end gap-2">
                <span className="text-6xl font-black leading-none text-cyan-300 drop-shadow-[0_0_30px_rgba(34,211,238,0.45)]">
                  {readiness.score}
                </span>
                <span className="mb-1.5 text-2xl font-black text-slate-400">
                  /100
                </span>
              </div>

              <p className="mt-2 max-w-xl text-base text-slate-100">
                {readiness.reason}
              </p>

              <div className="mt-2.5 h-1.5 w-52 overflow-hidden rounded-full bg-slate-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-500"
                  style={{ width: `${readiness.score}%` }}
                />
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-4 backdrop-blur-xl">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                  Estado de forma
                </p>

                <div className="mt-1.5 flex items-center gap-3">
                  <span className="text-4xl font-black text-cyan-300">
                    {tsb > 0 ? '+' : ''}
                    {Math.round(tsb)}
                  </span>
                  <FormBadge tsb={tsb} />
                </div>
              </div>

              {vo2max && (
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                    VO₂max
                  </p>
                  <p className="mt-1 text-3xl font-black text-purple-300">
                    {vo2max}
                  </p>
                  <p className="text-xs text-slate-500">ml/kg/min</p>
                </div>
              )}
            </div>

            <div className="h-20">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkPoints}>
                  <defs>
                    <linearGradient id="heroFitness" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="heroFatigue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fb923c" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <XAxis dataKey="date" hide />

                  <Tooltip
                    contentStyle={{
                      background: '#020617',
                      border: '1px solid rgba(148,163,184,.25)',
                      borderRadius: 12,
                      fontSize: 11,
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="ctl"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    fill="url(#heroFitness)"
                    dot={false}
                  />

                  <Area
                    type="monotone"
                    dataKey="atl"
                    stroke="#fb923c"
                    strokeWidth={1.6}
                    strokeDasharray="4 3"
                    fill="url(#heroFatigue)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
              <Mini label="Fitness" value={ctl.toFixed(0)} />
              <Mini label="Fatiga" value={atl.toFixed(0)} />
              <Mini label="Forma" value={`${tsb > 0 ? '+' : ''}${tsb.toFixed(0)}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2.5">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-lg font-black text-white">{value}</p>
    </div>
  )
}