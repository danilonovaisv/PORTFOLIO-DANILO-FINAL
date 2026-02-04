import type { Variants, Transition, SpringOptions } from 'framer-motion';

// =============================================================================
// MOTION TOKENS - Ghost Era Design System
// SINGLE SOURCE OF TRUTH for all animations
// =============================================================================

/** Ghost Easing Curve - A fluid, ethereal timing function */
type EasingTuple = [number, number, number, number];

export const GHOST_EASE: EasingTuple = [0.22, 1, 0.36, 1];
export const GHOST_EASE_SOFT: EasingTuple = [0.25, 1, 0.5, 1];
export const GHOST_EASE_HEAVY: EasingTuple = [0.43, 0.13, 0.23, 0.96];

export const MOTION_TOKENS = {
  // ─────────────────────────────────────────────────────────────────────────
  // DURATIONS
  // ─────────────────────────────────────────────────────────────────────────
  duration: {
    /** Atmospheric, slow reveals - 1.2s */
    slow: 1.2,
    /** Standard transitions - 0.8s */
    normal: 0.8,
    /** Quick interactions - 0.4s */
    fast: 0.4,
    /** Micro-interactions - 0.2s */
    instant: 0.2,
    /** Modal/overlay animations - 0.5s */
    modal: 0.5,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // EASING CURVES
  // ─────────────────────────────────────────────────────────────────────────
  easing: {
    /** Base smooth curve - use for most animations */
    base: GHOST_EASE,
    /** Extra soft for atmospheric/ghostly effects */
    ghost: GHOST_EASE_SOFT,
    /** Heavier curve for large movements */
    heavy: GHOST_EASE_HEAVY,
    /** Linear for opacity-only transitions */
    linear: 'linear' as const,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // STAGGER DELAYS
  // ─────────────────────────────────────────────────────────────────────────
  stagger: {
    /** Rapid fire - 0.05s */
    tight: 0.05,
    /** Standard stagger - 0.1s */
    normal: 0.1,
    /** Ghost-like slow reveal - 0.18s */
    relaxed: 0.18,
    /** Very slow, dramatic - 0.25s */
    dramatic: 0.25,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // VIEWPORT REVEAL SETTINGS
  // ─────────────────────────────────────────────────────────────────────────
  reveal: {
    threshold: 0.1,
    margin: '-50px',
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
    large: 30,
    /** Hero/dramatic entrances - 40px (use sparingly) */
    dramatic: 40,
  },
} as const;

// =============================================================================
// REUSABLE VARIANTS
// =============================================================================

/**
 * Ghost Fade - Standard fade with blur
 * Use for: Text, titles, sections
 */
export const ghostFade: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: MOTION_TOKENS.duration.normal,
      ease: GHOST_EASE,
    },
  },
};

/**
 * Rise Soft - Subtle Y movement + fade + blur
 * Use for: Cards, list items, content blocks
 */
export const riseSoft: Variants = {
  hidden: {
    opacity: 0,
    y: MOTION_TOKENS.offset.standard,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: MOTION_TOKENS.duration.normal,
      ease: GHOST_EASE,
    },
  },
};

/**
 * Image Float - For media elements (max opacity 0.85)
 * Use for: Background images, decorative media
 */
export const imageFloat: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 0.85,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.slow,
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
 * Modal variants - Coordinated backdrop + content animations
 */
export const modalVariants = {
  backdrop: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: MOTION_TOKENS.duration.fast, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      transition: { duration: MOTION_TOKENS.duration.instant },
    },
  } satisfies Variants,

  content: {
    hidden: {
      opacity: 0,
      y: MOTION_TOKENS.offset.large,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION_TOKENS.duration.modal,
        ease: GHOST_EASE,
        delay: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: MOTION_TOKENS.offset.standard,
      transition: {
        duration: MOTION_TOKENS.duration.fast,
        ease: GHOST_EASE,
      },
    },
  } satisfies Variants,
};

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
 * Create a spring transition with ghost physics
 */
export const ghostSpringTransition = (
  springType: keyof typeof MOTION_TOKENS.spring = 'ghost'
): Transition => ({
  type: 'spring',
  ...MOTION_TOKENS.spring[springType],
});

/**
 * Viewport animation props (for whileInView)
 */
export const viewportConfig = {
  once: true,
  margin: MOTION_TOKENS.reveal.margin,
  amount: MOTION_TOKENS.reveal.threshold,
};

// =============================================================================
// REDUCED MOTION HELPER
// =============================================================================

/**
 * Returns empty animation props if user prefers reduced motion
 */
export const getMotionProps = <T extends object>(
  props: T,
  prefersReducedMotion: boolean | null
): T | Record<string, never> => {
  if (prefersReducedMotion) return {};
  return props;
};
