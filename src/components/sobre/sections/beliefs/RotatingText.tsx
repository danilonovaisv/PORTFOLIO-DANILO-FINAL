import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { PHRASES } from './useBeliefAnimation';

interface RotatingTextProps {
  activePhraseIndex: number;
  phraseProgress: number;
  finalProgress: number;
  prefersReducedMotion?: boolean;
}

const GHOST_EASE = [0.22, 1, 0.36, 1] as const;

const desktopVariants: Variants = {
  enter: { y: -40, opacity: 0 },
  center: {
    y: 0,
    opacity: 1,
    transition: { ease: GHOST_EASE, duration: 0.8 },
  },
  exit: {
    y: -40,
    opacity: 0,
    transition: { ease: 'easeIn', duration: 0.6 },
  },
};

const mobileVariants: Variants = {
  enter: { opacity: 0, scale: 0.95, x: 0 },
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { ease: GHOST_EASE, duration: 0.6 },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { ease: 'easeIn', duration: 0.5 },
  },
};

export function RotatingText({
  activePhraseIndex,
  finalProgress,
}: RotatingTextProps) {
  const activePhrase = PHRASES[activePhraseIndex] ?? PHRASES[0];
  const phraseVisible = finalProgress < 0.04;

  if (!phraseVisible) return null;

  return (
    <>
      {/* Desktop View - Z-index 3 */}
      <div className="hidden md:flex absolute inset-0 z-3 pointer-events-none items-center px-[10%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`desktop-${activePhraseIndex}`}
            variants={desktopVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="text-blueAccent italic font-bold whitespace-pre-line tracking-[-0.04em] leading-[0.85]"
            style={{
              fontSize: 'clamp(2.6rem, 5.8vw, 6rem)',
            }}
          >
            {activePhrase}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile View */}
      <div className="md:hidden absolute inset-x-0 bottom-[22%] z-3 pointer-events-none px-8 text-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-${activePhraseIndex}`}
            variants={mobileVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="text-blueAccent italic font-bold whitespace-pre-line tracking-widest leading-[1.35]"
            style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            }}
          >
            {activePhrase}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
