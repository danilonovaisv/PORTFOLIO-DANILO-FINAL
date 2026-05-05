'use client';

import { m, useTransform } from 'framer-motion';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { SplitGhostText } from './SplitGhostText';
import { Z_INDEX } from '@/config/z-indices';
import { BELIEF_HEADER_LINES } from '@/config/beliefTokens';

export function BeliefFixedHeader() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  const opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.2], [18, 0]);

  return (
    <m.header
      role="doc-subtitle"
      aria-label={`${BELIEF_HEADER_LINES[0]} ${BELIEF_HEADER_LINES[1]}`}
      className="pointer-events-none fixed inset-x-0 top-[14vh] w-full py-8 md:top-0"
      style={{
        opacity,
        y: shouldReduceMotion ? 0 : y,
        zIndex: Z_INDEX.beliefs.header,
      }}
    >
      <div className="mx-auto flex max-w-[1680px] items-center justify-center px-6 md:justify-end md:px-12 lg:px-16">
        <div aria-hidden="true" className="max-w-sm text-center text-white/70 md:text-right">
          <SplitGhostText
            as="p"
            text={BELIEF_HEADER_LINES[0]}
            splitType="words"
            className="text-lg font-medium leading-snug md:text-xl"
            stagger={0.05}
            animate={shouldReduceMotion ? true : undefined}
          />
          <SplitGhostText
            as="p"
            text={BELIEF_HEADER_LINES[1]}
            splitType="words"
            className="mt-1 text-lg font-medium leading-snug md:text-xl"
            stagger={0.05}
            delay={shouldReduceMotion ? 0 : 0.2}
            animate={shouldReduceMotion ? true : undefined}
          />
        </div>
      </div>
    </m.header>
  );
}
