import Card from './ui/Card'
import useWeeklyGoals from '../hooks/useWeeklyGoals'

export default function WeeklyGoalsCard() {
  const goals = useWeeklyGoals()

  const items = [
    {
      icon: '🏃',
      title: 'Running',
      current: goals.running.current,
      target: goals.running.target,
      unit: 'km',
    },
    {
      icon: '💪',
      title: 'Fuerza',
      current: goals.strength.current,
      target: goals.strength.target,
      unit: '',
    },
    {
      icon: '⚽',
      title: 'Padbol',
      current: goals.padbol.current,
      target: goals.padbol.target,
      unit: '',
    },
    {
      icon: '❤️',
      title: 'Zona 2',
      current: goals.zone2.current,
      target: goals.zone2.target,
      unit: '%',
    },
    {
      icon: '⚡',
      title: 'Calidad',
      current: goals.quality.current,
      target: goals.quality.target,
      unit: '',
    },
  ]

  const progress =
    items.reduce(
      (sum, item) => sum + Math.min(item.current / item.target, 1),
      0,
    ) / items.length

  return (
    <Card>

      <div className="flex items-center justify-between mb-5">

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

          const pct = Math.min(
            (item.current / item.target) * 100,
            100,
          )

          return (

            <div key={item.title}>

              <div className="flex justify-between items-center mb-2">

                <div className="flex items-center gap-2">

                  <span className="text-lg">
                    {item.icon}
                  </span>

                  <span className="font-semibold text-slate-200">
                    {item.title}
                  </span>

                </div>

                <div className="text-sm font-bold text-slate-300">

                  {item.current.toFixed( item.unit === '%' ? 0 : 1 )}

                  {item.unit}

                  {' / '}

                  {item.target}

                  {item.unit}

                </div>

              </div>

              <div className="h-3 rounded-full bg-slate-800 overflow-hidden">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                  }}
                />

              </div>

            </div>

          )

        })}

      </div>

    </Card>
  )
}