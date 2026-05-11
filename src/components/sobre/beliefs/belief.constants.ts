export {
  BELIEF_BACKGROUND_STOPS,
  BELIEF_HEADER_LINES,
  BELIEF_MANIFESTO_LINES,
  BELIEF_PHRASES,
  beliefColors,
  beliefLayout,
  beliefMotion,
  beliefZIndex,
} from '@/config/beliefTokens';

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
