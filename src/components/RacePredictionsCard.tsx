import { Activity, BadgeCheck, Gauge, Medal, Sparkles } from 'lucide-react'

import Panel from './ui/Panel'
import usePerformanceEngine from '../hooks/usePerformanceEngine'

export default function RacePredictionsCard() {
  const { predictions } = usePerformanceEngine()

  const items = [
    { ...predictions.fiveK, accent: 'cyan' },
    { ...predictions.tenK, accent: 'blue' },
    { ...predictions.half, accent: 'violet' },
    { ...predictions.marathon, accent: 'amber' },
  ]

  const best = items.reduce((prev, current) =>
    current.confidence > prev.confidence ? current : prev,
  )

  return (
    <Panel variant="highlight" className="flex h-full flex-col p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-cyan-200">
            <Sparkles size={13} />
            Athena Prediction
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white">
            Marcas estimadas
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            Estimación basada en tu forma actual.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 text-right">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
            Mejor señal
          </div>
          <div className="mt-1 text-sm font-black text-emerald-200">
            {best.label}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map(prediction => (
          <PredictionTile
            key={prediction.label}
            label={prediction.label}
            time={prediction.predictedTime}
            confidence={prediction.confidence}
            confidenceLabel={prediction.confidenceLabel}
            marginSeconds={prediction.marginSeconds}
            accent={prediction.accent}
          />
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/35 p-4">
        <div className="mb-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">
          <Gauge size={13} className="text-cyan-300" />
          Lectura rápida
        </div>

        <p className="text-sm leading-6 text-slate-300">
          La predicción con mayor confianza es <strong className="text-cyan-200">{best.label}</strong>.
          Mantener consistencia y fuerza hará que estas marcas bajen sin forzar intensidad extra.
        </p>
      </div>
    </Panel>
  )
}

function PredictionTile({
  label,
  time,
  confidence,
  confidenceLabel,
  marginSeconds,
  accent,
}: {
  label: string
  time: string
  confidence: number
  confidenceLabel: string
  marginSeconds: number
  accent: string
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-700/45 bg-slate-950/40 p-4">
      <div className={`absolute -right-8 -top-8 h-20 w-20 rounded-full ${accentGlow(accent)} blur-2xl`} />

      <div className="relative">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${accentBg(accent)} ${accentText(accent)}`}>
              {label.toLowerCase().includes('marat') ? (
                <Medal size={16} />
              ) : (
                <Activity size={16} />
              )}
            </div>

            <div className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">
              {label}
            </div>
          </div>

          <div className={`flex items-center gap-1 text-xs font-black ${accentText(accent)}`}>
            <BadgeCheck size={13} />
            {confidence}%
          </div>
        </div>

        <div className={`text-3xl font-black leading-none ${accentText(accent)}`}>
          {time}
        </div>

        <div className="mt-2 flex items-center justify-between gap-3 text-xs text-slate-500">
          <span>{confidenceLabel}</span>
          {marginSeconds > 0 && <span>± {formatMargin(marginSeconds)}</span>}
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div
            className={`h-full rounded-full ${accentGradient(accent)}`}
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>
    </div>
  )
}

function formatMargin(seconds: number) {
  if (seconds < 60) return `${seconds}s`

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`
}

function accentBg(accent: string) {
  const map: Record<string, string> = {
    cyan: 'bg-cyan-400/10',
    blue: 'bg-blue-400/10',
    violet: 'bg-violet-400/10',
    amber: 'bg-amber-400/10',
  }
  return map[accent] ?? map.cyan
}

function accentText(accent: string) {
  const map: Record<string, string> = {
    cyan: 'text-cyan-300',
    blue: 'text-blue-300',
    violet: 'text-violet-300',
    amber: 'text-amber-300',
  }
  return map[accent] ?? map.cyan
}

function accentGlow(accent: string) {
  const map: Record<string, string> = {
    cyan: 'bg-cyan-400/20',
    blue: 'bg-blue-400/20',
    violet: 'bg-violet-400/20',
    amber: 'bg-amber-400/20',
  }
  return map[accent] ?? map.cyan
}

function accentGradient(accent: string) {
  const map: Record<string, string> = {
    cyan: 'bg-gradient-to-r from-cyan-400 to-blue-500',
    blue: 'bg-gradient-to-r from-blue-400 to-indigo-500',
    violet: 'bg-gradient-to-r from-violet-400 to-fuchsia-500',
    amber: 'bg-gradient-to-r from-amber-400 to-orange-500',
  }
  return map[accent] ?? map.cyan
}