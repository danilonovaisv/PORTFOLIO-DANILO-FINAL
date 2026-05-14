'use client';

import { motion, useTransform } from 'framer-motion';
import { BELIEF_HEADER_LINES } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { SplitTextMotion } from './SplitTextMotion';

const GHOST_EASE = [0.22, 1, 0.36, 1];

const itemVariants = {
  hidden: (shouldReduceMotion: boolean) => ({
    opacity: 0,
    y: shouldReduceMotion ? 0 : 12,
  }),
  visible: (shouldReduceMotion: boolean) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0.2 : 0.48,
      ease: GHOST_EASE,
    },
  }),
};

export function BeliefFixedHeader() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  // Map scroll progress to visibility and position
  // 1. Fade/Slide in quickly at the start (0 -> 0.08)
  // 2. Stay visible during the narrative (0.08 -> 0.92)
  // 3. Fade out before the section ends (0.92 -> 0.98)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.92, 0.98],
    [0, 1, 1, 0]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 0.08],
    [shouldReduceMotion ? 0 : 60, 0]
  );

  const blur = useTransform(
    scrollYProgress,
    [0, 0.08, 0.92, 0.98],
    [
      shouldReduceMotion ? 'blur(0px)' : 'blur(10px)',
      'blur(0px)',
      'blur(0px)',
      shouldReduceMotion ? 'blur(0px)' : 'blur(10px)',
    ]
  );

  return (
    <motion.aside
      style={{ opacity, x, filter: blur }}
      initial="hidden"
      animate="visible"
      className="pointer-events-none absolute inset-y-0 right-0 flex w-full items-start justify-end px-6 pt-[13vh] md:items-center md:px-10 md:pt-0 lg:px-16 z-[var(--z-layer-header)]"
    >
      <div className="max-w-[13rem] text-right md:max-w-[20rem] lg:max-w-[24rem]">
        <SplitTextMotion
          as={motion.p as any}
          text={BELIEF_HEADER_LINES[0]}
          mode="words"
          className="font-display text-[clamp(1.5rem,6vw,2.35rem)] font-black uppercase leading-[0.88] tracking-[-0.04em] text-white md:text-[clamp(2rem,2.8vw,3.5rem)]"
          itemClassName="inline-block will-change-transform"
          variants={itemVariants}
          custom={shouldReduceMotion}
        />
        <SplitTextMotion
          as={motion.p as any}
          text={BELIEF_HEADER_LINES[1]}
          mode="words"
          className="mt-3 text-[clamp(0.82rem,2.7vw,0.98rem)] font-medium leading-[1.22] tracking-[0.04em] text-white/82 md:mt-5 md:text-[clamp(0.95rem,1.15vw,1.16rem)]"
          itemClassName="inline-block will-change-transform"
          variants={itemVariants}
          custom={shouldReduceMotion}
        />
      </div>
    </motion.aside>
  );
}

