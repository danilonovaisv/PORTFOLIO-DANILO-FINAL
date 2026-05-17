'use client';

import type { RefObject } from 'react';
import { useScroll, useTransform } from 'motion/react';
import { WHAT_MOVES_ME_PHRASES, BAND } from './what-moves-me.constants';
import { WhatMovesMePhrase } from './WhatMovesMePhrase';

interface BeliefScrollTextProps {
  sectionRef: RefObject<HTMLElement | null>;
}

export function BeliefScrollText({ sectionRef }: BeliefScrollTextProps) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div
      className="sticky top-0 flex h-dvh items-center justify-center"
      style={{ zIndex: 10 }}
    >
      <div
        aria-live="polite"
        className="relative h-full w-full"
        style={{ maxWidth: 'min(90vw, 56rem)' }}
      >
        {WHAT_MOVES_ME_PHRASES.map((phrase, i) => {
          const fadeInStart = i * BAND;
          const fadeInEnd = i * BAND + BAND * 0.22;
          const peakEnd = (i + 1) * BAND - BAND * 0.22;
          const fadeOutEnd = i < WHAT_MOVES_ME_PHRASES.length - 1 ? (i + 1) * BAND : 1.1;

          const opacity = useTransform(
            scrollYProgress,
            [fadeInStart, fadeInEnd, peakEnd, fadeOutEnd],
            [0, 1, 1, 0]
          );
          const y = useTransform(
            scrollYProgress,
            [fadeInStart, fadeInEnd, peakEnd, fadeOutEnd],
            [18, 0, 0, -12]
          );
          const filter = useTransform(
            scrollYProgress,
            [fadeInStart, fadeInEnd, peakEnd, fadeOutEnd],
            ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)']
          );

          return (
            <WhatMovesMePhrase
              key={phrase.id}
              phrase={phrase}
              opacity={opacity}
              y={y}
              filter={filter}
            />
          );
        })}
      </div>
    </div>
  );
}
