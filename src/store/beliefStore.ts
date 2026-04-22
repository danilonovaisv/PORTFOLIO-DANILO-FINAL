import { motionValue, type MotionValue } from 'motion';

/**
 * Bridge DOM ↔ R3F para intensidade do Ghost.
 * Range esperado: 0 → 1
 */
export const ghostIntensity: MotionValue<number> = motionValue(0);

/**
 * Bridge DOM ↔ R3F para coordenadas normalizadas do Cursor.
 * Range esperado: -1 → 1
 */
export const cursorX: MotionValue<number> = motionValue(0);
export const cursorY: MotionValue<number> = motionValue(0);
