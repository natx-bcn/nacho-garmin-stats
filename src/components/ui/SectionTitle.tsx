import type { ReactNode } from 'react'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  action,
  className = '',
}: SectionTitleProps) {
  return (
    <div
      className={`
        mb-4
        flex
        items-start
        justify-between
        gap-4
        ${className}
      `}
    >
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
            {eyebrow}
          </p>
        )}

        <h2 className="text-xl font-bold tracking-tight text-slate-50">
          {title}
        </h2>

        {description && (
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}