/**
 * Framer Motion Type Definitions
 * Centralized types for animation-related code
 */

import type {
  UseScrollOptions,
  MotionValue,
  SpringOptions,
} from 'framer-motion';

/**
 * Re-export commonly used Framer Motion types for convenience
 */
export type ScrollOffset = UseScrollOptions['offset'];

/**
 * Motion value event callback type
 */
export type MotionValueEventCallback<T> = (_latest: T) => void;

/**
 * Scroll narrative configuration for the useScrollNarrative hook
 */
export interface ScrollNarrativeConfig {
  /** Framer Motion scroll offset array, e.g. ['start start', 'end end'] */
  offset?: ScrollOffset;
  /** Spring damping for smooth scroll progress */
  damping?: number;
}

/**
 * Scroll narrative hook return type
 */
export interface ScrollNarrativeResult {
  containerRef: React.RefObject<HTMLDivElement>;
  scrollYProgress: MotionValue<number>;
  smoothProgress: MotionValue<number>;
  transforms: {
    heroOpacity: MotionValue<number>;
    manifestoScale: MotionValue<number>;
    manifestoRadius: MotionValue<number>;
  };
}

/**
 * Spring configuration options for consistent animation timing
 */
export interface GhostSpringConfig extends SpringOptions {
  stiffness?: number;
  damping?: number;
  restDelta?: number;
}
