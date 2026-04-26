'use client';

import { useEffect } from 'react';
import { inView, animate } from 'motion/react';

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
  useEffect(() => {
    if (prefersReducedMotion) return;

    // Dispara animação de entrada e guarda o cleanup de saída
    const controls = inView('.scroll-section', (element) => {
      const index = element.getAttribute('data-index');
      const textEl = document.querySelector(`.belief-phrase[data-index="${index}"]`);
      
      // bg alternado por exemplo, ou pode ler de um data-bg
      const bgColor = Number(index) % 2 === 0 ? '#0048ff' : '#040013';

      if (!textEl) return;

      // Animação de entrada
      animate(textEl, { opacity: 1, y: 0 }, { duration: 0.5, ease: "easeOut" });
      animate('.beliefs-bg', { backgroundColor: bgColor }, { duration: 0.6 });

      // Retorna função cleanup para saída
      return () => {
        animate(textEl, { opacity: 0, y: -30 }, { duration: 0.4, ease: "easeIn" });
      };
    }, { amount: 0.5 }); // Dispara no meio do scroll trigger

    return () => controls(); // cleanup total
  }, [prefersReducedMotion]);

  return (
    <div
      className={`absolute inset-0 z-40 flex flex-col pointer-events-none ${
        isMobile ? 'items-center justify-start px-6' : 'justify-start left-6 md:left-16 lg:left-24 max-w-[38vw] lg:max-w-[34vw]'
      }`}
      data-testid="beliefs-scroll-text"
      aria-label={PHRASES.join(' ')}
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
            className={`belief-phrase absolute italic font-h1 font-bold text-[#4fe6ff] pointer-events-auto`}
            style={{
              opacity: prefersReducedMotion ? 1 : 0,
              transform: prefersReducedMotion ? 'none' : 'translateY(30px)',
              fontSize: isMobile
                ? 'clamp(2rem, 8vw, 3rem)'
                : 'clamp(2.8rem, 5.8vw, 6.3rem)',
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            {phrase}
          </span>
        ))}
      </div>
    </div>
  );
}
