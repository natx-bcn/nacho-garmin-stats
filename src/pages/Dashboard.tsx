import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useActivityStore } from '../stores/activityStore'
import { formatDuration, formatPace, sportIcon, sportColor } from '../utils/formatters'
import { daysAgo } from '../utils/date'
import { useFitnessHistory } from '../hooks/useFitnessHistory'
import { useWeekComparison } from '../hooks/useWeekComparison'
import { useWeeklyLoad } from '../hooks/useWeeklyLoad'
import RadialProgress from '../components/RadialProgress'
import FormBadge from '../components/FormBadge'
import DeltaBadge from '../components/DeltaBadge'
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'

function LoadingScreen() {
  return (
    <div className="flex-1 flex items-center justify-center bg-[#080f1e]">
      <div className="text-slate-400 animate-pulse text-sm">Cargando...</div>
    </div>
  )
}

function EmptyScreen() {
  return (
    <div className="flex-1 p-8 max-w-2xl bg-[#080f1e]">
      <div className="bg-amber-950/40 border border-amber-800/50 rounded-xl p-6">
        <h2 className="text-amber-300 font-medium text-lg mb-2">Sin datos de Garmin</h2>
        <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 space-y-1 mt-3">
          <div>cp .env.example .env</div>
          <div>pip install -r fetch/requirements.txt</div>
          <div>python fetch/sync.py --limit 30 --no-gpx</div>
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
  const weeklyLoad = useWeeklyLoad(16)

  const data = useMemo(() => buildDashboardData(activities), [activities])

  if (loading) return <LoadingScreen />
  if (error || activities.length === 0) return <EmptyScreen />

  const tsb = fitness?.tsb ?? 0
  const ctl = fitness?.ctl ?? 0
  const atl = fitness?.atl ?? 0
  const tsbColor =
    tsb > 10 ? '#22c55e' :
    tsb > -5 ? '#3b82f6' :
    tsb > -15 ? '#eab308' :
    tsb > -25 ? '#f97316' :
    '#ef4444'

  const state = getTrainingState(tsb, week.tss, lastWeek.tss)
  const recommendation = getRecommendation(tsb, week.tss, lastWeek.tss, data.daysSinceLastActivity)

  return (
    <div className="flex-1 overflow-y-auto bg-[#080f1e] text-slate-100">
      <div className="px-6 pt-7 pb-6 border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-[#071225]">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Dashboard</div>
            <h1 className="text-3xl font-black">Resumen de entrenamiento</h1>
            <p className="text-slate-400 text-sm mt-1">Estado actual, carga, objetivos y recomendación para hoy.</p>
          </div>

          <div className="text-right text-xs text-slate-500">
            <div>{stats?.totalActivities ?? activities.length} actividades</div>
            {stats?.syncedAt && (
              <div>Sync: {new Date(stats.syncedAt).toLocaleString('es-ES')}</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3">
          <MetricCard label="Km semana" value={week.distance.toFixed(1)} unit="km" delta={week.distance - lastWeek.distance} />
          <MetricCard label="Entrenos" value={String(week.count)} delta={week.count - lastWeek.count} />
          <MetricCard label="Tiempo" value={(week.duration / 3600).toFixed(1)} unit="h" delta={(week.duration - lastWeek.duration) / 3600} />
          <MetricCard label="Carga" value={Math.round(week.tss).toString()} unit="TSS" delta={week.tss - lastWeek.tss} />
          <MetricCard label="Desnivel" value={Math.round(data.weekElevation).toString()} unit="m" delta={data.weekElevation - data.lastWeekElevation} />
        </div>
      </div>

      <div className="px-6 py-5 space-y-5">
        <div className="grid grid-cols-3 gap-4">
          <Panel className="col-span-1">
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-4">Estado actual</div>
            <div className="flex items-center justify-between gap-5">
              <div>
                <div className="text-3xl font-black mb-2" style={{ color: state.color }}>{state.label}</div>
                <p className="text-sm text-slate-400 leading-relaxed">{state.description}</p>
              </div>

              <RadialProgress value={Math.max(0, Math.min(100, tsb + 50))} max={100} color={tsbColor} size={118} stroke={9}>
                <div className="text-center">
                  <div className="text-3xl font-black text-white">{tsb > 0 ? '+' : ''}{Math.round(tsb)}</div>
                  <div className="text-xs text-slate-500">FORMA</div>
                </div>
              </RadialProgress>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-700/40">
              <MiniStat label="Fitness" value={Math.round(ctl)} color="#3b82f6" />
              <MiniStat label="Fatiga" value={Math.round(atl)} color="#f97316" />
              <MiniStat label="Forma" value={Math.round(tsb)} color={tsbColor} />
            </div>

            <div className="mt-5 p-4 rounded-xl border border-green-500/20 bg-green-500/10">
              <div className="text-xs uppercase tracking-widest text-green-400 mb-2">Recomendación para hoy</div>
              <div className="text-sm text-slate-200 font-medium">{recommendation.title}</div>
              <div className="text-xs text-slate-400 mt-1 leading-relaxed">{recommendation.detail}</div>
            </div>
          </Panel>

          <Panel className="col-span-2">
            <SectionHeader left="Objetivos running" rightLink={{ to: '/performance', label: 'Ver rendimiento →' }} />
            <div className="space-y-5">
              {data.goals.map(goal => (
                <GoalRow key={goal.label} {...goal} />
              ))}
            </div>
          </Panel>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Panel className="col-span-2">
            <SectionHeader left="Calendario semanal" right="plan recomendado" />
            <div className="grid grid-cols-7 gap-2">
              {weeklyPlan.map(day => (
                <div
                  key={day.day}
                  className={`rounded-xl border p-3 text-center ${
                    day.today ? 'border-blue-500/60 bg-blue-500/10' : 'border-slate-700/40 bg-slate-900/40'
                  }`}
                >
                  <div className="text-xs text-slate-500 uppercase">{day.day}</div>
                  <div className="text-2xl mt-2">{day.icon}</div>
                  <div className="text-xs font-medium mt-2 text-slate-200">{day.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{day.detail}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionHeader left="Coach crítico" />
            <CoachList items={getCoachMessages(tsb, week.tss, lastWeek.tss, data)} />
          </Panel>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Panel>
            <SectionHeader left="Tendencias" right="últimos 30 días" />
            <TrendRow label="Ritmo running" value={data.trends.pace} goodDown />
            <TrendRow label="FC media" value={data.trends.hr} goodDown />
            <TrendRow label="Volumen" value={data.trends.volume} />
            <TrendRow label="Carga" value={week.tss - lastWeek.tss} />
          </Panel>

          <Panel className="col-span-2">
            <SectionHeader left="Fitness vs fatiga" rightLink={{ to: '/fitness', label: 'Ver completo →' }} />
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkPoints}>
                  <XAxis dataKey="date" hide />
                  <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="ctl" name="Fitness" stroke="#3b82f6" strokeWidth={2} fill="#3b82f633" dot={false} />
                  <Area type="monotone" dataKey="atl" name="Fatiga" stroke="#f97316" strokeWidth={2} fill="#f9731633" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Panel className="col-span-2">
            <SectionHeader left="Carga semanal" right="16 semanas" />
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyLoad}>
                  <XAxis dataKey="week" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="tss" name="TSS" stroke="#60a5fa" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel>
            <SectionHeader left="Predicción actual" right="estimada" />
            <Prediction label="5K" value={data.predictions.fiveK} target="22:30" />
            <Prediction label="10K" value={data.predictions.tenK} target="50:00" />
            <Prediction label="Media" value={data.predictions.half} target="1:50:00" />
          </Panel>
        </div>

        <section>
          <SectionHeader left="Últimas actividades" rightLink={{ to: '/activities', label: 'Ver todas →' }} />
          <div className="space-y-2">
            {activities.slice(0, 6).map(a => (
              <Link
                key={a.id}
                to={`/activity/${a.id}`}
                className="flex items-center gap-4 px-4 py-3 rounded-xl border border-slate-700/40 bg-slate-800/30 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all group"
              >
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: sportColor(a.sport), boxShadow: `0 0 6px ${sportColor(a.sport)}88` }} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-slate-200 truncate group-hover:text-white">{a.title}</div>
                  <div className="text-xs text-slate-500">
                    {daysAgo(a.startTime) === 0 ? 'Hoy' : daysAgo(a.startTime) === 1 ? 'Ayer' : `Hace ${daysAgo(a.startTime)}d`}
                    {' · '}{sportIcon(a.sport)}
                  </div>
                </div>
                <div className="flex items-center gap-5 shrink-0 text-right">
                  {a.distance > 0 && (
                    <div>
                      <div className="text-sm font-bold text-slate-200">{a.distance.toFixed(1)}<span className="text-xs text-slate-500 ml-0.5">km</span></div>
                      {a.avgPace && <div className="text-xs text-slate-500">{formatPace(a.avgPace)}</div>}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-bold text-slate-200">{formatDuration(a.duration)}</div>
                    {a.avgHR > 0 && <div className="text-xs text-slate-500">{a.avgHR} bpm</div>}
                  </div>
                  {a.tss != null && (
                    <div className="w-10 text-right">
                      <div className="text-sm font-bold" style={{ color: sportColor(a.sport) }}>{Math.round(a.tss)}</div>
                      <div className="text-xs text-slate-600">TSS</div>
                    </div>
                  )}
                  <div className="text-slate-600 group-hover:text-slate-400 text-xs">→</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function buildDashboardData(activities: any[]) {
  const now = new Date()
  const running = activities.filter(a => a.sport === 'running' && a.distance > 0 && a.duration > 0)
  const weekStart = getStartOfWeek(now)
  const lastWeekStart = new Date(weekStart)
  lastWeekStart.setDate(lastWeekStart.getDate() - 7)

  const thisWeek = activities.filter(a => new Date(a.startTime) >= weekStart)
  const lastWeek = activities.filter(a => {
    const d = new Date(a.startTime)
    return d >= lastWeekStart && d < weekStart
  })

  const last30 = activities.filter(a => diffDays(now, new Date(a.startTime)) <= 30)
  const prev30 = activities.filter(a => {
    const d = diffDays(now, new Date(a.startTime))
    return d > 30 && d <= 60
  })

  const bestPace = getBestRecentPace(running)
  const predictions = {
    fiveK: secondsToRaceTime(bestPace * Math.pow(5 / 5, 1.06) * 5),
    tenK: secondsToRaceTime(bestPace * Math.pow(10 / 5, 1.06) * 10),
    half: secondsToRaceTime(bestPace * Math.pow(21.097 / 5, 1.06) * 21.097),
  }

  return {
    weekElevation: sum(thisWeek, 'elevationGain'),
    lastWeekElevation: sum(lastWeek, 'elevationGain'),
    daysSinceLastActivity: activities[0]?.startTime ? diffDays(now, new Date(activities[0].startTime)) : 99,
    predictions,
    goals: [
      buildGoal('5K — Sub 22:30', predictions.fiveK, 22 * 60 + 30, '#22c55e'),
      buildGoal('10K — Sub 50:00', predictions.tenK, 50 * 60, '#f97316'),
      buildGoal('Media — Sub 1:50:00', predictions.half, 110 * 60, '#3b82f6'),
    ],
    trends: {
      pace: avgPace(last30) - avgPace(prev30),
      hr: avg(last30, 'avgHR') - avg(prev30, 'avgHR'),
      volume: sum(last30, 'distance') - sum(prev30, 'distance'),
    },
  }
}

function getTrainingState(tsb: number, weekTss: number, lastWeekTss: number) {
  if (tsb < -25) return { label: 'Carga muy alta', color: '#ef4444', description: 'La fatiga está alta. Prioriza descanso, fuerza suave o rodaje muy fácil.' }
  if (tsb < -12) return { label: 'Cuidado', color: '#f97316', description: 'Estás acumulando carga. Puedes mejorar, pero evita meter intensidad extra.' }
  if (weekTss > lastWeekTss * 1.3 && lastWeekTss > 0) return { label: 'Subida fuerte', color: '#eab308', description: 'La semana está creciendo rápido. Vigila gemelos, sóleo y sensación de piernas.' }
  if (tsb > 10) return { label: 'Fresco', color: '#22c55e', description: 'Buena disponibilidad para entrenar con calidad si las piernas acompañan.' }
  return { label: 'Muy bien', color: '#22c55e', description: 'Carga controlada y buena situación para seguir construyendo forma.' }
}

function getRecommendation(tsb: number, weekTss: number, lastWeekTss: number, daysSinceLastActivity: number) {
  if (daysSinceLastActivity >= 2) return { title: 'Rodaje suave o fuerza', detail: 'Vienes con descanso suficiente. Buena opción para activar sin pasarte.' }
  if (tsb < -20) return { title: 'Descanso activo', detail: 'Evita series. Prioriza movilidad, fuerza preventiva o paseo largo.' }
  if (weekTss > lastWeekTss * 1.25 && lastWeekTss > 0) return { title: 'No subir más la carga', detail: 'Mantén intensidad baja. La semana ya va por encima de la anterior.' }
  if (tsb > 5) return { title: 'Calidad controlada', detail: 'Puedes hacer calidad, pero sin convertirla en carrera. Mejor control que ego.' }
  return { title: 'Fuerza + movilidad', detail: 'Día ideal para reforzar gemelos, sóleo, glúteo, core y aductores.' }
}

function getCoachMessages(tsb: number, weekTss: number, lastWeekTss: number, data: any) {
  const messages = ['Buena base para seguir progresando.']
  if (weekTss > lastWeekTss) messages.push('La carga semanal va por encima de la semana pasada.')
  if (tsb < -15) messages.push('No haría series duras mañana.')
  if (data.daysSinceLastActivity === 0) messages.push('Hoy ya has sumado actividad: recupera bien.')
  messages.push('Prioriza fuerza preventiva dos veces por semana.')
  return messages
}

function buildGoal(label: string, prediction: string, targetSeconds: number, color: string) {
  const predicted = raceTimeToSeconds(prediction)
  const progress = Math.max(5, Math.min(100, Math.round((targetSeconds / predicted) * 100)))
  const diff = predicted - targetSeconds
  return {
    label,
    prediction,
    progress,
    color,
    remaining: diff <= 0 ? 'Objetivo conseguido' : `Te faltan ${secondsToShort(diff)}`,
  }
}

function MetricCard({ label, value, unit, delta }: { label: string; value: string; unit?: string; delta?: number }) {
  return (
    <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-4">
      <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">{label}</div>
      <div className="text-2xl font-black text-slate-100">
        {value}<span className="text-sm text-slate-500 ml-1">{unit}</span>
      </div>
      {delta != null && <DeltaBadge value={delta} unit={unit ? ` ${unit}` : ''} />}
    </div>
  )
}

function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-slate-900/55 border border-slate-700/40 rounded-xl p-5 ${className}`}>{children}</div>
}

function MiniStat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="text-xs text-slate-500 uppercase">{label}</div>
      <div className="text-xl font-black" style={{ color }}>{value}</div>
    </div>
  )
}

function GoalRow({ label, prediction, progress, color, remaining }: any) {
  return (
    <div className="grid grid-cols-[1fr_2fr_90px] gap-4 items-center">
      <div>
        <div className="text-sm font-semibold text-slate-200">{label}</div>
        <div className="text-xs text-slate-500">Predicción actual</div>
        <div className="text-2xl font-black mt-1" style={{ color }}>{prediction}</div>
      </div>
      <div>
        <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${progress}%`, background: color }} />
        </div>
        <div className="text-xs text-slate-500 mt-2 text-right">{remaining}</div>
      </div>
      <div className="text-right text-2xl font-black text-slate-100">{progress}%</div>
    </div>
  )
}

function CoachList({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={item} className="flex gap-3 text-sm text-slate-300">
          <span className={i < 2 ? 'text-green-400' : 'text-amber-400'}>{i < 2 ? '✔' : '●'}</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}

function TrendRow({ label, value, goodDown = false }: { label: string; value: number; goodDown?: boolean }) {
  const positive = goodDown ? value < 0 : value > 0
  const arrow = Math.abs(value) < 0.01 ? '→' : positive ? '↗' : '↘'
  const color = Math.abs(value) < 0.01 ? '#94a3b8' : positive ? '#22c55e' : '#ef4444'
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
      <div className="text-sm text-slate-300">{label}</div>
      <div className="text-xl font-black" style={{ color }}>{arrow}</div>
    </div>
  )
}

function Prediction({ label, value, target }: { label: string; value: string; target: string }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-800 last:border-0">
      <div>
        <div className="text-sm text-slate-400">{label}</div>
        <div className="text-xs text-slate-600">Objetivo {target}</div>
      </div>
      <div className="text-2xl font-black text-blue-400">{value}</div>
    </div>
  )
}

function SectionHeader({ left, right, rightLink }: { left: string; right?: string; rightLink?: { to: string; label: string } }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="text-xs text-slate-500 uppercase tracking-widest">{left}</div>
      {right && <div className="text-xs text-slate-600">{right}</div>}
      {rightLink && <Link to={rightLink.to} className="text-xs text-blue-400 hover:text-blue-300">{rightLink.label}</Link>}
    </div>
  )
}

const weeklyPlan = [
  { day: 'Lun', icon: '⚽', title: 'Padbol', detail: 'Suave', today: false },
  { day: 'Mar', icon: '🏃', title: 'Calidad', detail: 'Series', today: false },
  { day: 'Mié', icon: '🏋️', title: 'Fuerza', detail: 'Preventiva', today: false },
  { day: 'Jue', icon: '⚽', title: 'Padbol', detail: 'Control', today: false },
  { day: 'Vie', icon: '🏋️', title: 'Fuerza', detail: 'Descarga', today: false },
  { day: 'Sáb', icon: '🏃', title: 'Tempo', detail: 'Medio', today: false },
  { day: 'Dom', icon: '🏃', title: 'Tirada', detail: 'Suave', today: true },
]

function getStartOfWeek(date: Date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function diffDays(a: Date, b: Date) {
  return Math.floor((a.getTime() - b.getTime()) / 86400000)
}

function sum(items: any[], field: string) {
  return items.reduce((acc, item) => acc + Number(item[field] || 0), 0)
}

function avg(items: any[], field: string) {
  const values = items.map(i => Number(i[field] || 0)).filter(Boolean)
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0
}

function avgPace(items: any[]) {
  const running = items.filter(a => a.sport === 'running' && a.avgPace)
  return avg(running, 'avgPace')
}

function getBestRecentPace(running: any[]) {
  const candidates = running
    .filter(a => a.distance >= 4.5 && a.distance <= 15 && a.duration > 0)
    .slice(0, 50)
    .map(a => a.duration / a.distance)
    .filter(Boolean)

  if (!candidates.length) return 300
  return Math.min(...candidates)
}

function secondsToRaceTime(totalSeconds: number) {
  const s = Math.round(totalSeconds)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  return `${m}:${String(sec).padStart(2, '0')}`
}

function raceTimeToSeconds(time: string) {
  const parts = time.split(':').map(Number)
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  return parts[0] * 60 + parts[1]
}

function secondsToShort(seconds: number) {
  if (seconds < 60) return `${Math.round(seconds)}s`
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}