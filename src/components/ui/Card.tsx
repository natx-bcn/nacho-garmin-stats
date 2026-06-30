import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({
  children,
  className = '',
  hover = false,
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-slate-700/50
        bg-slate-900/60
        backdrop-blur-sm
        p-5
        transition-all
        duration-300
        ${
          hover
            ? 'hover:border-slate-500 hover:bg-slate-900/80 hover:shadow-xl'
            : ''
        }
        ${className}
      `}
    >
      {children}
    </div>
  )
}