import type { ReactNode } from 'react'

interface HistoryGridProps {
  children: ReactNode
}

export default function HistoryGrid({ children }: HistoryGridProps) {
  return (
    <section className="grid gap-5 xl:grid-cols-2">
      {children}
    </section>
  )
}