import Card from './ui/Card'
import usePerformanceEngine from '../hooks/usePerformanceEngine'

export default function TrendCard() {
  const { trend } = usePerformanceEngine()

  const color =
    trend.status === 'improving'
      ? 'text-green-400'
      : trend.status === 'declining'
        ? 'text-red-400'
        : 'text-blue-400'

  return (
    <Card>
      <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
        Tendencia
      </div>

      <div className={`mt-2 text-3xl font-black ${color}`}>
        {trend.label}
      </div>

      <div className="mt-2 text-sm text-slate-400">
        Últimos 30 días vs 30 anteriores
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Metric label="Sesiones" value={trend.current30.sessions} />
        <Metric label="Km" value={trend.current30.distanceKm.toFixed(1)} />
      </div>
    </Card>
  )
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-slate-950/40 p-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-bold text-slate-100">{value}</div>
    </div>
  )
}