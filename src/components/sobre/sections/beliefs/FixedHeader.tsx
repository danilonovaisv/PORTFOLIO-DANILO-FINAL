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
      headerRef.current.style.transform = 'translateY(0px)';
      return;
    }
    
    // Animação de entrada do cabeçalho
    const keyframes = { opacity: [0.3, 1], y: [18, 0] } as unknown as DOMKeyframesDefinition;
    const options: AnimationOptions = {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    };

    animate(headerRef.current, keyframes, options);
  }, [reducedMotion]);

  useEffect(() => {
    if (!headerRef.current || reducedMotion) return;

    const shouldExit = activeIndex >= totalSections - 1;
    const exitY = isMobile ? -12 : -18;

    if (shouldExit) {
      animate(
        headerRef.current,
        { opacity: 0, y: exitY } as DOMKeyframesDefinition,
        { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      );
      return;
    }

    animate(
      headerRef.current,
      { opacity: 1, y: 0 } as DOMKeyframesDefinition,
      { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    );
  }, [activeIndex, isMobile, reducedMotion, totalSections]);
  
  return (
    <div 
      ref={headerRef}
      className="
        absolute z-30 right-[6vw] top-[17vh] sm:top-[16vh] md:right-[5vw] md:top-[15vh]
        text-right w-[min(440px,72vw)] md:w-[min(520px,58vw)] lg:w-[min(560px,46vw)] pointer-events-none
        transition-opacity duration-300
      "
      style={{ opacity: 0.3 }}
    >
      <h1 className="font-display text-white text-[34px] sm:text-[38px] md:text-[58px] lg:text-[64px] font-black leading-[0.95] uppercase mb-3">
        Acredito no design que
        <br />
        muda o dia de alguém.
      </h1>
      <p className="font-h2 text-white text-[22px] sm:text-[24px] md:text-[38px] lg:text-[44px] leading-[0.92] font-bold">
        Não pelo choque, mas pela conexão.
      </p>
    </div>
  );
};
