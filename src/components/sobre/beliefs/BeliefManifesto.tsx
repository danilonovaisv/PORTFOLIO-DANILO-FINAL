'use client';

import { m, useTransform } from 'framer-motion';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { Z_INDEX } from '@/config/z-indices';
import { BELIEF_MANIFESTO_LINES } from '@/config/beliefTokens';
import { BELIEF_SCROLL_THRESHOLDS } from './belief.constants';

export function BeliefManifesto() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

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
        {BELIEF_MANIFESTO_LINES.map((line, i) => (
          <m.div
            key={line}
            className="block overflow-hidden"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span
              className="block font-extrabold uppercase text-white leading-[0.88] tracking-[0.03em]"
              style={{ fontSize: 'clamp(4rem, 17vw, 13rem)' }}
            >
              {line}
            </span>
          </m.div>
        ))}
      </div>
    </m.div>
  );
}
