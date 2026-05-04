"use client";

import { motion, useTransform } from "motion/react";
import { useBeliefsScrollContext } from "./BeliefsScrollContext";
import { SplitTextMotion } from "./SplitTextMotion";
import { Z_INDEX } from "@/config/z-indices";
import { MOTION_TOKENS } from "@/config/motion";

export function BeliefManifesto() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  const opacity = useTransform(scrollYProgress, [0.82, 0.9], [0, 1]);
  const y = useTransform(scrollYProgress, [0.82, 0.92], [18, 0]);

  return (
    <motion.div
      aria-live="polite"
      className="pointer-events-none fixed inset-0 flex items-center justify-center px-4 text-center"
      style={{ 
        ...(shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity, y }),
        zIndex: Z_INDEX.beliefs.manifesto
      }}
    >
      <div className="font-display text-[clamp(3.5rem,16vw,12rem)] font-black uppercase leading-[0.82] tracking-[0.03em] text-white">
        {["ISSO É", "GHOST", "DESIGN"].map((line) => (
          <SplitTextMotion
            key={line}
            as="div"
            text={line}
            mode="words"
            stagger={MOTION_TOKENS.DURATION.WORD_STAGGER}
            className="block"
          />
        ))}
      </div>
    </motion.div>
  );
}
