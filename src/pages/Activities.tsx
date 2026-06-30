import { useState, useMemo } from 'react'
import { useActivityStore } from '../stores/activityStore'
import type { Sport } from '../types/garmin'
import ActivityCard from '../components/ActivityCard'

const SPORTS: { value: Sport | 'all'; label: string; shortLabel: string }[] = [
  { value: 'all', label: 'Todos', shortLabel: 'Todos' },
  { value: 'running', label: '🏃 Running', shortLabel: '🏃 Run' },
  { value: 'cycling', label: '🚴 Ciclismo', shortLabel: '🚴 Bici' },
  { value: 'swimming', label: '🏊 Natación', shortLabel: '🏊 Swim' },
  { value: 'other', label: '⚡ Otro', shortLabel: '⚡ Otro' },
]

export default function Activities() {
  const activities = useActivityStore(s => s.activities)
  const [sportFilter, setSportFilter] = useState<Sport | 'all'>('all')
  const [yearFilter, setYearFilter] = useState<string>('all')
  const [page, setPage] = useState(0)

  const PAGE_SIZE = 20

  const years = useMemo(() => {
    const ys = new Set(activities.map(a => a.startTime.slice(0, 4)))
    return ['all', ...Array.from(ys).sort().reverse()]
  }, [activities])

  const filtered = useMemo(() => {
    return activities.filter(a => {
      if (sportFilter !== 'all' && a.sport !== sportFilter) return false
      if (yearFilter !== 'all' && !a.startTime.startsWith(yearFilter)) return false
      return true
    })
  }, [activities, sportFilter, yearFilter])

  const paginated = filtered.slice(0, (page + 1) * PAGE_SIZE)
  const hasMore = paginated.length < filtered.length

  return (
    <div className="min-w-0 flex-1 overflow-y-auto bg-[#080f1e] px-3 py-4 sm:px-5 sm:py-6 lg:px-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">
            Historial
          </div>
          <h1 className="text-2xl font-black text-slate-100">Actividades</h1>
          <div className="mt-1 text-sm text-slate-500">
            {filtered.length} actividades encontradas
          </div>
        </div>

        <select
          value={yearFilter}
          onChange={e => { setYearFilter(e.target.value); setPage(0) }}
          className="w-full sm:w-auto bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300"
        >
          {years.map(y => (
            <option key={y} value={y}>{y === 'all' ? 'Todos los años' : y}</option>
          ))}
        </select>
      </div>

      <div className="mb-5 overflow-x-auto pb-1">
        <div className="inline-flex min-w-max bg-slate-800 rounded-xl p-1 gap-1">
          {SPORTS.map(({ value, label, shortLabel }) => (
            <button
              key={value}
              onClick={() => { setSportFilter(value); setPage(0) }}
              className={`px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                sportFilter === value
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="sm:hidden">{shortLabel}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {paginated.map(a => (
          <ActivityCard key={a.id} activity={a} />
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setPage(p => p + 1)}
          className="mt-6 w-full py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-colors text-sm"
        >
          Cargar más ({filtered.length - paginated.length} restantes)
        </button>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          No hay actividades con estos filtros.
        </div>
      )}
    </div>
  )
}