'use client';

import { useMemo } from 'react';
import { m, useTransform } from 'motion/react';
import { BELIEF_MANIFESTO_LINES, beliefMotion, beliefZIndex } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { SplitTextMotion } from './SplitTextMotion';

const GHOST_EASE = [0.22, 1, 0.36, 1];

export function BeliefManifesto() {
  const { scrollYProgress, isClimax, shouldReduceMotion } =
    useBeliefsScrollContext();

  // Reveal between 0.82 and 0.92, Exit fade out between 0.96 and 1.0
  const opacity = useTransform(
    scrollYProgress,
    [0.8, 0.82, 0.92, 0.96, 1.0],
    [0, 0, 1, 1, 0]
  );

  const y = useTransform(scrollYProgress, [0.8, 0.82, 0.92], [18, 18, 0]);

  // Stagger words when climax is reached
  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0.2 : 0.42,
          ease: GHOST_EASE,
        },
      },
    }),
    [shouldReduceMotion]
  );

  return (
    <m.div
      data-testid="beliefs-manifesto"
      data-belief-manifesto
      style={{ opacity, y, zIndex: beliefZIndex.manifesto }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
      aria-hidden={!isClimax}
    >
      <m.div
        initial="hidden"
        animate={isClimax ? 'visible' : 'hidden'}
        transition={{
          staggerChildren: shouldReduceMotion
            ? 0
            : beliefMotion.manifestoStagger,
        }}
        className="text-center font-display font-black uppercase leading-[0.82] tracking-[0.03em] text-white"
        style={{ fontSize: 'clamp(3.5rem, 16vw, 12rem)' }}
      >
        {BELIEF_MANIFESTO_LINES.map((line) => (
          <SplitTextMotion
            key={line}
            as={m.div as any}
            text={line}
            mode="words"
            className="block"
            itemClassName="inline-block will-change-transform"
            variants={itemVariants}
          />
        ))}
      </m.div>
    </m.div>
  );
}
