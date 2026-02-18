'use client';

import { useEffect, useRef, useState } from 'react';
import { inView } from 'motion';
import { BackgroundLayer } from './BackgroundLayer';
import { OverlayLayer } from './OverlayLayer';
import { FixedHeader } from './FixedHeader';
import { TextRotator } from './TextRotator';
import { Ghost3D } from './Ghost3D';

export const BeliefsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const totalSections = 6;
  
  // Detecta preferências de motion
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(media.matches);

    update();
    if (media.addEventListener) {
      media.addEventListener('change', update);
    } else {
      media.addListener(update);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', update);
      } else {
        media.removeListener(update);
      }
    };
  }, []);

  // Detecta entrada/saída da seção para controlar camadas e 3D
  useEffect(() => {
    if (!sectionRef.current) return;

    return inView(
      sectionRef.current,
      () => {
        setIsActive(true);
        return () => setIsActive(false);
      },
      { margin: '-20% 0px -20% 0px' }
    );
  }, []);
  
  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[600vh] overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Camada 0 - Background */}
        <BackgroundLayer
          activeIndex={activeIndex}
          reducedMotion={prefersReducedMotion}
        />

        {/* Camada 1 - Overlay */}
        <OverlayLayer />

        {/* Camada 2 - Cabeçalho Fixo */}
        <FixedHeader
          activeIndex={activeIndex}
          totalSections={totalSections}
          reducedMotion={prefersReducedMotion}
        />

        {/* Camada 3 - Texto Rotativo */}
        <TextRotator
          reducedMotion={prefersReducedMotion}
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
        />

        {/* Camada 5 - Ghost 3D (acima de todas) */}
        {isActive && !prefersReducedMotion && (
          <Ghost3D activeIndex={activeIndex} totalSections={totalSections} />
        )}

        {/* Camada 4 - Manifesto Final */}
        {isActive && activeIndex === 5 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <div className="text-center text-white font-display text-[120px] md:text-[180px] font-black leading-[0.8] opacity-0 animate-manifesto">
              <div>ISSO É</div>
              <div>GHOST</div>
              <div>DESIGN.</div>
            </div>
          </div>
        )}
      </div>

      {/* Estilos de animação */}
      <style jsx global>{`
        @keyframes manifesto {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-manifesto {
          animation: manifesto 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.3s;
        }
      `}</style>
    </section>
  );
};
