import type { ReactNode } from 'react'

type MetricTone = 'default' | 'good' | 'warning' | 'danger' | 'info'

interface MetricChipProps {
  label: string
  value: string | number
  suffix?: string
  icon?: ReactNode
  tone?: MetricTone
  className?: string
}

const tones: Record<MetricTone, string> = {
  default: 'border-slate-700/60 bg-slate-950/40 text-slate-200',
  good: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
  warning: 'border-amber-400/30 bg-amber-500/10 text-amber-200',
  danger: 'border-red-400/30 bg-red-500/10 text-red-200',
  info: 'border-cyan-400/30 bg-cyan-500/10 text-cyan-200',
}

export default function MetricChip({
  label,
  value,
  suffix,
  icon,
  tone = 'default',
  className = '',
}: MetricChipProps) {
  return (
    <div
      className={`
        flex
        min-w-0
        items-center
        gap-3
        rounded-2xl
        border
        px-4
        py-3
        backdrop-blur
        ${tones[tone]}
        ${className}
      `}
    >
      {icon && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-current">
          {icon}
        </div>
      )}

      <div className="min-w-0">
        <p className="truncate text-xs font-medium uppercase tracking-[0.18em] opacity-70">
          {label}
        </p>

        <p className="mt-0.5 text-lg font-bold leading-none">
          {value}
          {suffix && (
            <span className="ml-1 text-xs font-semibold opacity-70">
              {suffix}
            </span>
          )}
        </p>
      </div>
    </div>
  )
}