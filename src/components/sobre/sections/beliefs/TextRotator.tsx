'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { animate } from 'motion';

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
};

export const TextRotator = ({
  reducedMotion = false,
  activeIndex,
}: TextRotatorProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const phraseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const previousIndexRef = useRef(activeIndex);
  const controlsRef = useRef<{ stop?: () => void }[]>([]);
  const GHOST_EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 767);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const stopAnimations = () => {
    controlsRef.current.forEach((control) => control?.stop?.());
    controlsRef.current = [];
  };

  const setLineHidden = (line: HTMLDivElement) => {
    line.style.opacity = '0';
    line.style.transform = 'translate3d(0px, 18px, 0)';
  };

  const updateActiveLine = useCallback(() => {
    stopAnimations();

    const previousIndex = previousIndexRef.current;
    const isFirstRender = previousIndex === activeIndex;

    phraseRefs.current.forEach((line, index) => {
      if (!line) return;

      if (reducedMotion) {
        line.style.opacity = index === activeIndex ? '1' : '0';
        line.style.transform = 'translate3d(0px, 0, 0)';
        return;
      }

      if (index !== activeIndex && index !== previousIndex) {
        setLineHidden(line);
      }
    });

    const activeLine = phraseRefs.current[activeIndex];
    if (!activeLine) return;

    if (reducedMotion || isFirstRender) {
      activeLine.style.opacity = '1';
      activeLine.style.transform = 'translate3d(0px, 0, 0)';
      previousIndexRef.current = activeIndex;
      return;
    }

    const previousLine = phraseRefs.current[previousIndex] ?? null;
    activeLine.style.opacity = '0';
    activeLine.style.transform = 'translate3d(0px, 18px, 0)';

    if (previousLine) {
      controlsRef.current.push(
        animate(previousLine, { opacity: 0, y: -18 }, {
          duration: 0.34,
          ease: GHOST_EASING,
        })
      );
    }

    controlsRef.current.push(
      animate(activeLine, { opacity: 1, y: 0 }, {
        duration: 0.54,
        ease: GHOST_EASING,
        delay: 0.05,
      })
    );

    previousIndexRef.current = activeIndex;
  }, [activeIndex, reducedMotion]);

  useEffect(() => {
    updateActiveLine();
  }, [updateActiveLine]);

  useEffect(() => {
    return () => stopAnimations();
  }, []);

  return (
    <div className="relative w-full h-full pointer-events-none">
      {phrases.map((phrase, index) => (
        <div 
          key={phrase}
          data-index={index}
          data-testid={`belief-line-${index}`}
          className={`
            belief-line absolute w-full z-20
            font-h1 text-[#4fe6ff] font-bold 
            ${isMobile ? 'text-center' : 'text-left'}
          `}
          style={isMobile ? {
            bottom: '12vh',
            fontSize: '36px',
            width: '86%',
            left: '7%',
            opacity: reducedMotion ? (index === activeIndex ? 1 : 0) : 0,
            transform: reducedMotion
              ? 'translate3d(0px, 0, 0)'
              : `translate3d(0px, ${index === activeIndex ? 0 : 18}px, 0)`
          } : {
            left: '15%',
            bottom: '33%',
            fontSize: '48px',
            maxWidth: '600px',
            opacity: reducedMotion ? (index === activeIndex ? 1 : 0) : 0,
            transform: reducedMotion
              ? 'translate3d(0px, 0, 0)'
              : `translate3d(0px, ${index === activeIndex ? 0 : 18}px, 0)`
          }}
          ref={(el) => {
            phraseRefs.current[index] = el;
          }}
        >
          {isMobile
            ? phrase
            : phrase.split(' ').map((word, wordIndex, words) => (
              <span key={`${phrase}-${word}-${wordIndex}`}>
                {word}
                {wordIndex < words.length - 1 && <br />}
              </span>
            ))
          }
        </div>
      ))}
    </div>
  );
};
