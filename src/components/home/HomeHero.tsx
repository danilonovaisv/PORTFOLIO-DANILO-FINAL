'use client';

// ============================================================================
// src/components/home/HomeHero.tsx
// Hero Orchestrator — Editorial text (static) + Manifesto video morph
//
// DESKTOP BEHAVIOR:
// - Thumb starts FIXED at bottom-right corner of VIEWPORT
// - As user scrolls, thumb grows to FULLSCREEN
// - When fullscreen: 2-second HOLD + sound unmute
// - After hold: fade out, continue scroll
//
// MOBILE BEHAVIOR:
// - NO thumb in Hero
// - ManifestoSection handles full video below Hero
// ============================================================================

import * as React from 'react';
import { useRef, useEffect, useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion';
import { HeroPreloader } from './HeroPreloader';
import { HeroCopy } from './HeroCopy';
import { GhostStage } from './GhostStage';

// ============================================================================
// CONFIG
// ============================================================================
const CONFIG = {
  // Video source (Supabase)
  videoSrc:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',

  // Thumbnail dimensions (desktop)
  thumb: {
    width: 30, // vw
    right: 24, // px
    bottom: 40, // px
    borderRadius: 16, // px
  },

  // Scroll animation timing (0-1 progress)
  timing: {
    morphStart: 0.0, // Start immediately
    morphEnd: 0.7, // Fullscreen at 70% scroll
    fullscreenThreshold: 0.85, // Trigger hold at 85%
  },

  // Fullscreen hold duration
  holdDuration: 2000, // 2 seconds

  // Entrance animation for thumb
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
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.5, // Wait for preloader
    },
  },
} as const;

// Video states
type VideoState = 'thumbnail' | 'transition' | 'fullscreenHold' | 'released';

