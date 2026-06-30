import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer } from '../../lib/motion/animations'

type SectionProps = {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function Section({
  title,
  subtitle,
  children,
  className = '',
}: SectionProps) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {(title || subtitle) && (
        <div className="mb-5">
          {title && (
            <h2 className="text-xl font-semibold tracking-tight text-white">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mt-1 text-sm text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children}
    </motion.section>
  )
}