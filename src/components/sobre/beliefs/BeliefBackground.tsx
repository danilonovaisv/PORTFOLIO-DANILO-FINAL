'use client';

import { useEffect, useRef } from 'react';
import { BELIEF_BACKGROUND_STOPS, beliefColors, beliefZIndex } from '@/config/beliefTokens';
import { useBeliefsScrollContext } from './BeliefsScrollContext';

export function BeliefBackground() {
  const ref = useRef<HTMLDivElement | null>(null);
  const previousColorRef = useRef<string>(beliefColors.deepVoid);
  const { activeIndex, containerRef, isClimax } = useBeliefsScrollContext();

  useEffect(() => {
    if (!ref.current || !containerRef.current) return;

    const nextColor = isClimax
      ? beliefColors.deepVoid
      : BELIEF_BACKGROUND_STOPS[
          Math.min(activeIndex, BELIEF_BACKGROUND_STOPS.length - 2)
        ];

    if (previousColorRef.current !== nextColor) {
      previousColorRef.current = nextColor;
      ref.current.style.backgroundColor = nextColor;
    }
  }, [activeIndex, containerRef, isClimax]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-testid="beliefs-background"
      data-belief-background
      className="absolute inset-0"
      style={{
        zIndex: beliefZIndex.background,
      }}
    />
  );
}
