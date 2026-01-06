'use client';

// ============================================================================
// src/components/home/ManifestoSection.tsx
// Mobile-only fullscreen manifesto section below Hero
//
// BEHAVIOR:
// - Full viewport width, aspect-video height
// - Background: #06071f (matches Hero)
// - Video: Autoplay, loop, muted by default, playsInline
// - Tap toggles sound
// - When scrolling away, video reverts to muted
// - Scroll reveal animation with scale and opacity
// ============================================================================

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// Video source (Supabase)
const VIDEO_SRC =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4';

// Animation config
const ANIMATION = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1], // easeOutExpo
  },
} as const;

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Track if section is in view
  const isInView = useInView(sectionRef, {
    once: false, // Allow re-triggering
    amount: 0.5, // 50% in view
  });

  const prefersReducedMotion = useReducedMotion();
  const [isMuted, setIsMuted] = useState(true);

  // ============================================================================
  // AUTO-MUTE WHEN LEAVING VIEW
  // ============================================================================
  useEffect(() => {
    if (!isInView && !isMuted) {
      // User scrolled away, mute the video
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  }, [isInView, isMuted]);

  // ============================================================================
  // TOGGLE SOUND
  // ============================================================================
  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <motion.section
      id="manifesto"
      ref={sectionRef}
      initial={prefersReducedMotion ? {} : ANIMATION.initial}
      animate={isInView && !prefersReducedMotion ? ANIMATION.animate : {}}
      transition={ANIMATION.transition}
      className="lg:hidden w-full bg-[#050511] aspect-video relative overflow-hidden"
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover"
        aria-label="Portfolio showreel video"
      />

      {/* Sound Toggle Button */}
      <button
        type="button"
        onClick={toggleSound}
        className="absolute bottom-4 right-4 z-10 flex items-center justify-center 
                   w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm text-white 
                   transition-all duration-300 
                   hover:bg-black/70 hover:scale-105
                   focus-visible:outline-none focus-visible:ring-2 
                   focus-visible:ring-[#4fe6ff] focus-visible:ring-offset-2
                   focus-visible:ring-offset-black/50"
        aria-label={isMuted ? 'Ativar som do vídeo' : 'Desativar som do vídeo'}
        aria-pressed={!isMuted ? 'true' : 'false'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" aria-hidden="true" />
        ) : (
          <Volume2 className="w-5 h-5" aria-hidden="true" />
        )}
      </button>

      {/* Sound indicator */}
      {!isMuted && (
        <motion.div
          className="absolute bottom-4 left-4 flex items-center gap-2 
                     bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
        >
          <span className="w-2 h-2 bg-[#4fe6ff] rounded-full animate-pulse" />
          <span className="text-white text-xs font-mono uppercase tracking-wider">
            Sound On
          </span>
        </motion.div>
      )}

      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 bg-linear-to-t from-[#06071f]/40 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </motion.section>
  );
}
