'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { animate } from 'motion';
import { useScrollTriggeredAnimation } from '@/lib/motion';

const phrases = [
  "Um vídeo que respira.",
  "Uma marca que se reconhece.",
  "Um detalhe que fica.",
  "Crio para gerar presença.",
  "Mesmo quando não estou ali.",
  "Mesmo quando ninguém percebe o esforço."
];

type TextRotatorProps = {
  reducedMotion?: boolean;
  activeIndex: number;
  onActiveIndexChange?: (_index: number) => void;
};

export const TextRotator = ({
  reducedMotion = false,
  activeIndex,
  onActiveIndexChange,
}: TextRotatorProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const phraseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 767);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const animateIn = useCallback(
    (index: number) => {
      const line = phraseRefs.current[index];
      if (!line) return;

      if (reducedMotion) {
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
        return;
      }

      animate(
        line,
        {
          opacity: [isMobile ? 0 : 0.3, 1],
          x: [-100, 0],
        },
        {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2,
        }
      );
    },
    [isMobile, reducedMotion]
  );

  const animateOut = useCallback(
    (index: number) => {
      const line = phraseRefs.current[index];
      if (!line || reducedMotion) return;

      const exitDirection = isMobile ? 100 : -100;
      animate(
        line,
        { opacity: 0, x: exitDirection },
        {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      );
    },
    [isMobile, reducedMotion]
  );

  useScrollTriggeredAnimation(
    '.belief-sentinel',
    (element) => {
      const el = element as HTMLElement;
      const indexAttr = el.dataset.index ?? '-1';
      const index = Number(indexAttr);

      if (Number.isNaN(index)) return;

      onActiveIndexChange?.(index);
      animateIn(index);
    },
    (element) => {
      const el = element as HTMLElement;
      const indexAttr = el.dataset.index ?? '-1';
      const index = Number(indexAttr);

      if (Number.isNaN(index)) return;

      animateOut(index);
    }
  );
  
  return (
    <div className="relative w-full h-full">
      {phrases.map((phrase, index) => (
        <div 
          key={index}
          data-index={index}
          data-testid={`belief-line-${index}`}
          className={`
            belief-line absolute w-full z-20
            font-h1 text-[#4fe6ff] font-bold 
            ${isMobile ? 'text-center' : 'text-left'}
          `}
          style={isMobile ? {
            bottom: '20vh',
            fontSize: '36px',
            width: '90%',
            left: '5%',
            opacity: reducedMotion ? (index === activeIndex ? 1 : 0) : 0,
            transform: reducedMotion ? 'translateX(0)' : 'translateX(-100px)'
          } : {
            left: '15%',
            bottom: '10%',
            fontSize: '48px',
            maxWidth: '600px',
            opacity: reducedMotion ? (index === activeIndex ? 1 : 0) : 0,
            transform: reducedMotion ? 'translateX(0)' : 'translateX(-100px)'
          }}
          ref={(el) => {
            phraseRefs.current[index] = el;
          }}
        >
          {isMobile 
            ? phrase 
            : phrase.split(' ').map((word, i) => (
              <span key={i}>
                {word}
                {i < phrase.split(' ').length - 1 && <br />}
              </span>
            ))
          }
        </div>
      ))}
    </div>
  );
};
