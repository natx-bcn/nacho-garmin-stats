import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'

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

function formatHeroDate(): string {
  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
    .format(new Date())
    .replace(/^./, (char) => char.toUpperCase())
}

function FormBadge({ tsb }: { tsb: number }) {
  if (tsb > 8) {
    return (
      <span className="rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-xs font-bold text-green-300">
        Fresco
      </span>
    )
  }

  if (tsb < -12) {
    return (
      <span className="rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1 text-xs font-bold text-red-300">
        Fatiga alta
      </span>
    )
  }

  if (tsb < -5) {
    return (
      <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-bold text-yellow-300">
        Carga
      </span>
    )
  }

  return (
    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
      Equilibrado
    </span>
  )
}

function Mini({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-lg font-black text-white">{value}</p>
    </div>
  )
}

export default function HeroSection({
  athena,
  week,
  lastWeek,
  ctl,
  atl,
  tsb,
  vo2max,
  lastSync,
  sparkPoints,
}: HeroSectionProps) {
  const {
    readiness,
    recovery,
    fatigue,
    risk,
    trend,
    explanation,
  } = athena.analysis

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-cyan-950/20 xl:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(147,51,234,0.2),transparent_35%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/40 via-slate-950/85 to-slate-950" />

      <div className="relative">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white xl:text-5xl">
              Buenos días, Nacho 👋
            </h1>

            <p className="mt-1.5 text-base text-slate-300">
              {formatHeroDate()}
            </p>

            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                  Athena Intelligence
                </span>

                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                  Confidence {explanation.summary}
                </span>
              </div>

              <div className="mt-3 flex items-end gap-2">
                <span className="text-6xl font-black leading-none text-cyan-300 drop-shadow-[0_0_30px_rgba(34,211,238,0.45)]">
                  {readiness.score}
                </span>
                <span className="mb-1.5 text-2xl font-black text-slate-400">
                  /100
                </span>
              </div>

              <p className="mt-2 max-w-xl text-base text-slate-100">
                {explanation.summary}
              </p>

              <div className="mt-4 space-y-2">
                {explanation.reasons.map((reason) => (
                  <div
                    key={reason}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <span className="text-cyan-400">✓</span>
                    <span>{reason}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
                <Mini label="Recovery" value={recovery.score} />
                <Mini label="Fatigue" value={fatigue.score} />
                <Mini label="Risk" value={risk.score} />
                <Mini label="Trend" value={trend.label} />
              </div>

              <div className="mt-5 h-1.5 w-52 overflow-hidden rounded-full bg-slate-700">
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

            <div className="mt-3 grid grid-cols-3 gap-3">
              <Mini label="Semana" value={`${week.distance.toFixed(1)} km`} />
              <Mini label="Sesiones" value={week.count} />
              <Mini label="Últ. semana" value={`${lastWeek.distance.toFixed(1)} km`} />
            </div>

            <p className="mt-3 text-right text-xs text-slate-500">
              Última sync: {lastSync}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}