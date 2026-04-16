import { motionValue } from 'motion';

/**
 * Bridge DOM ↔ R3F para intensidade do Ghost.
 * Range esperado: 0 → 1
 */
export const ghostIntensity = motionValue(0);
