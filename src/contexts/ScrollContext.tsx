'use client';

import React, { createContext, useContext } from 'react';
import { MotionValue } from 'framer-motion';

interface ScrollContextType {
  scrollYProgress: MotionValue<number> | null;
}

const ScrollContext = createContext<ScrollContextType>({
  scrollYProgress: null,
});

interface ScrollProviderProps {
  children: React.ReactNode;
  scrollYProgress: MotionValue<number>;
}

export function ScrollProvider({
  children,
  scrollYProgress,
}: ScrollProviderProps) {
  return (
    <ScrollContext.Provider value={{ scrollYProgress }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollContext() {
  return useContext(ScrollContext);
}
