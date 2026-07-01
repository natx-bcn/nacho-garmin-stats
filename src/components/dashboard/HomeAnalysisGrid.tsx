import type { ReactNode } from 'react'

interface HomeAnalysisGridProps {
  children: ReactNode
}

export default function HomeAnalysisGrid({ children }: HomeAnalysisGridProps) {
  return (
    <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
      {children}
    </section>
  )
}