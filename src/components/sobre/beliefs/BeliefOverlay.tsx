"use client";

import { motion, useTransform } from "motion/react";
import { useBeliefsScrollContext } from "./BeliefsScrollContext";

export function BeliefOverlay() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.1, 0]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 z-10 bg-black"
    />
  );
}
