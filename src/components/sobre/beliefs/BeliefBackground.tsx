'use client';

import { useEffect, useRef } from 'react';
import { MOTION_TOKENS } from '@/config/motion';

const getColorForProgress = (value: number) => {
  if (value >= 0.82) return MOTION_TOKENS.colors.deepVoid;

  const progressIndex = Math.min(
    MOTION_TOKENS.colors.bgCycle.length - 2,
    Math.max(0, Math.floor(value * 6))
  );

  return (
    MOTION_TOKENS.colors.bgCycle[progressIndex + 1] ||
    MOTION_TOKENS.colors.deepVoid
  );
};

export function BeliefBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    const section = background?.closest('[data-testid="beliefs-section"]');
    if (!background || !section) return;

    const applyBackground = () => {
      const rect = section.getBoundingClientRect();
      const progress =
        rect.height > 0
          ? Math.min(
              1,
              Math.max(0, (window.innerHeight - rect.top) / rect.height)
            )
          : 0;

      background.style.backgroundColor = getColorForProgress(progress);
    };

    let frame = 0;
    const updateBackground = () => {
      applyBackground();
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(applyBackground);
    };

    updateBackground();
    const timers = [
      window.setTimeout(updateBackground, 100),
      window.setTimeout(updateBackground, 300),
      window.setTimeout(updateBackground, 500),
    ];
    const interval = window.setInterval(updateBackground, 100);

    window.addEventListener('scroll', updateBackground, { passive: true });
    window.addEventListener('resize', updateBackground);

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(window.clearTimeout);
      window.clearInterval(interval);
      window.removeEventListener('scroll', updateBackground);
      window.removeEventListener('resize', updateBackground);
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="absolute inset-0 z-0 pointer-events-none"
      data-testid="beliefs-background"
      style={{ backgroundColor: getColorForProgress(0) }}
      aria-hidden="true"
    />
  );
}
