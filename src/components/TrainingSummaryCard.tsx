import Card from './ui/Card'
import usePerformanceEngine from '../hooks/usePerformanceEngine'

export default function TrainingSummaryCard() {
  const { weeklyTrainingSummary } = usePerformanceEngine()

  const items = [
    { label: 'Calidad', value: weeklyTrainingSummary.qualitySessions, icon: '⚡' },
    { label: 'Suaves', value: weeklyTrainingSummary.easySessions, icon: '🟢' },
    { label: 'Tirada larga', value: weeklyTrainingSummary.longRuns, icon: '🏃' },
    { label: 'Fuerza', value: weeklyTrainingSummary.strengthSessions, icon: '💪' },
    { label: 'Padbol', value: weeklyTrainingSummary.padbolSessions, icon: '⚽' },
  ]

  return (
    <Card>
      <div className="mb-5">
        <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
          Entrenamiento
        </div>

        <h2 className="mt-1 text-2xl font-black text-slate-100">
          Resumen semanal
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-700/40 bg-slate-950/35 p-3 text-center"
          >
            <div className="text-lg">{item.icon}</div>

            <div className="mt-1 text-2xl font-black text-slate-100">
              {item.value}
            </div>

            <div className="mt-1 text-xs text-slate-500">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Metric
          label="Intensidad media"
          value={weeklyTrainingSummary.averageIntensity}
          suffix="/100"
        />

        <Metric
          label="Fatiga media"
          value={weeklyTrainingSummary.averageFatigue}
          suffix="/100"
        />

        <Metric
          label="Recovery medio"
          value={weeklyTrainingSummary.averageRecoveryHours}
          suffix="h"
        />
      </div>
    </Card>
  )
}

function Metric({
  label,
  value,
  suffix,
}: {
  label: string
  value: number
  suffix: string
}) {
  return (
    <div className="rounded-xl border border-slate-700/40 bg-slate-950/35 p-4">
      <div className="text-xs uppercase tracking-wider text-slate-500">
        {label}
      </div>

      <div className="mt-2 text-2xl font-black text-blue-400">
        {value}
        <span className="ml-1 text-sm text-slate-500">
          {suffix}
        </span>
      </div>
    </div>
  )
}