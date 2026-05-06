'use client';

import { createContext, useContext, ReactNode } from 'react';
import { MotionValue } from 'motion/react';
import { useBeliefsScroll } from '@/hooks/useBeliefsScroll';
import { BELIEF_SCROLL_THRESHOLDS } from './belief.constants';

export type BeliefsScrollContextValue = {
  sectionRef: React.RefObject<HTMLElement | null>;
  scrollYProgress: MotionValue<number>;
  phraseProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
  thresholds: typeof BELIEF_SCROLL_THRESHOLDS;
};

export const BeliefsScrollContext = createContext<BeliefsScrollContextValue | null>(
  null
);

export function BeliefsScrollProvider({ children }: { children: ReactNode }) {
  const value = useBeliefsScroll();

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
