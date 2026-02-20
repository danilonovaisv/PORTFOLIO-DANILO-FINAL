'use client';

import { useEffect, useRef, useState } from 'react';
import { BackgroundLayer } from './BackgroundLayer';
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

  // Controle determinístico por blocos de viewport (1 frase por ~100vh)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateActiveIndex = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionHeight = section.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const triggerOffset = viewportHeight * 0.35;
      const traveled = scrollY + triggerOffset - sectionTop;
      const block = Math.floor(traveled / Math.max(viewportHeight, 1));
      const nextIndex = Math.max(0, Math.min(totalSections - 1, block));

      const nextIsActive =
        scrollY + viewportHeight > sectionTop && scrollY < sectionBottom;
      setIsActive((previousIsActive) =>
        previousIsActive === nextIsActive ? previousIsActive : nextIsActive
      );

      setActiveIndex((previousIndex) =>
        previousIndex === nextIndex ? previousIndex : nextIndex
      );
    };

    updateActiveIndex();
    window.addEventListener('scroll', updateActiveIndex, { passive: true });
    window.addEventListener('resize', updateActiveIndex);

    return () => {
      window.removeEventListener('scroll', updateActiveIndex);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, [totalSections]);

  return (
    <section
      ref={sectionRef}
      id="about-beliefs"
      aria-labelledby="about-beliefs-heading"
      className="relative w-full overflow-visible"
      style={{ minHeight: `${totalSections * 100}vh` }}
      data-testid="about-beliefs-section"
    >
      <h2 id="about-beliefs-heading" className="sr-only">
        O Que Me Move
      </h2>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Camada 0 - Background */}
        <BackgroundLayer
          activeIndex={activeIndex}
          reducedMotion={prefersReducedMotion}
        />

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
        />

        {/* Camada 5 - Ghost 3D (acima de todas) */}
        {isActive && !prefersReducedMotion && (
          <Ghost3D activeIndex={activeIndex} totalSections={totalSections} />
        )}

        {/* Camada 4 - Manifesto Final */}
        {isActive && activeIndex === 5 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <div className="text-center text-white font-display text-[22vw] md:text-[15vw] font-black leading-[0.78] opacity-0 animate-manifesto">
              <div>ISSO É</div>
              <div>GHOST</div>
              <div>DESIGN.</div>
            </div>
          </div>
        )}
      </div>

      {/* Sentinelas de scroll para orquestrar entradas */}
      <div
        className="absolute left-0 top-0 w-full pointer-events-none"
        style={{ height: `${totalSections * 100}vh` }}
        aria-hidden="true"
      >
        {Array.from({ length: totalSections }).map((_, index) => (
          <div
            key={`belief-sentinel-${index}`}
            data-index={index}
            data-testid={`belief-sentinel-${index}`}
            className="belief-sentinel h-screen w-full"
          />
        ))}
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
