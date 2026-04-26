'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';
import { MOTION_TOKENS } from '@/config/motion';

const PHRASES = [
  'Um vídeo que respira',
  'Uma marca que se reconhece',
  'Um detalhe que fica',
  'Crio para gerar presença',
  'Mesmo quando não estou ali',
  'Mesmo quando ninguém percebe o esforço',
] as const;

interface BeliefScrollTextProps {
  scrollProgress: MotionValue<number>;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

export function BeliefScrollText({
  scrollProgress,
  isMobile,
  prefersReducedMotion,
}: BeliefScrollTextProps) {
  // Each phrase occupies an equal slice of the scroll progress (0 to 1)
  const phraseStep = 1 / PHRASES.length;

  return (
    <div
      className={`absolute inset-0 z-40 flex flex-col pointer-events-none ${
        isMobile
          ? 'items-center justify-start px-6'
          : 'justify-start left-6 md:left-16 lg:left-24 max-w-[38vw] lg:max-w-[34vw]'
      }`}
      data-testid="beliefs-scroll-text"
      aria-label={PHRASES.join(' ')}
      style={{ textAlign: isMobile ? 'center' : 'left' }}
    >
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {PHRASES.join(' ')}
      </p>

      <div
        className="sticky top-0 h-[100vh] w-full flex relative pointer-events-none"
        style={{
          alignItems: isMobile ? 'flex-end' : 'center',
          paddingBottom: isMobile ? '20vh' : undefined,
        }}
      >
        {PHRASES.map((phrase, i) => {
          const start = i * phraseStep;
          const end = (i + 1) * phraseStep;

          return (
            <PhraseItem
              key={phrase}
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
  phrase: string;
  isMobile: boolean;
  scrollProgress: MotionValue<number>;
  range: [number, number];
  prefersReducedMotion: boolean;
}) {
  const [start, end] = range;
  const fadeIn = start + 0.02;
  const fadeOut = end - 0.02;

  // Derive opacity from MotionValue — no re-renders, pure GPU-driven
  const opacity = useTransform(
    scrollProgress,
    [start, fadeIn, fadeOut, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollProgress,
    [start, fadeIn],
    prefersReducedMotion ? [0, 0] : [20, 0]
  );

  return (
    <motion.span
      className="belief-phrase absolute italic font-h1 font-bold text-[#4fe6ff] pointer-events-none"
      style={{
        fontSize: isMobile
          ? 'clamp(2rem, 8vw, 3rem)'
          : 'clamp(2.8rem, 5.8vw, 6.3rem)',
        textAlign: isMobile ? 'center' : 'left',
        opacity,
        y,
      }}
    >
      {phrase}
    </motion.span>
  );
}
