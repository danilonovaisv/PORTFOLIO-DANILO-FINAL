export type ScrollNarrativeState =
  | 'hero_editorial'
  | 'manifesto_transition'
  | 'manifesto_fullscreen';

export function resolveScrollState(progress: number): ScrollNarrativeState {
  if (progress < 0.4) return 'hero_editorial';
  if (progress < 0.8) return 'manifesto_transition';
  return 'manifesto_fullscreen';
}