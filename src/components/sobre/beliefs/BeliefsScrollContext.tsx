'use client';

import { createContext, useContext, ReactNode, RefObject } from 'react';
import { MotionValue } from 'framer-motion';
import { BELIEF_SCROLL_THRESHOLDS } from './belief.constants';

export type BeliefsScrollContextValue = {
  sectionRef: RefObject<HTMLElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
  shouldReduceMotion: boolean;
  prefersReducedMotion: boolean;
  activePhraseIndex: number;
  isClimax: boolean;
  thresholds: typeof BELIEF_SCROLL_THRESHOLDS;
};

const BeliefsScrollContext = createContext<BeliefsScrollContextValue | null>(
  null
);

export function BeliefsScrollProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: BeliefsScrollContextValue;
}) {
  return (
    <BeliefsScrollContext.Provider value={value}>
      {children}
    </BeliefsScrollContext.Provider>
  );
}

export function useBeliefsScrollContext() {
  const context = useContext(BeliefsScrollContext);
  if (!context) {
    throw new Error(
      'useBeliefsScrollContext must be used within a BeliefsScrollProvider'
    );
  }
  return context;
}
