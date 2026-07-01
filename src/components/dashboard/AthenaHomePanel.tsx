import {
  Activity,
  Brain,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

import { useState } from 'react'

import Panel from '../ui/Panel'
import MetricChip from '../ui/MetricChip'
import PrimaryButton from '../ui/PrimaryButton'
import SecondaryButton from '../ui/SecondaryButton'

type AthenaLike = {
  readiness?: {
    score?: number
    visual?: {
      title?: string
      tone?: string
    }
    reason?: string
  }
  coach?: {
    recommendation?: string
    confidence?: number
    reasons?: string[]
    warnings?: string[]
  }
  dailyBrief?: {
    headline?: string
    summary?: string
    highlights?: string[]
    recommendation?: string
  }
  insights?: Array<{
    title?: string
    description?: string
    severity?: string
  }>
}

interface AthenaHomePanelProps {
  athena: AthenaLike
  tsb?: number
  ctl?: number
  atl?: number
  weekDistance?: number
  weekTss?: number
}

function getReadyTone(score: number) {
  if (score >= 80) return 'good'
  if (score >= 55) return 'warning'
  return 'danger'
}

function getRecommendation(athena: AthenaLike) {
  return (
    athena.dailyBrief?.recommendation ||
    athena.coach?.recommendation ||
    'Rodaje suave en Zona 2'
  )
}

export default function AthenaHomePanel({
  athena,
  tsb = 0,
  ctl = 0,
  atl = 0,
  weekDistance = 0,
  weekTss = 0,
}: AthenaHomePanelProps) {
  const [expanded, setExpanded] = useState(false)

  const readinessScore = athena.readiness?.score ?? 90
  const readinessTitle = athena.readiness?.visual?.title ?? 'Ready'
  const readinessReason =
    athena.readiness?.reason ||
    athena.dailyBrief?.summary ||
    'He revisado tu carga, tu fatiga y tu evolución reciente.'

  const recommendation = getRecommendation(athena)
  const confidence = athena.coach?.confidence ?? readinessScore

  const reasons =
    athena.coach?.reasons?.length
      ? athena.coach.reasons
      : athena.dailyBrief?.highlights?.length
        ? athena.dailyBrief.highlights
        : athena.insights?.slice(0, 4).map(i => i.title || '').filter(Boolean) || []

  return (
    <Panel variant="athena" className="relative">
      <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">
              <Brain size={14} />
              Athena
            </div>

            <h2 className="max-w-3xl text-2xl font-black tracking-tight text-white sm:text-3xl">
              Hoy es un buen día para construir.
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
              {readinessReason}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-3xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200/80">
                {readinessTitle}
              </div>
              <div className="text-4xl font-black leading-none text-emerald-300">
                {readinessScore}
              </div>
            </div>
            <Sparkles className="text-emerald-300" size={28} />
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-slate-700/50 bg-slate-950/35 p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
              <Target size={16} className="text-cyan-300" />
              Recomendación
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-3xl font-black tracking-tight text-white">
                  {recommendation}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Prioridad: sumar carga útil sin comprometer la recuperación.
                </p>
              </div>

              <div className="flex gap-2">
                <PrimaryButton icon={<Activity size={16} />}>
                  Empezar
                </PrimaryButton>

                <SecondaryButton
                  icon={<ChevronDown size={16} />}
                  onClick={() => setExpanded(v => !v)}
                >
                  ¿Por qué?
                </SecondaryButton>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-700/50 bg-slate-950/35 p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
              <TrendingUp size={16} className="text-cyan-300" />
              Impacto esperado
            </div>

            <div className="grid grid-cols-2 gap-3">
              <MetricChip label="CTL" value={`+${Math.max(0.2, ctl / 60).toFixed(1)}`} tone="info" />
              <MetricChip label="Fatiga" value="+3" tone="warning" />
              <MetricChip label="Ready mañana" value={Math.max(70, readinessScore - 2)} tone={getReadyTone(readinessScore - 2)} />
              <MetricChip label="Confianza" value={confidence} suffix="%" tone="good" />
            </div>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 rounded-3xl border border-cyan-300/20 bg-cyan-400/5 p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
              <CheckCircle2 size={16} />
              Athena ha tenido en cuenta
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {(reasons.length ? reasons : [
                'Fatiga controlada',
                'Forma estable',
                'Semana con margen',
                'Buena base aeróbica',
              ]).slice(0, 4).map(reason => (
                <div
                  key={reason}
                  className="rounded-2xl border border-slate-700/50 bg-slate-950/35 px-4 py-3 text-sm text-slate-300"
                >
                  <span className="mr-2 text-cyan-300">✓</span>
                  {reason}
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              <MetricChip label="Forma" value={tsb.toFixed(0)} tone={tsb >= 0 ? 'good' : 'warning'} />
              <MetricChip label="Fitness" value={ctl.toFixed(0)} tone="info" />
              <MetricChip label="Fatiga" value={atl.toFixed(0)} tone="warning" />
              <MetricChip label="Semana" value={weekDistance.toFixed(1)} suffix="km" tone={weekTss > 0 ? 'good' : 'default'} />
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
          <Zap size={14} className="text-cyan-300" />
          Athena First · la recomendación aparece antes que los datos.
        </div>
      </div>
    </Panel>
  )
}