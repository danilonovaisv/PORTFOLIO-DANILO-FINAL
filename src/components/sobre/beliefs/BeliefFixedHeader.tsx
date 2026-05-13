'use client';

import { m, useTransform } from 'motion/react';
import { BELIEF_HEADER_LINES, beliefZIndex } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { SplitTextMotion } from './SplitTextMotion';

export function BeliefFixedHeader() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  // Animação de entrada e saída do header fixo
  // Entra rápido no início (0.05 a 0.15) e sai no final (0.82 a 0.92)
  const opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.82, 0.92], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0.05, 0.15, 0.82, 0.92], [shouldReduceMotion ? 0 : 60, 0, 0, shouldReduceMotion ? 0 : 60]);

  return (
    <m.aside
      className="pointer-events-none sticky top-0 z-30 flex h-screen w-full items-start justify-end px-6 pt-[14vh] md:items-center md:px-12 md:pt-0 lg:px-16 xl:px-24"
      style={{ 
        zIndex: beliefZIndex.fixedHeader,
        opacity,
        x
      }}
    >
      <div className="max-w-[14rem] text-right md:max-w-[24rem] lg:max-w-[28rem] mix-blend-difference">
        <SplitTextMotion
          as="p"
          text={BELIEF_HEADER_LINES[0]}
          mode="words"
          className="font-display text-[clamp(2.25rem,8vw,3rem)] font-black uppercase leading-[0.85] tracking-tighter text-white md:text-[clamp(3.5rem,6vw,6rem)] whitespace-nowrap"
          itemClassName="inline-block will-change-transform"
        />
        <SplitTextMotion
          as="p"
          text={BELIEF_HEADER_LINES[1]}
          mode="words"
          className="mt-4 text-[clamp(0.85rem,3vw,1rem)] font-medium leading-[1.3] tracking-[0.02em] text-white/90 md:mt-6 md:text-[clamp(1rem,1.5vw,1.35rem)]"
          itemClassName="inline-block will-change-transform"
        />
      </div>
    </m.aside>
  );
}
