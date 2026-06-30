import type { ReactNode } from 'react'
import { GlassCard } from './GlassCard'

type MetricCardProps = {
  label: string
  value: string | number
  icon?: ReactNode
  unit?: string
  description?: string
  trend?: ReactNode
  className?: string
}

export function MetricCard({
  label,
  value,
  icon,
  unit,
  description,
  trend,
  className = '',
}: MetricCardProps) {
  return (
    <GlassCard className={`p-5 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
            {label}
          </p>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-3xl font-bold tracking-tight text-white">
              {value}
            </span>

            {unit && (
              <span className="pb-1 text-sm font-medium text-slate-400">
                {unit}
              </span>
            )}
          </div>
        </div>

        {icon && (
          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-cyan-300">
            {icon}
          </div>
        )}
      </div>

      {(description || trend) && (
        <div className="mt-4 flex items-center justify-between gap-3">
          {description && (
            <p className="text-sm text-slate-400">
              {description}
            </p>
          )}

          {trend}
        </div>
      )}
    </GlassCard>
  )
}