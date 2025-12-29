import { useRef, useEffect } from 'react';
import { useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';
import { useAntigravityStore } from '@/store/antigravity.store';

interface ScrollNarrativeConfig {
  offset?: any; // Framer motion offset array
  damping?: number;
}

export const useScrollNarrative = (config: ScrollNarrativeConfig = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const setNarrativeState = useAntigravityStore((state) => state.setNarrativeState);
  const setScrollProgress = useAntigravityStore((state) => state.setScrollProgress);
  const flags = useAntigravityStore((state) => state.flags);

  // Native Framer Motion Scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: config.offset || ['start start', 'end end'],
  });

  // Smooth scroll progress for store (avoid jitter in UI updates)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Narrative Logic Mapper
  // This maps linear scroll (0-1) to discrete semantic states
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);

    if (flags.reducedMotion) {
      // Simplification for accessibility
      setNarrativeState('EXPLORATION');
      return;
    }

    if (latest < 0.05) {
      setNarrativeState('HERO_EDITORIAL');
    } else if (latest >= 0.05 && latest < 0.45) {
      setNarrativeState('MANIFESTO_TRANSITION');
    } else if (latest >= 0.45 && latest < 0.8) {
      setNarrativeState('MANIFESTO_FULLSCREEN');
    } else {
      setNarrativeState('EXPLORATION');
    }
  });

  // Motion Values for Consumers
  // Pre-calculated transforms to ensure consistency across components
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const manifestoScale = useTransform(scrollYProgress, [0.1, 0.5], [0.8, 1]);
  const manifestoRadius = useTransform(scrollYProgress, [0.1, 0.5], [32, 0]);

  return {
    containerRef,
    scrollYProgress,
    smoothProgress,
    transforms: {
      heroOpacity,
      manifestoScale,
      manifestoRadius
    }
  };
};
