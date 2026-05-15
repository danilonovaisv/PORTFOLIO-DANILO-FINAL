'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BELIEF_HEADER_LINES, beliefZIndex } from '@/config/beliefTokens';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { SplitTextMotion } from './SplitTextMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function BeliefFixedHeader() {
  const rootRef = useRef<HTMLElement>(null);
  const { containerRef, isMobile, shouldReduceMotion } =
    useBeliefsScrollContext();

  useEffect(() => {
    const root = rootRef.current;
    const container = containerRef.current;
    if (!root || !container) return;

    const words = root.querySelectorAll<HTMLElement>('[data-split-item]');

    // Ensure initial hidden state — spec: fade-in + blur 10px → 0
    gsap.set(root, {
      autoAlpha: 0,
      x: shouldReduceMotion ? 0 : 60,
      filter: shouldReduceMotion ? 'blur(0px)' : 'blur(10px)',
    });
    gsap.set(words, {
      autoAlpha: 0,
      y: shouldReduceMotion ? 0 : 12,
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: isMobile ? 'top 88%' : 'top 80%',
        onEnter: () => {
          gsap.to(root, {
            autoAlpha: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: shouldReduceMotion ? 0.25 : 0.9,
            ease: shouldReduceMotion ? 'none' : GSAP_GHOST_EASE,
            overwrite: 'auto',
          });
          gsap.to(words, {
            autoAlpha: 1,
            y: 0,
            duration: shouldReduceMotion ? 0.2 : 0.48,
            stagger: shouldReduceMotion ? 0 : 0.05,
            ease: shouldReduceMotion ? 'none' : GSAP_GHOST_EASE,
            delay: 0.15,
            overwrite: 'auto',
          });
        },
        onLeaveBack: () => {
          gsap.to(root, {
            autoAlpha: shouldReduceMotion ? 1 : 0,
            x: shouldReduceMotion ? 0 : 60,
            filter: shouldReduceMotion ? 'blur(0px)' : 'blur(10px)',
            duration: shouldReduceMotion ? 0.2 : 0.4,
            ease: shouldReduceMotion ? 'none' : GSAP_GHOST_EASE,
            overwrite: 'auto',
          });
          gsap.to(words, {
            autoAlpha: shouldReduceMotion ? 1 : 0,
            y: 0,
            duration: shouldReduceMotion ? 0.2 : 0.28,
            ease: shouldReduceMotion ? 'none' : GSAP_GHOST_EASE,
            overwrite: 'auto',
          });
        },
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, isMobile, shouldReduceMotion]);

  return (
    <aside
      ref={rootRef}
      className="pointer-events-none absolute inset-y-0 right-0 flex w-full items-start justify-end px-6 pt-[13vh] md:items-center md:px-10 md:pt-0 lg:px-16"
      style={{ zIndex: beliefZIndex.fixedHeader }}
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