export function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const prefersReducedMotion = useReducedMotion();
  const [videoState, setVideoState] = useState<VideoState>('thumbnail');
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // ============================================================================
  // TRANSFORM VALUES
  // Fixed position at bottom-right, grows to fullscreen
  // ============================================================================
  const { morphStart, morphEnd } = CONFIG.timing;

  // Width: 30vw → 100vw
  const width = useTransform(
    scrollYProgress,
    [morphStart, morphEnd],
    ['30vw', '100vw']
  );

  // Height: 16:9 aspect → 100vh
  const height = useTransform(
    scrollYProgress,
    [morphStart, morphEnd],
    ['calc(30vw * 9 / 16)', '100vh']
  );

  // Right offset: 24px → 0
  const right = useTransform(
    scrollYProgress,
    [morphStart, morphEnd],
    [CONFIG.thumb.right, 0]
  );

  // Bottom offset: 40px → 0
  const bottom = useTransform(
    scrollYProgress,
    [morphStart, morphEnd],
    [CONFIG.thumb.bottom, 0]
  );

  // Border radius: 16px → 0
  const borderRadius = useTransform(
    scrollYProgress,
    [morphStart, morphEnd * 0.8],
    [CONFIG.thumb.borderRadius, 0]
  );

  // Shadow: visible → none
  const boxShadow = useTransform(
    scrollYProgress,
    [morphStart, morphEnd],
    [
      '0 25px 80px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.5)',
      '0 0 0 rgba(0,0,0,0)',
    ]
  );

  // ============================================================================
  // STATE MACHINE
  // ============================================================================
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (prefersReducedMotion) return;

    const { fullscreenThreshold } = CONFIG.timing;

    // Show video while in Hero section
    if (progress <= 1) {
      setShowVideo(true);
    }

    if (progress < morphEnd * 0.5) {
      if (videoState !== 'thumbnail' && videoState !== 'transition') {
        setVideoState('thumbnail');
        muteVideo();
      }
    } else if (progress >= morphEnd * 0.5 && progress < fullscreenThreshold) {
      if (videoState === 'thumbnail') {
        setVideoState('transition');
      }
    } else if (progress >= fullscreenThreshold) {
      if (videoState === 'transition') {
        enterFullscreenHold();
      }
    }

    // Scrolling back up
    if (progress < morphEnd * 0.3 && videoState === 'released') {
      setVideoState('thumbnail');
      setShowVideo(true);
    }
  });

  // ============================================================================
  // FULLSCREEN HOLD
  // ============================================================================
  const enterFullscreenHold = useCallback(() => {
    setVideoState('fullscreenHold');
    unmuteVideo();

    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
    }

    holdTimeoutRef.current = setTimeout(() => {
      setVideoState('released');
      muteVideo();
      // Hide video after release
      setTimeout(() => setShowVideo(false), 500);
    }, CONFIG.holdDuration);
  }, []);

  // ============================================================================
  // SOUND CONTROLS
  // ============================================================================
  const muteVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  }, []);

  const unmuteVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  }, []);

  // ============================================================================
  // CLICK → SKIP TO FULLSCREEN
  // ============================================================================
  const handleThumbClick = useCallback(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const scrollTarget =
      sectionRef.current.offsetTop +
      sectionRef.current.offsetHeight * CONFIG.timing.fullscreenThreshold;

    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth',
    });
  }, [prefersReducedMotion]);

  // ============================================================================
  // CLEANUP
  // ============================================================================
  useEffect(() => {
    return () => {
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
      }
    };
  }, []);

  // ============================================================================
  // REDUCED MOTION VERSION
  // ============================================================================
  if (prefersReducedMotion) {
    return (
      <section
        id="hero"
        ref={sectionRef}
        className="relative min-h-screen bg-[#06071f] overflow-hidden"
        aria-label="Hero section"
      >
        <HeroPreloader />
        <div className="absolute inset-0 z-20 pointer-events-none">
          <GhostStage reducedMotion={true} />
        </div>
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center">
          <HeroCopy />
        </div>
      </section>
    );
  }

  // ============================================================================
  // MAIN RENDER
  // ============================================================================
  return (
    <>
      <section
        id="hero"
        ref={sectionRef}
        className="relative h-[200vh] bg-[#06071f] overflow-hidden"
        aria-label="Hero section with animated video manifesto"
      >
        {/* Preloader (z-50) */}
        <HeroPreloader />

        {/* Sticky container - pins content during scroll */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Layer 1: Ghost Atmosphere (z-20) */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            aria-hidden="true"
          >
            <GhostStage reducedMotion={false} />
          </div>

          {/* Layer 2: Editorial Text - 100% STATIC (z-30) */}
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <HeroCopy />
            </div>
          </div>
        </div>
      </section>

      {/* 
        FIXED VIDEO OVERLAY - OUTSIDE the section!
        Uses position: fixed to stay anchored to viewport
        Only visible on desktop (md:block)
      */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="fixed z-[100] overflow-hidden will-change-transform hidden md:block pointer-events-auto"
            style={{
              width,
              height,
              right,
              bottom,
              borderRadius,
              boxShadow,
            }}
            initial={CONFIG.entrance.initial}
            animate={{
              opacity: videoState === 'released' ? 0 : 1,
              scale: CONFIG.entrance.animate.scale,
              y: CONFIG.entrance.animate.y,
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={CONFIG.entrance.transition}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleThumbClick}
          >
            <motion.div
              className="w-full h-full cursor-pointer relative"
              animate={{
                scale: isHovered && videoState === 'thumbnail' ? 1.05 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <video
                ref={videoRef}
                src={CONFIG.videoSrc}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-cover"
                aria-label="Portfolio showreel video"
              />

              {/* Sound indicator (fullscreen hold only) */}
              <AnimatePresence>
                {videoState === 'fullscreenHold' && !isMuted && (
                  <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 
                               bg-black/60 backdrop-blur-sm rounded-full px-4 py-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <span className="w-2 h-2 bg-[#4fe6ff] rounded-full animate-pulse" />
                    <span className="text-white text-sm font-mono uppercase tracking-wider">
                      Sound On
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Gradient overlay (thumbnail state only) */}
              <motion.div
                className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none"
                animate={{ opacity: videoState === 'thumbnail' ? 0.7 : 0 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default HomeHero;
