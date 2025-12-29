import { EnvironmentInput, ExperienceFlags } from '../types';

export function runExperienceOrchestrator(
  env: EnvironmentInput
): ExperienceFlags {
  const { viewport, prefersReducedMotion } = env;

  return {
    mountWebGL: viewport === 'desktop' && !prefersReducedMotion,
    enableManifestoScroll: viewport === 'desktop',
    enableHoverInteractions: viewport === 'desktop',
    reducedMotion: prefersReducedMotion,
  };
}
