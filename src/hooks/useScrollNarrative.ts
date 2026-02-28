import { useRef } from 'react';
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
  type UseScrollOptions,
} from 'framer-motion';
import { useAntigravityStore } from '@/store/antigravity.store';
import { TIMELINE } from '@/config/timeline';

interface ScrollNarrativeConfig {
  offset?: UseScrollOptions['offset'];
  damping?: number;
}

export const useScrollNarrative = (config: ScrollNarrativeConfig = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const setNarrativeState = useAntigravityStore(
    (state) => state.setNarrativeState
  );
  const setScrollProgress = useAntigravityStore(
    (state) => state.setScrollProgress
  );
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
    restDelta: 0.001,
  });

  // Narrative Logic Mapper
  // This maps linear scroll (0-1) to discrete semantic states
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest);

    if (flags.reducedMotion) {
      // Simplification for accessibility
      setNarrativeState('EXPLORATION');
      return;
    }

    if (latest < TIMELINE.MANIFESTO.ENTRY_START) {
      setNarrativeState('HERO_EDITORIAL');
    } else if (
      latest >= TIMELINE.MANIFESTO.ENTRY_START &&
      latest < TIMELINE.MANIFESTO.FULL_FOCUS_START
    ) {
      setNarrativeState('MANIFESTO_TRANSITION');
    } else if (
      latest >= TIMELINE.MANIFESTO.FULL_FOCUS_START &&
      latest < TIMELINE.MANIFESTO.EXIT_START
    ) {
      setNarrativeState('MANIFESTO_FULLSCREEN');
    } else {
      setNarrativeState('EXPLORATION');
    }
  });

  // Motion Values for Consumers
  // Pre-calculated transforms to ensure consistency across components
  const heroOpacity = useTransform(
    scrollYProgress,
    [TIMELINE.HERO.FADE_OUT_START, TIMELINE.HERO.FADE_OUT_END],
    [1, 0]
  );
  const manifestoScale = useTransform(
    scrollYProgress,
    [TIMELINE.MANIFESTO.SCALE_START, TIMELINE.MANIFESTO.SCALE_END],
    [0.8, 1]
  );
  const manifestoRadius = useTransform(
    scrollYProgress,
    [TIMELINE.MANIFESTO.SCALE_START, TIMELINE.MANIFESTO.SCALE_END],
    [32, 0]
  );

  return {
    containerRef,
    scrollYProgress,
    smoothProgress,
    transforms: {
      heroOpacity,
      manifestoScale,
      manifestoRadius,
    },
  };
};
