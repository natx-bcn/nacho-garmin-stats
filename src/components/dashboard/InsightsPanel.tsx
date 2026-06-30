import { Brain, CircleAlert, TrendingUp } from 'lucide-react'

import { GlassCard } from '../ui/GlassCard'
import { TrendBadge } from '../ui/TrendBadge'
import type { Insight } from '../../lib/analysis/insightEngine'

type Props = {
  insights: Insight[]
}

const severityVariant = {
  positive: 'positive',
  neutral: 'neutral',
  warning: 'warning',
} as const

const severityIcon = {
  positive: TrendingUp,
  neutral: Brain,
  warning: CircleAlert,
} as const

export default function InsightsPanel({ insights }: Props) {
  return (
    <GlassCard className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <Brain className="h-6 w-6 text-cyan-400" />

        <div>
          <h2 className="text-xl font-semibold text-white">
            Executive Insights
          </h2>

          <p className="text-sm text-slate-400">
            Interpretación automática de tus entrenamientos.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => {
          const Icon = severityIcon[insight.severity]

          return (
            <div
              key={insight.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-cyan-300" />

                  <h3 className="font-medium text-white">
                    {insight.title}
                  </h3>
                </div>

                <TrendBadge
                  label={insight.severity}
                  variant={severityVariant[insight.severity]}
                />
              </div>

              <p className="text-sm leading-6 text-slate-400">
                {insight.description}
              </p>
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}