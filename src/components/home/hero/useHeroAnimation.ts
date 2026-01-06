'use client';

import { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useLenis } from '@/hooks/useLenis';
import type { ManifestoThumbHandle } from '../ManifestoThumb';

export function useHeroAnimation(
  sectionRef: React.RefObject<HTMLElement | null>,
  manifestoRef: React.RefObject<ManifestoThumbHandle | null>,
  isMobile: boolean,
  prefersReducedMotion: boolean
) {
  const lenis = useLenis();
  const hasHeldRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    setMounted(true);
    const updateDimensions = () => {
      setDimensions({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Animation Constants
  const T_START = 0.0;
  const T_END = 0.35;
  const THUMB_WIDTH_VW = 0.28;
  const MARGIN_PX = 40;

  const startWidth = dimensions.w * THUMB_WIDTH_VW;
  const startHeight = startWidth * (9 / 16);
  const startTop = dimensions.h - startHeight - MARGIN_PX;
  const startLeft = dimensions.w - startWidth - MARGIN_PX;

  const width = useTransform(
    scrollYProgress,
    [T_START, T_END],
    [startWidth, dimensions.w]
  );
  const height = useTransform(
    scrollYProgress,
    [T_START, T_END],
    [startHeight, dimensions.h]
  );
  const top = useTransform(scrollYProgress, [T_START, T_END], [startTop, 0]);
  const left = useTransform(scrollYProgress, [T_START, T_END], [startLeft, 0]);
  const borderRadius = useTransform(scrollYProgress, [T_START, T_END], [16, 0]);
  const copyOpacity = useTransform(scrollYProgress, [0.0, 0.3], [1, 0]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (prefersReducedMotion || isMobile) return;

    const triggerPoint = T_END + 0.05;

    if (latest > triggerPoint && latest < triggerPoint + 0.1) {
      if (!hasHeldRef.current && lenis) {
        hasHeldRef.current = true;
        lenis.stop();
        manifestoRef.current?.setMuted(false);
        setTimeout(() => {
          lenis.start();
        }, 2000);
      }
    }

    if (latest < 0.5) {
      hasHeldRef.current = false;
      manifestoRef.current?.setMuted(true);
    }

    if (latest > 0.99) {
      manifestoRef.current?.setMuted(true);
    }

    if (latest < 0.2 && !hasHeldRef.current) {
      manifestoRef.current?.setMuted(true);
    }
  });

  return {
    mounted,
    dimensions,
    width,
    height,
    top,
    left,
    borderRadius,
    copyOpacity,
    lenis,
  };
}
