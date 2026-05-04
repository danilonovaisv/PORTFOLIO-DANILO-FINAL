import { COLORS } from "@/config/colors";
import { MOTION_TOKENS } from "@/config/motion";
import type { BeliefPhrase } from "@/types/beliefs";

export const BELIEF_BACKGROUND_STOPS = [
  COLORS.background,
  COLORS.bluePrimary,
  COLORS.purpleDetails,
  COLORS.pinkDetails,
  COLORS.bluePrimary,
  COLORS.purpleDetails,
  COLORS.pinkDetails,
  COLORS.background,
] as const;

export const BELIEF_HEADER_LINES = [
  "Acredito no design que muda o dia de alguém.",
  "Não pelo choque, mas pela conexão.",
] as const;

export const BELIEF_PHRASES = [
  "Um vídeo que respira",
  "Uma marca que se reconhece",
  "Um detalhe que fica",
  "Crio para gerar presença",
  "Mesmo quando não estou ali",
  "Mesmo quando ninguém percebe o esforço",
] as const satisfies readonly string[];

export const BELIEF_MANIFESTO_LINES = ["ISSO É", "GHOST", "DESIGN"] as const;

export const BELIEF_PHRASE_ITEMS = BELIEF_PHRASES.map(
  (text, index): BeliefPhrase => ({
    id: `belief-${index + 1}`,
    text,
    backgroundStopIndex: index + 1,
  })
);

export const BELIEF_LAYOUT = {
  sectionMinHeight: MOTION_TOKENS.layout.sectionMinHeight,
  phraseSectionHeight: MOTION_TOKENS.layout.phraseSectionHeight,
} as const;
