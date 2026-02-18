'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  MotionValue,
  useMotionValueEvent,
  animate,
  AnimatePresence,
  motion,
} from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';
import { PHRASES } from './useBeliefAnimation';

interface RotatingTextProps {
  scrollYProgress: MotionValue<number>;
  /** Hide phrases when manifesto is showing */
  finalProgress: number;
  prefersReducedMotion?: boolean;
}

const PHRASE_ZONE_END = 0.82; // After this, manifesto takes over

/**
 * RotatingText — Layer 3 (z-20)
 *
 * Handles the sequential display of phrases based on scroll progress.
 * Desktop: Imperative animation using refs for performance.
 * Mobile: AnimatePresence for layout stability.
 */
export function RotatingText({
  scrollYProgress,
  finalProgress,
  prefersReducedMotion,
}: RotatingTextProps) {
  const isMobile = useIsMobile();
  const phraseCount = PHRASES.length;
  // Calculate segment size based on the scroll zone allocated for phrases
  const segment = PHRASE_ZONE_END / phraseCount;

  // Track current active phrase index
  const [activeIndex, setActiveIndex] = useState(-1);
  const prevIndex = useRef(-1);

  // Refs for animating the text lines (Desktop)
  const desktopRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ---------------------------------------------------------------------------
  // SCROLL-BASED PROGRESS LOGIC
  // ---------------------------------------------------------------------------
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    // Reset if out of bounds (before start or after end)
    if (value <= 0.001 || value >= PHRASE_ZONE_END) {
      if (activeIndex !== -1) setActiveIndex(-1);
      return;
    }

    // Determine which phrase segment we are in
    const idx = Math.min(phraseCount - 1, Math.floor(value / segment));
    const localProgress = (value - idx * segment) / segment;

    // Phrase is "active" when in the middle 70% of its segment
    // Entry: 0→0.15, Visible: 0.15→0.85, Exit: 0.85→1.0
    if (localProgress >= 0.15 && localProgress <= 0.85) {
      if (activeIndex !== idx) setActiveIndex(idx);
    } else if (localProgress < 0.15) {
      // Transitioning in... keep previous if meaningful, else wait
      if (idx > 0 && activeIndex !== idx - 1) setActiveIndex(idx - 1);
      else if (idx === 0 && activeIndex !== -1) setActiveIndex(-1);
    } else {
      // Transitioning out...
      if (activeIndex !== -1) setActiveIndex(-1);
    }
  });

  // ---------------------------------------------------------------------------
  // ANIMATION EFFECT (Triggered when activeIndex changes)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    // Mobile is handled by AnimatePresence in JSX
    if (isMobile) return;
    if (prefersReducedMotion) return;

    const prev = prevIndex.current;

    // --- EXIT Previous Phrase ---
    if (prev >= 0 && prev !== activeIndex) {
      const desktopEl = desktopRefs.current[prev];
      if (desktopEl) {
        animate(
          desktopEl,
          { opacity: 0, y: -50, filter: 'blur(4px)' },
          { duration: 0.4, ease: [0.17, 0.55, 0.55, 1] }
        );
      }
    }

    // --- ENTER New Phrase ---
    if (activeIndex >= 0 && activeIndex !== prev) {
      const desktopEl = desktopRefs.current[activeIndex];
      if (desktopEl) {
        animate(
          desktopEl,
          { opacity: 1, y: 0, filter: 'blur(0px)' },
          { duration: 0.5, ease: [0.17, 0.55, 0.55, 1], delay: 0.1 }
        );
      }
    }

    prevIndex.current = activeIndex;
  }, [activeIndex, isMobile, prefersReducedMotion]);

  // Force hide if we are past the zone (Manifesto visible)
  if (finalProgress > 0.06) return null;

  // Conditional Rendering logic
  const shouldShowMobile = isMobile;
  const shouldShowDesktop = !isMobile;

  return (
    <div className="relative z-10 flex h-full w-full items-end pb-12 md:pb-0 md:items-center pointer-events-none">
      {/* --- DESKTOP LAYOUT --- */}
      {shouldShowDesktop && (
        <div className="hidden md:flex flex-col items-start justify-center h-full pl-0 md:pl-12 lg:pl-0 w-full max-w-[800px]">
          <div className="relative w-full h-full flex items-center">
            {PHRASES.map((phrase, i) => (
              <div
                key={`desktop-${i}`}
                ref={(el) => {
                  if (el) desktopRefs.current[i] = el;
                }}
                className="absolute inset-0 flex items-center w-full will-change-[opacity,transform]"
                style={{
                  opacity: 0, // Initial state hidden
                  transform: 'translateY(-50px)',
                  filter: 'blur(4px)',
                }}
              >
                <p className="text-blueAccent italic font-bold leading-[0.95] tracking-tighter whitespace-pre-line text-[clamp(4rem,7vw,8rem)] text-left">
                  {phrase}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- MOBILE LAYOUT --- */}
      {shouldShowMobile && (
        <div className="flex md:hidden w-full absolute bottom-[20vh] left-0 px-6 justify-center">
          <div className="relative w-full h-[120px] flex items-end justify-center">
            <AnimatePresence mode="wait">
              {activeIndex >= 0 && (
                <motion.div
                  key={`mobile-${activeIndex}`}
                  initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute bottom-0 w-full text-center"
                >
                  <p className="text-blueAccent italic font-bold leading-[1.1] tracking-tight text-[clamp(2.5rem,8vw,4rem)]">
                    {PHRASES[activeIndex].replace(/\n/g, ' ')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
