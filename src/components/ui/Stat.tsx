interface StatProps {
  label: string
  value: string | number
  unit?: string
  helper?: string
  color?: string
}

export default function Stat({
  label,
  value,
  unit,
  helper,
  color = '#e2e8f0',
}: StatProps) {
  return (
    <div className="rounded-xl border border-slate-700/40 bg-slate-950/35 p-4">
      <div className="text-xs uppercase tracking-wider text-slate-500">
        {label}
      </div>

      <div className="mt-2 text-2xl font-black" style={{ color }}>
        {value}
        {unit && (
          <span className="ml-1 text-sm font-medium text-slate-500">
            {unit}
          </span>
        )}
      </div>

      {helper && (
        <div className="mt-1 text-xs text-slate-500">
          {helper}
        </div>
      )}
    </div>
  )
}