// src/config/ghost.config.ts

export const GHOST_CONFIG = {
  colors: {
    main: '#4d8dff', // Azul da luz principal
    fill: '#6e00ff', // Roxo de preenchimento
    body: '#e9f0ff', // Base branca do fantasma
    glow: '#00ffff', // Ciano Fluorescente (A cor da referência)
    eyes: '#c600ff', // Olhos brancos
  },
  physics: {
    hoverSpeed: 0.6,
    wobbleSpeed: 2.0,
    wobbleAmount: 0.35,
    pulseSpeed: 1.5,
    followDelay: 0.05,
  },
  intensity: {
    bloom: 3.0, // Bloom mais forte
    emissive: 4.5, // Brilho intenso
    eyeGlow: 5.0,
  },
  vhs: {
    intensity: 1.2, // Distorção geral
    scanlines: 2.5, // Linhas pretas bem marcadas (Scanline)
    noise: 0.12,
    vignette: 1.2,
  },
};
