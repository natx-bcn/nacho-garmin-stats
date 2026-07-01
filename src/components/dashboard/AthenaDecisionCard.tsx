import Card from '../ui/Card'
import type { AthenaReport } from '../../lib/athena/models'

type Props = {
  athena: AthenaReport
}

const ICONS = {
  quality_session: '🏃',
  tempo_run: '⚡',
  easy_run: '🏃‍♂️',
  recovery_run: '🟢',
  strength: '🏋️',
  long_run: '⛰️',
  rest: '😴',
}

const TITLES = {
  quality_session: 'Sesión de Calidad',
  tempo_run: 'Tempo Run',
  easy_run: 'Rodaje Suave',
  recovery_run: 'Recuperación Activa',
  strength: 'Fuerza',
  long_run: 'Tirada Larga',
  rest: 'Descanso',
}

export default function AthenaDecisionCard({
  athena,
}: Props) {
  const coach = athena.coach

  const icon =
    ICONS[coach.recommendation as keyof typeof ICONS] ?? '🧠'

  const title =
    TITLES[coach.recommendation as keyof typeof TITLES] ??
    coach.recommendation

  return (
    <Card className="space-y-6">

      <div>

        <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
          Today's Decision
        </p>

        <div className="mt-4 flex items-center gap-4">

          <div className="text-5xl">
            {icon}
          </div>

          <div>

            <h2 className="text-3xl font-black">
              {title}
            </h2>

            <p className="mt-1 text-slate-400">
              {coach.reason}
            </p>

          </div>

        </div>

      </div>

      <div className="rounded-xl bg-slate-900 p-4">

        <div className="flex items-center justify-between">

          <span className="text-sm text-slate-400">
            Confianza
          </span>

          <span className="text-xl font-black text-cyan-300">
            {coach.confidence}%
          </span>

        </div>

      </div>

    </Card>
  )
}