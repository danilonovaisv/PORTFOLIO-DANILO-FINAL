'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BRAND } from '@/config/brand';
import { ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface ManifestoThumbProps {
  narrativeState: string;
  onSkipToFullscreen?: () => void;
}

/**
 * ManifestoThumb Component
 * 
 * Premium editorial entry animation with scroll-driven morph.
 * - Desktop: Click skips to fullscreen state
 * - Mobile: Click toggles audio
 * - Reduced Motion: Disables all animations, static layout
 */
export default function ManifestoThumb({
  narrativeState: _narrativeState,
  onSkipToFullscreen
}: ManifestoThumbProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle click based on viewport
  const handleClick = useCallback(() => {
    if (isMobile) {
      // Mobile: Toggle sound
      if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    } else {
      // Desktop: Skip to fullscreen (scroll to end of hero timeline)
      if (onSkipToFullscreen) {
        onSkipToFullscreen();
      } else {
        // Fallback: smooth scroll to end of hero section
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          // Scroll to 80% of hero height (where video is fullscreen)
          const targetScroll = heroSection.offsetTop + (heroSection.offsetHeight * 0.8);
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [isMobile, isMuted, onSkipToFullscreen]);

  // Animation variants
  const entryVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 18,
      scale: prefersReducedMotion ? 1 : 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1] // Smooth expo out
      }
    }
  };

  // Hover animation (disabled for reduced motion)
  const hoverScale = prefersReducedMotion ? 1 : 1.02;

  return (
    <motion.div
      className="relative w-full h-full group cursor-pointer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={entryVariants}
      whileHover={{ scale: hoverScale }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={handleClick}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={BRAND.video.manifesto}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="w-full h-full object-cover"
        aria-label="Manifesto Video"
      />

      {/* Hover Arrow Overlay (Desktop) */}
      <div
        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
        aria-hidden="true"
      >
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-transform duration-500 -rotate-45 group-hover:rotate-0">
          <ArrowUpRight className="w-5 h-5" />
        </span>
      </div>

      {/* Sound Toggle Indicator (Mobile) */}
      <div className="absolute bottom-4 right-4 md:hidden" aria-hidden="true">
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white">
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </span>
      </div>

      {/* Label (visible on hover) */}
      <div
        className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      >
        <span className="text-white/70 text-xs uppercase tracking-wider font-mono">
          Strategy
        </span>
      </div>
    </motion.div>
  );
}
