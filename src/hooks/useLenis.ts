'use client';

import { useContext } from 'react';
import { ScrollContext } from '@/contexts/ScrollContext';

export function useLenis() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error(
      'useLenis must be used within a ScrollContext Provider (SmoothScroll)'
    );
  }
  return context.lenis;
}
