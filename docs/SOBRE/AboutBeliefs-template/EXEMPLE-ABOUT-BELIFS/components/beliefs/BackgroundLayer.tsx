'use client';

import { useEffect, useRef } from 'react';
import { colorSequence, interpolateHSL, hslToString } from '@/lib/colors';

export const BackgroundLayer = ({ currentSection }: { currentSection: number }) => {
  const bgRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!bgRef.current) return;
    
    const currentColor = colorSequence[currentSection % colorSequence.length];
    const nextColor = colorSequence[(currentSection + 1) % colorSequence.length];
    
    // Interpolação contínua de cor conforme especificação
    const startTime = Date.now();
    const duration = 900; // 0.9s
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      
      // A cor termina exatamente quando o texto termina a animação
      const color = interpolateHSL(currentColor, nextColor, t);
      bgRef.current!.style.backgroundColor = color;
      
      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
    
    return () => {
      // Reset para a próxima animação
      bgRef.current!.style.backgroundColor = hslToString(currentColor);
    };
  }, [currentSection]);
  
  return (
    <div 
      ref={bgRef}
      className="fixed inset-0 -z-20 transition-colors duration-0"
      style={{ backgroundColor: hslToString(colorSequence[currentSection % colorSequence.length]) }}
    />
  );
};
