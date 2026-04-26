'use client';

import { animate, useMotionValueEvent, type MotionValue } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
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
  const ref = useRef<HTMLDivElement>(null);
  const copyRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [activePhrase, setActivePhrase] = useState<string>(PHRASES[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollProgress, 'change', (value) => {
    const nextIndex = Math.min(
      PHRASES.length - 1,
      Math.max(0, Math.floor(value * PHRASES.length))
    );
    setActiveIndex(nextIndex);
    setActivePhrase(PHRASES[nextIndex]);
  });

  useEffect(() => {
    copyRefs.current.forEach((copy, index) => {
      if (!copy) return;

      if (prefersReducedMotion) {
        animate(
          copy,
          { opacity: 1, y: 0, filter: 'blur(0px)' },
          { duration: 0 }
        );
        return;
      }

      const isActive = index === activeIndex;
      animate(
        copy,
        {
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : -MOTION_TOKENS.distance.textY,
          filter: isActive ? 'blur(0px)' : 'blur(6px)',
        },
        {
          duration: isActive
            ? MOTION_TOKENS.duration.textIn
            : MOTION_TOKENS.duration.textOut,
          ease: MOTION_TOKENS.ease.ambient,
        }
      );
    });
  }, [activeIndex, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 z-40 flex flex-col pointer-events-none text-center md:text-left ${
        isMobile
          ? 'items-center justify-start px-6'
          : 'justify-start left-6 md:left-16 lg:left-24 max-w-[38vw] lg:max-w-[34vw]'
      }`}
      data-testid="beliefs-scroll-text"
      aria-label={PHRASES.join(' ')}
    >
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {activePhrase}
      </p>

      {PHRASES.map((phrase, i) => (
        <section
          key={phrase}
          data-index={i}
          className={`belief-phrase ${
            isMobile ? 'h-[40vh]' : 'h-[80vh]'
          } flex items-center italic font-h1 font-bold text-[#4fe6ff]`}
          style={{
            fontSize: isMobile
              ? 'clamp(2rem, 8vw, 3rem)'
              : 'clamp(2.8rem, 5.8vw, 6.3rem)',
            paddingBottom: isMobile ? '20vh' : undefined,
            alignItems: isMobile ? 'flex-end' : 'center',
          }}
        >
          <span
            ref={(node) => {
              copyRefs.current[i] = node;
            }}
            className="belief-copy"
            style={{
              opacity: prefersReducedMotion ? 1 : 0,
              transform: prefersReducedMotion
                ? 'none'
                : `translateY(${MOTION_TOKENS.distance.textY}px)`,
              filter: prefersReducedMotion ? 'none' : 'blur(6px)',
              willChange: prefersReducedMotion
                ? undefined
                : 'transform, opacity, filter',
            }}
          >
            {phrase}
          </span>
        </section>
      ))}
    </div>
  );
}
