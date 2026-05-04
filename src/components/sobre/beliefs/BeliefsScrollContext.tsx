"use client";

import { createContext, useContext, ReactNode, RefObject } from "react";
import { MotionValue } from "motion/react";

type BeliefsScrollContextValue = {
  containerRef: RefObject<HTMLElement | null>;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
  shouldReduceMotion: boolean;
};

const BeliefsScrollContext = createContext<BeliefsScrollContextValue | null>(null);

export function BeliefsScrollProvider({ 
  children, 
  value 
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
    throw new Error("useBeliefsScrollContext must be used within a BeliefsScrollProvider");
  }
  return context;
}
