import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ReactNode
}

export default function SecondaryButton({
  children,
  icon,
  className = '',
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        border
        border-slate-600/60
        bg-slate-950/30
        px-5
        py-3
        text-sm
        font-semibold
        text-slate-200
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-cyan-300/40
        hover:bg-cyan-400/10
        hover:text-cyan-100
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}