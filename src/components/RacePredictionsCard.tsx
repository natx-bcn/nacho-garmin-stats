import Card from './ui/Card'
import Badge from './ui/Badge'
import useRacePredictions from '../hooks/useRacePredictions'

export default function RacePredictionsCard() {
  const predictions = useRacePredictions()

  if (predictions.length === 0) {
    return (
      <Card>
        <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
          Predicción
        </div>

        <h2 className="mt-1 text-2xl font-black text-slate-100">
          Marcas estimadas
        </h2>

        <p className="mt-4 text-sm text-slate-400">
          Aún no hay suficientes actividades de running para calcular predicciones.
        </p>
      </Card>
    )
  }

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

        <Badge color="blue">Beta</Badge>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {predictions.map((prediction) => (
          <div
            key={prediction.label}
            className="rounded-xl border border-slate-700/40 bg-slate-950/35 p-4"
          >
            <div className="text-xs uppercase tracking-wider text-slate-500">
              {prediction.label}
            </div>

            <div className="mt-2 text-3xl font-black text-blue-400">
              {prediction.predictedTime}
            </div>

            <div className="mt-2 text-xs text-slate-500">
              Confianza: {prediction.confidence}
            </div>

            <div className="mt-3 text-xs leading-relaxed text-slate-500">
              Basado en: {prediction.source}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}