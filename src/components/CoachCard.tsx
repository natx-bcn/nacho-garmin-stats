import { evaluateCoach } from '../lib/athena'
import Card from './ui/Card'
import Badge from './ui/Badge'

type CoachCardProps = {
  tsb: number
  ctl: number
  atl: number
  weekCount: number
  weekDistance: number
  weekTss: number
  lastWeekTss: number
  isAerobicFocused: boolean
  daysSinceLastActivity?: number
}

export default function CoachCard({
  tsb,
  ctl,
  atl,
  weekCount,
  weekDistance,
  weekTss,
  lastWeekTss,
  isAerobicFocused,
  daysSinceLastActivity,
}: CoachCardProps) {
  const coach = evaluateCoach({
  ctl,
  atl,
  tsb,
  weeklyLoad: weekTss,
  activitiesThisWeek: weekCount,
  daysSinceLastActivity,
})

  const loadRatio = lastWeekTss > 0 ? weekTss / lastWeekTss : 1

  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
            AI Coach
          </div>

          <h2 className="text-2xl font-black text-slate-100">
            {coach.recommendation}
          </h2>
        </div>

        <Badge color={coach.color}>
          {coach.status}
        </Badge>
      </div>

      <div className="mb-5 rounded-xl border border-slate-700/60 bg-slate-900/40 p-4">
        <div className="mb-2 text-xs uppercase tracking-widest text-slate-500">
          Recomendación de hoy
        </div>

        <div className="text-sm leading-relaxed text-slate-300">
          {coach.reason}
        </div>

        <div className="mt-3 text-xs text-slate-500">
          Confianza: <span className="font-semibold text-slate-300">{coach.confidence}%</span>
        </div>
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
        <div>
          <div className="text-xs text-slate-500">Distancia</div>
          <div className="text-xl font-bold text-slate-100">
            {weekDistance.toFixed(1)} km
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-500">TSS</div>
          <div className="text-xl font-bold text-slate-100">
            {Math.round(weekTss)}
          </div>
        </div>
      </div>
    </Card>
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