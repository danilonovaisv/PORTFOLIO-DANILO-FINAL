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
    color: '#f5f7ff',
    emissive: '#b2d7ff',
    emissiveIntensity: 0.035,
    roughness: 0.45,
    metalness: 0.08,
  },
  rim: {
    color: '#fefefe',
    emissive: '#d4f1ff',
    emissiveIntensity: 0.06,
  },
  hat: {
    color: '#111018',
    roughness: 0.25,
  },
} as const;
