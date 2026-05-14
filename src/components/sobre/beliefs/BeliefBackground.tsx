'use client';

import { m, useTransform } from 'motion/react';
import { BELIEF_BACKGROUND_STOPS } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefBackground() {
  const { scrollYProgress } = useBeliefsScrollContext();

  // Create a mapping of progress to background colors
  // We distribute the colors evenly across the scroll range
  const colorRange = BELIEF_BACKGROUND_STOPS.map((_, i) => i / (BELIEF_BACKGROUND_STOPS.length - 1));
  const backgroundColor = useTransform(
    scrollYProgress,
    colorRange,
    BELIEF_BACKGROUND_STOPS as unknown as string[]
  );

  // Strict visibility control:
  // Fade in at the start (0 -> 0.05)
  // Fade out at the end (0.95 -> 1.0)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  );

  return (
    <m.div
      aria-hidden="true"
      data-testid="beliefs-background"
      data-belief-background
      style={{ 
        backgroundColor,
        opacity 
      }}
      className="absolute inset-0 z-[var(--z-layer-base)]"
    />
  );
}
