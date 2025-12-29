export const TIMELINE = {
  HERO: {
    START: 0,
    FADE_OUT_START: 0,
    FADE_OUT_END: 0.2, // Hero Copy opacity -> 0
  },
  MANIFESTO: {
    // When the thumb starts transitioning from sticky/corner
    ENTRY_START: 0.05,

    // When it reaches full screen / full focus
    FULL_FOCUS_START: 0.45,

    // When it starts exiting
    EXIT_START: 0.8,

    // Visual Transforms (Parallax/Scale)
    SCALE_START: 0.1,
    SCALE_END: 0.5,
  },
  GLOBAL: {
    SCROLL_END: 1,
  },
} as const;
