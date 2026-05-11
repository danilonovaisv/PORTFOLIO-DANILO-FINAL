export const BELIEF_PHRASES = [
  'Um vídeo que respira',
  'Uma marca que se reconhece',
  'Um detalhe que fica',
  'Crio para gerar presença',
  'Mesmo quando não estou ali',
  'Mesmo quando ninguém percebe o esforço',
] as const;

export const BELIEF_COLOR_STOPS = [
  '#040013', // Deep Void
  '#0048ff',
  '#8705f2',
  '#4fe6ff', // Ghost Cyan (Accent)
  '#0048ff', // Ghost Blue
  '#001a4d', // Dark Ghost Blue
  '#4fe6ff', // Ghost Cyan
  '#040013', // Deep Void
] as const;

export const BELIEF_MANIFESTO_LINES = ['ISSO É', 'GHOST', 'DESIGN'] as const;

export const BELIEF_SCROLL_THRESHOLDS = {
  entryStart: 0.05,
  entryEnd: 0.15,
  phrasesStart: 0.15,
  phrasesEnd: 0.75,
  climaxStart: 0.78,
  climaxEnd: 0.94,
  finalLock: 0.98,
} as const;

export const SPLIT_TEXT_CONFIG = {
  header: {
    splitType: 'chars' as const,
    delay: 0.035,
    duration: 0.7,
    from: { opacity: 0, y: 12, filter: 'blur(6px)' },
    to: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  manifesto: {
    splitType: 'chars' as const,
    delay: 0.025,
    duration: 0.6,
    from: { opacity: 0, y: 18, filter: 'blur(10px)' },
    to: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
} as const;

export const GHOST_MATERIAL_CONFIG = {
  body: {
    color: '#1a1a2e',
    emissive: '#0048ff',
    emissiveIntensity: 0.22,
    roughness: 0.15,
    metalness: 0.7,
  },
  rim: {
    color: '#0048ff',
    emissive: '#4fe6ff',
    emissiveIntensity: 0.5,
  },
  hat: {
    color: '#040013',
    roughness: 0.1,
  },
} as const;

export const beliefLayers = {
  background: 'var(--z-layer-base)',
  overlay: 'var(--z-layer-glass)',
  header: 'var(--z-layer-header)',
  phrases: 'var(--z-layer-cta)',
  manifesto: 'var(--z-layer-overlay)',
  ghost: 'var(--z-layer-3d)', // Ghost stays behind phrases/manifesto
} as const;
