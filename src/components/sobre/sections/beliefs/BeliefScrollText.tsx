'use client';

import {
  motion,
  useTransform,
  type MotionValue,
  cubicBezier,
} from 'motion/react';
import { GHOST_EASE } from '@/config/motion';
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
  const ghostEase = cubicBezier(...GHOST_EASE);

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
  const opacityRange: [number, number, number, number] = [0, 1, 1, 0];
  const movementRange: [string, string, string, string] = isMobile
    ? ['24px', '0px', '0px', '-24px']
    : ['20px', '0px', '0px', '-20px'];
  const blurRange: [number, number, number, number] = [10, 0, 0, 10];

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
