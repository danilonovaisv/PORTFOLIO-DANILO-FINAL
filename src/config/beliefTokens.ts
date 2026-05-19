import type { BeliefPhrase } from '@/types/beliefs';
import { MOTION_TOKENS, GHOST_EASE, GHOST_EASE_SOFT, GHOST_EASE_AMBIENT } from '@/config/motion';

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
  background: MOTION_TOKENS.z.bg,
  overlay: MOTION_TOKENS.z.overlay,
  fixedHeader: MOTION_TOKENS.z.header,
  scrollText: MOTION_TOKENS.z.text,
  manifesto: MOTION_TOKENS.z.manifesto,
  ghost: MOTION_TOKENS.z.ghost,
} as const;

export const beliefMotion = {
  ghostEase: GHOST_EASE,
  /** Motion scroll-triggered reference ease — for Beliefs phrases and background */
  referenceEase: GHOST_EASE_AMBIENT,
  softEase: GHOST_EASE_SOFT,
  microDuration: MOTION_TOKENS.duration.micro,
  revealDuration: MOTION_TOKENS.duration.GHOST_REVEAL,
  exitDuration: MOTION_TOKENS.duration.GHOST_EXIT,
  /** Duration for main phrase entrance */
  textRevealDuration: MOTION_TOKENS.duration.textIn,
  /** Duration for main phrase exit */
  textExitDuration: MOTION_TOKENS.duration.textExitFast,
  /** Duration for background color transition */
  backgroundDuration: MOTION_TOKENS.duration.bg,
  /** Duration for fixed header entrance */
  headerDuration: MOTION_TOKENS.duration.headerIn,
  /** Duration for fixed header exit */
  headerExitDuration: MOTION_TOKENS.duration.headerOut,
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
  stageMaxWidth: '1680px',
  stagePaddingX: 'clamp(1.5rem, 4vw, 6rem)',
  headerTopMobile: '1.5rem',
  headerTopDesktop: '6rem',
  headerMaxWidthMobile: '11rem',
  headerMaxWidthDesktop: '24rem',
  desktopPhraseTop: '50%',
  desktopPhraseWidth: 'min(32rem, 34vw)',
  mobilePhraseWidth: 'min(88vw, 24rem)',
  ghostDesktopCameraX: 1.18,
  ghostDesktopCameraY: 0.02,
  ghostDesktopClimaxX: 0.18,
  ghostDesktopClimaxY: 0.05,
  ghostMobileCameraX: -0.96,
  ghostMobileCameraY: -0.08,
  ghostMobileClimaxX: 0.04,
  ghostMobileClimaxY: -0.16,
  ghostDesktopScale: 0.76,
  ghostMobileScale: 0.52,
  manifestoMaxWidth: 'min(90vw, 1520px)',
  manifestoFontSize: 'clamp(3.4rem, 15vw, 11.5rem)',
} as const;

// Re-exports for what-moves-me redesign
export {
  WHAT_MOVES_ME_PHRASES,
  GHOST_SHADE_COLORS,
  GHOST_EASE,
  PHRASE_COUNT,
  SECTION_HEIGHT_VH,
  BAND,
} from '../components/sobre/beliefs/what-moves-me.constants';
export type { WhatMovesMePhrase } from '../components/sobre/beliefs/what-moves-me.constants';
