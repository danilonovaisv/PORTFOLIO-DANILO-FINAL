'use client';

import React, { useEffect, useRef } from 'react';
import { inView, animate, type DOMKeyframesDefinition, type AnimationOptions } from 'framer-motion';
import { PHRASES } from './useBeliefAnimation';

/**
 * Animation constants per spec Section 3.4 & 3.5
 */
const ANIMATION_DURATION = 0.9;
const ANIMATION_EASING: [number, number, number, number] = [0.17, 0.55, 0.55, 1];

const ANIM_OPTIONS: AnimationOptions = {
  duration: ANIMATION_DURATION,
  ease: ANIMATION_EASING,
};

interface RotatingTextProps {
  /** Hide phrases when manifesto is showing */
  finalProgress: number;
  prefersReducedMotion?: boolean;
}

/**
 * RotatingText — Layer 3 (z-15)
 *
 * Per spec Section 3.4 & 3.5 (inView + animate pattern):
 *
 * Desktop:
 *   - CSS Initial: opacity: 0, transform: translateX(-100px)
 *   - Enter (inView): animate → opacity: 1, x: [-100, 0]
 *   - Exit (cleanup): animate → opacity: 0, x: -100
 *
 * Mobile:
 *   - CSS Initial: opacity: 0, transform: translateY(60px)
 *   - Enter (inView): animate → opacity: 1, y: [60, 0]
 *   - Exit (cleanup): animate → opacity: 0, x: 100 (exits right)
 *
 * Everything is scroll-triggered via inView detection and fully
 * reversible via cleanup functions. No motion components — pure
 * imperative animate() calls for maximum performance.
 */
export function RotatingText({
  finalProgress,
  prefersReducedMotion,
}: RotatingTextProps) {
  // Hide phrases during manifesto
  if (finalProgress > 0.06) return null;

  return (
    <>
      {PHRASES.map((phrase, index) => (
        <PhraseBlock
          key={index}
          phrase={phrase}
          index={index}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </>
  );
}

/* ────────────────────────────────────────────────────────
   PhraseBlock — Individual phrase with inView + animate
   ──────────────────────────────────────────────────────── */

interface PhraseBlockProps {
  phrase: string;
  index: number;
  prefersReducedMotion?: boolean;
}

/**
 * Each phrase is rendered as a full-height block that occupies
 * the viewport. When it scrolls into view, inView detects it
 * and triggers animate(). When it leaves, the cleanup function
 * reverses the animation. This is the exact pattern from the spec.
 */
function PhraseBlock({ phrase, index, prefersReducedMotion }: PhraseBlockProps) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  // ─── Desktop: x: [-100, 0] enter, x: -100 exit ───
  useEffect(() => {
    if (!desktopRef.current || prefersReducedMotion) return;

    const element = desktopRef.current;

    // CSS initial state (critical for inView + animate pattern)
    element.style.opacity = '0';
    element.style.transform = 'translateX(-100px)';

    // inView callback: (element: Element, entry: IntersectionObserverEntry) => cleanup
    const unsubscribe = inView(
      element,
      (el) => {
        // Animate entry: slide from left
        animate(
          el,
          { opacity: 1, x: [-100, 0] } as DOMKeyframesDefinition,
          ANIM_OPTIONS
        );

        // Cleanup: reverse when element leaves viewport
        return () => {
          animate(
            el,
            { opacity: 0, x: -100 } as DOMKeyframesDefinition,
            ANIM_OPTIONS
          );
        };
      },
      {
        amount: 0.5, // 50% visible threshold
        margin: '0px 0px -20% 0px', // Adjust activation zone
      }
    );

    return () => unsubscribe();
  }, [prefersReducedMotion]);

  // ─── Mobile: y: [60, 0] enter, x: 100 exit (right) ───
  useEffect(() => {
    if (!mobileRef.current || prefersReducedMotion) return;

    const element = mobileRef.current;

    // CSS initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(60px)';

    const unsubscribe = inView(
      element,
      (el) => {
        // Animate entry: slide from bottom
        animate(
          el,
          { opacity: 1, y: [60, 0] } as DOMKeyframesDefinition,
          ANIM_OPTIONS
        );

        // Cleanup: exit to the right
        return () => {
          animate(
            el,
            { opacity: 0, x: 100 } as DOMKeyframesDefinition,
            ANIM_OPTIONS
          );
        };
      },
      {
        amount: 0.5,
        margin: '0px 0px -20% 0px',
      }
    );

    return () => unsubscribe();
  }, [prefersReducedMotion]);

  return (
    <>
      {/* === Desktop View === */}
      {/* Per spec: text on the left side, aligned with padding */}
      <div
        ref={desktopRef}
        className="hidden md:flex items-center min-h-screen w-full px-[10%] z-15 pointer-events-none"
        aria-hidden={prefersReducedMotion ? undefined : 'true'}
      >
        <p
          className="text-blueAccent italic font-bold whitespace-pre-line tracking-[-0.04em] leading-[0.85]"
          style={{ fontSize: 'clamp(2.6rem, 5.8vw, 6rem)' }}
        >
          {phrase}
        </p>
      </div>

      {/* === Mobile View === */}
      {/* Per spec: text centered, 20% from footer */}
      <div
        ref={mobileRef}
        className="md:hidden flex items-center justify-center min-h-screen w-full px-6 z-15 pointer-events-none text-center"
        style={{ position: 'relative', paddingBottom: '20%' }}
      >
        <p
          className="text-blueAccent italic font-bold whitespace-pre-line tracking-widest leading-[1.35]"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
        >
          {phrase}
        </p>
      </div>
    </>
  );
}
