import Card from '../ui/Card'
import type { AthenaReport } from '../../lib/athena/models'

type Props = {
  athena: AthenaReport
}

function Metric({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-slate-400">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-700">
        <div
          className="h-full rounded-full bg-cyan-400"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export default function AthenaIntelligenceCard({
  athena,
}: Props) {
  const {
    recovery,
    fatigue,
    risk,
    explanation,
  } = athena.analysis

  return (
    <Card className="space-y-6">

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
          Athena Intelligence
        </p>

        <h2 className="mt-1 text-3xl font-black">
          {athena.coach.confidence}%
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Confianza de la decisión
        </p>
      </div>

      <div className="space-y-4">

        <Metric
          label="Recovery"
          value={recovery.score}
        />

        <Metric
          label="Fatigue"
          value={100 - fatigue.score}
        />

        <Metric
          label="Risk"
          value={100 - risk.score}
        />

      </div>

      <div className="rounded-xl bg-slate-900 p-4">

        <p className="font-semibold">
          {explanation.summary}
        </p>

        <ul className="mt-3 space-y-2 text-sm text-slate-300">

          {explanation.reasons.map(reason => (

            <li
              key={reason}
              className="flex gap-2"
            >
              <span className="text-cyan-400">
                ✓
              </span>

              <span>{reason}</span>

            </li>

          ))}

        </ul>

      </div>

    </Card>
  )
}