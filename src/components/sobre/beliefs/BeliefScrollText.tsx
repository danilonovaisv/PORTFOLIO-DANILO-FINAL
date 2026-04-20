'use client';

import { AnimatePresence, motion, type MotionValue } from 'motion/react';
import { useEffect, useState } from 'react';
import { SplitText } from '@/lib/motion/split-text';

import { useBeliefsScrollContext } from './BeliefsScrollContext';

const ENTER_START = 0.06;
const EXIT_END = 0.72;

export const BeliefScrollText = ({ phrases }: { phrases: string[] }) => {
  const {
    scrollYProgress: scrollProgress,
    isMobile = false,
    prefersReducedMotion = false,
  } = useBeliefsScrollContext();
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
        className="relative hidden w-full items-center px-6 pointer-events-none md:flex md:px-16"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="w-full max-w-[30vw] lg:max-w-[26vw]">
          <AnimatePresence mode="wait">
            {activePhrase ? (
              <motion.p
                key={`desktop-${activeIndex}`}
                data-testid={`belief-line-${activeIndex}`}
                className="font-h1 font-bold text-[#4fe6ff] leading-[1.05]"
                style={{ fontSize: 'clamp(2.8rem, 5.8vw, 6.3rem)' }}
                initial={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, y: 20, filter: 'blur(10px)' }
                }
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 1, y: 0, filter: 'blur(0px)' }
                }
                exit={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, y: -20, filter: 'blur(10px)' }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                }
              >
                <SplitText text={activePhrase} mode="words" className="block" />
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
      className="relative flex h-[80vh] w-full items-end justify-center px-6 pb-[20vh] pointer-events-none md:hidden"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        {activePhrase ? (
          <motion.p
            key={`mobile-${activeIndex}`}
            data-testid={`belief-line-${activeIndex}`}
            initial={
              prefersReducedMotion
                ? undefined
                : { opacity: 0, x: -24, filter: 'blur(6px)' }
            }
            animate={
              prefersReducedMotion
                ? undefined
                : { opacity: 1, x: 0, filter: 'blur(0px)' }
            }
            exit={
              prefersReducedMotion
                ? undefined
                : { opacity: 0, x: 24, filter: 'blur(6px)' }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }
            className="font-h1 font-bold text-[#4fe6ff] text-center leading-tight"
            style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}
          >
            <SplitText text={activePhrase} mode="words" className="block" />
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
