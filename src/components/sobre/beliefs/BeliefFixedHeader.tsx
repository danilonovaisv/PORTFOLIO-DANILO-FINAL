'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import {
  BELIEF_HEADER_LINES,
  beliefMotion,
  beliefZIndex,
} from '@/config/beliefTokens';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { SplitTextMotion } from './SplitTextMotion';

gsap.registerPlugin(ScrollTrigger);

export function BeliefFixedHeader() {
  const ref = useRef<HTMLElement | null>(null);
  const { containerRef, shouldReduceMotion } = useBeliefsScrollContext();

  useEffect(() => {
    if (!ref.current || !containerRef.current) return;

    const el = ref.current;

    const ctx = gsap.context(() => {
      // Set initial hidden state
      gsap.set(el, { autoAlpha: 0, x: shouldReduceMotion ? 0 : 60 });

      // Entrance — triggered once at top 8%
      ScrollTrigger.create({
        trigger: containerRef.current!,
        start: 'top 8%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            autoAlpha: 1,
            x: 0,
            duration: shouldReduceMotion ? 0.2 : beliefMotion.headerDuration,
            ease: shouldReduceMotion ? 'none' : GSAP_GHOST_EASE,
          });

          if (!shouldReduceMotion) {
            gsap.from('[data-split-item]', {
              autoAlpha: 0,
              stagger: 0.04,
              delay: 0.15,
              duration: 0.42,
              ease: GSAP_GHOST_EASE,
            });
          }
        },
      });

      // Exit — scrub out near end of section (92% → 98%)
      ScrollTrigger.create({
        trigger: containerRef.current!,
        start: '92% top',
        end: '98% top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(el, { autoAlpha: 1 - self.progress });
        },
      });
    });

    return () => ctx.revert();
  }, [containerRef, shouldReduceMotion]);

  return (
    <aside
      ref={ref}
      style={{ zIndex: beliefZIndex.fixedHeader }}
      className="pointer-events-none absolute inset-y-0 right-0 flex w-full items-start justify-end px-6 pt-[13vh] md:items-center md:px-10 md:pt-0 lg:px-16"
    >
      <div className="max-w-[13rem] text-right md:max-w-[20rem] lg:max-w-[24rem]">
        <SplitTextMotion
          as="p"
          text={BELIEF_HEADER_LINES[0]}
          mode="words"
          className="font-display text-[clamp(1.5rem,6vw,2.35rem)] font-black uppercase leading-[0.88] tracking-[-0.04em] text-white md:text-[clamp(2rem,2.8vw,3.5rem)]"
          itemClassName="inline-block will-change-transform"
        />
        <SplitTextMotion
          as="p"
          text={BELIEF_HEADER_LINES[1]}
          mode="words"
          className="mt-3 text-[clamp(0.82rem,2.7vw,0.98rem)] font-medium leading-[1.22] tracking-[0.04em] text-white/82 md:mt-5 md:text-[clamp(0.95rem,1.15vw,1.16rem)]"
          itemClassName="inline-block will-change-transform"
        />
      </div>
    </aside>
  );
}
