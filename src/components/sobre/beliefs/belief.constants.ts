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
  '#001a4d', // Dark Ghost Blue
  '#0048ff', // Ghost Blue
  '#4fe6ff', // Ghost Cyan (Accent)
  '#0048ff', // Ghost Blue
  '#001a4d', // Dark Ghost Blue
  '#4fe6ff', // Ghost Cyan
  '#040013', // Deep Void
] as const;

export const BELIEF_MANIFESTO_LINES = ['ISSO É', 'GHOST', 'DESIGN'] as const;

export const BELIEF_SCROLL_THRESHOLDS = {
  climaxStart: 0.56,
  climaxEnd: 0.72,
  finalLock: 0.82,
} as const;

export const beliefLayers = {
  background: 'var(--z-layer-base)',
  overlay: 'var(--z-layer-glass)',
  header: 'var(--z-layer-header)',
  phrases: 'var(--z-layer-cta)',
  manifesto: 'var(--z-layer-overlay)',
  ghost: 'var(--z-layer-lightbox)',
} as const;
