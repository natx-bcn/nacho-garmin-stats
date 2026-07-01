import {
  Activity,
  Dumbbell,
  HeartPulse,
  Target,
  Trophy,
  Zap,
} from 'lucide-react'

import Panel from './ui/Panel'
import usePerformanceEngine from '../hooks/usePerformanceEngine'

type Recommendation = {
  type: 'success' | 'warning' | 'info'
  text: string
}

export default function WeeklyGoalsCard() {
  const { goals } = usePerformanceEngine()
  const recommendations = buildRecommendations(goals)

  const items = [
    { icon: Activity, title: 'Running', current: goals.running.current, target: goals.running.target, unit: 'km', tone: 'cyan' },
    { icon: Dumbbell, title: 'Fuerza', current: goals.strength.current, target: goals.strength.target, unit: '', tone: 'emerald' },
    { icon: Trophy, title: 'Padbol', current: goals.padbol.current, target: goals.padbol.target, unit: '', tone: 'amber' },
    { icon: HeartPulse, title: 'Zona 2', current: goals.zone2.current, target: goals.zone2.target, unit: '%', tone: 'rose' },
    { icon: Zap, title: 'Calidad', current: goals.quality.current, target: goals.quality.target, unit: '', tone: 'violet' },
  ]

  const progress =
    items.reduce((sum, item) => sum + Math.min(item.current / item.target, 1), 0) /
    items.length

  const mainRecommendation = recommendations[0]

  return (
    <Panel variant="default" className="flex h-full flex-col p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-cyan-200">
            <Target size={13} />
            Objetivos
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white">
            Misión semanal
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            Progreso de tus pilares de entrenamiento.
          </p>
        </div>

        <div className="text-right">
          <div className="text-4xl font-black leading-none text-cyan-300">
            {Math.round(progress * 100)}
            <span className="text-xl text-slate-500">%</span>
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">
            completado
          </div>
        </div>
      </div>

      <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-500"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      <div className="grid gap-3">
        {items.map(item => {
          const pct = Math.min((item.current / item.target) * 100, 100)
          const Icon = item.icon

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-700/45 bg-slate-950/35 px-4 py-3"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${toneBg(item.tone)} ${toneText(item.tone)}`}>
                    <Icon size={16} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-100">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {Math.round(pct)}% del objetivo
                    </p>
                  </div>
                </div>

                <div className="text-right text-sm font-black text-slate-200">
                  {formatValue(item.current, item.unit)}
                  <span className="text-slate-500"> / {item.target}{item.unit}</span>
                </div>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full ${toneGradient(item.tone)} transition-all duration-500`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {mainRecommendation && (
        <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
          <div className="mb-1 text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
            Athena recomienda
          </div>
          <p className="text-sm leading-6 text-slate-300">
            {mainRecommendation.text}
          </p>
        </div>
      )}
    </Panel>
  )
}

function formatValue(value: number, unit: string) {
  if (unit === '%') return value.toFixed(0)
  if (unit === 'km') return value.toFixed(1)
  return value.toFixed(0)
}

function toneBg(tone: string) {
  const tones: Record<string, string> = {
    cyan: 'bg-cyan-400/10',
    emerald: 'bg-emerald-400/10',
    amber: 'bg-amber-400/10',
    rose: 'bg-rose-400/10',
    violet: 'bg-violet-400/10',
  }
  return tones[tone] ?? tones.cyan
}

function toneText(tone: string) {
  const tones: Record<string, string> = {
    cyan: 'text-cyan-300',
    emerald: 'text-emerald-300',
    amber: 'text-amber-300',
    rose: 'text-rose-300',
    violet: 'text-violet-300',
  }
  return tones[tone] ?? tones.cyan
}

function toneGradient(tone: string) {
  const tones: Record<string, string> = {
    cyan: 'bg-gradient-to-r from-cyan-400 to-blue-500',
    emerald: 'bg-gradient-to-r from-emerald-400 to-cyan-400',
    amber: 'bg-gradient-to-r from-amber-400 to-orange-500',
    rose: 'bg-gradient-to-r from-rose-400 to-pink-500',
    violet: 'bg-gradient-to-r from-violet-400 to-indigo-500',
  }
  return tones[tone] ?? tones.cyan
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