import { Link } from 'react-router-dom'

import { useActivityStore } from '../stores/activityStore'
import { formatDuration, formatPace, sportIcon, sportColor } from '../utils/formatters'
import { daysAgo } from '../utils/date'
import { useFitnessHistory } from '../hooks/useFitnessHistory'
import { useWeekComparison } from '../hooks/useWeekComparison'
import { useSportVolume } from '../hooks/useSportVolume'
import { useTrainingStreak } from '../hooks/useTrainingStreak'
import { useZoneDistribution } from '../hooks/useZoneDistribution'
import usePerformanceEngine from '../hooks/usePerformanceEngine'

import HeroSection from '../components/dashboard/HeroSection'
import RadialProgress from '../components/RadialProgress'
import AICoachCard from '../components/dashboard/AICoachCard'
import WeeklyCalendarCard from '../components/WeeklyCalendarCard'
import WeeklyGoalsCard from '../components/WeeklyGoalsCard'
import RacePredictionsCard from '../components/RacePredictionsCard'
import SyncStatusCard from '../components/SyncStatusCard'
import TrainingSummaryCard from '../components/TrainingSummaryCard'
import TrendCard from '../components/TrendCard'
import ConsistencyCard from '../components/ConsistencyCard'
import InsightsPanel from '../components/dashboard/InsightsPanel'
import { evaluateAthena } from '../lib/athena'
import AthenaDailyBriefCard from '../components/dashboard/AthenaDailyBriefCard'

import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
} from 'recharts'

function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-1 items-center justify-center">
      <div className="animate-pulse text-sm text-slate-400">Cargando...</div>
    </div>
  )
}

