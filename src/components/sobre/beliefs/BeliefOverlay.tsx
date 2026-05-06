'use client'

import { motion } from 'motion/react'
import { useBeliefsScrollContext } from './BeliefsScrollProvider'

export function BeliefOverlay() {
  const { prefersReducedMotion } = useBeliefsScrollContext()

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[var(--z-layer-glass)] bg-black/10 mix-blend-overlay"
      initial={{ opacity: prefersReducedMotion ? 0.3 : 0 }}
      animate={{ opacity: prefersReducedMotion ? 0.3 : [0.1, 0.3, 0.1] }}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 8, ease: 'linear', repeat: Infinity }
      }
      style={{
        backgroundImage: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
      }}
    />
  )
}
