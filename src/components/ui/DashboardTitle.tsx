import { motion } from 'framer-motion'
import { slideUp } from '../../lib/motion/animations'

type DashboardTitleProps = {
  title: string
  subtitle?: string
  eyebrow?: string
}

export function DashboardTitle({
  title,
  subtitle,
  eyebrow,
}: DashboardTitleProps) {
  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      animate="visible"
      className="space-y-2"
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
          {eyebrow}
        </p>
      )}

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400 md:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  )
}