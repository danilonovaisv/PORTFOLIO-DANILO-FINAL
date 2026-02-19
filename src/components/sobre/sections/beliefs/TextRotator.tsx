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
                    bottom: '10vh',
                    width: '88%',
                    left: '6%',
                    opacity: isVisible || reducedMotion ? 1 : 0,
                    pointerEvents: isVisible ? 'auto' : 'none',
                  }
                : {
                    left: '4%',
                    bottom: '12%',
                    maxWidth: '650px',
                    opacity: isVisible || reducedMotion ? 1 : 0,
                    pointerEvents: isVisible ? 'auto' : 'none',
                  }
            }
          >
            {/* Only mount MorphingText for active/exiting phrases for performance */}
            {(isVisible || reducedMotion) && (
              <MorphingText
                text={phrase}
                enterFrom="left"
                exitTo={isMobile ? 'right' : null}
                isVisible={isActive}
                isExiting={isExiting}
                duration={isMobile ? 500 : 600}
                staggerDelay={isMobile ? 16 : 20}
                offset={isMobile ? 40 : 60}
                reducedMotion={reducedMotion}
                className={`
                  font-h1 text-[#4fe6ff] font-bold italic
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
