'use client';

import { m, useTransform } from 'framer-motion';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { Z_INDEX } from '@/config/z-indices';
import { BELIEF_MANIFESTO_LINES } from '@/config/beliefTokens';
import { BELIEF_SCROLL_THRESHOLDS } from './belief.constants';
import { SplitGhostText } from './SplitGhostText';

export function BeliefManifesto() {
  const { scrollYProgress, shouldReduceMotion, isClimax } = useBeliefsScrollContext();

  const opacity = useTransform(
    scrollYProgress,
    [0.52, BELIEF_SCROLL_THRESHOLDS.climaxStart, BELIEF_SCROLL_THRESHOLDS.climaxEnd, 1.0],
    [0, 0.6, 1, 1]
  );
  const y = useTransform(
    scrollYProgress,
    [BELIEF_SCROLL_THRESHOLDS.climaxStart, BELIEF_SCROLL_THRESHOLDS.climaxEnd],
    [18, 0]
  );

  const animateReveal = shouldReduceMotion ? true : isClimax;

  return (
    <m.div
      data-testid="beliefs-manifesto"
      data-belief-manifesto
      aria-label="ISSO É GHOST DESIGN"
      className="pointer-events-none fixed inset-0 flex items-center justify-center px-4 text-center"
      style={{
        opacity: shouldReduceMotion ? 1 : opacity,
        y: shouldReduceMotion ? 0 : y,
        zIndex: Z_INDEX.beliefs.manifesto,
      }}
    >
      <div className="mx-auto w-full max-w-[1680px]">
        {BELIEF_MANIFESTO_LINES.map((line) => (
          <SplitGhostText
            key={line}
            as="div"
            text={line}
            splitType="words"
            textAlign="center"
            stagger={0.08}
            duration={0.8}
            animate={animateReveal}
            className="block font-extrabold uppercase text-white leading-[0.88] tracking-[0.03em] text-[clamp(4rem,17vw,13rem)]"
          />
        ))}
      </div>
    </m.div>
  );
}
