import type { ReactNode } from 'react'

interface PerformanceGridProps {
  children: ReactNode
}

export default function PerformanceGrid({ children }: PerformanceGridProps) {
  return (
    <section className="grid gap-5 xl:grid-cols-2">
      {children}
    </section>
  )
}