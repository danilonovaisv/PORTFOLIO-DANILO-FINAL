export const headerTokens = {
  color: {
    primary: '#0057FF',
    gradient: ['#0057FF', '#7A27FF'],
    text: '#000000',
    textInverse: '#FFFFFF',
    neutralLight: '#F5F5F5',
  },
  typography: {
    fontFamily: {
      primary: 'TT Norms Pro',
      fallback: 'ui-sans-serif, system-ui',
    },
    fontSize: {
      logo: { min: 18, max: 22 },
      nav: { min: 15, max: 16 },
    },
    fontWeight: {
      logo: 600,
      nav: 500,
    },
    tracking: {
      nav: '-0.01em',
    },
  },
  layout: {
    height: 64,
    paddingX: 24,
    minTouchTarget: 48,
  },
  zIndex: {
    header: 40,
    hero: 20,
    webgl: 0,
  },
  motion: {
    hoverOpacity: 0.85,
    glassDamping: 0.15,
    staggerDelay: 0.1,
  },
} as const;
