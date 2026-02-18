'use client';
import React, { useRef, useState, useEffect } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';
import { PHRASES } from './useBeliefAnimation';

interface RotatingTextProps {
  scrollYProgress: MotionValue;
  currentSection: number;
  finalProgress: number;
  prefersReducedMotion?: boolean;
}

const PHRASE_ZONE_END = 0.82; // After this, manifesto takes over

/**
 * RotatingText — Layer 3 (z-20)
 * Handles the sequential display of phrases based on scroll progress.
 * Desktop: Text aligned left, entering from left, moving with scroll
 * Mobile: Text centered at 20% from bottom, fixed position, exiting right
 */
export function RotatingText({
  scrollYProgress,
  currentSection,
  finalProgress,
  prefersReducedMotion,
}: RotatingTextProps) {
  const isMobile = useIsMobile();
  const phraseCount = PHRASES.length;
  const segment = PHRASE_ZONE_END / phraseCount;

  // Track current active phrase index
  const [activeIndex, setActiveIndex] = useState(-1);
  const prevIndex = useRef(-1);

  // Refs for each phrase element
  const phraseRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ---------------------------------------------------------------------------
  // SCROLL-BASED PROGRESS LOGIC
  // ---------------------------------------------------------------------------
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    // Reset if out of bounds
    if (value <= 0.001 || value >= PHRASE_ZONE_END) {
      if (activeIndex !== -1) setActiveIndex(-1);
      return;
    }

    // Determine which phrase segment we are in
    const idx = Math.min(phraseCount - 1, Math.floor(value / segment));
    const localProgress = (value - idx * segment) / segment;

    // Update active index based on progress
    if (localProgress >= 0.15 && localProgress <= 0.85) {
      if (activeIndex !== idx) setActiveIndex(idx);
    } else if (localProgress < 0.15) {
      // Transitioning in
      if (idx > 0 && activeIndex !== idx - 1) setActiveIndex(idx - 1);
      else if (idx === 0 && activeIndex !== -1) setActiveIndex(-1);
    } else {
      // Transitioning out
      if (activeIndex !== -1) setActiveIndex(-1);
    }
  });

  // Force hide if manifesto is visible
  if (finalProgress > 0.06) return null;

  // ---------------------------------------------------------------------------
  // ANIMATION EFFECTS
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (prefersReducedMotion) return;

    const prev = prevIndex.current;

    // Exit previous phrase
    if (prev >= 0 && prev !== activeIndex) {
      const prevEl = phraseRefs.current[prev];
      if (prevEl) {
        const exitDirection = isMobile ? 100 : -100;
        prevEl.style.transition = 'opacity 0.6s var(--ghost-ease), transform 0.6s var(--ghost-ease)';
        prevEl.style.opacity = '0';
        prevEl.style.transform = `translateX(${exitDirection}px)`;
      }
    }

    // Enter new phrase
    if (activeIndex >= 0 && activeIndex !== prev) {
      const currentEl = phraseRefs.current[activeIndex];
      if (currentEl) {
        currentEl.style.transition = 'opacity 0.8s var(--ghost-ease), transform 0.8s var(--ghost-ease)';
        currentEl.style.opacity = '1';
        currentEl.style.transform = 'translateX(0)';
      }
    }

    prevIndex.current = activeIndex;
  }, [activeIndex, isMobile, prefersReducedMotion]);

  // Reset styles when section changes
  useEffect(() => {
    if (activeIndex >= 0) {
      const currentEl = phraseRefs.current[activeIndex];
      if (currentEl) {
        // Reset to initial state for re-animation
        currentEl.style.opacity = '0';
        currentEl.style.transform = `translateX(${isMobile ? '-100px' : '-100px'})`;

        // Force reflow
        void currentEl.offsetWidth;

        // Apply initial animation
        currentEl.style.transition = 'opacity 0.8s var(--ghost-ease), transform 0.8s var(--ghost-ease)';
        currentEl.style.opacity = '1';
        currentEl.style.transform = 'translateX(0)';
      }
    }
  }, [currentSection, activeIndex, isMobile]);

  return (
    <div className="relative w-full h-full">
      {PHRASES.map((phrase, index) => (
        <div
          key={`phrase-${index}`}
          ref={el => {
            if (el) phraseRefs.current[index] = el;
          }}
          className={`
            absolute w-[90%] md:w-auto md:max-w-[600px] 
            left-[5%] md:left-[15%] 
            bottom-[20vh] md:bottom-[10%] 
            text-[36px] md:text-[48px]
            font-h1 text-[#4fe6ff] font-bold
            transition-all duration-300
            opacity-0 -translate-x-[100px]
            ${isMobile ? 'text-center' : 'text-left'}
          `}
        >
          {isMobile
            ? phrase
            : phrase.split('\n').map((word, i) => (
              <span key={i}>
                {word}
                {i < phrase.split('\n').length - 1 && <br />}
              </span>
            ))}
        </div>
      ))}
    </div>
  );
}