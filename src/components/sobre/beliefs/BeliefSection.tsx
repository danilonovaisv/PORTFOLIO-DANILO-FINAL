'use client';
import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  cubicBezier,
  MotionValue,
} from 'framer-motion';

// Easing Ghost Padrão: cubic-bezier(0.22, 1, 0.36, 1)
const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

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
  const lineX = useTransform(
    scrollYProgress,
    [animationRange[0] + index * 0.02, animationRange[1] + index * 0.02],
    ['-100%', '0%'],
    { ease: ghostEase }
  );
  return (
    <motion.span
      // 🟣 [CONFIG VISUAL]: Define a cor do texto das linhas (desktop)
      className="block text-blueAccent italic font-bold text-left whitespace-pre-line select-none tracking-[-0.04em] max-w-fit"
      // 🟣 [CONFIG VISUAL]: Define o tamanho da fonte (Desktop: clamp de 2.8rem a 6rem)
      style={{
        x: lineX,
        fontSize: 'clamp(2.6rem,5.8vw,6rem)',
        lineHeight: 0.85,
      }}
    >
      {line}
    </motion.span>
  );
};

interface BeliefSectionProps {
  text: string;
  bgColor: string;
  isFirst?: boolean;
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
  isMobileTextLayer = false, // Nova prop para controle explícito
}) => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Desktop Ranges
  // isFirst: Atrasar entrada para garantir que o FixedHeader (parent 0-0.35) terminou.
  // Como este componente usa scroll relativo a si mesmo (0-1), e é o primeiro,
  // 0.5 aqui ≈ momento que o usuário já scrollou metade da primeira tela.

  const animationRange: [number, number] = isFirst ? [0.55, 0.7] : [0.2, 0.35];
  const exitRange: [number, number] = [0.8, 0.95];

  const desktopOpacity = useTransform(
    scrollYProgress,
    [animationRange[0], animationRange[1], exitRange[0], exitRange[1]],
    [0, 1, 1, 0]
  );

  const yScroll = useTransform(scrollYProgress, [0.7, 0.95], ['0vh', '-100vh']);

  const lines = text.split('\n');

  return (
    <motion.section
      ref={containerRef}
      aria-label={text.replace(/\n/g, ' ')}
      // 🟣 [CONFIG VISUAL]: Define a cor de fundo da seção
      style={{ backgroundColor: bgColor }}
      className={`relative w-full h-screen flex overflow-hidden ${
        isMobile
          ? 'items-end justify-start pb-32' // Mobile: espaço para texto fixed no footer
          : 'items-center justify-start px-[5%] md:px-[7.5%] lg:px-[10%]'
      }`}
    >
      {/* Desktop: Texto inline */}
      {!isMobile && !isMobileTextLayer && (
        <motion.div
          style={{ y: yScroll, opacity: desktopOpacity }}
          className="relative z-30 w-full flex flex-col justify-start max-w-[80vw]"
        >
          {lines.map((line, i) => (
            <BeliefLineDesktop
              key={i} // Adicionado key
              line={line}
              index={i}
              scrollYProgress={scrollYProgress}
              animationRange={animationRange}
            />
          ))}
        </motion.div>
      )}
      {/* Mobile: Texto será renderizado em camada fixed no AboutBeliefs */}
    </motion.section>
  );
};

// BeliefMobileTextLayer moved to its own file

// Exportar o hook para uso em outros componentes
export { useIsMobile };
