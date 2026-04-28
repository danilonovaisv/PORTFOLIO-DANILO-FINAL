'use client';

import {
  motion,
  useTransform,
  type MotionValue,
  cubicBezier,
} from 'motion/react';
import { GHOST_EASE_AMBIENT } from '@/config/motion';
import { useBeliefStore } from '@/store/beliefStore';

interface Phrase {
  title: string;
  text: string;
}

interface BeliefScrollTextProps {
  scrollProgress: MotionValue<number>;
  phrases: Phrase[];
  prefersReducedMotion: boolean;
}

export function BeliefScrollText({
  scrollProgress,
  phrases,
  prefersReducedMotion,
}: BeliefScrollTextProps) {
  const isMobile = useBeliefStore((s) => s.isMobile);
  const phraseStep = 1 / (phrases.length + 1); // Leaving room for manifesto

  return (
    <div
      className={`absolute inset-0 z-30 flex flex-col pointer-events-none ${
        isMobile
          ? 'items-center justify-start px-6 text-center'
          : 'justify-start left-6 md:left-16 lg:left-24 max-w-[45vw] lg:max-w-[40vw] text-left'
      }`}
      data-testid="beliefs-scroll-text"
    >
      <div
        className="sticky top-0 h-[100vh] w-full flex relative pointer-events-none"
        style={{
          alignItems: isMobile ? 'flex-end' : 'center',
          bottom: isMobile ? '20vh' : undefined,
        }}
      >
        {phrases.map((phrase, i) => {
          const start = i * phraseStep;
          const end = (i + 1) * phraseStep;

          return (
            <PhraseItem
              key={i}
              phrase={phrase}
              isMobile={isMobile}
              scrollProgress={scrollProgress}
              range={[start, end]}
              prefersReducedMotion={prefersReducedMotion}
            />
          );
        })}
      </div>
    </div>
  );
}

function PhraseItem({
  phrase,
  isMobile,
  scrollProgress,
  range,
  prefersReducedMotion,
}: {
  phrase: Phrase;
  isMobile: boolean;
  scrollProgress: MotionValue<number>;
  range: [number, number];
  prefersReducedMotion: boolean;
}) {
  const [start, end] = range;
  const segmentSize = end - start;
  const ghostEase = cubicBezier(...GHOST_EASE_AMBIENT);

  const entryStart = start + 0.05;
  const entryEnd = start + segmentSize * 0.4;
  const exitStart = end - segmentSize * 0.4;
  const exitEnd = end - 0.05;

  const opacity = useTransform(
    scrollProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  const movement = useTransform(
    scrollProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    isMobile
      ? ['40px', '0px', '0px', '100vw']
      : ['40px', '0px', '0px', '-40px'],
    { ease: ghostEase }
  );

  const blurValue = useTransform(
    scrollProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [15, 0, 0, 15]
  );

  const filter = useTransform(blurValue, (v) =>
    prefersReducedMotion ? 'none' : `blur(${v}px)`
  );

  return (
    <motion.div
      className="absolute flex flex-col pointer-events-none"
      style={{
        opacity,
        x: isMobile ? movement : 0,
        y: isMobile ? 0 : movement,
        filter,
        willChange: 'transform, opacity, filter',
      }}
    >
      <span className="text-[#0048ff] font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 md:mb-4 opacity-70">
        {phrase.title}
      </span>
      <span
        className="text-white font-display font-black leading-[0.95] tracking-tighter"
        style={{
          fontSize: isMobile
            ? 'clamp(2.2rem, 9vw, 3.5rem)'
            : 'clamp(3.5rem, 6vw, 8rem)',
        }}
      >
        {phrase.text}
      </span>
    </motion.div>
  );
}
