import {
  MOTION_TOKENS,
  GHOST_EASE,
  ghostFade,
  riseSoft,
} from '@/config/motion';

export const motionTokens = {
  fadeGhost: ghostFade,
  riseSoft: riseSoft,
};

export const motionSprings = {
  ghost: MOTION_TOKENS.spring.ghost,
};

export { GHOST_EASE, MOTION_TOKENS };
