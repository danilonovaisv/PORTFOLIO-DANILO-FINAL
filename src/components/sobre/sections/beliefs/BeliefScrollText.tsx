'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';
import { useBeliefStore } from '@/store/beliefStore';
import { GHOST_EASE_AMBIENT } from '@/config/motion';

interface Phrase {
  title: string;
  text: string;
}

interface BeliefScrollTextProps {
  phrases: Phrase[];
  scrollProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
}

/**
 * BeliefScrollText — Ghost Era v3.x
 * Refactored to eliminate IntersectionObserver lag.
 * Uses a pure motion pipeline synchronized with the main scroll timeline.
 */
export function BeliefScrollText({
  phrases,
  scrollProgress,
  prefersReducedMotion,
}: BeliefScrollTextProps) {
  const isMobile = useBeliefStore((s) => s.isMobile);

  return (
    <div
      className="absolute inset-0 z-30 pointer-events-none"
      data-testid="beliefs-scroll-text"
    >
      <div className="std-grid w-full h-full relative">
        {phrases.map((phrase, i) => (
          <PhraseItem
            key={i}
            index={i}
            phrase={phrase}
            isMobile={isMobile}
            scrollProgress={scrollProgress}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </div>
  );
}

function PhraseItem({
  index,
  phrase,
  isMobile,
  scrollProgress,
  prefersReducedMotion,
}: {
  index: number;
  phrase: Phrase;
  isMobile: boolean;
  scrollProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
}) {
  // Range calculation: 6 phrases mapped over 0.0 to 0.8 of total scroll
  // This leaves 0.8-1.0 for the Manifesto climax.
  const segment = 0.8 / 6;
  const start = index * segment;
  const middle = (index + 0.5) * segment;
  const end = (index + 1) * segment;

  // Use standard Ghost Easing for the mapping
  const opacity = useTransform(
    scrollProgress,
    [start, middle - segment * 0.2, middle + segment * 0.2, end],
    [0, 1, 1, 0],
    { ease: (v) => v } // Linear mapping, easing is handled by the scroll itself + Ghost ease constants if needed
  );

  const yMobileValues = prefersReducedMotion
    ? ['0px', '0px', '0px', '0px']
    : ['18px', '0px', '0px', '-18px'];
  const yDesktopValues = prefersReducedMotion
    ? ['-50%', '-50%', '-50%', '-50%']
    : [
        'calc(-50% + 18px)',
        'calc(-50% + 0px)',
        'calc(-50% + 0px)',
        'calc(-50% - 18px)',
      ];

  const yMobile = useTransform(
    scrollProgress,
    [start, middle - segment * 0.2, middle + segment * 0.2, end],
    yMobileValues
  );

  const yDesktop = useTransform(
    scrollProgress,
    [start, middle - segment * 0.2, middle + segment * 0.2, end],
    yDesktopValues
  );

  const filterValues = prefersReducedMotion
    ? ['blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(0px)']
    : ['blur(6px)', 'blur(0px)', 'blur(0px)', 'blur(6px)'];

  const filter = useTransform(
    scrollProgress,
    [start, middle - segment * 0.2, middle + segment * 0.2, end],
    filterValues
  );

  return (
    <motion.div
      data-testid="belief-phrase"
      data-animation-contract="viewport-x-opacity"
      className="belief-phrase absolute flex flex-col pointer-events-none w-full md:w-auto text-center md:text-left left-0 md:left-0 lg:left-8 px-6 md:px-0 bottom-[15vh] md:bottom-auto md:top-1/2 md:-translate-y-1/2 max-w-[100vw] md:max-w-[45vw] lg:max-w-[40vw]"
      style={{
        opacity,
        y: isMobile ? yMobile : yDesktop,
        filter,
        willChange: 'transform, opacity, filter',
      }}
    >
      <span className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-blueAccent/70 md:mb-4 md:text-xs">
        {phrase.title}
      </span>
      <span
        className="font-display font-semibold italic leading-[1.15] text-blueAccent drop-shadow-[0_4px_20px_rgba(79,230,255,0.25)]"
        style={{
          fontSize: isMobile
            ? 'clamp(1.375rem, 6vw, 1.625rem)'
            : 'clamp(2rem, 2.4vw, 2.375rem)',
        }}
      >
        {phrase.text}
      </span>
    </motion.div>
  );
}
