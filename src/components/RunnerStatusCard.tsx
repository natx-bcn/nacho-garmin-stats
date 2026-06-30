import { analyzeRunnerStatus } from '../lib/athena'

type RunnerStatusCardProps = {
  tsb: number
  ctl: number
  atl: number
  weekTss: number
  lastWeekTss: number
}

export default function RunnerStatusCard({
  tsb,
  ctl,
  atl,
  weekTss,
  lastWeekTss,
}: RunnerStatusCardProps) {
  const status = analyzeRunnerStatus(tsb, weekTss, lastWeekTss)
  const loadStatus = getLoadStatus(weekTss, lastWeekTss)
  const recovery = getRecovery(tsb, atl)
  const injuryRisk = getInjuryRisk(tsb, weekTss, lastWeekTss)
  const recommendation = getRecommendation(tsb, weekTss, lastWeekTss, injuryRisk.level)

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 p-5 shadow-xl">
      <div className="absolute -top-24 right-10 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative grid grid-cols-1 xl:grid-cols-[1fr_1.15fr] gap-5">
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-widest mb-3">
            Estado del corredor
          </div>

          <div className="flex items-start gap-3">
            <span
              className="mt-1 h-3 w-3 rounded-full shrink-0"
              style={{
                background: status.color,
                boxShadow: `0 0 16px ${status.color}`,
              }}
            />
            <div>
              <div className="text-2xl font-black" style={{ color: status.color }}>
                {status.title}
              </div>
              <div className="text-sm text-slate-400">
                {status.subtitle}
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-700/40 bg-slate-950/40 p-4">
            <div className="text-xs text-blue-300 uppercase tracking-widest mb-2">
              Recomendación
            </div>
            <div className="text-sm font-bold text-slate-100">
              {recommendation.title}
            </div>
            <div className="text-xs text-slate-400 mt-1 leading-relaxed">
              {recommendation.detail}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatusMetric label="Fitness" value={Math.round(ctl)} detail="CTL · 42 días" color="#3b82f6" />
            <StatusMetric label="Fatiga" value={Math.round(atl)} detail="ATL · 7 días" color="#f97316" />
            <StatusMetric label="Forma" value={`${tsb > 0 ? '+' : ''}${Math.round(tsb)}`} detail="TSB" color={status.color} />
            <StatusMetric label="Carga" value={Math.round(weekTss)} detail="TSS semana" color="#a855f7" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <StatePill
              label="Carga semanal"
              value={loadStatus.label}
              detail={loadStatus.detail}
              color={loadStatus.color}
            />
            <StatePill
              label="Recovery"
              value={`${recovery.value}%`}
              detail={recovery.label}
              color={recovery.color}
            />
            <StatePill
              label="Riesgo lesión"
              value={injuryRisk.label}
              detail={injuryRisk.detail}
              color={injuryRisk.color}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatusMetric({
  label,
  value,
  detail,
  color,
}: {
  label: string
  value: number | string
  detail: string
  color: string
}) {
  return (
    <div className="rounded-xl border border-slate-700/40 bg-slate-950/40 p-4">
      <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
      <div className="text-2xl font-black mt-2" style={{ color }}>
        {value}
      </div>
      <div className="text-xs text-slate-500 mt-1">{detail}</div>
    </div>
  )
}

function StatePill({
  label,
  value,
  detail,
  color,
}: {
  label: string
  value: string
  detail: string
  color: string
}) {
  return (
    <div className="rounded-xl border border-slate-700/40 bg-slate-950/40 p-4">
      <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">{label}</div>
      <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-bold"
        style={{
          color,
          background: `${color}18`,
          border: `1px solid ${color}40`,
        }}
      >
        {value}
      </div>
      <div className="text-xs text-slate-500 mt-2 leading-relaxed">{detail}</div>
    </div>
  )
}

function getLoadStatus(weekTss: number, lastWeekTss: number) {
  if (weekTss <= 0) {
    return {
      label: 'Baja',
      detail: 'Aún no hay carga esta semana.',
      color: '#94a3b8',
    }
  }

  if (lastWeekTss <= 0) {
    return {
      label: 'Correcta',
      detail: 'Primera referencia semanal disponible.',
      color: '#3b82f6',
    }
  }

  const ratio = weekTss / lastWeekTss

  if (ratio < 0.65) {
    return {
      label: 'Baja',
      detail: 'Carga bastante menor que la semana pasada.',
      color: '#94a3b8',
    }
  }

  if (ratio <= 1.15) {
    return {
      label: 'Óptima',
      detail: 'Carga bien controlada respecto a la semana anterior.',
      color: '#22c55e',
    }
  }

  if (ratio <= 1.35) {
    return {
      label: 'Alta',
      detail: 'La carga empieza a subir bastante.',
      color: '#eab308',
    }
  }

  return {
    label: 'Excesiva',
    detail: 'Subida fuerte de carga. Vigila fatiga y molestias.',
    color: '#ef4444',
  }
}

function getRecovery(tsb: number, atl: number) {
  let value = 80 + tsb * 1.4 - Math.max(0, atl - 50) * 0.35
  value = Math.max(20, Math.min(100, Math.round(value)))

  if (value >= 80) {
    return {
      value,
      label: 'Bien',
      color: '#22c55e',
    }
  }

  if (value >= 60) {
    return {
      value,
      label: 'Aceptable',
      color: '#3b82f6',
    }
  }

  if (value >= 45) {
    return {
      value,
      label: 'Justo',
      color: '#eab308',
    }
  }

  return {
    value,
    label: 'Bajo',
    color: '#ef4444',
  }
}

function getInjuryRisk(tsb: number, weekTss: number, lastWeekTss: number) {
  const ratio = lastWeekTss > 0 ? weekTss / lastWeekTss : 1

  if (tsb < -25 || ratio > 1.45) {
    return {
      level: 'high',
      label: 'Alto',
      detail: 'Carga o fatiga demasiado elevada.',
      color: '#ef4444',
    }
  }

  if (tsb < -12 || ratio > 1.25) {
    return {
      level: 'medium',
      label: 'Medio',
      detail: 'Conviene controlar intensidad y recuperación.',
      color: '#eab308',
    }
  }

  return {
    level: 'low',
    label: 'Bajo',
    detail: 'Situación estable si mantienes fuerza y descanso.',
    color: '#22c55e',
  }
}

function getRecommendation(
  tsb: number,
  weekTss: number,
  lastWeekTss: number,
  riskLevel: string,
) {
  if (riskLevel === 'high') {
    return {
      title: 'Descanso activo o movilidad',
      detail: 'No haría series ni tempo. Prioriza caminar, movilidad, sueño y descarga muscular.',
    }
  }

  if (tsb < -12) {
    return {
      title: 'Rodaje muy suave o fuerza preventiva',
      detail: 'Evita añadir intensidad. Buen día para gemelos, sóleo, glúteo, core y movilidad.',
    }
  }

  if (lastWeekTss > 0 && weekTss > lastWeekTss * 1.3) {
    return {
      title: 'No subir más la carga',
      detail: 'La semana ya va por encima de la anterior. Mantén el resto suave para asimilar.',
    }
  }

  if (tsb > 10) {
    return {
      title: 'Calidad controlada',
      detail: 'Puedes hacer calidad, pero sin convertirla en carrera. Mejor control que ego.',
    }
  }

  return {
    title: 'Fuerza preventiva o rodaje suave',
    detail: 'Día ideal para consolidar sin lesionarte: fuerza, movilidad o zona 2 tranquila.',
  }
}