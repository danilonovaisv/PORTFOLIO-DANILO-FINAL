'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';
import { MOTION_TOKENS } from '@/config/motion';
import type { ParticleStageConfig } from '@/components/sobre/origin/data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseOriginParticleAnimationsProps {
  isClient: boolean;
  archRef: RefObject<HTMLDivElement | null>;
  archRightRef: RefObject<HTMLDivElement | null>;
  contentCount: number;
  prefersReducedMotion: boolean;
  particleStages: ParticleStageConfig[];
  onActiveStageChange?: (_stageIndex: number) => void;
  onBgColorChange?: (_color: string) => void;
}

export function useOriginParticleAnimations({
  isClient,
  archRef,
  archRightRef,
  contentCount,
  prefersReducedMotion,
  particleStages,
  onActiveStageChange,
  onBgColorChange,
}: UseOriginParticleAnimationsProps) {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const ctxRef = useRef<gsap.Context | null>(null);
  const lastStageRef = useRef(-1);
  const isMountedRef = useRef(true);

  useEffect(() => {
    if (!isClient) return;
    isMountedRef.current = true;

    const mm = gsap.matchMedia();

    const desktopCleanup = mm.add('(min-width: 1024px)', () => {
      const archEl = archRef.current;
      const archRightEl = archRightRef.current;

      if (!archEl || !archRightEl) return;

      const ctx = gsap.context(() => {
        const blocks = archEl.querySelectorAll('[data-origin-block]');
        const titles = archEl.querySelectorAll('[data-origin-title]');
        const copies = archEl.querySelectorAll('[data-origin-copy]');
        const triggers: ScrollTrigger[] = [];

        if (blocks.length === 0) return;

        // Initialize BG color
        onBgColorChange?.(particleStages[0].bgColor);

        const setInitialState = () => {
          if (!isMountedRef.current) return;
          gsap.set(titles, {
            opacity: 0.45,
            y: MOTION_TOKENS.offset.subtle,
            filter: 'blur(2px)',
          });
          gsap.set(copies, {
            opacity: 0.4,
            y: MOTION_TOKENS.offset.subtle,
            filter: 'blur(2px)',
          });
          gsap.set(titles[0], { opacity: 1, y: 0, filter: 'blur(0px)' });
          gsap.set(copies[0], { opacity: 0.82, y: 0, filter: 'blur(0px)' });
          setActiveStageIndex(0);
          onActiveStageChange?.(0);
          onBgColorChange?.(particleStages[0].bgColor);
          lastStageRef.current = 0;
        };

        setInitialState();

        blocks.forEach((block, index) => {
          const trigger = ScrollTrigger.create({
            trigger: block,
            start: 'top 75%',
            end: 'bottom 25%',
            onEnter: () => handleStageChange(index, 'down'),
            onEnterBack: () => handleStageChange(index, 'up'),
            onLeaveBack: () => {
              if (index === 0) setInitialState();
            },
            scrub: false,
          });
          triggers.push(trigger);
        });

        const endTrigger = ScrollTrigger.create({
          trigger: archEl,
          start: 'bottom 70%',
          onEnter: () => handleStageChange(contentCount, 'down'),
          onLeaveBack: () => setInitialState(),
        });
        triggers.push(endTrigger);

        function handleStageChange(
          stageIndex: number,
          _direction: 'up' | 'down'
        ) {
          if (!isMountedRef.current) return;

          if (stageIndex >= contentCount) {
            // Past last block - hide last text
            const lastTitle = titles[contentCount - 1];
            const lastCopy = copies[contentCount - 1];
            if (lastTitle) {
              gsap.to(lastTitle, {
                opacity: 0.45,
                y: MOTION_TOKENS.offset.subtle,
                filter: 'blur(2px)',
                duration: prefersReducedMotion
                  ? MOTION_TOKENS.duration.fast
                  : MOTION_TOKENS.duration.normal,
                ease: prefersReducedMotion ? 'none' : GSAP_GHOST_EASE,
              });
            }
            if (lastCopy) {
              gsap.to(lastCopy, {
                opacity: 0.4,
                y: MOTION_TOKENS.offset.subtle,
                filter: 'blur(2px)',
                duration: prefersReducedMotion
                  ? MOTION_TOKENS.duration.fast
                  : MOTION_TOKENS.duration.normal,
                ease: prefersReducedMotion ? 'none' : GSAP_GHOST_EASE,
              });
            }
            return;
          }

          if (stageIndex === lastStageRef.current) return;
          lastStageRef.current = stageIndex;

          // Update active stage
          setActiveStageIndex(stageIndex);
          onActiveStageChange?.(stageIndex);

          // Transition background color
          const newBgColor = particleStages[stageIndex].bgColor;
          onBgColorChange?.(newBgColor);

          // Animate text blocks
          titles.forEach((title, i) => {
            const isActive = i === stageIndex;
            gsap.to(title, {
              opacity: isActive ? 1 : 0.45,
              y: 0,
              filter: 'blur(0px)',
              duration: prefersReducedMotion
                ? MOTION_TOKENS.duration.fast
                : MOTION_TOKENS.duration.modal,
              delay: prefersReducedMotion
                ? 0
                : isActive
                  ? MOTION_TOKENS.delay.short
                  : 0,
              ease: prefersReducedMotion ? 'none' : GSAP_GHOST_EASE,
            });
          });

          copies.forEach((copy, i) => {
            const isActive = i === stageIndex;
            gsap.to(copy, {
              opacity: isActive ? 0.82 : 0.4,
              y: 0,
              filter: 'blur(0px)',
              duration: prefersReducedMotion
                ? MOTION_TOKENS.duration.fast
                : MOTION_TOKENS.duration.modal,
              delay: prefersReducedMotion
                ? 0
                : isActive
                  ? MOTION_TOKENS.delay.normal
                  : 0,
              ease: prefersReducedMotion ? 'none' : GSAP_GHOST_EASE,
            });
          });
        }

        // Sticky gallery entrance
        gsap.from(archRightEl, {
          opacity: 0,
          y: MOTION_TOKENS.offset.standard,
          duration: prefersReducedMotion
            ? MOTION_TOKENS.duration.fast
            : MOTION_TOKENS.duration.GHOST_REVEAL,
          delay: prefersReducedMotion ? 0 : MOTION_TOKENS.delay.short,
          ease: prefersReducedMotion ? 'none' : GSAP_GHOST_EASE,
          scrollTrigger: {
            trigger: archEl,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
            onLeaveBack: setInitialState,
          },
        });

        // Subtle parallax on sticky gallery
        if (!prefersReducedMotion) {
          const parallaxTween = gsap.to(archRightEl, {
            y: -MOTION_TOKENS.offset.standard,
            ease: 'none',
            scrollTrigger: {
              trigger: archEl,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
          if (parallaxTween.scrollTrigger) {
            triggers.push(parallaxTween.scrollTrigger);
          }
        }

        triggersRef.current = triggers;

        return () => {
          triggers.forEach((trigger) => {
            if (trigger) trigger.kill();
          });
        };
      }, archEl);

      ctxRef.current = ctx;

      return () => {
        if (ctx) ctx.revert();
      };
    });

    // Mobile: simple viewport-based reveal
    const mobileCleanup = mm.add('(max-width: 1023px)', () => {
      const archEl = archRef.current;
      if (!archEl) return;

      const ctx = gsap.context(() => {
        const blocks = archEl.querySelectorAll('[data-origin-block]');
        const titles = archEl.querySelectorAll('[data-origin-title]');
        const copies = archEl.querySelectorAll('[data-origin-copy]');

        const setInitialState = () => {
          if (!isMountedRef.current) return;
          gsap.set(titles, {
            opacity: 0,
            y: MOTION_TOKENS.offset.standard,
            filter: 'blur(8px)',
          });
          gsap.set(copies, {
            opacity: 0,
            y: MOTION_TOKENS.offset.standard,
            filter: 'blur(8px)',
          });
          onBgColorChange?.(particleStages[0].bgColor);
        };

        setInitialState();

        blocks.forEach((block, index) => {
          const stage = particleStages[index];
          if (!stage) return;

          ScrollTrigger.create({
            trigger: block,
            start: 'top 80%',
            onEnter: () => {
              if (!isMountedRef.current) return;
              const title = titles[index];
              const copy = copies[index];
              if (title) {
                gsap.to(title, {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  duration: prefersReducedMotion
                    ? MOTION_TOKENS.duration.fast
                    : MOTION_TOKENS.duration.GHOST_REVEAL,
                  ease: prefersReducedMotion ? 'none' : GSAP_GHOST_EASE,
                });
              }
              if (copy) {
                gsap.to(copy, {
                  opacity: 0.82,
                  y: 0,
                  filter: 'blur(0px)',
                  duration: prefersReducedMotion
                    ? MOTION_TOKENS.duration.fast
                    : MOTION_TOKENS.duration.GHOST_REVEAL,
                  delay: prefersReducedMotion ? 0 : MOTION_TOKENS.delay.short,
                  ease: prefersReducedMotion ? 'none' : GSAP_GHOST_EASE,
                });
              }
              setActiveStageIndex(index);
              onActiveStageChange?.(index);
              onBgColorChange?.(stage.bgColor);
            },
            onEnterBack: () => {
              if (!isMountedRef.current) return;
              const title = titles[index];
              const copy = copies[index];
              if (title) {
                gsap.to(title, {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  duration: prefersReducedMotion
                    ? MOTION_TOKENS.duration.fast
                    : MOTION_TOKENS.duration.GHOST_REVEAL,
                  ease: prefersReducedMotion ? 'none' : GSAP_GHOST_EASE,
                });
              }
              if (copy) {
                gsap.to(copy, {
                  opacity: 0.82,
                  y: 0,
                  filter: 'blur(0px)',
                  duration: prefersReducedMotion
                    ? MOTION_TOKENS.duration.fast
                    : MOTION_TOKENS.duration.GHOST_REVEAL,
                  delay: prefersReducedMotion ? 0 : MOTION_TOKENS.delay.short,
                  ease: prefersReducedMotion ? 'none' : GSAP_GHOST_EASE,
                });
              }
              setActiveStageIndex(index);
              onActiveStageChange?.(index);
              onBgColorChange?.(stage.bgColor);
            },
          });
        });

        return () => {
          if (ctx) ctx.revert();
        };
      }, archEl);

      ctxRef.current = ctx;
    });

    return () => {
      isMountedRef.current = false;
      // mm is a MatchMedia object, use its revert method if available
      try {
        desktopCleanup?.revert?.();
        mobileCleanup?.revert?.();
      } catch {
        // ignore cleanup errors
      }
      // Kill any remaining triggers
      triggersRef.current.forEach((trigger) => {
        if (trigger) trigger.kill();
      });
      triggersRef.current = [];
    };
  }, [
    isClient,
    archRef,
    archRightRef,
    contentCount,
    prefersReducedMotion,
    particleStages,
    onActiveStageChange,
    onBgColorChange,
  ]);

  return {
    activeStageIndex,
    setActiveStageIndex,
  };
}
