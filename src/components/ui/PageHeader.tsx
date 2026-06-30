import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { slideUp } from '../../lib/motion/animations'
import { DashboardTitle } from './DashboardTitle'

type PageHeaderProps = {
  title: string
  subtitle?: string
  eyebrow?: string
  actions?: ReactNode
}

export function PageHeader({
  title,
  subtitle,
  eyebrow,
  actions,
}: PageHeaderProps) {
  return (
    <motion.header
      variants={slideUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
    >
      <DashboardTitle
        title={title}
        subtitle={subtitle}
        eyebrow={eyebrow}
      />

      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </motion.header>
  )
}