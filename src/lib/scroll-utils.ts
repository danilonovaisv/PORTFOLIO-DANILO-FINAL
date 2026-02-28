export const resolveScrollState = (progress: number): string => {
  if (progress < 0.1) return 'initial';
  if (progress < 0.4) return 'expanding';
  if (progress < 0.8) return 'full';
  return 'finished';
};
