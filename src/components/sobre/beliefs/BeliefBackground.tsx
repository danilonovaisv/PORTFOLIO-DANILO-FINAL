'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BELIEF_BACKGROUND_STOPS, beliefZIndex } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function BeliefBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { containerRef, isMobile } = useBeliefsScrollContext();

  useEffect(() => {
    const background = ref.current;
    const container = containerRef.current;
    if (!background || !container) return;

    // Set initial color
    gsap.set(background, { backgroundColor: BELIEF_BACKGROUND_STOPS[0] });

    // Background changes are NOT animated — per motion spec, each scroll section
    // has its own static background. No crossfades, gradient morphs or interpolation.
    const transitionTo = (color: string) => {
      gsap.to(background, {
        backgroundColor: color,
        duration: 0.8,
        ease: 'power2.inOut',
      });
    };

    const ctx = gsap.context(() => {
      // Entry/Exit opacity management
      gsap.set(background, { autoAlpha: 0 });

      ScrollTrigger.create({
        trigger: container,
        start: 'top 95%',
        end: 'bottom 5%',
        onToggle: (self) => {
          gsap.to(background, {
            autoAlpha: self.isActive ? 1 : 0,
            duration: 0.8,
            ease: 'power2.inOut',
          });
        },
      });

      // Snap background on each phrase section entering viewport
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

      // Reset to void when scrolling back above the section
      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        onLeaveBack: () => transitionTo(BELIEF_BACKGROUND_STOPS[0]),
      });

      // Climax: snap to final stop at bottom of section
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
  }, [containerRef, isMobile]);

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
