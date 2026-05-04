import type { Variants, Transition, SpringOptions } from 'framer-motion';

import { COLORS } from '@/config/colors';

// =============================================================================
// MOTION TOKENS - Ghost Era Design System
// SINGLE SOURCE OF TRUTH for all animations
// =============================================================================

/** Ghost Easing Curve - A fluid, ethereal timing function */
type EasingTuple = [number, number, number, number];

export const GHOST_EASE: EasingTuple = [0.22, 1, 0.36, 1];
export const GHOST_EASE_SOFT: EasingTuple = [0.25, 1, 0.5, 1];
export const GHOST_EASE_HEAVY: EasingTuple = [0.43, 0.13, 0.23, 0.96];
export const GHOST_EASE_INOUT_SINE: EasingTuple = [0.445, 0.05, 0.55, 0.95];
/**
 * Ambient curve — ignition-style fast start, long tail decay.
 * Use ONLY for long-running atmospheric layers (belief backgrounds,
 * gradient drifts, manifesto-style scroll fades). Never on UI controls.
 */
export const GHOST_EASE_AMBIENT: EasingTuple = [0.17, 0.55, 0.55, 1];

export const MOTION_TOKENS = {
  // ─────────────────────────────────────────────────────────────────────────
  // BELIEFS V3 CONTRACT
  // ─────────────────────────────────────────────────────────────────────────
  colors: {
    deepVoid: COLORS.background,
    bluePrimary: COLORS.bluePrimary,
    purpleDetails: COLORS.purpleDetails,
    pinkDetails: COLORS.pinkDetails,
    cyanAccent: COLORS.blueAccent,
    white: COLORS.text,
    bgCycle: [
      COLORS.background,
      COLORS.bluePrimary,
      COLORS.purpleDetails,
      COLORS.pinkDetails,
      COLORS.bluePrimary,
      COLORS.purpleDetails,
      COLORS.pinkDetails,
      COLORS.background,
    ],
  },

  ease: {
    ambient: GHOST_EASE_AMBIENT,
    ghost: GHOST_EASE,
    soft: [0.16, 1, 0.3, 1] as EasingTuple,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DURATIONS
  // ─────────────────────────────────────────────────────────────────────────
  duration: {
    bg: 0.9,
    headerIn: 0.8,
    headerOut: 0.5,
    textIn: 0.9,
    textOut: 0.5,
    ghostIn: 1.2,
    /** Atmospheric, slow reveals - 1.5s */
    slow: 1.5,
    /** Standard transitions - 0.8s */
    normal: 0.8,
    /** Quick interactions - 0.2s */
    fast: 0.2,
    /** Micro-interactions - 0.16s */
    micro: 0.16,
    /** Modal/overlay animations - 0.5s */
    modal: 0.5,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // STAGGER DELAYS
  // ─────────────────────────────────────────────────────────────────────────
  stagger: {
    /** Rapid fire - 0.04s */
    tight: 0.04,
    /** Standard stagger - 0.08s (Ghost System) */
    normal: 0.08,
    /** Ghost-like slow reveal - 0.15s */
    relaxed: 0.15,
    /** Very slow, dramatic - 0.25s */
    dramatic: 0.25,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // VIEWPORT REVEAL SETTINGS
  // ─────────────────────────────────────────────────────────────────────────
  reveal: {
    threshold: 0.1,
    margin: '-50px',
    beliefsMargin: '-40% 0px -40% 0px',
  },

  blur: {
    hidden: 'blur(10px)',
    visible: 'blur(0px)',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SPRING PHYSICS (Ghost-style: fluid, not bouncy)
  // ─────────────────────────────────────────────────────────────────────────
  spring: {
    /** Ultra-soft spring for parallax and scroll-linked animations */
    ghost: {
      stiffness: 50,
      damping: 20,
      restDelta: 0.001,
    } satisfies SpringOptions,
    /** Slightly more responsive spring */
    responsive: {
      stiffness: 100,
      damping: 25,
      restDelta: 0.001,
    } satisfies SpringOptions,
    /** Scroll smoothing for scrubbed scene motion */
    scrollScrub: {
      stiffness: 100,
      damping: 25,
      restDelta: 0.001,
    } satisfies SpringOptions,
    /** Snappy but not bouncy - for buttons/interactive elements */
    snappy: {
      stiffness: 200,
      damping: 30,
      restDelta: 0.001,
    } satisfies SpringOptions,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Y-OFFSET LIMITS (Ghost Design: max 18px for subtle movements)
  // ─────────────────────────────────────────────────────────────────────────
  offset: {
    /** Minimal shift - 8px */
    subtle: 8,
    /** Standard entrance - 18px (max for Ghost) */
    standard: 18,
    /** Larger movements for special cases - 30px */
    large: 18,
    /** Hero/dramatic entrances - 40px (use sparingly) */
    dramatic: 18,
  },

  layout: {
    sectionMinHeight: '620vh',
    phraseSectionHeight: '80vh',
    desktopPhraseMaxWidth: '38vw',
    desktopPhraseLeft: 'clamp(1.5rem, 6vw, 6rem)',
    mobilePhraseBottom: '20vh',
  },

  z: {
    bg: 0,
    overlay: 10,
    header: 30,
    text: 40,
    manifesto: 50,
    ghost: 70,
  },
} as const;

// =============================================================================
// REUSABLE VARIANTS - Ghost Era Design System
// Rules: No Scale, No Bounce, No Rotate. Opacity + Blur + Y-Translate (max 18px)
// =============================================================================

/**
 * Ghost Reveal - Standard entry with heavy blur
 */
export const ghostReveal: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

/**
 * Ghost Reveal Simple - Standard entry without blur (performance mode)
 */
export const ghostRevealSimple: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

/**
 * Ghost Rise - Subtle entry with upward movement (max 18px)
 */
export const ghostRise: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

/**
 * Ghost Slide - Subtle side entry for images/decorative elements
 */
export const ghostSlide: Variants = {
  hidden: { opacity: 0, x: 12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: GHOST_EASE },
  },
};

/**
 * Ghost Fade - Pure opacity transition
 */
export const ghostFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: GHOST_EASE },
  },
};

/**
 * Ghost Time Based - Specialized for scroll-timed narrative reveals (e.g., Beliefs)
 */
export const ghostTimeBased: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(8px)',
    y: 18,
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.textIn,
      ease: GHOST_EASE,
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(8px)',
    y: -18,
    transition: {
      duration: MOTION_TOKENS.duration.textOut,
      ease: GHOST_EASE,
    },
  },
};

/**
 * Stagger Container - Parent for staggered children
 * Use for: Lists, grids, card groups
 */
export const staggerContainer = (
  staggerDelay: number = MOTION_TOKENS.stagger.relaxed as number
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.2,
    },
  },
});

// =============================================================================
// TRANSITION HELPERS
// =============================================================================

/**
 * Create a ghost-style transition
 */
export const ghostTransition = (
  delay: number = 0,
  dur: number = MOTION_TOKENS.duration.normal as number
): Transition => ({
  duration: dur,
  delay,
  ease: GHOST_EASE,
});

/**
 * Viewport animation props (for whileInView)
 */
export const viewportConfig = {
  once: true,
  margin: MOTION_TOKENS.reveal.margin,
  amount: MOTION_TOKENS.reveal.threshold,
};
