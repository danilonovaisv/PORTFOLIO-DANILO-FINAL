'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, type AnimationOptions, type DOMKeyframesDefinition } from 'motion';

type FixedHeaderProps = {
  activeIndex: number;
  totalSections: number;
  reducedMotion?: boolean;
};

export const FixedHeader = ({
  activeIndex,
  totalSections,
  reducedMotion = false,
}: FixedHeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    if (!headerRef.current) return;

    const update = () => setIsMobile(window.innerWidth <= 767);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    if (reducedMotion) {
      headerRef.current.style.opacity = '1';
      headerRef.current.style.transform = 'translateX(0px)';
      return;
    }
    
    // Animação de entrada do cabeçalho
    const keyframes = { opacity: [0.3, 1], x: [60, 0] } as unknown as DOMKeyframesDefinition;
    const options: AnimationOptions = {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    };

    animate(headerRef.current, keyframes, options);
  }, [reducedMotion]);

  useEffect(() => {
    if (!headerRef.current || reducedMotion) return;

    const shouldExit = activeIndex >= totalSections - 1;
    const exitX = isMobile ? 60 : 80;

    if (shouldExit) {
      animate(
        headerRef.current,
        { opacity: 0, x: exitX } as DOMKeyframesDefinition,
        { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      );
      return;
    }

    animate(
      headerRef.current,
      { opacity: 1, x: 0 } as DOMKeyframesDefinition,
      { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    );
  }, [activeIndex, isMobile, reducedMotion, totalSections]);
  
  return (
    <div 
      ref={headerRef}
      className="
        absolute z-30 right-[6vw] top-[20vh] md:top-[12vh]
        text-right w-[min(520px,90vw)] pointer-events-none
        transition-opacity duration-300
      "
      style={{ opacity: 0.3 }}
    >
      <h1 className="font-display text-white text-[28px] md:text-[42px] font-black leading-tight mb-2">
        Acredito no design que muda o dia de alguém.
      </h1>
      <p className="font-h2 text-white text-[20px] md:text-[28px] font-bold">
        Não pelo choque, mas pela conexão.
      </p>
    </div>
  );
};