function EmptyScreen() {
  return (
    <div className="flex-1 p-4 sm:p-8 max-w-2xl">
      <div className="rounded-xl border border-amber-800/50 bg-amber-950/40 p-5 sm:p-6">
        <h2 className="mb-2 text-lg font-medium text-amber-300">
          Sin datos de Garmin
        </h2>

        <div className="mt-3 space-y-1 overflow-x-auto rounded-lg bg-slate-900 p-4 font-mono text-xs text-slate-300 sm:text-sm">
          <div>cp .env.example .env</div>
          <div>cd fetch && pip install -r requirements.txt</div>
          <div>python3 sync.py --full --no-gpx</div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const activities = useActivityStore(s => s.activities)
  const stats = useActivityStore(s => s.stats)
  const loading = useActivityStore(s => s.loading)
  const error = useActivityStore(s => s.error)

  const { current: fitness, sparkPoints } = useFitnessHistory()
  const { current: week, previous: lastWeek } = useWeekComparison()
  const { bySport: sportHours, totalHours, percentages } = useSportVolume(30)
  useTrainingStreak()
  const { slices: zoneSlices, isAerobicFocused } = useZoneDistribution(30)
  const { weeklyLoad } = usePerformanceEngine()

  if (loading) return <LoadingScreen />
  if (error || activities.length === 0) return <EmptyScreen />

  const tsb = fitness?.tsb ?? 0
  const ctl = fitness?.ctl ?? 0
  const atl = fitness?.atl ?? 0

  const athena = evaluateAthena({
    ctl,
    atl,
    tsb,
    weeklyLoad: week.tss,
    lastWeekLoad: lastWeek.tss,
    weekDistance: week.distance,
    activitiesThisWeek: week.count,
    isAerobicFocused: true,
  })

  const maxWeekTSS = Math.max(...weeklyLoad.map(w => w.tss), 1)

  const lastSync = stats?.syncedAt
    ? new Date(stats.syncedAt).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
      })
    : 'Pendiente'

  const vo2max = stats?.vo2maxHistory?.length
    ? stats.vo2maxHistory.at(-1)!.value.toFixed(1)
    : null

  return (
    <div className="min-w-0 flex-1 overflow-y-auto bg-[#070d1a]">
      <div className="px-3 pb-5 pt-5 sm:px-5 sm:pt-7 lg:px-6">
        <HeroSection
          athena={athena}
          week={week}
          lastWeek={lastWeek}
          ctl={ctl}
          atl={atl}
          tsb={tsb}
          vo2max={vo2max}
          lastSync={lastSync}
          sparkPoints={sparkPoints}
        />
        <AthenaDailyBriefCard athena={athena} />
      </div>

      <div className="space-y-5 px-3 py-4 sm:px-5 sm:py-5 lg:px-6">
        <InsightsPanel insights={athena.insights} />
        
        <AICoachCard
          athena={athena}
          tsb={tsb}
          ctl={ctl}
          atl={atl}
          weekCount={week.count}
          weekDistance={week.distance}
          weekTss={week.tss}
          lastWeekTss={lastWeek.tss}
          isAerobicFocused={isAerobicFocused}
        />

        <WeeklyGoalsCard />

        <RacePredictionsCard />

        <WeeklyCalendarCard activities={activities} />

        <TrainingSummaryCard />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <TrendCard />
          <ConsistencyCard />
        </div>

        <div className="rounded-xl border border-slate-700/40 bg-slate-800/50 p-4 sm:p-5">
          <SectionHeader
            left="Carga semanal (TSS) · 16 semanas"
            rightLink={{ to: '/fitness', label: 'Ver completo →' }}
          />

          <div className="flex h-20 items-end gap-1">
            {weeklyLoad.map((w, i) => {
              const isCurrentWeek = i === weeklyLoad.length - 1

              return (
                <div
                  key={w.week}
                  className="flex flex-1 flex-col items-center"
                  title={`${w.week}: ${w.tss} TSS`}
                >
                  <div
                    className="w-full rounded-t transition-all"
                    style={{
                      height: `${Math.max((w.tss / maxWeekTSS) * 100, 2)}%`,
                      background: isCurrentWeek
                        ? 'linear-gradient(to top, #3b82f6, #60a5fa)'
                        : '#334155',
                      boxShadow: isCurrentWeek ? '0 0 8px #3b82f660' : 'none',
                    }}
                  />
                </div>
              )
            })}
          </div>

          <div className="mt-1 flex justify-between">
            <span className="text-xs text-slate-600">{weeklyLoad[0]?.week}</span>
            <span className="text-xs font-medium text-blue-400">
              esta semana {week.tss > 0 ? `${Math.round(week.tss)} TSS` : ''}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="rounded-xl border border-slate-700/40 bg-slate-800/50 p-4 sm:p-5">
            <div className="mb-4 text-xs uppercase tracking-wider text-slate-500">
              Volumen · últimos 30 días
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { sport: 'running' as const, label: 'Running', color: '#ef4444', max: 20 },
                { sport: 'cycling' as const, label: 'Ciclismo', color: '#f97316', max: 30 },
                { sport: 'swimming' as const, label: 'Natación', color: '#3b82f6', max: 8 },
              ].map(({ sport, label, color, max }) => (
                <div key={sport} className="flex flex-col items-center gap-2">
                  <RadialProgress
                    value={sportHours[sport].hours}
                    max={max}
                    color={color}
                    size={80}
                    stroke={7}
                  >
                    <div className="text-center">
                      <div className="text-sm font-bold" style={{ color }}>
                        {sportHours[sport].hours.toFixed(1)}
                      </div>
                      <div className="text-xs text-slate-600">h</div>
                    </div>
                  </RadialProgress>

                  <div className="text-center">
                    <div className="text-xs font-medium text-slate-300">
                      {sportIcon(sport)} {label}
                    </div>
                    <div className="text-xs text-slate-600">de {max}h ref.</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-slate-700/50 pt-3 text-center text-xs text-slate-500">
              Total:{' '}
              <span className="font-medium text-slate-300">
                {totalHours.toFixed(1)}h
              </span>

              {totalHours > 0 && (
                <>
                  {' '}
                  · R {Math.round(percentages.running)}% · C{' '}
                  {Math.round(percentages.cycling)}% · N{' '}
                  {Math.round(percentages.swimming)}%
                </>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-700/40 bg-slate-800/50 p-4 sm:p-5">
            <div className="mb-1 text-xs uppercase tracking-wider text-slate-500">
              Zonas FC · 30 días
            </div>

            <div
              className="mb-2 text-xs"
              style={{ color: isAerobicFocused ? '#22c55e' : '#eab308' }}
            >
              {isAerobicFocused
                ? '✅ Buena base aeróbica (Z1+Z2 >60%)'
                : '⚠️ Añade más entrenamiento en Z1–Z2'}
            </div>

            <ResponsiveContainer width="100%" height={180}>
              <RadarChart
                data={zoneSlices}
                margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
              >
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis
                  dataKey="zone"
                  tick={{ fill: '#64748b', fontSize: 10 }}
                />
                <Radar
                  dataKey="pct"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  strokeWidth={1.5}
                />
                <Tooltip
                  contentStyle={{
                    background: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: 8,
                    fontSize: 11,
                  }}
                  formatter={(v: unknown) => [`${v}%`, 'Tiempo']}
                />
              </RadarChart>
            </ResponsiveContainer>

            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
              {zoneSlices.map(z => (
                <span key={z.zone} className="text-xs" style={{ color: z.color }}>
                  {z.zone} {z.pct}%
                </span>
              ))}
            </div>
          </div>
        </div>

        <section>
          <SectionHeader
            left="Últimas actividades"
            rightLink={{ to: '/activities', label: 'Ver todas →' }}
          />

          <div className="space-y-2">
            {activities.slice(0, 6).map(a => (
              <Link
                key={a.id}
                to={`/activity/${a.id}`}
                className="group flex flex-col gap-3 rounded-xl border border-slate-700/40 bg-slate-800/30 px-4 py-3 transition-all hover:border-slate-600/50 hover:bg-slate-800/70 sm:flex-row sm:items-center sm:gap-4"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      background: sportColor(a.sport),
                      boxShadow: `0 0 6px ${sportColor(a.sport)}88`,
                    }}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-slate-200 group-hover:text-white">
                      {a.title}
                    </div>

                    <div className="text-xs text-slate-500">
                      {daysAgo(a.startTime) === 0
                        ? 'Hoy'
                        : daysAgo(a.startTime) === 1
                          ? 'Ayer'
                          : `Hace ${daysAgo(a.startTime)}d`}
                      {' · '}
                      {sportIcon(a.sport)}
                    </div>
                  </div>
                </div>

                <div className="grid shrink-0 grid-cols-3 gap-3 text-left sm:flex sm:items-center sm:gap-5 sm:text-right">
                  {a.distance > 0 && (
                    <div>
                      <div className="text-sm font-bold text-slate-200">
                        {a.distance.toFixed(1)}
                        <span className="ml-0.5 text-xs text-slate-500">km</span>
                      </div>

                      {a.avgPace && (
                        <div className="text-xs text-slate-500">
                          {formatPace(a.avgPace)}
                        </div>
                      )}

                      {a.avgSpeed && !a.avgPace && (
                        <div className="text-xs text-slate-500">
                          {a.avgSpeed.toFixed(1)} km/h
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <div className="text-sm font-bold text-slate-200">
                      {formatDuration(a.duration)}
                    </div>

                    {a.avgHR > 0 && (
                      <div className="text-xs text-slate-500">{a.avgHR} bpm</div>
                    )}
                  </div>

                  {a.tss != null && (
                    <div className="sm:w-10 sm:text-right">
                      <div
                        className="text-sm font-bold"
                        style={{ color: sportColor(a.sport) }}
                      >
                        {Math.round(a.tss)}
                      </div>
                      <div className="text-xs text-slate-600">TSS</div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <SyncStatusCard />

        <div className="h-2" />
      </div>
    </div>
  )
}

function SectionHeader({
  left,
  right,
  rightLink,
}: {
  left: string
  right?: string
  rightLink?: { to: string; label: string }
}) {
  return (
    <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-xs uppercase tracking-widest text-slate-500">
        {left}
      </div>

      {right && <div className="text-xs text-slate-600">{right}</div>}

      {rightLink && (
        <Link to={rightLink.to} className="text-xs text-blue-400 hover:text-blue-300">
          {rightLink.label}
        </Link>
      )}
    </div>
  )
}