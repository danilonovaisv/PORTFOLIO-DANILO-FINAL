'use client';

import { useEffect } from 'react';
import { runExperienceOrchestrator } from '@/antigravity';
import { useExperienceStore } from '@/store/experience.store';

export function useExperience() {
  const setFlags = useExperienceStore(s => s.setFlags);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const viewport =
      window.innerWidth >= 1024
        ? 'desktop'
        : window.innerWidth >= 640
        ? 'tablet'
        : 'mobile';

    const flags = runExperienceOrchestrator({
      viewport,
      prefersReducedMotion
    });

    setFlags(flags);
  }, [setFlags]);
}