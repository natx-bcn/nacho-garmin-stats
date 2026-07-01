import type { ReactNode } from 'react'

interface MissionGridProps {
  children: ReactNode
}

export default function MissionGrid({ children }: MissionGridProps) {
  return (
    <section className="grid gap-5 xl:grid-cols-3">
      {children}
    </section>
  )
}