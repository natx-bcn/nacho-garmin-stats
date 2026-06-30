import Card from './ui/Card'
import usePerformanceEngine from '../hooks/usePerformanceEngine'

export default function ConsistencyCard() {
  const { consistency } = usePerformanceEngine()

  const color =
    consistency.label === 'Alta'
      ? 'text-green-400'
      : consistency.label === 'Media'
        ? 'text-yellow-400'
        : 'text-red-400'

  return (
    <Card>
      <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
        Consistencia
      </div>

      <div className={`mt-2 text-3xl font-black ${color}`}>
        {consistency.label}
      </div>

      <div className="mt-2 text-sm text-slate-400">
        {consistency.activeDays30} días activos / 30
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Metric label="Racha" value={`${consistency.currentStreak} días`} />
        <Metric label="Score" value={`${consistency.score}/100`} />
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