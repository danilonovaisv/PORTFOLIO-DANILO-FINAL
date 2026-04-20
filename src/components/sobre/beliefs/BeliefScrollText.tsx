'use client';

import {
  AnimatePresence,
  motion,
  type MotionValue,
} from 'motion/react';
import { useEffect, useState } from 'react';

interface BeliefScrollTextProps {
  phrases: string[];
  scrollProgress: MotionValue<number>;
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
}

const ENTER_START = 0.16;
const EXIT_END = 0.94;

/**
 * Scroll-driven phrase layer for Section 06.
 *
 * Desktop: AnimatePresence mode="wait" — one phrase at a time (compatible with
 * Playwright spec that checks toHaveCount(0) for inactive phrases).
 *
 * Mobile: AnimatePresence mode="wait" with horizontal slide + blur.
 *
 * Both modes use scroll-driven activeIndex via scrollProgress.on('change').
 */
export const BeliefScrollText = ({
  phrases,
  scrollProgress,
  isMobile = false,
  prefersReducedMotion = false,
}: BeliefScrollTextProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    const unsub = scrollProgress.on('change', (v) => {
      if (v < ENTER_START) {
        setActiveIndex(-1);
        return;
      }
      if (v > EXIT_END) {
        setActiveIndex(phrases.length);
        return;
      }
      const seg = (v - ENTER_START) / (EXIT_END - ENTER_START);
      setActiveIndex(
        Math.min(phrases.length - 1, Math.floor(seg * phrases.length))
      );
    });
    return () => unsub();
  }, [scrollProgress, phrases.length]);

  const activePhrase =
    activeIndex >= 0 && activeIndex < phrases.length
      ? phrases[activeIndex]
      : null;

  // Desktop: one phrase at a time via AnimatePresence (Playwright expects toHaveCount(0) for inactive)
  if (!isMobile) {
    return (
      <div
        data-testid="belief-text-layer-desktop"
        className="relative w-full px-6 md:px-16 flex items-center pointer-events-none"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="w-full max-w-[38vw] lg:max-w-[34vw]">
          <AnimatePresence mode="wait">
            {activePhrase ? (
              <motion.p
                key={`desktop-${activeIndex}`}
                data-testid={`belief-line-${activeIndex}`}
                className="font-h1 font-bold text-[#4fe6ff] leading-[1.05]"
                style={{ fontSize: 'clamp(2.8rem, 5.8vw, 6.3rem)' }}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={prefersReducedMotion ? undefined : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {activePhrase}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Mobile: one phrase at a time via AnimatePresence with horizontal slide + blur
  return (
    <div
      data-testid="belief-text-layer-mobile"
      className="relative w-full h-[80vh] flex items-end justify-center pb-[20vh] px-6 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        {activePhrase ? (
          <motion.p
            key={`mobile-${activeIndex}`}
            data-testid={`belief-line-${activeIndex}`}
            initial={{ opacity: 0, x: -24, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 24, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-h1 font-bold text-[#4fe6ff] text-center leading-tight"
            style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}
          >
            {activePhrase}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
