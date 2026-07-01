import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ReactNode
}

export default function PrimaryButton({
  children,
  icon,
  className = '',
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        bg-gradient-to-r
        from-cyan-400
        to-blue-500
        px-5
        py-3
        text-sm
        font-bold
        text-slate-950
        shadow-lg
        shadow-cyan-950/40
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-cyan-500/20
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