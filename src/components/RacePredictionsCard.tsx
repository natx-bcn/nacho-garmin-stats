import Card from './ui/Card'
import Badge from './ui/Badge'
import usePerformanceEngine from '../hooks/usePerformanceEngine'

export default function RacePredictionsCard() {
  const { predictions } = usePerformanceEngine()

  const items = [
    predictions.fiveK,
    predictions.tenK,
    predictions.half,
    predictions.marathon,
  ]

  return (
    <Card>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Predicción
          </div>

          <h2 className="mt-1 text-2xl font-black text-slate-100">
            Marcas estimadas
          </h2>
        </div>

        <Badge color="blue">Engine</Badge>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((prediction) => (
          <div
            key={prediction.label}
            className="rounded-xl border border-slate-700/40 bg-slate-950/35 p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs uppercase tracking-wider text-slate-500">
                {prediction.label}
              </div>

              <div className="text-xs font-bold text-blue-300">
                {prediction.confidence}%
              </div>
            </div>

            <div className="mt-2 text-3xl font-black text-blue-400">
              {prediction.predictedTime}
            </div>

            {prediction.marginSeconds > 0 && (
              <div className="mt-1 text-xs text-slate-500">
                ± {formatMargin(prediction.marginSeconds)}
              </div>
            )}

            <div className="mt-3 text-xs text-slate-500">
              Confianza: {prediction.confidenceLabel}
            </div>

            <div className="mt-3 text-xs leading-relaxed text-slate-500">
              {prediction.sourceLabel}
              {prediction.sourceTitle && (
                <>
                  <br />
                  {prediction.sourceTitle}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function formatMargin(seconds: number) {
  if (seconds < 60) {
    return `${seconds}s`
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`
}