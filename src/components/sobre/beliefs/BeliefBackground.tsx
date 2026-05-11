'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BELIEF_BACKGROUND_STOPS,
  beliefZIndex,
} from '@/config/beliefTokens';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function BeliefBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { containerRef, isMobile, shouldReduceMotion } =
    useBeliefsScrollContext();

  useEffect(() => {
    const background = ref.current;
    const container = containerRef.current;
    if (!background || !container) return;

    background.style.backgroundColor = BELIEF_BACKGROUND_STOPS[0];

    const transitionTo = (color: string) => {
      if (shouldReduceMotion) {
        gsap.set(background, { backgroundColor: color });
        return;
      }

      gsap.to(background, {
        backgroundColor: color,
        duration: 0.9,
        ease: GSAP_GHOST_EASE,
        overwrite: 'auto',
      });
    };

    const ctx = gsap.context(() => {
      const sections = Array.from(
        container.querySelectorAll<HTMLElement>('.belief-scroll-section')
      );

      sections.forEach((section) => {
        const index = Number.parseInt(section.dataset.index ?? '0', 10);
        const color =
          BELIEF_BACKGROUND_STOPS[
            Math.min(index + 1, BELIEF_BACKGROUND_STOPS.length - 1)
          ];

        ScrollTrigger.create({
          trigger: section,
          start: isMobile ? 'top 78%' : 'top 64%',
          onEnter: () => transitionTo(color),
          onEnterBack: () => transitionTo(color),
        });
      });

      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        onLeaveBack: () => transitionTo(BELIEF_BACKGROUND_STOPS[0]),
      });

      ScrollTrigger.create({
        trigger: container,
        start: 'bottom 88%',
        onEnter: () =>
          transitionTo(
            BELIEF_BACKGROUND_STOPS[BELIEF_BACKGROUND_STOPS.length - 1]
          ),
        onLeaveBack: () =>
          transitionTo(
            BELIEF_BACKGROUND_STOPS[BELIEF_BACKGROUND_STOPS.length - 2]
          ),
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, isMobile, shouldReduceMotion]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-testid="beliefs-background"
      data-belief-background
      className="absolute inset-0 bg-[#040013]"
      style={{ zIndex: beliefZIndex.background }}
    />
  );
}
