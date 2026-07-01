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
  scores?: {
    training?: number
    recovery?: number
    consistency?: number
    fitness?: number
  }
  status?: {
    readiness?: {
      score?: number
      level?: string
      reason?: string
    }
    trainingState?: {
      state?: string
    }
  }
  coach?: {
    recommendation?: string
    confidence?: number
    reasons?: string[]
    warnings?: string[]
  }
  brief?: {
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

function toneFromScore(score: number) {
  if (score >= 80) return 'good'
  if (score >= 55) return 'warning'
  return 'danger'
}

function formatSigned(value: number) {
  return value > 0 ? `+${value.toFixed(0)}` : value.toFixed(0)
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

  const readinessScore =
    athena.status?.readiness?.score ??
    athena.scores?.training ??
    90

  const readinessLevel =
    athena.status?.readiness?.level ??
    'Ready'

  const message =
    athena.status?.readiness?.reason ||
    athena.brief?.summary ||
    'He revisado tu carga, tu fatiga y tu evolución reciente.'

  const recommendation =
    athena.brief?.recommendation ||
    athena.coach?.recommendation ||
    'Rodaje Zona 2'

  const confidence =
    athena.coach?.confidence ??
    readinessScore

  const reasons =
    athena.coach?.reasons?.length
      ? athena.coach.reasons
      : athena.brief?.highlights?.length
        ? athena.brief.highlights
        : athena.insights?.slice(0, 4).map(i => i.title || '').filter(Boolean) || []

  return (
    <Panel variant="athena" className="p-0">
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_88%_22%,rgba(59,130,246,0.16),transparent_30%)]" />
        <div className="absolute right-8 top-8 hidden h-28 w-28 rounded-full border border-cyan-300/20 bg-cyan-300/5 shadow-2xl shadow-cyan-500/20 lg:block" />

        <div className="relative grid gap-6 p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-cyan-100">
              <Brain size={14} />
              Athena
            </div>

            <h2 className="max-w-3xl text-3xl font-black tracking-tight text-white md:text-4xl">
              Hoy es un buen día para construir.
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
              He analizado tus entrenamientos. {message}
            </p>

            <div className="mt-7 rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-5">
              <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-slate-400">
                <Target size={15} className="text-cyan-300" />
                Recomendación
              </div>

              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-3xl font-black text-white">
                    {recommendation}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Prioridad: sumar carga útil sin comprometer la recuperación.
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:min-w-44">
                  <PrimaryButton icon={<Activity size={16} />} className="w-full">
                    Empezar
                  </PrimaryButton>

                  <SecondaryButton
                    icon={<ChevronDown size={16} />}
                    className="w-full"
                    onClick={() => setExpanded(v => !v)}
                  >
                    ¿Por qué?
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-[1.75rem] border border-emerald-300/25 bg-emerald-400/10 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.22em] text-emerald-200/80">
                    {readinessLevel}
                  </div>

                  <div className="mt-2 flex items-end gap-1">
                    <span className="text-6xl font-black leading-none text-emerald-300">
                      {readinessScore}
                    </span>
                    <span className="mb-2 text-lg font-bold text-emerald-200/60">
                      /100
                    </span>
                  </div>
                </div>

                <Sparkles className="text-emerald-300" size={30} />
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-emerald-950">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300"
                  style={{ width: `${Math.min(100, readinessScore)}%` }}
                />
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-5">
              <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-slate-400">
                <TrendingUp size={15} className="text-cyan-300" />
                Impacto esperado
              </div>

              <div className="grid grid-cols-2 gap-3">
                <MetricChip
                  label="CTL"
                  value={`+${Math.max(0.2, ctl / 60).toFixed(1)}`}
                  tone="info"
                />
                <MetricChip
                  label="Fatiga"
                  value="+3"
                  tone="warning"
                />
                <MetricChip
                  label="Ready mañana"
                  value={Math.max(70, readinessScore - 2)}
                  tone={toneFromScore(readinessScore - 2)}
                />
                <MetricChip
                  label="Confianza"
                  value={confidence}
                  suffix="%"
                  tone="good"
                />
              </div>
            </div>
          </div>
        </div>

        {expanded && (
          <div className="relative border-t border-cyan-300/15 bg-cyan-300/[0.03] p-6 lg:p-8">
            <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100">
              <CheckCircle2 size={16} />
              Por qué Athena recomienda esto
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {(reasons.length
                ? reasons
                : [
                    'Fatiga controlada',
                    'Forma estable',
                    'Semana con margen',
                    'Buena base aeróbica',
                  ]
              )
                .slice(0, 4)
                .map(reason => (
                  <div
                    key={reason}
                    className="rounded-2xl bg-slate-950/35 px-4 py-3 text-sm leading-6 text-slate-300"
                  >
                    <span className="mr-2 text-cyan-300">✓</span>
                    {reason}
                  </div>
                ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              <MetricChip
                label="Forma"
                value={formatSigned(tsb)}
                tone={tsb >= 0 ? 'good' : 'warning'}
              />
              <MetricChip
                label="Fitness"
                value={ctl.toFixed(0)}
                tone="info"
              />
              <MetricChip
                label="Fatiga"
                value={atl.toFixed(0)}
                tone="warning"
              />
              <MetricChip
                label="Semana"
                value={weekDistance.toFixed(1)}
                suffix="km"
                tone={weekTss > 0 ? 'good' : 'default'}
              />
            </div>
          </div>
        )}

        <div className="relative flex items-center gap-2 px-6 pb-6 text-xs text-slate-500 lg:px-8">
          <Zap size={14} className="text-cyan-300" />
          Athena First · la recomendación aparece antes que los datos.
        </div>
      </div>
    </Panel>
  )
}