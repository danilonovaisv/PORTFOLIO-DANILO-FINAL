'use client';

import { useEffect, useRef } from 'react';
import { colorSequence, interpolateHSL, hslToString } from '@/lib/colors';

type BackgroundLayerProps = {
  activeIndex: number;
  reducedMotion?: boolean;
};

export const BackgroundLayer = ({
  activeIndex,
  reducedMotion = false,
}: BackgroundLayerProps) => {
  const bgRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!bgRef.current) return;
    
    const currentColor = colorSequence[activeIndex % colorSequence.length];
    const nextColor = colorSequence[(activeIndex + 1) % colorSequence.length];

    if (reducedMotion) {
      bgRef.current.style.backgroundColor = hslToString(currentColor);
      return;
    }
    
    // Interpolação contínua de cor conforme especificação
    const startTime = Date.now();
    const duration = 900; // 0.9s
    let rafId = 0;
    let cancelled = false;
    
    const animate = () => {
      if (cancelled || !bgRef.current) return;
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      
      // A cor termina exatamente quando o texto termina a animação
      const color = interpolateHSL(currentColor, nextColor, t);
      bgRef.current.style.backgroundColor = color;
      
      if (t < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };
    
    animate();
    
    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      // Reset para a próxima animação
      if (bgRef.current) {
        bgRef.current.style.backgroundColor = hslToString(currentColor);
      }
    };
  }, [activeIndex, reducedMotion]);
  
  return (
    <div 
      ref={bgRef}
      className="absolute inset-0 z-0"
      style={{ backgroundColor: hslToString(colorSequence[activeIndex % colorSequence.length]) }}
    />
  );
};
