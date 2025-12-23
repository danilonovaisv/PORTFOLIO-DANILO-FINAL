'use client';

import React, { createContext, useContext } from 'react';
import { MotionValue } from 'framer-motion';

interface ScrollContextType {
  scrollYProgress?: MotionValue<number>;
}

const ScrollContext = createContext<ScrollContextType>({});

export function ScrollProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ScrollContextType;
}) {
  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}

export function useScrollContext() {
  return useContext(ScrollContext);
}
