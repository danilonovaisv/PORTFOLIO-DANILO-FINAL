import type { BeliefPhrase } from '../types/beliefs';
import { MOTION_TOKENS } from './motion';

export const beliefColors = {
  deepVoid: '#040013',
  bluePrimary: '#0048ff',
  blueDeep: '#001a5e',
  blueBright: '#0033cc',
  blueAccent: '#4fe6ff',
  purpleDetails: '#8705f2',
  pinkDetails: '#f501d3',
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
  beliefColors.bluePrimary,
] as const;

export const BELIEF_HEADER_LINES = [
  'Acredito no design que muda o dia de alguém.',
  'Não pelo choque, mas pela conexão.',
] as const;

export const BELIEF_PHRASES = [
  'Um\nvídeo\nque\nrespira.',
  'Uma\nmarca\nque se\nreconhece.',
  'Um\ndetalhe\nque\nfica.',
  'Crio\npara\ngerar\npresença.',
  'Mesmo\nquando\nnão\nestou\nali.',
  'Mesmo\nquando\nninguém\npercebe\no esforço.',
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
  background: MOTION_TOKENS.z.bg,
  overlay: MOTION_TOKENS.z.overlay,
  fixedHeader: MOTION_TOKENS.z.header,
  scrollText: MOTION_TOKENS.z.text,
  manifesto: MOTION_TOKENS.z.manifesto,
  ghost: MOTION_TOKENS.z.ghost,
} as const;

export const beliefMotion = {
  ghostEase: MOTION_TOKENS.ease.ghost,
  /** Motion scroll-triggered reference ease — for Beliefs phrases and background */
  referenceEase: MOTION_TOKENS.ease.reference,
  softEase: MOTION_TOKENS.ease.ghost,
  microDuration: MOTION_TOKENS.duration.micro,
  revealDuration: MOTION_TOKENS.duration.GHOST_REVEAL,
  exitDuration: MOTION_TOKENS.duration.GHOST_EXIT,
  /** Duration for main phrase entrance */
  textRevealDuration: 0.9,
  /** Duration for main phrase exit */
  textExitDuration: 0.32,
  /** Duration for background color transition */
  backgroundDuration: 0.9,
  ghostIntroDuration: MOTION_TOKENS.duration.ghostIn,
  wordStagger: MOTION_TOKENS.duration.WORD_STAGGER,
  manifestoStagger: MOTION_TOKENS.splitText.manifestoStagger,
} as const;

export const beliefLayout = {
  sectionMinHeight: MOTION_TOKENS.layout.sectionMinHeight,
  phraseSectionHeight: MOTION_TOKENS.layout.phraseSectionHeight,
  desktopPhraseMaxWidth: MOTION_TOKENS.layout.desktopPhraseMaxWidth,
  desktopPhraseLeft: MOTION_TOKENS.layout.desktopPhraseLeft,
  mobilePhraseBottom: MOTION_TOKENS.layout.mobilePhraseBottom,
} as const;
