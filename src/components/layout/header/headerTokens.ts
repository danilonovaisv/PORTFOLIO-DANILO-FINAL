import { BRAND } from '@/config/brand';
// ============================================================================
// src/components/header/headerTokens.ts
// Tokens de layout, cor e motion específicos do Header
// ============================================================================

export const headerColors = {
  primary: BRAND.colors.bluePrimary,
  background: BRAND.colors.background,
  text: BRAND.colors.text,
  textInverse: BRAND.colors.textInverse,
  accent: BRAND.colors.blueAccent,
};

export const headerZ = {
  heroContent: 20,
  header: 40,
};

export const glassMotionTokens = {
  maxTranslateX: 50,
  scaleX: [1, 1] as [number, number],
  scaleY: [1, 1] as [number, number],
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
