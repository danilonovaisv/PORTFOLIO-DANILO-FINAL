'use client';

import { useEffect, useRef, useState } from 'react';
import {
  animate,
  type AnimationOptions,
  type DOMKeyframesDefinition,
} from 'motion';
import { MorphingText } from './MorphingText';

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
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (!headerRef.current) return;

    const update = () => setIsMobile(window.innerWidth <= 767);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Ativa a animação de MorphingText após um breve delay para garantir que o componente está montado
  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    if (reducedMotion) {
      headerRef.current.style.opacity = '1';
      headerRef.current.style.transform = 'translateY(0px)';
      return;
    }

    // Animação de entrada suave do container
    const keyframes = {
      opacity: [0, 1],
      y: [10, 0],
    } as unknown as DOMKeyframesDefinition;
    const options: AnimationOptions = {
      duration: 0.8,
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

    animate(headerRef.current, { opacity: 1, y: 0 } as DOMKeyframesDefinition, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    });
  }, [activeIndex, isMobile, reducedMotion, totalSections]);

  return (
    <div
      ref={headerRef}
      className="
        absolute z-30 pointer-events-none
        right-[4vw] top-[12vh]
        sm:right-[4vw] sm:top-[12vh]
        md:right-[3vw] md:top-[10vh]
        lg:right-[4vw] lg:top-[10vh]
        text-right
        w-[min(460px,78vw)]
        md:w-[min(560px,52vw)]
        lg:w-[min(640px,50vw)]
        transition-opacity duration-300
      "
      style={{ opacity: 0 }}
    >
      {/* Título principal — MorphingText entrando pela DIREITA */}
      <MorphingText
        text="ACREDITO NO DESIGN QUE MUDA O DIA DE ALGUÉM."
        enterFrom="right"
        isVisible={hasEntered}
        duration={700}
        staggerDelay={14}
        offset={80}
        reducedMotion={reducedMotion}
        className="font-display text-white text-[36px] sm:text-[40px] md:text-[60px] lg:text-[68px] font-black leading-[0.92] uppercase mb-3 text-right"
      />

      {/* Subtítulo — MorphingText entrando pela DIREITA com delay */}
      <MorphingText
        text="Não pelo choque, mas pela conexão."
        enterFrom="right"
        isVisible={hasEntered}
        duration={600}
        staggerDelay={20}
        offset={50}
        reducedMotion={reducedMotion}
        className="font-h2 text-white text-[20px] sm:text-[22px] md:text-[36px] lg:text-[44px] leading-[0.95] font-bold text-right mt-2"
      />
    </div>
  );
};
