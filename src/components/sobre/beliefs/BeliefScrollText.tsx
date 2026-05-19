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
      data-testid="beliefs-scroll-text"
      className="sticky top-0 flex h-dvh items-center justify-center"
      style={{ zIndex: 10 }}
    >
      <div
        data-testid="beliefs-phrase-stage"
        aria-live="polite"
        className="relative h-full w-full"
        style={{ maxWidth: 'min(90vw, 56rem)' }}
      >
        {WHAT_MOVES_ME_PHRASES.map((phrase, i) => {
          const isLast = i === WHAT_MOVES_ME_PHRASES.length - 1;
          const fadeInStart = i * BAND;
          const fadeInEnd = i * BAND + BAND * 0.22;
          const peakEnd = (i + 1) * BAND - BAND * 0.22;
          const fadeOutEnd = isLast ? 1 : (i + 1) * BAND;

          const opacity = useTransform(
            scrollYProgress,
            [fadeInStart, fadeInEnd, peakEnd, fadeOutEnd],
            isLast ? [0, 1, 1, 1] : [0, 1, 1, 0]
          );
          const y = useTransform(
            scrollYProgress,
            [fadeInStart, fadeInEnd, peakEnd, fadeOutEnd],
            isLast ? [18, 0, 0, 0] : [18, 0, 0, -12]
          );
          const filter = useTransform(
            scrollYProgress,
            [fadeInStart, fadeInEnd, peakEnd, fadeOutEnd],
            isLast
              ? ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(0px)']
              : ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)']
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
