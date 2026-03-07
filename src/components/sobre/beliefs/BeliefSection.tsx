'use client';
import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  cubicBezier,
} from 'framer-motion';
import { GHOST_EASE } from '@/config/motion';

// Easing Ghost Padrão
const ghostEase = cubicBezier(...GHOST_EASE);

interface BeliefLineProps {
  line: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  animationRange: [number, number];
}

/**
 * Hook para detectar mobile
 */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

/**
 * Desktop: Texto animado na esquerda (linha por linha)
 */
const BeliefLineDesktop: React.FC<BeliefLineProps> = ({
  line,
  index,
  scrollYProgress,
  animationRange,
}) => {
  const lineY = useTransform(
    scrollYProgress,
    [animationRange[0] + index * 0.02, animationRange[1] + index * 0.02],
    ['18px', '0px'],
    { ease: ghostEase as any }
  );
  const lineOpacity = useTransform(
    scrollYProgress,
    [animationRange[0] + index * 0.02, animationRange[1] + index * 0.02],
    [0, 1],
    { ease: ghostEase as any }
  );
  return (
    <motion.span
      // 🟣 [CONFIG VISUAL]: Define a cor do texto das linhas (desktop)
      className="block text-blueAccent italic font-bold text-left whitespace-pre-line select-none tracking-[-0.04em] max-w-fit"
      // 🟣 [CONFIG VISUAL]: Define o tamanho da fonte (Desktop: clamp de 2.8rem a 6rem)
      style={
        {
          y: lineY,
          opacity: lineOpacity,
          fontSize: 'clamp(2.8rem,5.8vw,6.3rem)',
          lineHeight: 0.9,
        } as any
      }
    >
      {line}
    </motion.span>
  );
};

interface BeliefSectionProps {
  text: string;
  bgColor: string;
  isFirst?: boolean;
  /** Index of this belief section for E2E test IDs */
  index?: number;
  /** Override scroll progress from parent section */
  scrollYProgressOverride?: MotionValue<number>;
  /** Optional motion wrappers for reduced motion mode */
  MotionSection?: React.ElementType;
  MotionDiv?: React.ElementType;
  prefersReducedMotion?: boolean;
  /**
   * Em mobile, o texto é renderizado em uma camada fixed separada.
   * Esta prop controla se deve renderizar o texto inline (desktop) ou não (mobile usa camada fixed)
   */
  isMobileTextLayer?: boolean;
}

export const BeliefSection: React.FC<BeliefSectionProps> = ({
  text,
  bgColor,
  isFirst = false,
  index,
  scrollYProgressOverride,
  MotionSection,
  MotionDiv,
  prefersReducedMotion,
  isMobileTextLayer = false, // Nova prop para controle explícito
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const effectiveProgress = scrollYProgressOverride ?? scrollYProgress;
  const Section = MotionSection ?? motion.section;
  const Content = MotionDiv ?? motion.div;

  // Desktop Ranges
  // Ajuste de sincronia (Acelerado):
  // Frases entram mais cedo para garantir visibilidade e rapidez.
  const animationRange: [number, number] = isFirst ? [0.25, 0.45] : [0.2, 0.4];
  const exitRange: [number, number] = [0.7, 0.85];

  const desktopOpacity = useTransform(
    effectiveProgress,
    [animationRange[0], animationRange[1], exitRange[0], exitRange[1]],
    [0, 1, 1, 0]
  );
  const yScroll = useTransform(
    effectiveProgress,
    [0.68, 0.92],
    ['0vh', '-100vh']
  );

  const lines = text.split('\n');

  return (
    <Section
      ref={containerRef}
      aria-label={text.replace(/\n/g, ' ')}
      data-testid={index !== undefined ? `belief-sentinel-${index}` : undefined}
      style={{ backgroundColor: bgColor }}
      className="relative w-full h-screen flex items-center justify-start overflow-hidden pl-[6%] lg:pl-[8%]"
    >
      {/* Desktop: Texto inline */}
      {!isMobileTextLayer && (
        <Content
          style={
            prefersReducedMotion
              ? undefined
              : { y: yScroll, opacity: desktopOpacity }
          }
          className="relative z-20 hidden md:flex w-full flex-col justify-center max-w-[38vw] lg:max-w-[34vw]"
          data-testid={index !== undefined ? `belief-line-${index}` : undefined}
        >
          {lines.map((line, i) => (
            <BeliefLineDesktop
              key={i}
              line={line}
              index={i}
              scrollYProgress={scrollYProgress}
              animationRange={animationRange}
            />
          ))}
        </Content>
      )}
      {/* Mobile: Texto será renderizado em camada fixed no AboutBeliefs */}
    </Section>
  );
};

// BeliefMobileTextLayer moved to its own file

// Exportar o hook para uso em outros componentes
export { useIsMobile };
