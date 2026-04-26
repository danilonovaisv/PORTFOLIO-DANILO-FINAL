'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { type MotionValue } from 'motion/react';
import { useBeliefsScroll } from '@/hooks/useBeliefsScroll';
import { useBeliefStore } from '@/store/beliefStore';

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
  const { scrollYProgress } = useBeliefsScroll(containerRef);
  const prefersReducedMotion = useBeliefStore((s) => s.prefersReducedMotion);
  const isMobile = useBeliefStore((s) => s.isMobile);

  return (
    <BeliefsScrollContext.Provider
      value={{ scrollYProgress, prefersReducedMotion, isMobile }}
    >
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
