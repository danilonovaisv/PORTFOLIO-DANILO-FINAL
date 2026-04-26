'use client';

import { useCallback, useEffect, useRef } from 'react';
import { animate } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { MOTION_TOKENS } from '@/config/motion';

interface BeliefBackgroundProps {
  scrollProgress: MotionValue<number>;
}

export function BeliefBackground({ scrollProgress }: BeliefBackgroundProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const lastColorRef = useRef<string>(MOTION_TOKENS.colors.deepVoid);

  const animateBackground = useCallback((nextColor: string) => {
    if (!bgRef.current || lastColorRef.current === nextColor) return;

    lastColorRef.current = nextColor;
    animate(
      bgRef.current,
      { backgroundColor: nextColor },
      {
        duration: MOTION_TOKENS.duration.bg,
        ease: MOTION_TOKENS.ease.ambient,
      }
    );
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!bgRef.current || !entry.isIntersecting) return;

          const el = entry.target as HTMLElement;
          const index = parseInt(el.dataset.index || '0', 10);
          const nextColor =
            MOTION_TOKENS.colors.bgCycle[index + 1] ||
            MOTION_TOKENS.colors.deepVoid;

          animateBackground(nextColor);
        });
      },
      { threshold: 0.5 }
    );

    document
      .querySelectorAll('.scroll-section')
      .forEach((el) => observer.observe(el));

    const unsubProgress = scrollProgress.on('change', (value) => {
      const progressIndex = Math.min(
        MOTION_TOKENS.colors.bgCycle.length - 2,
        Math.max(0, Math.floor(value * 6))
      );
      const nextColor =
        MOTION_TOKENS.colors.bgCycle[progressIndex + 1] ||
        MOTION_TOKENS.colors.deepVoid;

      animateBackground(nextColor);
    });

    return () => {
      observer.disconnect();
      unsubProgress();
    };
  }, [animateBackground, scrollProgress]);

  return (
    <div
      ref={bgRef}
      className="absolute inset-0 z-0"
      data-testid="beliefs-background"
      style={{ backgroundColor: MOTION_TOKENS.colors.deepVoid }}
      aria-hidden="true"
    />
  );
}
