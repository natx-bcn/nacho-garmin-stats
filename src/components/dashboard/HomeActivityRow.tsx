import { Activity, Brain, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import Panel from '../ui/Panel'

type ActivityItem = {
  id?: string | number
  name?: string
  sport?: string
  date?: string
  distance?: number | null
  duration?: number | null
  avgHr?: number | null
  tss?: number | null 
}

type InsightItem = {
  title?: string
  description?: string
  severity?: string
}

interface HomeActivityRowProps {
  activities: ActivityItem[]
  insights: InsightItem[]
}

function formatKm(distance?: number | null) {
  if (!distance) return '—'
  return `${distance.toFixed(1)} km`
}

function formatDuration(seconds?: number | null) {
  if (!seconds) return '—'
  const h = Math.floor(seconds / 3600)
  const m = Math.round((seconds % 3600) / 60)
  return h > 0 ? `${h}h ${m.toString().padStart(2, '0')}` : `${m} min`
}

export default function HomeActivityRow({
  activities,
  insights,
}: HomeActivityRowProps) {
  const latest = activities[0]
  const insight = insights[0]

  return (
    <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
      <Panel variant="default" className="p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
            <Activity size={22} />
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-500">
              Última actividad
            </p>
            <h3 className="text-xl font-black text-white">
              {latest?.name ?? 'Sin actividad reciente'}
            </h3>
            <p className="text-xs text-slate-500">
              {latest?.date ?? '—'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Stat label="Distancia" value={formatKm(latest?.distance)} />
          <Stat label="Tiempo" value={formatDuration(latest?.duration)} />
          <Stat label="FC media" value={latest?.avgHr ? `${latest.avgHr} bpm` : '—'} />
          <Stat label="Carga" value={latest?.tss ? `${latest.tss} TSS` : '—'} />
        </div>

        <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
          <p className="mb-1 text-xs font-bold text-cyan-300">Athena dice:</p>
          <p className="text-sm leading-6 text-slate-300">
            Muy buena sesión. Intensidad controlada y buena gestión de la fatiga.
          </p>
        </div>
      </Panel>

      <Panel variant="default" className="p-5">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <Brain size={22} />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">
                Insight destacado
              </p>
              <h3 className="text-xl font-black text-white">
                {insight?.title ?? 'Sin insight destacado'}
              </h3>
            </div>
          </div>

          {insight?.severity && (
            <span className="rounded-full border border-slate-600/60 bg-slate-800/70 px-3 py-1 text-xs font-semibold text-slate-300">
              {insight.severity}
            </span>
          )}
        </div>

        <p className="min-h-20 text-sm leading-6 text-slate-300">
          {insight?.description ??
            'Athena generará insights destacados cuando detecte cambios relevantes.'}
        </p>

        <Link
          to="/performance"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-400/20 bg-slate-950/35 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/10"
        >
          Ver todos los insights
          <ArrowRight size={15} />
        </Link>
      </Panel>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-slate-700/50 last:border-r-0">
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{label}</p>
    </div>
  )
}