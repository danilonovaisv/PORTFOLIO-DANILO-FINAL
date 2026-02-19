'use client';

import { useEffect, useRef } from 'react';

export const OverlayLayer = ({ currentSection }: { currentSection: number }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!overlayRef.current) return;
    
    // Animação do overlay para evitar flicker
    const startTime = Date.now();
    const duration = 900; // 0.9s
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      
      // Easing personalizado para sincronia perfeita com texto [0.4, 0, 0.2, 1]
      const easedT = 0.4 * t * t + 0.2 * t;
      const opacity = Math.min(easedT * 1.5, 1);
      
      overlayRef.current!.style.opacity = opacity.toString();
      
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        // Fade out suave
        setTimeout(() => {
          let fadeOutTime = Date.now();
          const fadeOut = () => {
            const elapsed = Date.now() - fadeOutTime;
            const t = Math.min(elapsed / 300, 1);
            overlayRef.current!.style.opacity = (1 - t).toString();
          };
          requestAnimationFrame(fadeOut);
        }, 100);
      }
    };
    
    animate();
    
  }, [currentSection]);
  
  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-black -z-10"
      style={{ opacity: 0 }}
    />
  );
};
