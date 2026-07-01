import type { AthenaReport } from '../../lib/athena/models'
import Card from '../ui/Card'
import Badge from '../ui/Badge'

type AICoachCardProps = {
  athena: AthenaReport
  tsb: number
  ctl: number
  atl: number
  weekCount: number
  weekDistance: number
  weekTss: number
  lastWeekTss: number
  isAerobicFocused: boolean
}

export default function AICoachCard({
  athena,
  tsb,
  ctl,
  atl,
  weekCount,
  weekDistance,
  weekTss,
  lastWeekTss,
  isAerobicFocused,
}: AICoachCardProps) {
  const coach = athena.coach
  
  const loadRatio = lastWeekTss > 0 ? weekTss / lastWeekTss : 1

  return (
    <Card>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-blue-400">
            AI Coach
          </div>

          <h2 className="mt-1 text-3xl font-black text-slate-100">
            {coach.recommendation}
          </h2>

          <div className="mt-1 text-sm text-slate-500">
            Recomendación inteligente para hoy
          </div>
        </div>

        <div className="text-right">
          <Badge color={coach.color}>{coach.status}</Badge>

          <div className="mt-2 text-xs text-slate-500">
            Confianza
          </div>

          <div className="text-xl font-black text-slate-100">
            {coach.confidence}%
          </div>
        </div>
      </div>

      <div className="mb-5 rounded-2xl border border-slate-700/60 bg-slate-900/50 p-4">
        <div className="mb-2 text-xs uppercase tracking-widest text-slate-500">
          Por qué
        </div>

        <div className="text-sm leading-relaxed text-slate-300">
          {coach.reason}
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-blue-400"
            style={{ width: `${coach.confidence}%` }}
          />
        </div>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-3">
        <Metric label="Fitness" value={Math.round(ctl)} />
        <Metric label="Fatiga" value={Math.round(atl)} />
        <Metric label="Forma" value={tsb > 0 ? `+${Math.round(tsb)}` : Math.round(tsb)} />
      </div>

      <div className="space-y-3">
        <CoachLine ok={weekCount >= 3} text={`Sesiones esta semana: ${weekCount}`} />

        <CoachLine
          ok={loadRatio < 1.2}
          text={loadRatio < 1.2 ? 'Carga semanal controlada' : 'Carga aumentando demasiado'}
        />

        <CoachLine
          ok={isAerobicFocused}
          text={isAerobicFocused ? 'Base aeróbica correcta' : 'Necesitas más Z2'}
        />
      </div>

      <div className="my-5 border-t border-slate-700" />

      <div className="flex justify-between">
        <Metric label="Distancia" value={`${weekDistance.toFixed(1)} km`} align="left" />
        <Metric label="TSS" value={Math.round(weekTss)} align="right" />
      </div>
    </Card>
  )
}

function Metric({
  label,
  value,
  align = 'center',
}: {
  label: string
  value: string | number
  align?: 'left' | 'center' | 'right'
}) {
  const alignClass =
    align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'

  return (
    <div className={`rounded-xl bg-slate-900/50 p-3 ${alignClass}`}>
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-black text-slate-100">{value}</div>
    </div>
  )
}

function CoachLine({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`h-2.5 w-2.5 rounded-full ${ok ? 'bg-green-400' : 'bg-yellow-400'}`} />
      <div className="text-sm text-slate-300">{text}</div>
    </div>
  )
}