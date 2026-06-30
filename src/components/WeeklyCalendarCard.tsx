import { Link } from 'react-router-dom'
import { formatDuration, sportIcon } from '../utils/formatters'
import type { Sport } from '../types/garmin'


type Activity = {
  id: number | string
  title: string
  sport: Sport
  startTime: string
  distance?: number
  duration?: number
  tss?: number | null
  avgHR?: number
}

type WeeklyCalendarCardProps = {
  activities: Activity[]
}

export default function WeeklyCalendarCard({ activities }: WeeklyCalendarCardProps) {
  const days = buildWeekDays(activities)

  return (
    <section className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">
            Calendario inteligente
          </div>
          <h2 className="text-xl font-black text-slate-100">
            Semana actual
          </h2>
        </div>

        <div className="text-right text-xs text-slate-500">
          {getWeekRangeLabel()}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map(day => (
          <div
            key={day.key}
            className={`rounded-xl border p-3 min-h-[150px] ${
              day.isToday
                ? 'border-blue-500/60 bg-blue-500/10'
                : 'border-slate-700/40 bg-slate-950/35'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-xs text-slate-500 uppercase">{day.label}</div>
                <div className="text-sm font-bold text-slate-200">{day.dayNumber}</div>
              </div>

              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  background: day.color,
                  boxShadow: `0 0 10px ${day.color}`,
                }}
              />
            </div>

            {day.activities.length === 0 ? (
              <div className="mt-6 text-center text-xs text-slate-600">
                Descanso
              </div>
            ) : (
              <div className="space-y-2">
                {day.activities.slice(0, 2).map(activity => (
                  <Link
                    key={activity.id}
                    to={`/activity/${activity.id}`}
                    className="block rounded-lg border border-slate-700/40 bg-slate-900/70 p-2 hover:border-slate-500/70 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 truncate">
                      <span>{sportIcon(activity.sport)}</span>
                      <span className="truncate">{activity.title}</span>
                    </div>

                    <div className="mt-1 text-[11px] text-slate-500">
                      {activity.distance ? `${activity.distance.toFixed(1)} km` : ''}
                      {activity.distance && activity.duration ? ' · ' : ''}
                      {activity.duration ? formatDuration(activity.duration) : ''}
                    </div>

                    {activity.tss != null && (
                      <div className="mt-1 text-[11px] text-blue-400 font-bold">
                        {Math.round(activity.tss)} TSS
                      </div>
                    )}
                  </Link>
                ))}

                {day.activities.length > 2 && (
                  <div className="text-[11px] text-slate-500">
                    +{day.activities.length - 2} más
                  </div>
                )}
              </div>
            )}

            <div className="mt-3 pt-2 border-t border-slate-800">
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>{day.totalDistance.toFixed(1)} km</span>
                <span>{Math.round(day.totalTss)} TSS</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        <SummaryBox label="Sesiones" value={String(days.reduce((a, d) => a + d.activities.length, 0))} />
        <SummaryBox label="Km semana" value={`${days.reduce((a, d) => a + d.totalDistance, 0).toFixed(1)} km`} />
        <SummaryBox label="Carga" value={`${Math.round(days.reduce((a, d) => a + d.totalTss, 0))} TSS`} />
        <SummaryBox label="Días activos" value={String(days.filter(d => d.activities.length > 0).length)} />
      </div>
    </section>
  )
}

function SummaryBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-700/40 bg-slate-950/35 p-3">
      <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
      <div className="text-lg font-black text-slate-100 mt-1">{value}</div>
    </div>
  )
}

function buildWeekDays(activities: Activity[]) {
  const start = getStartOfWeek(new Date())
  const todayKey = toDateKey(new Date())

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)

    const key = toDateKey(date)
    const dayActivities = activities.filter(a => toDateKey(new Date(a.startTime)) === key)

    const totalDistance = dayActivities.reduce((sum, a) => sum + Number(a.distance || 0), 0)
    const totalTss = dayActivities.reduce((sum, a) => sum + Number(a.tss || 0), 0)

    return {
      key,
      label: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'][index],
      dayNumber: date.getDate(),
      isToday: key === todayKey,
      activities: dayActivities,
      totalDistance,
      totalTss,
      color: getDayColor(totalTss, dayActivities.length),
    }
  })
}

function getDayColor(tss: number, count: number) {
  if (count === 0) return '#475569'
  if (tss < 35) return '#22c55e'
  if (tss < 70) return '#3b82f6'
  if (tss < 110) return '#eab308'
  return '#ef4444'
}

function getStartOfWeek(date: Date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

function getWeekRangeLabel() {
  const start = getStartOfWeek(new Date())
  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  return `${start.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}`
}