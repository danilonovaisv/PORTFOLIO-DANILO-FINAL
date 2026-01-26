import { ExperienceFlags } from '../store/antigravity.store';

export * from '../store/antigravity.store';
export * from './antigravity/prompts';

export const runExperienceOrchestrator = ({
  viewport,
  prefersReducedMotion,
}: {
  viewport: 'desktop' | 'tablet' | 'mobile';
  prefersReducedMotion: boolean;
}): ExperienceFlags => {
  const isMobile = viewport === 'mobile';

  // Default base state
  const flags: ExperienceFlags = {
    mountWebGL: true,
    enableManifestoScroll: true,
    enableHoverInteractions: true,
    reducedMotion: prefersReducedMotion,
    debugMode: process.env.NODE_ENV === 'development',
  };

  // 1. Mobile constraint
  if (isMobile) {
    flags.mountWebGL = false; // WebGL disabled on mobile
  }

  // 2. Reduced Motion overrides strictness
  if (prefersReducedMotion) {
    flags.mountWebGL = false;
    flags.enableManifestoScroll = false;
    flags.enableHoverInteractions = false;
  }

  return flags;
};
