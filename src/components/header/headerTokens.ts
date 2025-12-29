export const headerTokens = {
  // Colors & Typography now sourced from @/config/brand.ts
  layout: {
    height: 72,
    paddingX: 24,
    minTouchTarget: 48,
  },
  zIndex: {
    header: 40,
    hero: 20,
    webgl: 0,
  },
  motion: {
    hoverOpacity: 0.55,
    glass: {
      followDamping: 0.1, // 0.08 - 0.12s
      maxTranslateX: 50, // 40 - 60px
      maxScaleX: 1.05,
      maxScaleY: 1.02,
    },
    mobile: {
      overlayDuration: 0.25, // 200-250ms
      panelDuration: 0.3, // 260-320ms - fluid spring
      staggerDelay: 0.08, // slightly faster stagger
      itemDuration: 0.22,
    },
  },
} as const;
