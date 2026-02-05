// BeliefSection.tsx
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
      style={{ x: lineX }}
      className="block text-blueAccent italic font-semibold text-[clamp(2.75rem,4.5vw,2.5rem)] leading-[1.2] text-left whitespace-pre-line select-none tracking-[-0.01em] max-w-fit"
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
      style={{ backgroundColor: bgColor }}
      className={`relative w-full h-screen flex overflow-hidden ${
        isMobile
          ? 'items-end justify-start' // Mobile: espaço para texto fixed no footer
          : 'items-center justify-start pl-8 lg:pl-16'
      }`}
    >
      {/* Desktop: Texto inline */}
      {!isMobile && !isMobileTextLayer && (
        <motion.div
          style={{ y: yScroll, opacity: desktopOpacity }}
          className="relative z-30 w-full flex flex-col justify-start max-w-[400px]"
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

/**
 * Componente para texto mobile fixo no footer.
 * Renderizado em AboutBeliefs como camada separada.
 */
interface MobileTextLayerProps {
  phrases: string[];
  scrollYProgress: MotionValue<number>;
}

export const BeliefMobileTextLayer: React.FC<MobileTextLayerProps> = ({
  phrases,
  scrollYProgress,
}) => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  // Divisão do scroll total em segmentos para cada frase
  const totalPhrases = phrases.length;
  const segmentSize = 1 / (totalPhrases + 1); // +1 para a seção final

  return (
    <>
      {phrases.map((phrase, index) => (
        <MobilePhrase
          key={index} // Adicionado key
          text={phrase}
          index={index}
          totalPhrases={totalPhrases}
          segmentSize={segmentSize}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </>
  );
};

interface MobilePhraseProps {
  text: string;
  index: number;
  totalPhrases: number;
  segmentSize: number;
  scrollYProgress: MotionValue<number>;
}

const MobilePhrase: React.FC<MobilePhraseProps> = ({
  text,
  index,
  totalPhrases,
  scrollYProgress,
}) => {
  // MobilePhrase: Calcula seus próprios segmentos baseados no range útil [0.35 - 0.95]
  const usefulRangeStart = 0.35;
  const usefulRangeEnd = 0.95;
  const totalRange = usefulRangeEnd - usefulRangeStart;
  const adjustedSegmentSize = totalRange / totalPhrases;

  const startPoint = usefulRangeStart + index * adjustedSegmentSize;
  const endPoint = startPoint + adjustedSegmentSize;

  // Entry: 10% do segmento
  // Exit: 10% do segmento
  const entryStart = startPoint;
  const entryEnd = startPoint + adjustedSegmentSize * 0.15;
  const exitStart = endPoint - adjustedSegmentSize * 0.15;
  const exitEnd = endPoint;

  // X: Entra da DIREITA (+24px), mantém centro (0px), sai para a ESQUERDA (-24px)
  const x = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    ['24px', '0px', '0px', '-24px'],
    { ease: ghostEase }
  );

  // Opacity: Fade in com entrada, fade out antes da próxima
  const opacity = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  // Blur: 10px na entrada/saída, 0 no centro
  const blur = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)'],
    { ease: ghostEase }
  );

  return (
    <motion.div
      style={{ x, opacity, filter: blur }}
      className="fixed bottom-[20%] left-0 right-0 z-[60] text-center pointer-events-none px-4"
    >
      <span className="text-blueAccent italic font-semibold text-[clamp(2rem,6vw,3.5rem)] leading-[1.1] tracking-[-0.01em] block w-full mx-auto">
        {text}
      </span>
    </motion.div>
  );
};

// Exportar o hook para uso em outros componentes
export { useIsMobile };
