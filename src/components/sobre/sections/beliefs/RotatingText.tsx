'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  MotionValue,
  useMotionValueEvent,
  animate as motionAnimate,
  type DOMKeyframesDefinition,
  type AnimationOptions,
} from 'framer-motion';
import { PHRASES } from './useBeliefAnimation';

/**
 * Animation constants per spec Section 3.4 & 3.5 & 8
 */
const ANIM_DURATION = 0.9;
const ANIM_EASING: [number, number, number, number] = [0.22, 1, 0.36, 1]; // Ghost Ease

const ENTER_OPTIONS: AnimationOptions = {
  duration: ANIM_DURATION,
  ease: ANIM_EASING,
};

const EXIT_OPTIONS: AnimationOptions = {
  duration: ANIM_DURATION,
  ease: ANIM_EASING,
};

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
 *
 * Per spec 06-O-QUE-ME-MOVE-AJUSTE.md:
 *
 * DESKTOP (≥ 1024px):
 * - Layout: Text on Left (col-span-12 md:col-span-5)
 * - Motion: Slide VERTICAL.
 *   - Enter: From Top (y: -50px -> 0)
 *   - Exit: To Top (y: -50px)
 *   - Style: text-blueAccent, text-h1 size
 *
 * MOBILE (< 768px):
 * - Layout: Fixed at bottom 20%
 * - Motion: Slide HORIZONTAL.
 *   - Enter: Fade in (opacity 0->1)
 *   - Exit: Slide Right (x: 0 -> 100%)
 *
 * Implementation Note:
 * Since this component is inside a sticky container, we use `scrollYProgress`
 * to calculate the active index and trigger imperative animations with `animate()`.
 */
export function RotatingText({
  scrollYProgress,
  finalProgress,
  prefersReducedMotion,
}: RotatingTextProps) {
  const phraseCount = PHRASES.length;
  const segment = PHRASE_ZONE_END / phraseCount;

  // Track current active phrase index
  const [activeIndex, setActiveIndex] = useState(-1);
  const prevIndex = useRef(-1);

  // Refs to all phrase elements
  const desktopRefs = useRef<(HTMLDivElement | null)[]>(
    new Array(phraseCount).fill(null)
  );
  const mobileRefs = useRef<(HTMLDivElement | null)[]>(
    new Array(phraseCount).fill(null)
  );

  // Determine which phrase is active based on scroll progress
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    // Reset if out of bounds
    if (value <= 0.001 || value >= PHRASE_ZONE_END) {
      if (activeIndex !== -1) setActiveIndex(-1);
      return;
    }

    // Which phrase segment are we in?
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

  // Animate phrase transitions when activeIndex changes
  useEffect(() => {
    if (prefersReducedMotion) {
      prevIndex.current = activeIndex;
      return;
    }

    const prev = prevIndex.current;

    // --- EXIT Previous Phrase ---
    if (prev >= 0 && prev !== activeIndex) {
      const desktopEl = desktopRefs.current[prev];
      const mobileEl = mobileRefs.current[prev];

      if (desktopEl) {
        // Desktop Exit: Slide UP (y: -50px)
        motionAnimate(
          desktopEl,
          { opacity: 0, y: -50 } as DOMKeyframesDefinition,
          EXIT_OPTIONS
        );
      }
      if (mobileEl) {
        // Mobile Exit: Slide RIGHT (x: 100%)
        motionAnimate(
          mobileEl,
          { opacity: 0, x: '100%' } as DOMKeyframesDefinition,
          EXIT_OPTIONS
        );
      }
    }

    // --- ENTER New Phrase ---
    if (activeIndex >= 0 && activeIndex !== prev) {
      const desktopEl = desktopRefs.current[activeIndex];
      const mobileEl = mobileRefs.current[activeIndex];

      if (desktopEl) {
        // Desktop Enter: Slide form Top (y: -50px -> 0)
        motionAnimate(
          desktopEl,
          { opacity: 1, y: [-50, 0] } as DOMKeyframesDefinition,
          ENTER_OPTIONS
        );
      }
      if (mobileEl) {
        // Mobile Enter: Fade In (y is static/handled by CSS or simpler Anim)
        // Spec says: "Entra com Fade, sai deslizando para a DIREITA"
        motionAnimate(
          mobileEl,
          { opacity: 1, x: 0 } as DOMKeyframesDefinition,
          ENTER_OPTIONS
        );
      }
    }

    prevIndex.current = activeIndex;
  }, [activeIndex, prefersReducedMotion]);

  // Hide all phrases during manifesto or if none active (and no animation running)
  // We let the animation cleanup handle the hiding visually, but if finalProgress is high, force hide.
  if (finalProgress > 0.06) return null;

  return (
    <div className="relative w-full h-full pointer-events-none">
      <div className="std-grid h-full items-center">
        {/* Container for Desktop Text - Limits width to left columns */}
        <div className="col-span-12 md:col-span-6 lg:col-span-5 h-full relative">
          {PHRASES.map((phrase, index) => (
            <React.Fragment key={index}>
              {/* === Desktop View === */}
              {/* === Desktop View === */}
              <div
                ref={(el) => {
                  desktopRefs.current[index] = el;
                }}
                className={`hidden md:flex items-center absolute inset-0 w-full will-change-[opacity,transform] ${
                  prefersReducedMotion
                    ? activeIndex === index
                      ? 'opacity-100'
                      : 'opacity-0'
                    : 'opacity-0 -translate-y-[50px]'
                }`}
              >
                <p className="text-blueAccent italic font-bold leading-[0.95] tracking-tighter whitespace-pre-line text-[clamp(3rem,5vw,5.5rem)]">
                  {phrase}
                </p>
              </div>

              {/* === Mobile View === */}
              {/* Note: Mobile positioning is "Fixed at bottom 20%" per spec.
                  We use a fixed container relative to the viewport here. */}
              <div
                ref={(el) => {
                  mobileRefs.current[index] = el;
                }}
                className={`md:hidden flex items-end justify-center absolute bottom-[20%] left-0 right-0 w-full px-6 text-center will-change-[opacity,transform] ${
                  prefersReducedMotion
                    ? activeIndex === index
                      ? 'opacity-100'
                      : 'opacity-0'
                    : 'opacity-0 translate-x-0'
                }`}
              >
                <p className="text-blueAccent italic font-bold leading-[1.1] tracking-tight text-[clamp(2.5rem,8vw,4rem)]">
                  {phrase}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
