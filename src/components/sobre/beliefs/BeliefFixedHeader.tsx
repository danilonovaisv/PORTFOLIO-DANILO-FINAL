'use client';

import { m } from 'framer-motion';
import {
  BELIEF_HEADER_LINES,
  beliefMotion,
  beliefZIndex,
} from '@/config/beliefTokens';
import { SplitTextMotion } from './SplitTextMotion';

export function BeliefFixedHeader() {
  return (
    <aside
      className="pointer-events-none absolute inset-y-0 right-0 flex w-full items-start justify-end px-6 pt-[20vh] md:items-center md:px-12 md:pt-0 lg:px-16"
      style={{ zIndex: beliefZIndex.fixedHeader }}
    >
      <m.div
        className="max-w-sm text-right"
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: beliefMotion.ghostEase }}
      >
        {BELIEF_HEADER_LINES.map((line, index) => (
          <SplitTextMotion
            key={line}
            as="p"
            text={line}
            mode="words"
            stagger={0.08}
            delay={index * 0.08}
            className="text-sm uppercase tracking-[0.08em] text-white/78"
          />
        ))}
      </m.div>
    </aside>
  );
}
