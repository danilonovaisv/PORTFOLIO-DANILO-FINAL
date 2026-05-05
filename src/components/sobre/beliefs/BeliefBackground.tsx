'use client';

import { useEffect, useRef } from 'react';
import { animate, inView, type AnimationPlaybackControls } from 'framer-motion';
import { useMotionValueEvent } from 'framer-motion';
import { GHOST_EASE_AMBIENT, MOTION_TOKENS } from '@/config/motion';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { Z_INDEX } from '@/config/z-indices';
import { BELIEF_BACKGROUND_STOPS } from '@/config/beliefTokens';
import { BELIEF_SCROLL_THRESHOLDS } from './belief.constants';

const CLIMAX_BLUE = BELIEF_BACKGROUND_STOPS[BELIEF_BACKGROUND_STOPS.length - 1];

export function BeliefBackground() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const activeAnimRef = useRef<AnimationPlaybackControls | null>(null);
  const climaxLockedRef = useRef(false);
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const el = bgRef.current;
    if (!el) return;

    if (progress >= BELIEF_SCROLL_THRESHOLDS.finalLock) {
      if (climaxLockedRef.current) return;
      climaxLockedRef.current = true;
      activeAnimRef.current?.stop();
      activeAnimRef.current = animate(
        el,
        { backgroundColor: CLIMAX_BLUE } as Parameters<typeof animate>[1],
        { duration: shouldReduceMotion ? 0 : 0.45, ease: GHOST_EASE_AMBIENT }
      );
      return;
    }

    if (climaxLockedRef.current && progress < BELIEF_SCROLL_THRESHOLDS.finalLock - 0.04) {
      climaxLockedRef.current = false;
    }
  });

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    el.style.backgroundColor = BELIEF_BACKGROUND_STOPS[0];

    const animateBg = (color: string, duration: number) => {
      activeAnimRef.current?.stop();
      activeAnimRef.current = animate(
        el,
        { backgroundColor: color } as Parameters<typeof animate>[1],
        { duration, ease: GHOST_EASE_AMBIENT }
      );
    };

    const stopInView = inView('.belief-scroll-section', (entry) => {
      const node =
        (entry as unknown as { target?: Element }).target ??
        (entry as unknown as Element);
      const idx = Number((node as HTMLElement).dataset?.index ?? 0);
      const nextColor =
        BELIEF_BACKGROUND_STOPS[Math.min(idx + 1, BELIEF_BACKGROUND_STOPS.length - 1)] ??
        BELIEF_BACKGROUND_STOPS[0];

      if (!climaxLockedRef.current) {
        animateBg(nextColor, shouldReduceMotion ? 0 : 0.9);
      }

      return () => {
        if (climaxLockedRef.current) return;
        const prev =
          BELIEF_BACKGROUND_STOPS[Math.max(idx, 0)] ?? BELIEF_BACKGROUND_STOPS[0];
        animateBg(prev, shouldReduceMotion ? 0 : 0.6);
      };
    });

    return () => {
      activeAnimRef.current?.stop();
      stopInView();
    };
  }, [shouldReduceMotion]);

  return (
    <div
      ref={bgRef}
      data-testid="beliefs-background"
      data-belief-background
      aria-hidden="true"
      style={{
        zIndex: Z_INDEX.beliefs.background,
        backgroundColor: MOTION_TOKENS.colors.deepVoid,
      }}
      className="absolute inset-0"
    />
  );
}
