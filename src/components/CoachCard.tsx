import Card from './ui/Card'
import Badge from './ui/Badge'

type CoachCardProps = {
  tsb: number
  weekCount: number
  weekDistance: number
  weekTss: number
  lastWeekTss: number
  isAerobicFocused: boolean
}

export default function CoachCard({
  tsb,
  weekCount,
  weekDistance,
  weekTss,
  lastWeekTss,
  isAerobicFocused,
}: CoachCardProps) {

  const loadRatio =
    lastWeekTss > 0 ? weekTss / lastWeekTss : 1

  const status =
    tsb > 8
      ? {
          text: 'Muy bien',
          color: 'green' as const,
        }
      : tsb > -8
      ? {
          text: 'Correcto',
          color: 'blue' as const,
        }
      : tsb > -18
      ? {
          text: 'Fatigado',
          color: 'yellow' as const,
        }
      : {
          text: 'Sobrecarga',
          color: 'red' as const,
        }

  return (
    <Card>

      <div className="flex items-center justify-between mb-5">

        <div>

          <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Coach
          </div>

          <h2 className="text-2xl font-black text-slate-100">
            Recomendación
          </h2>

        </div>

        <Badge color={status.color}>
          {status.text}
        </Badge>

      </div>

      <div className="space-y-3">

        <CoachLine
          ok={weekCount >= 3}
          text={`Sesiones esta semana: ${weekCount}`}
        />

        <CoachLine
          ok={loadRatio < 1.20}
          text={
            loadRatio < 1.20
              ? 'Carga semanal controlada'
              : 'Carga aumentando demasiado'
          }
        />

        <CoachLine
          ok={isAerobicFocused}
          text={
            isAerobicFocused
              ? 'Base aeróbica correcta'
              : 'Necesitas más Z2'
          }
        />

      </div>

      <div className="border-t border-slate-700 my-5"/>

      <div>

        <div className="text-xs uppercase tracking-widest text-slate-500 mb-3">

          Hoy haría

        </div>

        <div className="space-y-2">

          {tsb < -15 && (
            <Recommendation text="Descanso o movilidad" />
          )}

          {tsb >= -15 && tsb <= 8 && (
            <>
              <Recommendation text="Fuerza preventiva" />
              <Recommendation text="30-45 min suaves" />
            </>
          )}

          {tsb > 8 && (
            <>
              <Recommendation text="Entrenamiento de calidad" />
              <Recommendation text="Estás fresco para exigir" />
            </>
          )}

        </div>

      </div>

      <div className="border-t border-slate-700 my-5"/>

      <div className="flex justify-between">

        <div>

          <div className="text-xs text-slate-500">
            Distancia
          </div>

          <div className="text-xl font-bold text-slate-100">
            {weekDistance.toFixed(1)} km
          </div>

        </div>

        <div className="text-right">

          <div className="text-xs text-slate-500">
            TSS
          </div>

          <div className="text-xl font-bold text-slate-100">
            {Math.round(weekTss)}
          </div>

        </div>

      </div>

    </Card>
  )
}

function CoachLine({
  ok,
  text,
}: {
  ok: boolean
  text: string
}) {
  return (
    <div className="flex items-center gap-3">

      <div
        className={`h-2.5 w-2.5 rounded-full ${
          ok
            ? 'bg-green-400'
            : 'bg-yellow-400'
        }`}
      />

      <div className="text-sm text-slate-300">
        {text}
      </div>

    </div>
  )
}

function Recommendation({
  text,
}: {
  text: string
}) {
  return (
    <div className="rounded-xl bg-slate-800 px-3 py-2 text-sm text-slate-200">
      💡 {text}
    </div>
  )
}