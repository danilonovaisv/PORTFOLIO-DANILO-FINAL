'use client';

import { useEffect, useRef } from 'react';
import { animate, type AnimationOptions, type DOMKeyframesDefinition } from 'motion';

export const FixedHeader = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!headerRef.current) return;
    
    // Animação de entrada do cabeçalho
    const keyframes = { opacity: [0.3, 1] } as unknown as DOMKeyframesDefinition;
    const options: AnimationOptions = {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    };

    animate(headerRef.current, keyframes, options);
  }, []);
  
  return (
    <div 
      ref={headerRef}
      className="
        sticky top-0 z-30 py-8 px-4 md:px-12 
        text-right w-full pointer-events-none
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
