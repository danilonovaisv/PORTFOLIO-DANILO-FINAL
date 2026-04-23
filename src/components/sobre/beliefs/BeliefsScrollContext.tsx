'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { type MotionValue } from 'motion/react';
import { useBeliefsScroll } from '@/hooks/useBeliefsScroll';

interface BeliefsScrollContextValue {
  scrollYProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
  isMobile: boolean;
}

const BeliefsScrollContext = createContext<BeliefsScrollContextValue | null>(
  null
);

export function BeliefsScrollProvider({
  children,
  containerRef,
}: {
  children: ReactNode;
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const scrollData = useBeliefsScroll(containerRef);

  return (
    <BeliefsScrollContext.Provider value={scrollData}>
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
