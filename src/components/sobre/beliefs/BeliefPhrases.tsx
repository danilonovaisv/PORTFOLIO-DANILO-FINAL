'use client';

import { animate, inView } from 'motion';
import { useEffect, useRef } from 'react';
import { ghostIntensity } from '@/store/beliefStore';

const PHRASES = [
  'Um vídeo que respira.',
  'Uma marca que se reconhece.',
  'Um detalhe que fica.',
  'Crio para gerar presença.',
  'Mesmo quando não estou ali.',
  'Mesmo quando ninguém percebe o esforço.',
];

export function BeliefPhrases() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const lines = containerRef.current.querySelectorAll('.belief-line');
    const isMobile = window.innerWidth <= 767;
    const cleanups: (() => void)[] = [];

    lines.forEach((line, index) => {
      const stop = inView(
        line as HTMLElement,
        (element) => {
          (animate as any)(
            element,
            [
              {
                opacity: isMobile ? 0 : 0.3,
                transform: 'translateX(-100px)',
              },
              {
                opacity: 1,
                transform: 'translateX(0px)',
              },
            ],
            {
              duration: 0.8,
              easing: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }
          );

          (animate as any)(ghostIntensity, (index + 1) / PHRASES.length, {
              duration: 0.6,
              easing: [0.22, 1, 0.36, 1],
            });

          return () => {
            const exitX = isMobile ? 100 : -100;
            (animate as any)(
              element,
              [{ opacity: 0, transform: `translateX(${exitX}px)` }],
              {
                duration: 0.6,
                easing: [0.22, 1, 0.36, 1],
              }
            );
          };
        },
        { margin: '-30% 0px 0px 0px' }
      );

      cleanups.push(stop);
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-20 pointer-events-none px-6 md:px-0"
    >
      <div className="relative h-full">
        {PHRASES.map((phrase, i) => (
          <p
            key={phrase}
            className="belief-line absolute bottom-[20vh] left-1/2 -translate-x-1/2 md:bottom-[10%] md:left-[15%] md:translate-x-0 font-h1 font-bold text-[#4fe6ff] opacity-0"
            style={{ top: `${i * 95}vh` }}
          >
            <span className="md:hidden">{phrase}</span>
            <span className="hidden md:block">
              {phrase.split(' ').map((word, wi) => (
                <span key={`${phrase}-${wi}`} className="block">
                  {word}
                </span>
              ))}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}
