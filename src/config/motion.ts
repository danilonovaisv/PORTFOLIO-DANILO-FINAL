import type { Variants, SpringOptions } from 'framer-motion';

// =============================================================================
// MOTION TOKENS - Ghost Era Design System
// SINGLE SOURCE OF TRUTH for all animations
// =============================================================================

/** Ghost Easing Curve - A fluid, ethereal timing function */
type EasingTuple = [number, number, number, number];

export const GHOST_EASE: EasingTuple = [0.22, 1, 0.36, 1];

export const MOTION_TOKENS = {
  // ─────────────────────────────────────────────────────────────────────────
  // EASE
  // ─────────────────────────────────────────────────────────────────────────
  ease: {
    ghost: GHOST_EASE,
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
    /** UI standard transitions - 0.3s */
    standard: 0.3,
    /** Micro-interactions - 0.16s */
    micro: 0.16,
    /** Modal/overlay animations - 0.5s */
    modal: 0.5,
    /** Specialized stagger for word reveals */
    WORD_STAGGER: 0.05,
    /** Standard Ghost reveal duration */
    GHOST_REVEAL: 0.9,
    /** Standard Ghost exit duration */
    GHOST_EXIT: 0.5,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SPLIT TEXT — Kinetic Typography Tokens
  // ─────────────────────────────────────────────────────────────────────────
  splitText: {
    /** Char-level stagger for header reveals */
    headerStagger: 0.04,
    /** Word-level stagger for manifesto reveals */
    manifestoStagger: 0.06,
    /** Header total animation duration */
    headerDuration: 1.2,
    /** Manifesto word animation duration */
    manifestoDuration: 0.8,
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
  // DELAYS
  // ─────────────────────────────────────────────────────────────────────────
  delay: {
    /** Immediate - 0s */
    none: 0,
    /** Brief pause - 0.1s */
    short: 0.1,
    /** Standard pause - 0.2s */
    normal: 0.2,
    /** Noticeable pause - 0.4s */
    medium: 0.4,
    /** Dramatic pause - 0.8s */
    long: 0.8,
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
    /** Standard entrance - 12px (Ghost subtle baseline) */
    standard: 12,
    /** Larger movements for special cases - 18px */
    large: 18,
    /** Hero/dramatic entrances - 24px (Max allowed for Ghost) */
    dramatic: 24,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LAYOUT & Z-INDEX (Required by beliefTokens)
  // ─────────────────────────────────────────────────────────────────────────
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

/**
 * Shared viewport configuration for motion components
 */
export const viewportConfig = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -10% 0px',
} as const;


// =============================================================================
// REUSABLE VARIANTS - Ghost Era Design System
// Rules: No Scale, No Bounce, No Rotate. Opacity + Blur + Y-Translate (max 18px)
// =============================================================================

/**
 * Ghost Reveal - Standard entry with heavy blur
 */
export const ghostReveal: Variants = {
  hidden: { opacity: 0, filter: MOTION_TOKENS.blur.hidden },
  visible: {
    opacity: 1,
    filter: MOTION_TOKENS.blur.visible,
    transition: {
      duration: MOTION_TOKENS.duration.GHOST_REVEAL,
      ease: GHOST_EASE,
    },
  },
};

/**
 * Ghost Rise - Entry with subtle vertical movement
 */
export const ghostRise: Variants = {
  hidden: {
    opacity: 0,
    y: MOTION_TOKENS.offset.standard,
    filter: MOTION_TOKENS.blur.hidden,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: MOTION_TOKENS.blur.visible,
    transition: {
      duration: MOTION_TOKENS.duration.GHOST_REVEAL,
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

/**
 * Simple fade transition
 */
export const ghostFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: MOTION_TOKENS.duration.normal,
      ease: GHOST_EASE,
    },
  },
};

/**
 * Simplified reveal (no blur, subtle Y)
 */
export const ghostRevealSimple: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.normal,
      ease: GHOST_EASE,
    },
  },
};

/**
 * Standard transition generator
 */
export const ghostTransition = (
  delay: number = 0,
  duration: number = MOTION_TOKENS.duration.normal
) => ({
  delay,
  duration,
  ease: GHOST_EASE,
});
