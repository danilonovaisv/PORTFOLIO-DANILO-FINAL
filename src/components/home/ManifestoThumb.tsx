'use client';

// ============================================================================
// src/components/home/ManifestoThumb.tsx
// Thumb do vídeo manifesto (desktop) com microinterações
//
// FEATURES:
// - Smooth entry animation with organic easing
// - Hover: subtle scale + play icon rotation
// - Click: desktop skips to fullscreen, mobile toggles sound
// - Performance: will-change hints, hardware acceleration
// ============================================================================

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useRef, useCallback } from 'react';

// Video sources - prioritize local, fallback to Supabase
const VIDEO_SOURCES = {
  local: '/assets/thumb-hero.mp4',
  remote:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
} as const;

// Animation configuration
const ANIMATION_CONFIG = {
  // Entry animation
  entry: {
    initial: { opacity: 0, scale: 0.88, y: 40 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1], // Custom ease-out curve (similar to CSS ease-out-expo)
      delay: 0.3, // Wait for preloader
    },
  },
  // Hover animation
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  // Play icon animation
  playIcon: {
    initial: { rotate: -45, opacity: 0.7 },
    hover: { rotate: 0, opacity: 1 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
} as const;

interface ManifestoThumbProps {
  onClickDesktop?: () => void;
  onClickMobile?: () => void;
}

export function ManifestoThumb({
  onClickDesktop,
  onClickMobile,
}: ManifestoThumbProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Handle click based on device
  const handleClick = useCallback(() => {
    if (typeof window === 'undefined') return;

    const isDesktop = window.innerWidth >= 768;

    if (isDesktop) {
      // Desktop: skip to fullscreen
      onClickDesktop?.();
    } else {
      // Mobile: toggle sound
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
      }
      onClickMobile?.();
    }
  }, [onClickDesktop, onClickMobile]);

  // Handle video load error - fallback to remote
  const handleVideoError = useCallback(() => {
    if (!videoError) {
      setVideoError(true);
    }
  }, [videoError]);

  // Determine which video source to use
  const videoSrc = videoError ? VIDEO_SOURCES.remote : VIDEO_SOURCES.local;

  // Reduced motion: no animations
  if (prefersReducedMotion) {
    return (
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        onClick={handleClick}
        onError={handleVideoError}
        className="w-full h-full object-cover cursor-pointer"
        aria-label="Portfolio showreel video"
      />
    );
  }

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden cursor-pointer group"
      initial={ANIMATION_CONFIG.entry.initial}
      animate={ANIMATION_CONFIG.entry.animate}
      transition={ANIMATION_CONFIG.entry.transition}
      whileHover={ANIMATION_CONFIG.hover}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        onError={handleVideoError}
        className="w-full h-full object-cover"
        aria-label="Portfolio showreel video"
      />

      {/* Hover overlay with play icon */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300"
        aria-hidden="true"
      >
        <motion.div
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm 
                     flex items-center justify-center opacity-0 group-hover:opacity-100 
                     transition-opacity duration-300"
          initial={ANIMATION_CONFIG.playIcon.initial}
          animate={
            isHovered
              ? ANIMATION_CONFIG.playIcon.hover
              : ANIMATION_CONFIG.playIcon.initial
          }
          transition={ANIMATION_CONFIG.playIcon.transition}
        >
          {/* Arrow icon */}
          <svg
            className="w-6 h-6 md:w-8 md:h-8 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Mobile: Sound indicator */}
      <div className="absolute bottom-4 right-4 md:hidden">
        <motion.div
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          whileTap={{ scale: 0.9 }}
        >
          {isMuted ? (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          )}
        </motion.div>
      </div>

      {/* Subtle gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/30 via-transparent to-transparent opacity-60"
        aria-hidden="true"
      />
    </motion.div>
  );
}

export default ManifestoThumb;
