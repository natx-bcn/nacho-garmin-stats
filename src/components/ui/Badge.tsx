import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  color?: 'blue' | 'green' | 'yellow' | 'red'
}

export default function Badge({
  children,
  color = 'blue',
}: Props) {
  const colors = {
    blue: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    green: 'bg-green-500/15 text-green-300 border-green-500/30',
    yellow: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30',
    red: 'bg-red-500/15 text-red-300 border-red-500/30',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${colors[color]}`}
    >
      {children}
    </span>
  )
}