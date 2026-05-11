'use client';

import { m, useMotionValueEvent, useTransform } from 'framer-motion';
import { useState } from 'react';
import {
  BELIEF_MANIFESTO_LINES,
  beliefZIndex,
} from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { SplitTextMotion } from './SplitTextMotion';

export function BeliefManifesto() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();
  const opacity = useTransform(scrollYProgress, [0.82, 0.9], [0, 1]);
  const y = useTransform(scrollYProgress, [0.82, 0.92], [18, 0]);
  const [active, setActive] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setActive(latest >= 0.82);
  });

  return (
    <m.div
      data-testid="beliefs-manifesto"
      data-belief-manifesto
      className="pointer-events-none fixed inset-0 flex items-center justify-center px-6"
      style={{
        zIndex: beliefZIndex.manifesto,
        opacity: shouldReduceMotion ? (active ? 1 : 0) : opacity,
        y: shouldReduceMotion ? 0 : y,
      }}
      aria-live={active ? 'polite' : 'off'}
    >
      <div
        className="text-center font-display font-black uppercase leading-[0.82] tracking-[0.03em] text-white"
        style={{ fontSize: 'clamp(3.5rem, 16vw, 12rem)' }}
      >
        {BELIEF_MANIFESTO_LINES.map((line, index) => (
          <SplitTextMotion
            key={line}
            as="div"
            text={line}
            mode="words"
            active={active}
            stagger={0.06}
            delay={index * 0.05}
            className="block"
          />
        ))}
      </div>
    </m.div>
  );
}
