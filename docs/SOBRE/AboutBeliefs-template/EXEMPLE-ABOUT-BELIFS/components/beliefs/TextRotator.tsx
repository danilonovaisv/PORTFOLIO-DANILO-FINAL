'use client';

import { useRef, useState, useEffect } from 'react';
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

export const TextRotator = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 767 : false;
  
  // Referências para cada frase
  const phraseRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Configura as animações para cada frase
  useScrollTriggeredAnimation('.belief-line', (element) => {
    const index = Array.from(phraseRefs.current).indexOf(element as HTMLDivElement);
    setCurrentSection(index);
    
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
  }, (element) => {
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
  });
  
  return (
    <div className="relative w-full h-full">
      {phrases.map((phrase, index) => (
        <div 
          key={index}
          ref={(el) => {
            phraseRefs.current[index] = el;
          }}
          className={`
            belief-line absolute w-full 
            font-h1 text-[#4fe6ff] font-bold 
            transition-all duration-300
            ${isMobile ? 'text-center' : 'text-left'}
          `}
          style={isMobile ? {
            bottom: '20vh',
            fontSize: '36px',
            width: '90%',
            left: '5%',
            opacity: 0,
            transform: 'translateX(-100px)'
          } : {
            left: '15%',
            bottom: '10%',
            fontSize: '48px',
            maxWidth: '600px',
            opacity: 0,
            transform: 'translateX(-100px)'
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
