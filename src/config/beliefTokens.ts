import type { BeliefPhrase } from '@/types/beliefs';

export const beliefColors = {
  deepVoid: '#040013',
  bluePrimary: '#0048ff',
  purpleDetails: '#8705f2',
  pinkDetails: '#f501d3',
  blueAccent: '#4fe6ff',
  white: '#ffffff',
} as const;

export const BELIEF_BACKGROUND_STOPS = [
  beliefColors.deepVoid,
  beliefColors.bluePrimary,
  beliefColors.purpleDetails,
  beliefColors.pinkDetails,
  beliefColors.bluePrimary,
  beliefColors.purpleDetails,
  beliefColors.pinkDetails,
  beliefColors.deepVoid,
] as const;

export const BELIEF_HEADER_LINES = [
  'Acredito no design que muda o dia de alguém.',
  'Não pelo choque, mas pela conexão.',
] as const;

export const BELIEF_PHRASES = [
  'Um vídeo que respira',
  'Uma marca que se reconhece',
  'Um detalhe que fica',
  'Crio para gerar presença',
  'Mesmo quando não estou ali',
  'Mesmo quando ninguém percebe o esforço',
] as const;

export const BELIEF_MANIFESTO_LINES = ['ISSO É', 'GHOST', 'DESIGN'] as const;

export const BELIEF_PHRASE_ITEMS = BELIEF_PHRASES.map(
  (text, index): BeliefPhrase => ({
    id: `belief-${index + 1}`,
    text,
    backgroundStopIndex: index + 1,
  })
);

export const beliefZIndex = {
  background: 0,
  overlay: 10,
  fixedHeader: 30,
  scrollText: 40,
  manifesto: 50,
  ghost: 70,
} as const;

export const beliefMotion = {
  ambientEase: [0.17, 0.55, 0.55, 1],
  ghostEase: [0.22, 1, 0.36, 1],
  softEase: [0.16, 1, 0.3, 1],
  microDuration: 0.16,
  revealDuration: 0.9,
  exitDuration: 0.5,
  ghostIntroDuration: 1.2,
  wordStagger: 0.08,
} as const;

export const beliefLayout = {
  sectionMinHeight: '620vh',
  phraseSectionHeight: '80vh',
  desktopPhraseMaxWidth: '32vw',
  desktopPhraseLeft: 'clamp(1.5rem, 4.4vw, 4.75rem)',
  mobilePhraseBottom: '16vh',
} as const;
