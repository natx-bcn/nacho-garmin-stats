import type { ReactNode } from 'react'
import type { HTMLMotionProps } from 'framer-motion'
import { motion } from 'framer-motion'
import { cardHover, slideUp } from '../../lib/motion/animations'

type GlassCardVariant = 'default' | 'strong' | 'subtle'

type GlassCardProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  variant?: GlassCardVariant
  animated?: boolean
  hover?: boolean
}

const variantClasses: Record<GlassCardVariant, string> = {
  default: 'border-white/10 bg-white/[0.06] shadow-black/20',
  strong: 'border-white/15 bg-white/[0.09] shadow-black/30',
  subtle: 'border-white/8 bg-white/[0.035] shadow-black/10',
}

export function GlassCard({
  children,
  className = '',
  variant = 'default',
  animated = true,
  hover = true,
  ...props
}: GlassCardProps) {
  const classes = [
    'rounded-3xl border backdrop-blur-xl shadow-xl transition-all duration-300',
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (!animated) {
    return (
      <div className={classes}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      animate="visible"
      whileHover={hover ? cardHover : undefined}
      className={classes}
      {...props}
    >
      {children}
    </motion.div>
  )
}