import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
}

export default function Button({
  children,
  variant = 'secondary',
  className = '',
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'border-blue-500/40 bg-blue-600/20 text-blue-300 hover:bg-blue-600/30',
    secondary: 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:text-slate-100',
    ghost: 'border-transparent bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-100',
  }

  return (
    <button
      className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}