export type ViewportType = 'mobile' | 'tablet' | 'desktop';

export interface ExperienceFlags {
  mountWebGL: boolean;
  enableManifestoScroll: boolean;
  enableHoverInteractions: boolean;
  reducedMotion: boolean;
}

export interface EnvironmentInput {
  viewport: ViewportType;
  prefersReducedMotion: boolean;
}