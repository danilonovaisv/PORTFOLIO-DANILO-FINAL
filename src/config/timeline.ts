export const TIMELINE = {
  HERO: {
    START: 0,
    FADE_OUT_START: 0,
    FADE_OUT_END: 0.15, // Hero Copy + Ghost fade out faster
  },
  MANIFESTO: {
    // When the thumb starts transitioning from sticky/corner
    ENTRY_START: 0.05,

    // When it reaches full screen / full focus (earlier = longer fullscreen time)
    FULL_FOCUS_START: 0.3,

    // Video stays fullscreen from 0.3 to 0.8 (~50% of scroll = ~2s at normal speed)
    // When it starts exiting
    EXIT_START: 0.85,

    // Visual Transforms (Parallax/Scale)
    SCALE_START: 0.05, // Start scaling almost immediately
    SCALE_END: 0.35, // Reach fullscreen by 35%
  },
  GLOBAL: {
    SCROLL_END: 1,
  },
} as const;
