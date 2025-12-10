'use client';

import { useReducedMotion } from 'framer-motion';

export default function usePrefersReducedMotion(): boolean {
  const reducedMotion = useReducedMotion();
  return reducedMotion ?? false;
}
