'use client';

import { useCallback, useEffect, useRef } from 'react';
import { animate, inView } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { MOTION_TOKENS } from '@/config/motion';

interface BeliefBackgroundProps {
  scrollProgress: MotionValue<number>;
}

export function BeliefBackground({ scrollProgress }: BeliefBackgroundProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const lastColorRef = useRef<string>(MOTION_TOKENS.colors.deepVoid);
  const climaxFiredRef = useRef<boolean>(false);

  const animateBackground = useCallback((nextColor: string, customDuration?: number) => {
    if (!bgRef.current || lastColorRef.current === nextColor) return;

    lastColorRef.current = nextColor;
    animate(
      bgRef.current,
      { backgroundColor: nextColor },
      {
        duration: customDuration || MOTION_TOKENS.duration.bg,
        ease: MOTION_TOKENS.ease.ambient,
      }
    );
  }, []);

  useEffect(() => {
    const stopInView = inView('.scroll-section', (entry) => {
      if (climaxFiredRef.current) return;

      const el = entry as HTMLElement;
      const index = parseInt(el.dataset.index || '0', 10);
      const targetColor =
        MOTION_TOKENS.colors.bgCycle[index + 1] ||
        MOTION_TOKENS.colors.deepVoid;

      animateBackground(targetColor);

      // Bidirectional reset on leave
      return () => {
        if (climaxFiredRef.current) return;
        const prevColor = MOTION_TOKENS.colors.bgCycle[index] || MOTION_TOKENS.colors.deepVoid;
        animateBackground(prevColor, 0.6);
      };
    });

    const unsubProgress = scrollProgress.on('change', (value) => {
      const isClimax = value >= 0.82;
      
      if (isClimax && !climaxFiredRef.current) {
        climaxFiredRef.current = true;
        animateBackground(MOTION_TOKENS.colors.deepVoid);
      } else if (!isClimax && climaxFiredRef.current) {
        climaxFiredRef.current = false;
        
        // On scroll up from climax, reset to the last mapped color
        const progressIndex = Math.min(
          MOTION_TOKENS.colors.bgCycle.length - 2,
          Math.max(0, Math.floor(value * 6))
        );
        const nextColor =
          MOTION_TOKENS.colors.bgCycle[progressIndex + 1] ||
          MOTION_TOKENS.colors.deepVoid;

        animateBackground(nextColor, 0.6);
      }
    });

    return () => {
      stopInView();
      unsubProgress();
    };
  }, [animateBackground, scrollProgress]);

  return (
    <div
      ref={bgRef}
      className="absolute inset-0 z-0 pointer-events-none transition-colors duration-800 ease-in-out"
      data-testid="beliefs-background"
      style={{ backgroundColor: MOTION_TOKENS.colors.deepVoid }}
      aria-hidden="true"
    />
  );
}
