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
      className="absolute inset-0 z-30 flex flex-col pointer-events-none items-center justify-start px-6 text-center md:items-start md:left-16 md:max-w-[45vw] md:px-0 md:text-left lg:left-24 lg:max-w-[40vw]"
      data-testid="beliefs-scroll-text"
    >
      <div
        className="absolute inset-0 w-full h-full flex pointer-events-none"
        style={{
          alignItems: isMobile ? 'flex-end' : 'center',
          paddingBottom: isMobile ? '20vh' : undefined,
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

  const isInitialPhrase = start === 0;
  const entryStart = isInitialPhrase ? 0 : start + 0.05;
  const entryEnd = isInitialPhrase
    ? start + segmentSize * 0.3
    : start + segmentSize * 0.4;
  const exitStart = end - segmentSize * 0.25;
  const exitEnd = end;
  const inputRange: [number, number, number, number] = [
    entryStart,
    entryEnd,
    exitStart,
    exitEnd,
  ];
  const opacityRange: [number, number, number, number] = isInitialPhrase
    ? [0.65, 1, 1, 0]
    : [0, 1, 1, 0];
  const movementRange: [string, string, string, string] = isInitialPhrase
    ? isMobile
      ? ['14px', '0px', '0px', '100vw']
      : ['14px', '0px', '0px', '-40px']
    : isMobile
      ? ['40px', '0px', '0px', '100vw']
      : ['40px', '0px', '0px', '-40px'];
  const blurRange: [number, number, number, number] = isInitialPhrase
    ? [6, 0, 0, 15]
    : [15, 0, 0, 15];

  const opacity = useTransform(scrollProgress, inputRange, opacityRange, {
    ease: ghostEase,
  });

  const movement = useTransform(scrollProgress, inputRange, movementRange, {
    ease: ghostEase,
  });

  const blurValue = useTransform(scrollProgress, inputRange, blurRange);

  const filter = useTransform(blurValue, (v) =>
    prefersReducedMotion ? 'none' : `blur(${v}px)`
  );

  return (
    <motion.div
      data-testid="belief-phrase"
      className="belief-phrase absolute flex flex-col pointer-events-none"
      transformTemplate={prefersReducedMotion ? () => 'none' : undefined}
      style={{
        opacity,
        ...(prefersReducedMotion
          ? {}
          : {
              x: isMobile ? movement : 0,
              y: isMobile ? 0 : movement,
            }),
        filter,
        willChange: prefersReducedMotion
          ? 'opacity'
          : 'transform, opacity, filter',
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
