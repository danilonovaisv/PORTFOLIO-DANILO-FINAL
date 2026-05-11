'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BELIEF_MANIFESTO_LINES,
  beliefZIndex,
} from '@/config/beliefTokens';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { SplitTextMotion } from './SplitTextMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function BeliefManifesto() {
  const { containerRef, isClimax, shouldReduceMotion } =
    useBeliefsScrollContext();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const root = ref.current;
    const container = containerRef.current;
    if (!root || !container) return;

    const words = root.querySelectorAll<HTMLElement>('[data-split-item]');

    const ctx = gsap.context(() => {
      gsap.set(root, { autoAlpha: 0, y: shouldReduceMotion ? 0 : 18 });
      gsap.set(words, {
        autoAlpha: 0,
        y: shouldReduceMotion ? 0 : 12,
      });

      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const progress = self.progress;
          const revealProgress = gsap.utils.clamp(
            0,
            1,
            (progress - 0.82) / 0.1
          );

          gsap.set(root, {
            autoAlpha: revealProgress,
            y: shouldReduceMotion ? 0 : 18 - 18 * revealProgress,
          });
          gsap.set(words, {
            autoAlpha: revealProgress,
            y: shouldReduceMotion ? 0 : 12 - 12 * revealProgress,
          });
          setActive(progress >= 0.82);
        },
      });

      ScrollTrigger.create({
        trigger: container,
        start: 'bottom 36%',
        onEnter: () => {
          gsap.to(words, {
            autoAlpha: 1,
            y: 0,
            duration: shouldReduceMotion ? 0.2 : 0.42,
            stagger: shouldReduceMotion ? 0 : 0.06,
            ease: shouldReduceMotion ? 'none' : GSAP_GHOST_EASE,
            overwrite: 'auto',
          });
        },
        onLeaveBack: () => {
          if (shouldReduceMotion) return;
          gsap.set(words, { autoAlpha: 0, y: 12 });
        },
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, shouldReduceMotion]);

  return (
    <div
      ref={ref}
      data-testid="beliefs-manifesto"
      data-belief-manifesto
      className="pointer-events-none fixed inset-0 flex items-center justify-center px-6"
      style={{ zIndex: beliefZIndex.manifesto }}
      aria-live={active || isClimax ? 'polite' : 'off'}
    >
      <div
        className="text-center font-display font-black uppercase leading-[0.82] tracking-[0.03em] text-white"
        style={{ fontSize: 'clamp(3.5rem, 16vw, 12rem)' }}
      >
        {BELIEF_MANIFESTO_LINES.map((line) => (
          <SplitTextMotion
            key={line}
            as="div"
            text={line}
            mode="words"
            className="block"
            itemClassName="inline-block will-change-transform"
          />
        ))}
      </div>
    </div>
  );
}
