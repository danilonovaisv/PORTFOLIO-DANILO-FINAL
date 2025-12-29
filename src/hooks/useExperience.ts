'use client';

import { useEffect } from 'react';
import { runExperienceOrchestrator } from '@/antigravity';
import { useAntigravityStore } from '@/store/antigravity.store';

export function useExperience() {
  /*
   * 🧠 UNIFIED BRAIN: ANTIGRAVITY ORCHESTRATOR
   * Coordinates: Flags (Logic), Viewport (Sensors) and Hydration
   */
  const setFlags = useAntigravityStore((state) => state.setFlags);
  const setViewport = useAntigravityStore((state) => state.setViewport);

  useEffect(() => {
    // 1. Initial Sensing
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setViewport(width, height);

      const viewport =
        width >= 1024 ? 'desktop' : width >= 640 ? 'tablet' : 'mobile';

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      // 2. Logic Processing (Orchestrator)
      const flags = runExperienceOrchestrator({
        viewport,
        prefersReducedMotion,
      });

      // 3. State Update
      setFlags(flags);
    };

    // Init
    handleResize();

    // Listeners
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setFlags, setViewport]);
}
