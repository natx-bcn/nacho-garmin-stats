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
  const status = getStatus(tsb, weekTss, lastWeekTss)
  const recommendation = getRecommendation(tsb, weekTss, lastWeekTss)
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 p-5 shadow-xl">
      <div className="absolute -top-24 right-10 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-5">
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">
            Estado del corredor
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{status.icon}</span>
            <div>
              <div className="text-2xl font-black" style={{ color: status.color }}>
                {status.title}
              </div>
              <div className="text-sm text-slate-400">
                {status.subtitle}
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-slate-700/40 bg-slate-950/40 p-4">
            <div className="text-xs text-blue-300 uppercase tracking-widest mb-2">
              Recomendación
            </div>
            <div className="text-sm font-medium text-slate-100">
              {recommendation.title}
            </div>
            <div className="text-xs text-slate-400 mt-1 leading-relaxed">
              {recommendation.detail}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatusMetric label="Fitness" value={Math.round(ctl)} detail="CTL · 42 días" color="#3b82f6" />
          <StatusMetric label="Fatiga" value={Math.round(atl)} detail="ATL · 7 días" color="#f97316" />
          <StatusMetric label="Forma" value={`${tsb > 0 ? '+' : ''}${Math.round(tsb)}`} detail="TSB" color={status.color} />
          <StatusMetric label="Carga" value={Math.round(weekTss)} detail="TSS semana" color="#a855f7" />
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
function getStatus(tsb: number, weekTss: number, lastWeekTss: number) {
  if (tsb < -25) {
    return {
      icon: '🔴',
      title: 'Fatiga alta',
      subtitle: 'Estás acumulando demasiado desgaste.',
      color: '#ef4444',
    }
  }
  if (tsb < -12) {
    return {
      icon: '🟠',
      title: 'Cuidado',
      subtitle: 'La carga es buena, pero no conviene apretar más.',
      color: '#f97316',
    }
  }
  if (lastWeekTss > 0 && weekTss > lastWeekTss * 1.3) {
    return {
      icon: '🟡',
      title: 'Subida fuerte',
      subtitle: 'La carga semanal está creciendo rápido.',
      color: '#eab308',
    }
  }
  if (tsb > 10) {
    return {
      icon: '🟢',
      title: 'Fresco',
      subtitle: 'Buen momento para una sesión de calidad controlada.',
      color: '#22c55e',
    }
  }
  return {
    icon: '🟢',
    title: 'Muy bien',
    subtitle: 'Carga equilibrada y buena base para seguir progresando.',
    color: '#22c55e',
  }
}
function getRecommendation(tsb: number, weekTss: number, lastWeekTss: number) {
  if (tsb < -25) {
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
