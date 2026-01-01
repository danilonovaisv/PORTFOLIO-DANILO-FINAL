// ============================================================================
// src/components/header/headerTokens.ts
// Tokens de layout, cor e motion específicos do Header
// ============================================================================

export const headerColors = {
  primary: '#0048ff',
  background: '#000022',
  text: '#fcffff',
  textInverse: '#0e0e0e',
  accent: '#4fe6ff',
};

export const headerZ = {
  heroContent: 20,
  header: 40,
};

export const glassMotionTokens = {
  maxTranslateX: 48,
  scaleX: [1, 1.05] as [number, number],
  scaleY: [1, 1.02] as [number, number],
  followDamping: 0.12,
};

export const mobileMenuMotionTokens = {
  overlayDuration: 0.22,
  panelDuration: 0.28,
  itemDuration: 0.22,
  itemInitialY: 16,
  staggerDelay: 0.08,
};

// Backwards compatibility
export const HEADER_TOKENS = {
  zIndex: headerZ.header,
  desktop: {
    height: 64,
    maxTranslateX: glassMotionTokens.maxTranslateX,
    maxScaleX: glassMotionTokens.scaleX[1],
    maxScaleY: glassMotionTokens.scaleY[1],
    followDamping: 18,
  },
  mobile: {
    height: 56,
    staggerDelay: mobileMenuMotionTokens.staggerDelay,
  },
  colors: headerColors,
} as const;
