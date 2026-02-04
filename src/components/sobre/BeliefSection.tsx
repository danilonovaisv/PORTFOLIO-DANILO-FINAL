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
 * Componente separado para cada linha do texto.
 * Isso permite usar hooks (useTransform) corretamente,
 * pois hooks não podem ser chamados dentro de loops/callbacks.
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

const BeliefBlockMobile: React.FC<{
  text: string;
  scrollYProgress: MotionValue<number>;
  animationRange: number[];
  exitRange: number[];
}> = ({ text, scrollYProgress, animationRange, exitRange }) => {
  // Mobile Animation: Left (Entry) -> Center (Hold) -> Right (Exit)
  // Entry: -100% -> 0% (entra da esquerda)
  // Exit: 0% -> 100% (sai para a direita)
  const x = useTransform(
    scrollYProgress,
    [animationRange[0], animationRange[1], exitRange[0], exitRange[1]],
    ['-100%', '0%', '0%', '100%'],
    { ease: ghostEase }
  );

  // Opacity: Fade in suave com entrada, hold, fade out antes do próximo BG
  const opacity = useTransform(
    scrollYProgress,
    [animationRange[0], animationRange[0] + 0.08, exitRange[0] - 0.05, exitRange[1]],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  return (
    <motion.div
      style={{ x, opacity }}
      className="w-full text-center px-6"
    >
      <span className="block text-blueAccent font-bold text-[clamp(2.5rem,8vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-wrap text-center select-none drop-shadow-[0_4px_20px_rgba(79,230,255,0.3)]">
        {text.replace(/\n/g, ' ')}
      </span>
    </motion.div>
  );
}

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
        className="block text-blueAccent font-bold text-[clamp(2rem,4vw,2.4rem)] leading-[1.3] text-center whitespace-pre-line select-none tracking-[-0.01em] max-w-fit px-4"
      >
        {line}
      </motion.span>
    </div>
  );
};

interface BeliefSectionProps {
  text: string;
  bgColor: string; // Espera uma cor HEX
  isFirst?: boolean;
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

  const animationRange = isFirst ? [0, 0.25] : [0.15, 0.35];
  const exitRange = isFirst ? [0.70, 0.88] : [0.65, 0.85];

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
        ${isMobile
          ? 'items-end pb-[8vh] justify-center' // Mobile: Bottom Center - pb reduced to show full text
          : `items-start justify-start ${isFirst ? 'pt-0 items-center' : 'pt-[20vh] md:pt-[20vh] lg:pt-[15vh]'}` // Desktop: Top Left/Center
        }
      `}
    >
      <div className="std-grid max-w-none w-full">
        {isMobile ? (
          <BeliefBlockMobile
            text={text}
            scrollYProgress={scrollYProgress}
            animationRange={animationRange}
            exitRange={exitRange}
          />
        ) : (
          <motion.div
            style={{ y: yScroll, opacity: desktopOpacity }}
            className="relative z-30 w-full flex flex-col justify-start"
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
        )}
      </div>
    </motion.section>
  );
};
