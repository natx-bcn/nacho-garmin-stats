import { Brain, CheckCircle2, Lightbulb } from 'lucide-react'
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
  decision,
  description,
  confidence,
  reasons,
  tomorrow,
}: AthenaHomeCardProps) {
  const safeConfidence = clamp(confidence)

  return (
    <Card className="relative overflow-hidden rounded-[2rem] border-white/10 bg-slate-950/90 p-0 shadow-2xl shadow-cyan-950/20">
      <div className="absolute -left-28 -top-24 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative grid gap-8 p-7 xl:grid-cols-[1.05fr_0.95fr] xl:p-10">
        <section className="flex flex-col justify-center">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <Brain size={20} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">
              Athena
            </p>
          </div>

          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
            Hoy haría...
          </p>

          <h2 className="mt-6 text-5xl font-black tracking-tight text-white">
            {decision}
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">
            {description}
          </p>

          <div className="mt-10 max-w-xl">
            <p className="text-sm text-slate-400">Confianza</p>

            <p className="mt-1 text-4xl font-black text-cyan-300">
              {safeConfidence}%
            </p>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                style={{ width: `${safeConfidence}%` }}
              />
            </div>
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
          <p className="mb-6 text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
            ¿Por qué?
          </p>

          <div className="divide-y divide-white/10">
            {reasons.map((reason) => (
              <div
                key={reason}
                className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
              >
                <CheckCircle2
                  size={24}
                  className="mt-0.5 shrink-0 text-emerald-300"
                />

                <p className="text-base leading-7 text-slate-200">
                  {reason}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
            <div className="flex gap-4">
              <Lightbulb
                size={26}
                className="shrink-0 text-cyan-300"
              />

              <p className="text-base leading-7 text-cyan-50">
                {tomorrow}
              </p>
            </div>
          </div>
        </section>
      </div>
    </Card>
  )
}