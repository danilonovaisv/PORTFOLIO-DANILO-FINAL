'use client';

import { useEffect, useState } from 'react';
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
  onActiveIndexChange?: (index: number) => void;
};

export const TextRotator = ({
  reducedMotion = false,
  activeIndex,
  onActiveIndexChange,
}: TextRotatorProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 767);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Configura as animações para cada frase
  useScrollTriggeredAnimation(
    '.belief-line',
    (element) => {
      const el = element as HTMLElement;
      const indexAttr = el.dataset.index ?? '-1';
      const index = Number(indexAttr);

      if (!Number.isNaN(index)) {
        onActiveIndexChange?.(index);
      }

      if (reducedMotion) {
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
        return;
      }

      // Animação de entrada
      animate(
        element,
        { 
          opacity: [isMobile ? 0 : 0.3, 1], 
          x: [-100, 0] 
        },
        {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2
        }
      );
    },
    (element) => {
      if (reducedMotion) return;

      // Animação de saída
      const exitDirection = isMobile ? 100 : -100;
      animate(
        element, 
        { opacity: 0, x: exitDirection }, 
        { 
          duration: 0.6, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        }
      );
    }
  );
  
  return (
    <div className="relative w-full h-full">
      {phrases.map((phrase, index) => (
        <div 
          key={index}
          data-index={index}
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
