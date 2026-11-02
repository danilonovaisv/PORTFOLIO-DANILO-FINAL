'use client';

import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

export interface ScrollContextType {
  lenis: Lenis | null;
}

export const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
});

export const useLenis = () => useContext(ScrollContext).lenis;
