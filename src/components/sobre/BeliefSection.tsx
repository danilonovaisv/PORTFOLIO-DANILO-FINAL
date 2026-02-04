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
  animationRange: number[];
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
    <div className="overflow-visible mb-1 md:mb-2 w-full">
      <motion.span
        style={{ x: lineX }}
        className="block text-blueAccent italic font-semibold text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.2] text-left whitespace-pre-line select-none tracking-[-0.01em] max-w-fit"
      >
        {line}
      </motion.span>
    </div>
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
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const animationRange = isFirst ? [0.05, 0.2] : [0.1, 0.25];
  const exitRange = isFirst ? [0.75, 0.9] : [0.7, 0.85];

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
      className={`relative w-full h-screen flex overflow-hidden
        ${
          isMobile
            ? 'items-end justify-start' // Mobile: espaço para texto fixed no footer
            : `items-center justify-start pl-8 lg:pl-16`
        }
      `}
    >
      {/* Desktop: Texto inline */}
      {!isMobile && (
        <div className="std-grid max-w-none w-full">
          <motion.div
            style={{ y: yScroll, opacity: desktopOpacity }}
            className="relative z-30 w-full flex flex-col justify-start max-w-[400px]"
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
          </motion.div>
        </div>
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
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      <div className="px-6 pb-[12vh]">
        {phrases.map((phrase, index) => (
          <MobilePhrase
            key={index}
            text={phrase}
            index={index}
            totalPhrases={totalPhrases}
            segmentSize={segmentSize}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
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
  segmentSize,
  scrollYProgress,
}) => {
  // Calcular ranges para cada frase
  // Cada frase aparece em seu "segmento" do scroll
  const startPoint = index * segmentSize;
  const endPoint = (index + 1) * segmentSize;

  // Entry: 5% depois do início do segmento
  // Exit: 5% antes do fim do segmento
  const entryStart = startPoint + 0.02;
  const entryEnd = startPoint + segmentSize * 0.25;
  const exitStart = endPoint - segmentSize * 0.25;
  const exitEnd = endPoint - 0.02;

  // X: Entra da esquerda, sai para a esquerda
  const x = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    ['-100%', '0%', '0%', '-100%'],
    { ease: ghostEase }
  );

  // Opacity: Fade in com entrada, fade out antes da próxima
  const opacity = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  return (
    <motion.div
      style={{ x, opacity }}
      className="absolute bottom-0 left-0 right-0 px-6"
    >
      <span className="block text-blueAccent italic font-semibold text-[clamp(2rem,7vw,3rem)] leading-[1.15] tracking-[-0.01em] text-left select-none drop-shadow-[0_4px_20px_rgba(79,230,255,0.25)]">
        {text.replace(/\n/g, ' ')}
      </span>
    </motion.div>
  );
};
