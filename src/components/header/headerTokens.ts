export const HEADER_TOKENS = {
  zIndex: 40,
  desktop: {
    height: 64,
    maxTranslateX: 56,
    maxScaleX: 1.05,
    maxScaleY: 1.02,
    followDamping: 18,
  },
  mobile: {
    height: 56,
    staggerDelay: 0.08,
  },
  colors: {
    primary: '#0057FF',
    bgDark: '#06071f',
    text: '#0b0b0e',
    textInverse: '#ffffff',
  },
} as const;
