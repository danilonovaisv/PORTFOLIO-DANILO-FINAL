'use client';

import { m } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { useEffect, useState } from 'react';
import type { WhatMovesMePhrase as PhraseData } from './what-moves-me.constants';

interface WhatMovesMePhraseProps {
  phrase: PhraseData;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  filter: MotionValue<string>;
}

export function WhatMovesMePhrase({
  phrase,
  opacity,
  y,
  filter,
}: WhatMovesMePhraseProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const lines = phrase.text.split('\n');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () =>
      setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return (
    <m.div
      data-testid="belief-phrase"
      data-what-moves-me-phrase
      data-phrase-id={phrase.id}
      aria-label={phrase.text.replace(/\n/g, ' ')}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        y: prefersReducedMotion ? 0 : y,
        filter: prefersReducedMotion ? 'none' : filter,
        willChange: 'transform',
      }}
    >
      <p
        aria-hidden="true"
        style={{
          color: '#fcffff',
          textAlign: 'center',
          fontFamily: 'inherit',
          lineHeight: phrase.emphasis ? 0.92 : 0.98,
          letterSpacing: phrase.emphasis ? '-0.04em' : '-0.035em',
          fontWeight: 500,
          fontStyle: 'italic',
          userSelect: 'none',
          fontSize: phrase.emphasis
            ? 'clamp(3.5rem, 14vw, 10rem)'
            : 'clamp(2rem, 6vw, 4.5rem)',
        }}
      >
        {lines.map((line, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              display: 'block',
              color:
                phrase.emphasis && line === 'GHOST' ? '#0048ff' : '#fcffff',
            }}
          >
            {line}
          </span>
        ))}
      </p>
    </m.div>
  );
}
