export const WHAT_MOVES_ME_PHRASES = [
  { id: 1, text: 'Acredito que design\né uma linguagem.', emphasis: false },
  { id: 2, text: 'Que sistemas\ncriam cultura.', emphasis: false },
  { id: 3, text: 'Que cada escolha visual\ncarrega intenção.', emphasis: false },
  { id: 4, text: 'Que beleza\né estratégia.', emphasis: false },
  { id: 5, text: 'Que forma\nsegue propósito.', emphasis: false },
  { id: 6, text: 'ISSO É\nGHOST\nDESIGN.', emphasis: true },
] as const;
export type WhatMovesMePhrase = (typeof WHAT_MOVES_ME_PHRASES)[number];
export const GHOST_SHADE_COLORS = { voidBlack: '#040013', bluePrimary: '#0048ff', blueAccent: '#4fe6ff', purpleDetails: '#8705f2', pinkDetails: '#f501d3', text: '#fcffff' } as const;
export const GHOST_EASE = [0.22, 1, 0.36, 1] as const;
export const PHRASE_COUNT = 6;
export const SECTION_HEIGHT_VH = 620;
export const BAND = 1 / PHRASE_COUNT;
