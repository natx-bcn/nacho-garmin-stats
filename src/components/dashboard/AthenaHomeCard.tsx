import {
  Activity,
  ArrowRight,
  Brain,
  CheckCircle2,
  Gauge,
  ShieldCheck,
  TrendingUp,
  Zap,
} from 'lucide-react'
import type { AthenaRecommendation } from '../../lib/athena/recommendation/athenaRecommendation'

type AthenaHomeCardProps = {
  recommendation: AthenaRecommendation
}

export default function AthenaHomeCard({ recommendation }: AthenaHomeCardProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-5 shadow-2xl shadow-black/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.22),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(168,85,247,0.14),transparent_32%),linear-gradient(135deg,rgba(15,23,42,0.2),rgba(2,6,23,0.95))]" />
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[1.75fr_0.55fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-200/20">
              <Brain size={22} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300/80">
                Athena
              </p>
              <p className="text-sm text-slate-400">Copiloto de entrenamiento</p>
            </div>
          </div>

          <h2 className="mb-3 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white md:text-3xl">
            {recommendation.headline}
          </h2>

          <p className="mb-2 max-w-3xl text-base font-bold leading-relaxed text-cyan-100">
            Sesión recomendada · {recommendation.workout.duration} · {recommendation.workout.zone}
          </p>

          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-slate-300">
            {recommendation.workout.label} orientado a {recommendation.workout.objective.toLowerCase()}.
          </p>

          <div className="mb-6 flex flex-wrap gap-2">
            <Chip icon={<Activity size={16} />} label={recommendation.workout.objective} />
            <Chip icon={<Zap size={16} />} label={recommendation.workout.duration} />
            <Chip icon={<ShieldCheck size={16} />} label={`Riesgo ${recommendation.risk}`} />
            <Chip
              icon={<TrendingUp size={16} />}
              label={`${recommendation.expectedImpact.ctl} CTL`}
            />
          </div>

          <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">

            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
              Sesión de hoy
            </p>

            <div className="space-y-3">

              <WorkoutRow
                title={recommendation.session.warmup.label}
                detail={recommendation.session.warmup.detail}
              />

              {recommendation.session.main.map((step, index) => (
                <WorkoutRow
                  key={index}
                  title={step.label}
                  detail={step.detail}
                />
              ))}

              <WorkoutRow
                title={recommendation.session.cooldown.label}
                detail={recommendation.session.cooldown.detail}
              />

            </div>

          </div>

          {recommendation.reasoning.length > 0 && (
            <div className="mb-6 space-y-3">
              {recommendation.reasoning.slice(0, 4).map((reason, index) => (
                <div key={index} className="flex gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-emerald-300"
                    size={18}
                  />
                  <p className="text-sm leading-relaxed text-slate-300">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          )}

          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-200 md:w-auto">
            ¿Por qué esta sesión?
            <ArrowRight size={18} />
          </button>
        </div>

        <aside className="rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-4 shadow-inner shadow-white/5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                Confianza
              </p>
              <p className="text-sm text-slate-400">Decisión de hoy</p>
            </div>

            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10">
              <span className="text-2xl font-black text-cyan-200">
                {recommendation.confidence}
              </span>
            </div>
          </div>

          <div className="mb-6 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-cyan-300"
              style={{
                width: `${Math.min(100, Math.max(0, recommendation.confidence))}%`,
              }}
            />
          </div>

          <div className="mb-6 grid grid-cols-3 gap-2">
            <MiniMetric label="Zona" value={recommendation.workout.zone} />
            <MiniMetric label="Fatiga" value={recommendation.expectedImpact.fatigue} />
            <MiniMetric label="Ready" value={recommendation.expectedImpact.tomorrowReady} />
          </div>

          <div className="rounded-2xl border border-sky-300/10 bg-sky-400/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-sky-200">
              <Gauge size={17} />
              <span className="text-sm font-bold">Mañana</span>
            </div>

            <p className="text-sm leading-relaxed text-slate-300">
              {recommendation.tomorrow}
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}

function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-sm font-semibold text-slate-200">
      <span className="text-cyan-200">{icon}</span>
      {label}
    </div>
  )
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3 text-center">
      <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="text-sm font-black text-white">{value}</p>
    </div>
  )
}

function WorkoutRow({
  title,
  detail,
}: {
  title: string
  detail: string
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-slate-900/40 p-3">
      <div className="text-sm font-bold text-white">
        {title}
      </div>

      <div className="mt-1 text-sm text-slate-400">
        {detail}
      </div>
    </div>
  )
}