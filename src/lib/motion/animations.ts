import type { TargetAndTransition, Variants } from 'framer-motion'

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
}

export const slideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

export const cardHover: TargetAndTransition = {
  y: -4,
  scale: 1.01,
  transition: {
    duration: 0.2,
    ease: 'easeOut',
  },
}

export const softTap = {
  scale: 0.98,
}

export const metricPulse: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
}