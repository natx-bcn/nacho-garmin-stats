type TrendBadgeVariant = 'positive' | 'negative' | 'neutral' | 'warning'

type TrendBadgeProps = {
  label: string
  variant?: TrendBadgeVariant
}

const variantClasses: Record<TrendBadgeVariant, string> = {
  positive: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
  negative: 'border-rose-400/20 bg-rose-400/10 text-rose-300',
  neutral: 'border-slate-400/20 bg-slate-400/10 text-slate-300',
  warning: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
}

export function TrendBadge({
  label,
  variant = 'neutral',
}: TrendBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${variantClasses[variant]}`}
    >
      {label}
    </span>
  )
}