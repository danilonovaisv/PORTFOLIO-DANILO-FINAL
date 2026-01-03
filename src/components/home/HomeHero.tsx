'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { HOME_CONTENT } from '@/config/content';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  cubicBezier,
} from 'framer-motion';
import { Preloader } from '@/components/ui/Preloader';
import { HeroCopy } from './HeroCopy';
import { GhostStage } from './GhostStage';
import { ManifestoThumb, type ManifestoThumbHandle } from './ManifestoThumb';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const CONFIG = {
  preloadMs: 2000,
  videoSrc: HOME_CONTENT.hero.video,
  // Animation Easing: Premium Feel
  easing: cubicBezier(0.22, 1, 0.36, 1),

  entrance: {
    initial: {
      opacity: 0,
      scale: 0.92,
      y: 60,
      filter: 'blur(10px)',
    },
    animate: {
      opacity: 1,
      scale: [1.02, 1],
      y: 0,
      filter: 'blur(0px)',
    },
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.5,
    },
  },
};

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const manifestoRef = useRef<ManifestoThumbHandle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  // 0. Scroll Setup
  // We use a tall container (300vh) to create the "Hold" effect naturally via sticky positioning
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /*
    SCROLL PHASES (approx):
    0.0 -> 0.3: Hero Static (Reading time)
    0.3 -> 0.6: Transition (Thumb grows to Fullscreen)
    0.6 -> 0.9: Fullscreen Hold (Video plays with Sound)
    0.9 -> 1.0: Exit (Video mutes, next section arrives)
  */

  // 1. Transform Values
  // Scale: Starts at 1 (Thumbnail size logic handled via CSS/Layout), grows to viewport coverage
  // Note: We'll use a fixed position thumb that changes layout based on these transforms

  const videoScale = useTransform(scrollYProgress, [0.3, 0.6], [1, 3.5], { ease: CONFIG.easing });
  const borderRadius = useTransform(scrollYProgress, [0.3, 0.55], [16, 0]);

  // Editorial Text Fade Out
  const copyOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0.2, 0.4], [0, -50]);

  // Sound Logic
  // We play sound during the "Hold" phase (0.6 - 0.9)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (prefersReducedMotion || isMobile) return;

    const inHoldPhase = latest > 0.6 && latest < 0.95;

    // Only toggle if state changes to avoid spamming
    // Note: ManifestoThumb handles the internal state check
    manifestoRef.current?.setMuted(!inHoldPhase);
  });

  const handlePreloaderDone = useCallback(() => setIsLoading(false), []);

  const handleThumbClick = useCallback(() => {
    // Jump straight to Hold phase
    if (sectionRef.current) {
      const sectionHeight = sectionRef.current.offsetHeight;
      const targetScroll = sectionRef.current.offsetTop + (sectionHeight * 0.65); // Jump to 65%
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[300vh] bg-[#050511]"
      aria-label="Home hero section"
    >
      {/* Sticky Container: The Viewport Window */}
      <div className="sticky top-0 h-dvh w-full overflow-hidden">

        {/* 1. Preloader */}
        <AnimatePresence>
          {isLoading && (
            <Preloader
              durationMs={CONFIG.preloadMs}
              onComplete={handlePreloaderDone}
              label="Summoning spirits"
            />
          )}
        </AnimatePresence>

        {/* 2. WebGL Background (Ghost) */}
        {/* Z-Index 20 (from rules) */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ filter: 'blur(20px)' }}
            animate={{ filter: isLoading ? 'blur(20px)' : 'blur(0px)' }}
            transition={{ duration: 2.5 }}
          >
            <GhostStage
              reducedMotion={prefersReducedMotion}
              active={!isLoading}
            />
          </motion.div>
        )}

        {/* 3. Hero Copy */}
        {/* Z-Index 25 - Must be above Ghost (Z-20) but below Video (Z-30) */}
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="absolute inset-0 z-[25] flex items-center justify-center px-6 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <HeroCopy startEntrance={!isLoading} />
          </div>
        </motion.div>

        {/* 4. Manifesto Video */}
        {/* Z-Index 30 */}
        {!prefersReducedMotion && !isMobile && (
          <motion.div
            className="absolute bottom-8 right-8 md:right-12 z-30 pointer-events-auto origin-bottom-right"
            style={{
              scale: videoScale,
              borderRadius: borderRadius,
              width: '30vw',
              maxWidth: '600px',
              minWidth: '320px',
              aspectRatio: '16/9',
            }}
            initial={CONFIG.entrance.initial}
            animate={CONFIG.entrance.animate}
            transition={CONFIG.entrance.transition}
          >
            <ManifestoThumb ref={manifestoRef} onClick={handleThumbClick} />
          </motion.div>
        )}

        {/* Mobile Fallback for Video (Static or separate section below) */}
        {isMobile && (
            // On mobile, the video is a separate section below the hero,
            // handled by main page layout or a specific mobile component.
            // For now, we leave the hero just with text + ghost fallback (if any).
            <div className="absolute bottom-0 w-full p-4 flex justify-center z-30">
                 {/* Mobile specific CTA or indicator could go here */}
            </div>
        )}

      </div>
    </section>
  );
}
