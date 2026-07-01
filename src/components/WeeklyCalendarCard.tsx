import { Link } from 'react-router-dom'
import {
  Activity,
  CalendarDays,
  Dumbbell,
  Moon,
  Trophy,
  Zap,
} from 'lucide-react'

import Panel from './ui/Panel'
import { formatDuration, sportIcon } from '../utils/formatters'
import type { Sport } from '../types/garmin'

type ActivityItem = {
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
  activities: ActivityItem[]
}

export default function WeeklyCalendarCard({ activities }: WeeklyCalendarCardProps) {
  const days = buildWeekDays(activities)
  const today = days.find(day => day.isToday) ?? days[0]
  const nextActive = days.find(day => !day.isToday && day.activities.length > 0)

  const totalSessions = days.reduce((a, d) => a + d.activities.length, 0)
  const totalDistance = days.reduce((a, d) => a + d.totalDistance, 0)
  const totalTss = days.reduce((a, d) => a + d.totalTss, 0)
  const activeDays = days.filter(d => d.activities.length > 0).length

  return (
    <Panel variant="default" className="flex h-full flex-col p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-cyan-200">
            <CalendarDays size={13} />
            Calendario
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white">
            Semana actual
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            {getWeekRangeLabel()}
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-right">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">
            Activos
          </div>
          <div className="mt-1 text-sm font-black text-cyan-100">
            {activeDays}/7 días
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map(day => (
          <DayPill key={day.key} day={day} />
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/35 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">
              Hoy
            </div>
            <div className="mt-1 text-lg font-black text-white">
              {today.label} {today.dayNumber}
            </div>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
            {today.activities.length > 0 ? <Activity size={20} /> : <Moon size={20} />}
          </div>
        </div>

        {today.activities.length === 0 ? (
          <p className="text-sm leading-6 text-slate-400">
            Día sin actividad registrada. Buena oportunidad para recuperar o hacer movilidad.
          </p>
        ) : (
          <div className="space-y-2">
            {today.activities.slice(0, 2).map(activity => (
              <Link
                key={activity.id}
                to={`/activity/${activity.id}`}
                className="block rounded-2xl border border-slate-700/45 bg-slate-900/65 p-3 transition hover:border-cyan-400/30"
              >
                <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
                  <span>{sportIcon(activity.sport)}</span>
                  <span className="truncate">{activity.title}</span>
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  {activity.distance ? `${activity.distance.toFixed(1)} km` : ''}
                  {activity.distance && activity.duration ? ' · ' : ''}
                  {activity.duration ? formatDuration(activity.duration) : ''}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
        <div className="mb-1 text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
          Próximo foco
        </div>

        <p className="text-sm leading-6 text-slate-300">
          {nextActive
            ? `${nextActive.label}: ${nextActive.activities[0]?.title ?? 'actividad programada'}`
            : 'No hay más actividades esta semana. Athena puede sugerir el siguiente bloque.'}
        </p>
      </div>

      <div className="mt-auto pt-5">
        <div className="grid grid-cols-3 gap-2">
          <Summary label="Sesiones" value={String(totalSessions)} />
          <Summary label="Km" value={totalDistance.toFixed(1)} />
          <Summary label="TSS" value={String(Math.round(totalTss))} />
        </div>
      </div>
    </Panel>
  )
}

function DayPill({
  day,
}: {
  day: ReturnType<typeof buildWeekDays>[number]
}) {
  const Icon = getDayIcon(day)

  return (
    <div
      className={`
        rounded-2xl border px-2 py-3 text-center transition
        ${
          day.isToday
            ? 'border-cyan-400/50 bg-cyan-400/10'
            : 'border-slate-700/45 bg-slate-950/35'
        }
      `}
    >
      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
        {day.label}
      </div>

      <div className="mt-1 text-sm font-black text-slate-100">
        {day.dayNumber}
      </div>

      <div
        className="mx-auto mt-2 flex h-8 w-8 items-center justify-center rounded-xl"
        style={{
          background: `${day.color}18`,
          color: day.color,
        }}
      >
        <Icon size={16} />
      </div>

      <div className="mt-2 text-[10px] font-bold text-slate-500">
        {day.activities.length > 0 ? `${day.activities.length} act.` : 'off'}
      </div>
    </div>
  )
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-700/45 bg-slate-950/35 px-3 py-3 text-center">
      <div className="text-lg font-black text-white">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
        {label}
      </div>
    </div>
  )
}

function buildWeekDays(activities: ActivityItem[]) {
  const start = getStartOfWeek(new Date())
  const todayKey = toLocalDateKey(new Date())

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)

    const key = toLocalDateKey(date)
    const dayActivities = activities.filter(
      a => toActivityLocalDateKey(a.startTime) === key,
    )

    const totalDistance = dayActivities.reduce(
      (sum, a) => sum + Number(a.distance || 0),
      0,
    )
    const totalTss = dayActivities.reduce(
      (sum, a) => sum + Number(a.tss || 0),
      0,
    )

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

function getDayIcon(day: ReturnType<typeof buildWeekDays>[number]) {
  if (day.activities.length === 0) return Moon

  const title = day.activities.map(a => a.title.toLowerCase()).join(' ')
  const sports = day.activities.map(a => a.sport).join(' ')

  if (title.includes('fuerza')) return Dumbbell
  if (title.includes('padbol')) return Trophy
  if (title.includes('series') || title.includes('tempo') || title.includes('calidad')) return Zap
  if (sports.includes('running')) return Activity

  return Activity
}

function getDayColor(tss: number, count: number) {
  if (count === 0) return '#64748b'
  if (tss < 35) return '#22c55e'
  if (tss < 70) return '#38bdf8'
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

function toLocalDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function toActivityLocalDateKey(startTime: string) {
  const match = startTime.match(/^(\d{4}-\d{2}-\d{2})/)
  if (match) return match[1]
  return toLocalDateKey(new Date(startTime))
}

function getWeekRangeLabel() {
  const start = getStartOfWeek(new Date())
  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  return `${start.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  })} - ${end.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  })}`
}