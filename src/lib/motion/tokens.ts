export const ghostEase = [0.22, 1, 0.36, 1] as const;

export const ghostDurations = {
  ui: 0.2,
  reveal: 0.8,
  atmosphere: 1.5,
} as const;

export const ghostStagger = {
  word: 0.1,
  letter: 0.04,
  line: 0.15,
} as const;

export const ghostBlur = {
  enter: 'blur(10px)',
  rest: 'blur(0px)',
} as const;

export const ghostTranslate = {
  yMax: 18,
  xMax: 24,
} as const;
