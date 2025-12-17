'use client'

import * as React from 'react'
import type { MotionValue } from 'framer-motion'
import { useTransform } from 'framer-motion'

type Args = {
  mouseX: MotionValue<number> // -1..1
  mouseY: MotionValue<number> // -1..1
  scrollYProgress: MotionValue<number> // 0..1
}

export function useOrbInteraction({ mouseX, mouseY, scrollYProgress }: Args) {
  // Cursor -> rotation
  const rotY = useTransform(mouseX, [-1, 1], [-0.32, 0.32])
  const rotX = useTransform(mouseY, [-1, 1], [0.22, -0.22])

  // Cursor -> parallax offset
  const parallaxX = useTransform(mouseX, [-1, 1], [-0.22, 0.22])
  const parallaxY = useTransform(mouseY, [-1, 1], [0.18, -0.18])

  // Scroll -> subtle spin + scale down
  const scrollRot = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 0.55])
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  // Expose original too (useful to modulate material)
  const api = React.useMemo(
    () => ({
      mouseX,
      mouseY,
      scrollYProgress,
      rotX,
      rotY,
      parallaxX,
      parallaxY,
      scrollRot,
      scrollScale,
    }),
    [mouseX, mouseY, scrollYProgress, rotX, rotY, parallaxX, parallaxY, scrollRot, scrollScale]
  )

  return api
}
