'use client';

import { m } from 'motion/react';
import { SplitGhostText } from './SplitGhostText';

export function BeliefFixedHeader() {
  return (
    <m.header className="pointer-events-none fixed inset-x-0 top-[14vh] z-[var(--z-layer-header)] w-full py-8 md:top-0">
      <div className="mx-auto flex max-w-[1680px] justify-end px-6 md:px-12 lg:px-16">
        <SplitGhostText
          as="p"
          text="O que me move"
          splitType="words"
          className="max-w-xs text-right font-medium uppercase tracking-[0.18em] text-white/80"
          textAlign="right"
        />
      </div>
    </m.header>
  );
}
