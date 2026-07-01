import { Brain, CheckCircle2, Sparkles } from 'lucide-react'

import { GlassCard } from '../ui/GlassCard'
import type { AthenaReport } from '../../lib/athena/models'

type Props = {
  athena: AthenaReport
}

export default function AthenaDailyBriefCard({ athena }: Props) {
  const { brief, status, coach } = athena
  const readiness = status.readiness

  return (
    <GlassCard className="overflow-hidden p-0">
      <div className="border-b border-white/10 bg-cyan-400/10 px-6 py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-cyan-400/15 p-3">
              <Brain className="h-6 w-6 text-cyan-300" />
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Athena Daily Brief
              </div>

              <h2 className="mt-2 text-2xl font-black text-white">
                {brief.headline}
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                {brief.summary}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
            <div className="text-xs uppercase tracking-widest text-slate-500">
              Readiness
            </div>

            <div className="mt-1 text-3xl font-black text-white">
              {readiness.score}
              <span className="text-base text-slate-500">/100</span>
            </div>

            <div className="text-xs font-semibold text-cyan-300">
              {readiness.visual.badge}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Lo más importante hoy
          </div>

          <div className="space-y-3">
            {brief.highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />

                <p className="text-sm leading-6 text-slate-300">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-1 text-xs uppercase tracking-widest text-slate-500">
              Recomendación
            </div>

            <div className="text-lg font-black text-white">
              {brief.recommendation}
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {coach.reason}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-1 text-xs uppercase tracking-widest text-slate-500">
              Predicción
            </div>

            <p className="text-sm leading-6 text-slate-300">
              {brief.prediction}
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}