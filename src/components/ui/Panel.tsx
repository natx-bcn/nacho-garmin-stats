import type { ReactNode } from 'react'

type PanelVariant = 'default' | 'highlight' | 'athena' | 'subtle'

interface PanelProps {
  children: ReactNode
  className?: string
  variant?: PanelVariant
  hover?: boolean
}

const variants: Record<PanelVariant, string> = {
  default: `
    border-slate-700/50
    bg-slate-900/70
  `,
  highlight: `
    border-cyan-400/30
    bg-gradient-to-br
    from-slate-900
    via-slate-900
    to-cyan-950/30
  `,
  athena: `
    border-cyan-400/40
    bg-gradient-to-br
    from-slate-900
    via-slate-950
    to-blue-950/60
    shadow-cyan-950/30
  `,
  subtle: `
    border-slate-800/60
    bg-slate-950/45
  `,
}

export default function Panel({
  children,
  className = '',
  variant = 'default',
  hover = false,
}: PanelProps) {
  return (
    <section
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        p-5
        shadow-2xl
        shadow-black/20
        backdrop-blur-xl
        transition-all
        duration-300
        ${variants[variant]}
        ${
          hover
            ? 'hover:-translate-y-0.5 hover:border-cyan-300/40 hover:shadow-cyan-950/30'
            : ''
        }
        ${className}
      `}
    >
      {children}
    </section>
  )
}