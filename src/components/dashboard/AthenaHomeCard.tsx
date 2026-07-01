import { Brain, CheckCircle2, Target } from 'lucide-react'
import Card from '../ui/Card'

type AthenaHomeCardProps = {
  readyScore: number
  message: string
  decision: string
  description: string
  confidence: number
  reasons: string[]
  tomorrow: string
}

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)))
}

export default function AthenaHomeCard({
  message,
  decision,
  description,
  confidence,
  reasons,
  tomorrow,
}: AthenaHomeCardProps) {
  const safeConfidence = clamp(confidence)

  return (
    <Card className="relative overflow-hidden border-cyan-500/20 bg-slate-950 p-0 shadow-xl shadow-cyan-950/20">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative p-6">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
            <Brain size={22} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
              Athena
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-white">
              {message}
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              El Hero te muestra los datos. Athena los interpreta y te propone
              la mejor decisión para hoy.
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                <Target size={22} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  Recomendación
                </p>

                <h3 className="mt-1 text-3xl font-black text-white">
                  {decision}
                </h3>
              </div>
            </div>

            <p className="max-w-2xl text-sm leading-6 text-slate-300">
              {description}
            </p>

            <div className="mt-5 flex items-center gap-4">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                  style={{ width: `${safeConfidence}%` }}
                />
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-500">Confianza</p>
                <p className="text-lg font-bold text-white">
                  {safeConfidence}%
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-5">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-300" />
              <h3 className="font-bold text-white">Por qué</h3>
            </div>

            <div className="space-y-3 text-sm leading-6 text-slate-300">
              {reasons.map((reason) => (
                <p key={reason}>✓ {reason}</p>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">
              <p className="text-sm leading-6 text-cyan-100">
                {tomorrow}
              </p>
            </div>
          </section>
        </div>
      </div>
    </Card>
  )
}