'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import {
  BELIEF_MANIFESTO_LINES,
  beliefColors,
  beliefLayout,
  beliefMotion,
  beliefZIndex,
} from '@/config/beliefTokens';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { SplitTextMotion } from './SplitTextMotion';

gsap.registerPlugin(ScrollTrigger);

export function BeliefManifesto() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { containerRef, isClimax, shouldReduceMotion } =
    useBeliefsScrollContext();

  useEffect(() => {
    if (!wrapperRef.current || !containerRef.current) return;

    const el = wrapperRef.current;

    // Set initial hidden state
    gsap.set(el, { opacity: 0, y: 18 });

    const ctx = gsap.context(() => {
      // Reveal: 82% → 92% of section scroll (opacity 0→1, y 18→0)
      ScrollTrigger.create({
        trigger: containerRef.current!,
        start: '82% top',
        end: '92% top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(el, {
            opacity: p,
            y: shouldReduceMotion ? 0 : 18 * (1 - p),
          });
        },
      });

      // Fade out: 96% → 100% of section scroll
      ScrollTrigger.create({
        trigger: containerRef.current!,
        start: '96% top',
        end: '100% top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(el, { opacity: 1 - self.progress });
        },
      });
    });

    return () => ctx.revert();
  }, [containerRef, shouldReduceMotion]);

  // Trigger word stagger when climax is reached
  useEffect(() => {
    if (!isClimax || !wrapperRef.current) return;

    const splitItems = wrapperRef.current.querySelectorAll('[data-split-item]');
    if (splitItems.length === 0) return;

    gsap.from(splitItems, {
      autoAlpha: 0,
      y: shouldReduceMotion ? 0 : 12,
      stagger: shouldReduceMotion ? 0 : beliefMotion.manifestoStagger,
      duration: shouldReduceMotion ? 0.2 : 0.42,
      ease: shouldReduceMotion ? 'none' : GSAP_GHOST_EASE,
    });
  }, [isClimax, shouldReduceMotion]);

  return (
    <div
      ref={wrapperRef}
      data-testid="beliefs-manifesto"
      data-belief-manifesto
      style={{ zIndex: beliefZIndex.manifesto }}
      className="pointer-events-none fixed inset-0 flex items-center justify-center px-6 md:px-12 lg:px-16 xl:px-24"
      aria-hidden={!isClimax}
    >
      <div
        className="mx-auto w-full"
        style={{ maxWidth: beliefLayout.stageMaxWidth }}
      >
        <div className="grid grid-cols-12">
          <div
            data-testid="beliefs-manifesto-copy"
            className="col-span-12 md:col-span-11"
            style={{ maxWidth: beliefLayout.manifestoMaxWidth }}
          >
            <div
              className="font-display font-black uppercase leading-[0.82] tracking-[0.02em] text-white"
              style={{ fontSize: beliefLayout.manifestoFontSize }}
            >
              {BELIEF_MANIFESTO_LINES.map((line) => {
                const isGhostLine = line === 'GHOST';
                return (
                  <div
                    key={line}
                    className="block text-left"
                    style={{
                      color: isGhostLine ? beliefColors.bluePrimary : '#ffffff',
                    }}
                  >
                    <SplitTextMotion
                      as="div"
                      text={line}
                      mode="words"
                      className="block"
                      itemClassName="inline-block will-change-transform"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
