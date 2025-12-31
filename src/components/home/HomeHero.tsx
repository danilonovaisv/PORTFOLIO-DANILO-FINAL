'use client';

// ============================================================================
// src/components/home/HomeHero.tsx
// Hero Orchestrator — Editorial text (static) + Manifesto video morph
//
// STATE MACHINE:
// - "thumbnail": Video in bottom-right, muted
// - "transition": Video morphing toward fullscreen, muted
// - "fullscreenHold": Video fullscreen, unmuted, 2s hold
// - "released": After hold, scroll continues, video muted again
//
// BEHAVIOR:
// - Editorial text is 100% STATIC (no fade)
// - Video stays FIXED during scroll transition
// - Video unmutes ONLY during fullscreen hold
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
  // Thumbnail initial state
  thumb: {
    width: '30vw',
    aspectRatio: '16/9',
    borderRadius: 16,
    right: 24,
    bottom: 40,
  },
  // Animation timing (scroll progress 0-1)
  timing: {
    morphStart: 0.05,
    morphEnd: 0.75,
    fullscreenThreshold: 0.95,
  },
  // Fullscreen hold duration in ms
  holdDuration: 2000,
  // Entrance animation
  entrance: {
    initial: {
      opacity: 0,
      scale: 0.92,
      y: 60,
      filter: 'blur(10px)',
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
    },
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
} as const;

// Video state type
type VideoState = 'thumbnail' | 'transition' | 'fullscreenHold' | 'released';

export function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const prefersReducedMotion = useReducedMotion();
  const [videoState, setVideoState] = useState<VideoState>('thumbnail');
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // ============================================================================
  // SCROLL → VIDEO STATE MACHINE
  // ============================================================================
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (prefersReducedMotion) return;

    const { morphStart, morphEnd, fullscreenThreshold } = CONFIG.timing;

    if (progress < morphStart) {
      // Initial thumbnail state
      if (videoState !== 'thumbnail') {
        setVideoState('thumbnail');
        muteVideo();
      }
    } else if (progress >= morphStart && progress < fullscreenThreshold) {
      // Transitioning
      if (videoState === 'thumbnail' || videoState === 'released') {
        setVideoState('transition');
        muteVideo();
      }
    } else if (progress >= fullscreenThreshold) {
      // Reached fullscreen threshold
      if (videoState === 'transition') {
        enterFullscreenHold();
      }
    }

    // If scrolling back up from released state
    if (progress < morphEnd && videoState === 'released') {
      setVideoState('transition');
    }
  });

  // ============================================================================
  // FULLSCREEN HOLD LOGIC (2 seconds + unmute)
  // ============================================================================
  const enterFullscreenHold = useCallback(() => {
    setVideoState('fullscreenHold');
    unmuteVideo();

    // Clear any existing timeout
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
    }

    // After 2 seconds, release
    holdTimeoutRef.current = setTimeout(() => {
      setVideoState('released');
      muteVideo();
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
    if (prefersReducedMotion) return;

    // Skip animation, go directly to fullscreen
    if (sectionRef.current) {
      const scrollTarget =
        sectionRef.current.offsetTop +
        sectionRef.current.offsetHeight * CONFIG.timing.fullscreenThreshold;

      window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth',
      });
    }
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
  // TRANSFORM VALUES (Framer Motion)
  // ============================================================================
  const { morphStart, morphEnd } = CONFIG.timing;

  // Scale: 0.3 (30vw equivalent) → 1 (fullscreen)
  const scale = useTransform(scrollYProgress, [morphStart, morphEnd], [0.3, 1]);

  // Position X: from right side → center
  const x = useTransform(
    scrollYProgress,
    [morphStart, morphEnd],
    ['35%', '0%']
  );

  // Position Y: from bottom → center
  const y = useTransform(
    scrollYProgress,
    [morphStart, morphEnd],
    ['35%', '0%']
  );

  // Border radius: 16px → 0px
  const borderRadius = useTransform(
    scrollYProgress,
    [morphStart, morphEnd * 0.8],
    [CONFIG.thumb.borderRadius, 0]
  );

  // Video source (Supabase)
  const videoSrc = CONFIG.videoSrc;

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
        <div className="absolute bottom-10 right-6 z-40 w-[30vw] aspect-video overflow-hidden rounded-2xl shadow-lg hidden md:block">
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    );
  }

  // ============================================================================
  // MAIN RENDER
  // ============================================================================
  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[200vh] bg-[#06071f] overflow-hidden"
      aria-label="Hero section with animated video manifesto"
    >
      {/* Preloader (z-50) */}
      <HeroPreloader />

      {/* Sticky container */}
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

        {/* Layer 3: Video Manifesto (z-40) - Desktop only */}
        <motion.div
          className="fixed bottom-0 right-0 z-40 overflow-hidden will-change-transform hidden md:block"
          style={{
            scale,
            x,
            y,
            borderRadius,
            width: '100vw',
            height: '100vh',
          }}
          initial={CONFIG.entrance.initial}
          animate={CONFIG.entrance.animate}
          transition={CONFIG.entrance.transition}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleThumbClick}
        >
          <motion.div
            className="w-full h-full cursor-pointer"
            animate={{
              scale: isHovered && videoState === 'thumbnail' ? 1.05 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-cover"
              aria-label="Portfolio showreel video"
            />

            {/* Sound indicator when in fullscreen hold */}
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

            {/* Gradient overlay for depth (only in thumbnail state) */}
            <motion.div
              className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent pointer-events-none"
              animate={{ opacity: videoState === 'thumbnail' ? 0.6 : 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>

        {/* Mobile: Static thumbnail */}
        <div className="absolute bottom-10 right-6 z-40 w-[60vw] aspect-video overflow-hidden rounded-2xl shadow-[0_18px_60px_rgba(0,0,0,0.8)] block md:hidden">
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
