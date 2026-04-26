'use client';

import { useBeliefStore } from '@/store/beliefStore';

const PHRASES = [
  'Um vídeo que respira',
  'Uma marca que se reconhece',
  'Um detalhe que fica',
  'Crio para gerar presença',
  'Mesmo quando não estou ali',
  'Mesmo quando ninguém percebe o esforço',
] as const;

interface BeliefScrollTextProps {
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

export function BeliefScrollText({
  isMobile,
  prefersReducedMotion,
}: BeliefScrollTextProps) {
  const scrollProgress = useBeliefStore((s) => s.scrollProgress);
  const activeIndex = Math.min(
    PHRASES.length - 1,
    Math.max(0, Math.floor(scrollProgress * PHRASES.length))
  );

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

      {/* SINGLE Sticky Container - evita stack de multiplos stickies */}
      <div
        className="sticky top-0 h-[100vh] w-full flex relative pointer-events-none"
        style={{
          alignItems: isMobile ? 'flex-end' : 'center',
          paddingBottom: isMobile ? '20vh' : undefined,
        }}
      >
        {PHRASES.map((phrase, i) => (
          <span
            key={phrase}
            data-index={i}
            className="belief-phrase absolute italic font-h1 font-bold text-[#4fe6ff] pointer-events-auto"
            style={{
              fontSize: isMobile
                ? 'clamp(2rem, 8vw, 3rem)'
                : 'clamp(2.8rem, 5.8vw, 6.3rem)',
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            <span
              className="block"
              style={{
                opacity: prefersReducedMotion ? 1 : 0,
                transform: prefersReducedMotion ? 'none' : 'translateY(30px)',
                filter: 'none',
                ...(prefersReducedMotion || activeIndex === i
                  ? { opacity: 1, transform: 'none' }
                  : {}),
                transition:
                  'opacity 500ms ease-out, transform 500ms ease-out',
              }}
            >
              {phrase}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
