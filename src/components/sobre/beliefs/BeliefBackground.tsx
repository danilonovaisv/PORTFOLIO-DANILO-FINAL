"use client";

import { motion, useTransform } from "motion/react";
import { MOTION_TOKENS } from "@/config/motion";
import { useBeliefsScrollContext } from "./BeliefsScrollContext";
import { Z_INDEX } from "@/config/z-indices";

const stops = MOTION_TOKENS.colors.bgCycle;

export function BeliefBackground() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  const points = stops.map((_, i) => i / (stops.length - 1));
  const backgroundColor = useTransform(scrollYProgress, points, stops as any) as any;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        backgroundColor: shouldReduceMotion ? MOTION_TOKENS.colors.deepVoid : backgroundColor,
        zIndex: Z_INDEX.beliefs.background
      }}
      className="absolute inset-0"
    />
  );
}
