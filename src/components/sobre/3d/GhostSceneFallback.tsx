"use client";

import { motion, useTransform } from "motion/react";
import { useBeliefsScrollContext } from "../beliefs/BeliefsScrollContext";

export function GhostSceneFallback() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  const opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.85, 0.95], [0, 1, 1, 0]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center">
      <motion.div
        aria-hidden="true"
        style={shouldReduceMotion ? { opacity: 1 } : { opacity }}
        className="h-48 w-48 rounded-full bg-gradient-to-tr from-blue-600/30 to-purple-600/30 blur-3xl md:h-96 md:w-96"
      />
    </div>
  );
}
