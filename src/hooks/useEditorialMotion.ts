'use client';

import { useReducedMotion } from 'framer-motion';
import { motionTokens } from '@/components/sobre/motion';

const reducedTokens = {
  ghostIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  fadeGhost: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  riseSoft: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  clipReveal: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  },
  imageFloat: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  floatMemory: {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
};

export function useEditorialMotion() {
  const prefersReducedMotion = useReducedMotion();

  return {
    prefersReducedMotion,
    variants: prefersReducedMotion ? reducedTokens : motionTokens,
  };
}
