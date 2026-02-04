export const lerp = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t;
export const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);
