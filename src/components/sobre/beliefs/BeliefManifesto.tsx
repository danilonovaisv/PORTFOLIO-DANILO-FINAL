'use client';

import { m, useTransform } from 'motion/react';
import { BELIEF_MANIFESTO_LINES } from './belief.constants';
import { SplitGhostText } from './SplitGhostText';
import { useBeliefsScrollContext } from './BeliefsScrollProvider';

export function BeliefManifesto() {
  const { scrollYProgress, prefersReducedMotion } = useBeliefsScrollContext();

  const opacity = useTransform(scrollYProgress, [0.52, 0.68], [0, 1]);
  const y = useTransform(scrollYProgress, [0.56, 0.72], [18, 0]);

  return (
    <m.div
      data-testid="beliefs-manifesto"
      data-belief-manifesto
      className="pointer-events-none fixed inset-0 z-[var(--z-layer-overlay)] flex items-center justify-center px-6"
      style={{ opacity, y: prefersReducedMotion ? 0 : y }}
      aria-label="ISSO É GHOST DESIGN"
    >
      <div className="mx-auto w-full max-w-[1680px] text-center">
        {BELIEF_MANIFESTO_LINES.map((line) => (
          <SplitGhostText
            key={line}
            as="h2"
            text={line}
            splitType="words"
            textAlign="center"
            className="block font-extrabold uppercase leading-[0.88] text-white"
          />
        ))}
      </div>
    </m.div>
  );
}
