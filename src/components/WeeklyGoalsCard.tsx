import Card from './ui/Card'
import usePerformanceEngine from '../hooks/usePerformanceEngine'

type Recommendation = {
  type: 'success' | 'warning' | 'info'
  text: string
}

export default function WeeklyGoalsCard() {
  const { goals } = usePerformanceEngine()
  const recommendations = buildRecommendations(goals)

  const items = [
    { icon: '🏃', title: 'Running', current: goals.running.current, target: goals.running.target, unit: 'km' },
    { icon: '💪', title: 'Fuerza', current: goals.strength.current, target: goals.strength.target, unit: '' },
    { icon: '⚽', title: 'Padbol', current: goals.padbol.current, target: goals.padbol.target, unit: '' },
    { icon: '❤️', title: 'Zona 2', current: goals.zone2.current, target: goals.zone2.target, unit: '%' },
    { icon: '⚡', title: 'Calidad', current: goals.quality.current, target: goals.quality.target, unit: '' },
  ]

  const progress =
    items.reduce((sum, item) => sum + Math.min(item.current / item.target, 1), 0) / items.length

  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Objetivos
          </div>

          <h2 className="text-2xl font-black text-slate-100">
            Semana
          </h2>
        </div>

        <div className="text-right">
          <div className="text-3xl font-black text-blue-400">
            {Math.round(progress * 100)}%
          </div>

          <div className="text-xs text-slate-500">
            completado
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {items.map((item) => {
          const pct = Math.min((item.current / item.target) * 100, 100)

          return (
            <div key={item.title}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>

                  <span className="font-semibold text-slate-200">
                    {item.title}
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-300">
                  {formatValue(item.current, item.unit)}
                  {' / '}
                  {item.target}
                  {item.unit}
                </div>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 border-t border-slate-700 pt-5">
        <div className="mb-4 text-xs uppercase tracking-[0.25em] text-slate-500">
          Recomendaciones
        </div>

        <div className="space-y-3">
          {recommendations.map((recommendation) => (
            <div key={recommendation.text} className="flex items-start gap-3">
              <div
                className={`mt-1 h-2.5 w-2.5 rounded-full ${
                  recommendation.type === 'success'
                    ? 'bg-green-400'
                    : recommendation.type === 'warning'
                      ? 'bg-yellow-400'
                      : 'bg-blue-400'
                }`}
              />

              <div className="text-sm text-slate-300">
                {recommendation.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

function formatValue(value: number, unit: string) {
  if (unit === '%') return value.toFixed(0)
  if (unit === 'km') return value.toFixed(1)
  return value.toFixed(0)
}

function buildRecommendations(goals: {
  running: { current: number; target: number }
  strength: { current: number; target: number }
  padbol: { current: number; target: number }
  zone2: { current: number; target: number }
  quality: { current: number; target: number }
}): Recommendation[] {
  const recommendations: Recommendation[] = []

  const remainingKm = goals.running.target - goals.running.current

  if (remainingKm <= 0) {
    recommendations.push({
      type: 'success',
      text: 'Objetivo de running completado.',
    })
  } else {
    recommendations.push({
      type: 'warning',
      text: `Te faltan ${remainingKm.toFixed(1)} km para completar el objetivo semanal.`,
    })
  }

  if (goals.strength.current >= goals.strength.target) {
    recommendations.push({
      type: 'success',
      text: 'Objetivo de fuerza completado.',
    })
  } else {
    recommendations.push({
      type: 'warning',
      text: `Te falta ${goals.strength.target - goals.strength.current} sesión de fuerza.`,
    })
  }

  if (goals.padbol.current >= goals.padbol.target) {
    recommendations.push({
      type: 'success',
      text: 'Objetivo de padbol conseguido.',
    })
  }

  if (goals.quality.current < goals.quality.target) {
    recommendations.push({
      type: 'info',
      text: 'Una sesión de calidad completaría la planificación.',
    })
  }

  if (goals.zone2.current < goals.zone2.target) {
    recommendations.push({
      type: 'info',
      text: 'Conviene añadir más tiempo en Zona 2.',
    })
  }

  return recommendations
}