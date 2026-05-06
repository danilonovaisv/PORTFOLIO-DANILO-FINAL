'use client';

import { useEffect, useRef } from 'react';
import { animate, inView, type AnimationPlaybackControls } from 'motion';
import { useMotionValueEvent } from 'motion/react';
import { GHOST_EASE_AMBIENT } from '@/config/motion';
import {
  BELIEF_COLOR_STOPS,
  BELIEF_SCROLL_THRESHOLDS,
} from './belief.constants';
import { useBeliefsScrollContext } from './BeliefsScrollProvider';

export function BeliefBackground() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const activeAnimationRef = useRef<AnimationPlaybackControls | null>(null);
  const climaxLockedRef = useRef(false);
  const { scrollYProgress, prefersReducedMotion } = useBeliefsScrollContext();

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!bgRef.current) return;

    if (progress >= BELIEF_SCROLL_THRESHOLDS.finalLock) {
      climaxLockedRef.current = true;
      activeAnimationRef.current?.stop();
      activeAnimationRef.current = animate(
        bgRef.current,
        { backgroundColor: '#0048ff' },
        { duration: prefersReducedMotion ? 0 : 0.45, ease: GHOST_EASE_AMBIENT }
      );
      return;
    }

    climaxLockedRef.current = false;
  });

  useEffect(() => {
    if (!bgRef.current) return;

    const stop = inView('.scroll-section', (section) => {
      const index = Number((section as HTMLElement).dataset.index ?? 0);
      const targetColor = BELIEF_COLOR_STOPS[index] ?? BELIEF_COLOR_STOPS[0];

      if (!climaxLockedRef.current) {
        activeAnimationRef.current?.stop();
        activeAnimationRef.current = animate(
          bgRef.current,
          { backgroundColor: targetColor },
          { duration: prefersReducedMotion ? 0 : 0.9, ease: GHOST_EASE_AMBIENT }
        );
      }

      return () => {
        if (!bgRef.current || climaxLockedRef.current) return;

        const previousColor =
          BELIEF_COLOR_STOPS[Math.max(index - 1, 0)] ?? BELIEF_COLOR_STOPS[0];
        activeAnimationRef.current?.stop();
        activeAnimationRef.current = animate(
          bgRef.current,
          { backgroundColor: previousColor },
          { duration: prefersReducedMotion ? 0 : 0.6, ease: GHOST_EASE_AMBIENT }
        );
      };
    });

    return () => {
      activeAnimationRef.current?.stop();
      stop();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={bgRef}
      aria-hidden="true"
      data-testid="beliefs-background"
      data-belief-background
      className="fixed inset-0 z-[var(--z-layer-base)] bg-[#040013]"
    />
  );
}
