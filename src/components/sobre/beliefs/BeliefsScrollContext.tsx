'use client';

import { createContext, useContext } from 'react';
import type { MotionValue } from 'framer-motion';

interface BeliefsScrollContextValue {
  sectionRef: React.RefObject<HTMLElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  activePhraseIndex: number;
  isClimax: boolean;
  thresholds: {
    readonly entryStart: number;
    readonly entryEnd: number;
    readonly phrasesStart: number;
    readonly phrasesEnd: number;
    readonly climaxStart: number;
    readonly climaxEnd: number;
    readonly finalLock: number;
  };
}

const BeliefsScrollContext = createContext<BeliefsScrollContextValue | null>(null);

export function BeliefsScrollProvider({ 
  children, 
  value 
}: { 
  children: React.ReactNode; 
  value: BeliefsScrollContextValue 
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
    throw new Error('useBeliefsScrollContext must be used within a BeliefsScrollProvider');
  }
  return context;
}
