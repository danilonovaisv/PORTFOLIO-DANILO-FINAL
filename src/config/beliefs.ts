/**
 * BELIEFS CONFIGURATION - O Que Me Move
 * Centralized content for the beliefs section.
 */

import { BELIEF_HEADER_LINES, BELIEF_PHRASES } from "@/config/beliefTokens";

export const splitTexts = {
  title1: BELIEF_HEADER_LINES[0],
  title2: BELIEF_HEADER_LINES[1],
  phrases: BELIEF_PHRASES,
} as const;
