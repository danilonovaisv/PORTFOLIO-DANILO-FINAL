'use client';

import * as React from 'react';
import { useRef, useEffect, useState, useCallback } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import { Preloader } from '@/components/ui/Preloader';
import { HeroCopy } from './HeroCopy';
import { GhostStage } from './GhostStage';
import { ManifestoThumb, type ManifestoThumbHandle } from './ManifestoThumb';

const CONFIG = {
  preloadMs: 2000,
  videoSrc:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
  bgColor: '#050511',

  // Thumb entrance animation (Ghost-style: slow, ethereal, floaty)
  entrance: {
    initial: {
      opacity: 0,
      scale: 0.92,
      y: 60,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      delay: 0.5, // Wait for preloader fade
    },
  },

  // Hover effect on thumbnail
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
} as const;

function usePrefersReducedMotion() {
  const [pref, setPref] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const apply = () => setPref(!!mq.matches);
      apply();
      try {
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
      } catch {
        mq.addListener?.(apply);
        return () => mq.removeListener?.(apply);
      }
    }
  }, []);
  return pref;
}

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const manifestoRef = useRef<ManifestoThumbHandle | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreenHold, setIsFullscreenHold] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  const prefersReducedMotion = usePrefersReducedMotion();

  // Scroll progress para morph do vídeo (Desktop Only)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Morph values
  const morphProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const videoScale = useTransform(morphProgress, [0, 1], [1, 3.6]);
  const videoX = useTransform(morphProgress, [0, 1], [0, 0]); // Keep origin fixed for now
  const borderRadius = useTransform(morphProgress, [0, 0.9], [16, 0]);
  const copyOpacity = useTransform(scrollYProgress, [0.4, 0.8], [1, 0]);

  // Handle intersection/hold logic
  useMotionValueEvent(scrollYProgress, 'change', (latest: number) => {
    if (prefersReducedMotion) return;

    // Trigger hold at the end
    if (latest >= 0.98 && !isFullscreenHold && !hasReachedEnd) {
      setIsFullscreenHold(true);
    }

    // Mute if scrolling back
    if (latest < 0.85) {
      manifestoRef.current?.setMuted(true);
      setHasReachedEnd(false);
    }

    // Auto-mute boundaries
    if (latest < 0.05 || latest > 1.1) {
      manifestoRef.current?.setMuted(true);
    }
  });

  useEffect(() => {
    if (isFullscreenHold) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Activate sound on hold
      manifestoRef.current?.setMuted(false);

      const timer = setTimeout(() => {
        document.body.style.overflow = prevOverflow;
        setIsFullscreenHold(false);
        setHasReachedEnd(true);
        // Release scroll and mute
        manifestoRef.current?.setMuted(true);
      }, 2000);

      return () => {
        document.body.style.overflow = prevOverflow;
        clearTimeout(timer);
      };
    }
  }, [isFullscreenHold]);

  const handlePreloaderDone = useCallback(() => setIsLoading(false), []);

  const handleThumbClick = useCallback(() => {
    // Jump straight to hold state
    const sectionTop = sectionRef.current?.offsetTop || 0;
    const sectionHeight = sectionRef.current?.offsetHeight || 0;
    window.scrollTo({
      top: sectionTop + sectionHeight,
      behavior: 'auto',
    });
    setIsFullscreenHold(true);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[250vh] bg-[#050511] overflow-hidden"
      aria-label="Home hero section"
    >
      {/* Sticky Context */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Preloader Ghost */}
        <AnimatePresence>
          {isLoading && (
            <Preloader
              durationMs={CONFIG.preloadMs}
              onComplete={handlePreloaderDone}
              label="Summoning spirits"
            />
          )}
        </AnimatePresence>

        {/* WebGL Atmosphere */}
        <div className="absolute inset-0 z-0">
          <GhostStage reducedMotion={prefersReducedMotion} />
        </div>

        {/* Hero Copy (Editorial) */}
        <motion.div
          style={{ opacity: copyOpacity }}
          className="absolute inset-0 z-10 flex items-center justify-center px-6 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <HeroCopy />
          </div>
        </motion.div>

        {/* Manifesto Interaction (Desktop) */}
        {!prefersReducedMotion && (
          <motion.div
            className="fixed bottom-8 right-8 md:right-12 z-20 pointer-events-auto hidden lg:block"
            style={{
              scale: videoScale,
              x: videoX,
              borderRadius,
              width: '30vw',
              minWidth: '400px',
              aspectRatio: '16/9',
              originX: 1,
              originY: 1,
              overflow: 'hidden',
              boxShadow: isFullscreenHold
                ? 'none'
                : '0 20px 50px rgba(0,0,0,0.5)',
            }}
            initial={CONFIG.entrance.initial}
            animate={CONFIG.entrance.animate}
            transition={CONFIG.entrance.transition}
          >
            <ManifestoThumb ref={manifestoRef} onClick={handleThumbClick} />
          </motion.div>
        )}

        {/* Scroll Helper */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 0.6 }}
          className="absolute bottom-10 left-10 z-40 hidden md:flex flex-col items-start gap-4"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-mono">
              Scroll to step inside
            </span>
            <motion.div
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="h-px w-24 bg-linear-to-r from-cyan-400 to-transparent origin-left"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Space */}
      <div className="h-screen w-full pointer-events-none" />
    </section>
  );
}
