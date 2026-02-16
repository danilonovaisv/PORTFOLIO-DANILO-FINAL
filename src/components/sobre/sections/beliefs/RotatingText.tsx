'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { MotionValue, useMotionValueEvent, animate as motionAnimate, type DOMKeyframesDefinition, type AnimationOptions } from 'framer-motion';
import { PHRASES } from './useBeliefAnimation';

/**
 * Animation constants per spec Section 3.4 & 3.5
 */
const ANIM_DURATION = 0.9;
const ANIM_EASING: [number, number, number, number] = [0.17, 0.55, 0.55, 1];

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
 * RotatingText — Layer 3 (z-15)
 *
 * ARCHITECTURE NOTE: This component is INSIDE a sticky container,
 * so `inView` won't work (the element is always in the viewport).
 * Instead, we use scrollYProgress to determine which phrase should
 * be visible, and then use Framer Motion's imperative `animate()`
 * to perform the enter/exit animations.
 *
 * Per spec Section 3.4 & 3.5:
 *
 * Desktop:
 *   - Enter: animate → opacity: 1, x: [-100, 0]
 *   - Exit:  animate → opacity: 0, x: -100
 *
 * Mobile:
 *   - Enter: animate → opacity: 1, y: [60, 0]
 *   - Exit:  animate → opacity: 0, x: 100 (exits right)
 *
 * The `animate()` function is called when the active phrase index
 * changes, providing smooth transitions driven by scroll position
 * but animated with proper easing.
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
  const desktopRefs = useRef<(HTMLDivElement | null)[]>(new Array(phraseCount).fill(null));
  const mobileRefs = useRef<(HTMLDivElement | null)[]>(new Array(phraseCount).fill(null));

  // Determine which phrase is active based on scroll progress
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (value <= 0.001 || value >= PHRASE_ZONE_END) {
      setActiveIndex(-1);
      return;
    }

    // Which phrase segment are we in?
    const idx = Math.min(phraseCount - 1, Math.floor(value / segment));
    const localProgress = (value - idx * segment) / segment;

    // Phrase is "active" when in the middle 60% of its segment
    // Entry: 0→0.2 (ramp in), Visible: 0.2→0.8, Exit: 0.8→1.0 (ramp out)
    if (localProgress >= 0.15 && localProgress <= 0.85) {
      setActiveIndex(idx);
    } else if (localProgress < 0.15) {
      // Just before this phrase — but if previous was active, don't hide yet
      setActiveIndex(idx > 0 ? idx - 1 : -1);
    } else {
      // Exiting — show nothing briefly before next kicks in
      setActiveIndex(-1);
    }
  });

  // Animate phrase transitions when activeIndex changes
  useEffect(() => {
    if (prefersReducedMotion) {
      prevIndex.current = activeIndex;
      return;
    }

    const prev = prevIndex.current;

    // Exit previous phrase
    if (prev >= 0 && prev !== activeIndex) {
      const desktopEl = desktopRefs.current[prev];
      const mobileEl = mobileRefs.current[prev];

      if (desktopEl) {
        motionAnimate(
          desktopEl,
          { opacity: 0, x: -100 } as DOMKeyframesDefinition,
          EXIT_OPTIONS
        );
      }
      if (mobileEl) {
        motionAnimate(
          mobileEl,
          { opacity: 0, x: 100 } as DOMKeyframesDefinition,
          EXIT_OPTIONS
        );
      }
    }

    // Enter new phrase
    if (activeIndex >= 0 && activeIndex !== prev) {
      const desktopEl = desktopRefs.current[activeIndex];
      const mobileEl = mobileRefs.current[activeIndex];

      if (desktopEl) {
        motionAnimate(
          desktopEl,
          { opacity: 1, x: [-100, 0] } as DOMKeyframesDefinition,
          ENTER_OPTIONS
        );
      }
      if (mobileEl) {
        motionAnimate(
          mobileEl,
          { opacity: 1, y: [60, 0] } as DOMKeyframesDefinition,
          ENTER_OPTIONS
        );
      }
    }

    prevIndex.current = activeIndex;
  }, [activeIndex, prefersReducedMotion]);

  // Hide all phrases during manifesto
  if (finalProgress > 0.06) return null;

  return (
    <div className="relative w-full h-full flex items-center">
      {PHRASES.map((phrase, index) => (
        <React.Fragment key={index}>
          {/* === Desktop View === */}
          <div
            ref={(el) => { desktopRefs.current[index] = el; }}
            className="hidden md:flex items-center absolute inset-0 w-full px-[10%]"
            style={{
              opacity: prefersReducedMotion && activeIndex === index ? 1 : 0,
              transform: prefersReducedMotion ? 'none' : 'translateX(-100px)',
              willChange: 'opacity, transform',
            }}
          >
            <p
              className="text-blueAccent italic font-bold whitespace-pre-line tracking-[-0.04em] leading-[0.85]"
              style={{ fontSize: 'clamp(2.6rem, 5.8vw, 6rem)' }}
            >
              {phrase}
            </p>
          </div>

          {/* === Mobile View === */}
          <div
            ref={(el) => { mobileRefs.current[index] = el; }}
            className="md:hidden flex items-center justify-center absolute inset-0 w-full px-6 text-center"
            style={{
              opacity: prefersReducedMotion && activeIndex === index ? 1 : 0,
              transform: prefersReducedMotion ? 'none' : 'translateY(60px)',
              willChange: 'opacity, transform',
            }}
          >
            <p
              className="text-blueAccent italic font-bold whitespace-pre-line tracking-widest leading-[1.35]"
              style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
            >
              {phrase}
            </p>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
