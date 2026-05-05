'use client';

import { m, useTransform } from 'framer-motion';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { SplitTextMotion } from './SplitTextMotion';
import { Z_INDEX } from '@/config/z-indices';
import { MOTION_TOKENS } from '@/config/motion';
import { BELIEF_MANIFESTO_LINES } from '@/config/beliefTokens';

export function BeliefManifesto() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  const opacity = useTransform(scrollYProgress, [0.82, 0.9], [0, 1]);
  const y = useTransform(scrollYProgress, [0.82, 0.92], [18, 0]);

  return (
    <m.div
      aria-live="polite"
      data-testid="beliefs-manifesto"
      className="pointer-events-none fixed inset-0 flex items-center justify-center px-4 text-center"
      style={{
        ...(shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity, y }),
        zIndex: Z_INDEX.beliefs.manifesto,
      }}
    >
      <div className="font-display text-[clamp(3.5rem,16vw,12rem)] font-black uppercase leading-[0.82] tracking-[0.03em] text-white">
        {BELIEF_MANIFESTO_LINES.map((line) => (
          <SplitTextMotion
            key={line}
            as="div"
            text={line}
            mode="words"
            stagger={MOTION_TOKENS.stagger.normal}
            className="block"
          />
        ))}
      </div>
    </m.div>
  );
}
