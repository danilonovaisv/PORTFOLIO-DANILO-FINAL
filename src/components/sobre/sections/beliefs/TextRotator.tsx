'use client';

import { useEffect, useRef, useState } from 'react';
import { MorphingText } from './MorphingText';

const phrases = [
  'Um vídeo que respira.',
  'Uma marca que se reconhece.',
  'Um detalhe que fica.',
  'Crio para gerar presença.',
  'Mesmo quando não estou ali.',
  'Mesmo quando ninguém percebe o esforço.',
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
  const previousIndexRef = useRef(activeIndex);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 767);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Gerencia transição entre frases
  useEffect(() => {
    const prev = previousIndexRef.current;
    if (prev !== activeIndex) {
      setExitingIndex(prev);

      const timer = setTimeout(() => {
        setExitingIndex(null);
      }, 500);

      previousIndexRef.current = activeIndex;
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  return (
    <div className="relative w-full h-full pointer-events-none">
      {phrases.map((phrase, index) => {
        const isActive = index === activeIndex;
        const isExiting = index === exitingIndex;
        const isVisible = isActive || isExiting;
        const shouldRender = reducedMotion ? isActive : isVisible;
        const displayText = isMobile ? phrase : phrase.split(' ').join('\n');

        return (
          <div
            key={phrase}
            data-index={index}
            data-testid={`belief-line-${index}`}
            className={`
              belief-line absolute w-full z-20
              ${isMobile ? 'text-center' : 'text-left'}
            `}
            style={
              isMobile
                ? {
                    bottom: '20vh',
                    width: 'min(92vw, 680px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    opacity: shouldRender ? 1 : 0,
                    pointerEvents: shouldRender ? 'auto' : 'none',
                  }
                : {
                    left: '15%',
                    bottom: '10vh',
                    maxWidth: '680px',
                    opacity: shouldRender ? 1 : 0,
                    pointerEvents: shouldRender ? 'auto' : 'none',
                  }
            }
          >
            {/* Only mount MorphingText for active/exiting phrases for performance */}
            {shouldRender && (
              <MorphingText
                text={displayText}
                enterFrom="left"
                exitTo={isMobile ? 'right' : 'left'}
                isVisible={isActive}
                isExiting={isExiting}
                duration={isMobile ? 500 : 600}
                staggerDelay={isMobile ? 16 : 20}
                offset={isMobile ? 40 : 60}
                reducedMotion={reducedMotion}
                className={`
                  font-h1 text-[#4fe6ff] font-bold
                  ${
                    isMobile
                      ? 'text-[32px] sm:text-[36px] leading-[1.1]'
                      : 'text-[52px] md:text-[56px] lg:text-[62px] leading-[1.05]'
                  }
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
