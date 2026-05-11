'use client';

import { m, useTransform } from 'framer-motion';
import {
  BELIEF_PHRASES,
  BELIEF_SCROLL_THRESHOLDS,
  beliefLayers,
} from './belief.constants';
import { useBeliefsScrollContext } from './BeliefsScrollContext';
import { MOTION_TOKENS } from '@/config/motion';

function ScrollWord({
  word,
  phraseIndex,
  wordIndex,
  totalWords,
}: {
  word: string;
  phraseIndex: number;
  wordIndex: number;
  totalWords: number;
}) {
  const { scrollYProgress, prefersReducedMotion } = useBeliefsScrollContext();

  const start = BELIEF_SCROLL_THRESHOLDS.phrasesStart;
  const end = BELIEF_SCROLL_THRESHOLDS.phrasesEnd;
  const step = (end - start) / BELIEF_PHRASES.length;

  const phraseStart = start + phraseIndex * step;
  const phraseEnd = phraseStart + step;
  const revealDuration = step * 0.4;
  const exitDuration = step * 0.4;

  const staggerFactor = step * 0.15;
  const wordStartDelay =
    (staggerFactor * wordIndex) / Math.max(1, totalWords - 1);
  const wordOutDelay =
    (staggerFactor * wordIndex) / Math.max(1, totalWords - 1);

  const inStart = phraseStart + wordStartDelay;
  const inEnd = inStart + revealDuration;

  const outStart = phraseEnd - exitDuration + wordOutDelay;
  const outEnd = outStart + exitDuration;

  const opacity = useTransform(
    scrollYProgress,
    [0, inStart, inEnd, outStart, outEnd, 1],
    [0, 0, 1, 1, 0, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0, inStart, inEnd, outStart, outEnd, 1],
    [
      MOTION_TOKENS.offset.standard,
      MOTION_TOKENS.offset.standard,
      0,
      0,
      -MOTION_TOKENS.offset.standard,
      -MOTION_TOKENS.offset.standard,
    ]
  );

  const filter = useTransform(
    scrollYProgress,
    [0, inStart, inEnd, outStart, outEnd, 1],
    [
      'blur(12px)',
      'blur(12px)',
      'blur(0px)',
      'blur(0px)',
      'blur(12px)',
      'blur(12px)',
    ]
  );

  return (
    <m.span
      className="inline-block will-change-[transform,opacity,filter]"
      style={prefersReducedMotion ? { opacity: 0.9 } : { opacity, y, filter }}
    >
      {word}&nbsp;
    </m.span>
  );
}

export function BeliefScrollText() {
  return (
    <div
      data-testid="beliefs-scroll-text"
      className="pointer-events-none absolute inset-0 flex flex-col justify-end pb-[15vh] md:justify-center md:pb-0"
      style={{ zIndex: beliefLayers.phrases }}
    >
      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-12 lg:px-16">
        <div className="flex flex-row items-center gap-4 md:block">
          {/* Mobile spacer for Ghost (Ghost is on the left) */}
          <div className="w-[35%] shrink-0 md:hidden" aria-hidden="true" />

          <div className="relative h-[6em] md:h-[2.5em] flex-1">
            {BELIEF_PHRASES.map((phrase, i) => {
              const words = phrase.split(' ');
              return (
                <h3
                  key={i}
                  aria-label={phrase}
                  data-testid="belief-phrase"
                  data-animation-contract="inview-y-opacity-blur"
                  className="absolute inset-x-0 bottom-0 md:top-1/2 md:-translate-y-1/2 font-medium leading-[1.1] text-white/90"
                  style={{
                    fontSize: 'clamp(2.5rem, 10vw, 5.5rem)',
                  }}
                >
                  <span aria-hidden="true">
                    {words.map((word, wordIndex) => (
                      <ScrollWord
                        key={wordIndex}
                        word={word}
                        phraseIndex={i}
                        wordIndex={wordIndex}
                        totalWords={words.length}
                      />
                    ))}
                  </span>
                </h3>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
