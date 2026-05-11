'use client';

import { SplitGhostText } from './SplitGhostText';
import { SPLIT_TEXT_CONFIG } from './belief.constants';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';

export function BeliefFixedHeader() {
  const { header } = SPLIT_TEXT_CONFIG;

  return (
    <header className="pointer-events-none absolute inset-x-0 top-[14vh] z-[var(--z-layer-header)] w-full py-8 md:top-0">
      <div className="mx-auto flex max-w-[1680px] justify-end px-6 md:px-12 lg:px-16">
        <SplitGhostText
          as="p"
          text="O que me move"
          splitType={header.splitType}
          delay={header.delay}
          duration={header.duration}
          from={header.from}
          to={header.to}
          ease={GSAP_GHOST_EASE}
          className="max-w-xs text-right font-medium uppercase tracking-[0.18em] text-white/80"
          textAlign="right"
        />
      </div>
    </header>
  );
}
