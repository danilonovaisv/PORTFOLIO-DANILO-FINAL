'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { useIsMobile } from './BeliefSection';

interface MobileBackgroundProps {
  colors: string[];
  scrollYProgress: MotionValue<number>;
  finalColor: string;
}

export const BeliefMobileBackground: React.FC<MobileBackgroundProps> = ({
  colors,
  scrollYProgress,
  finalColor,
}) => {
  const isMobile = useIsMobile();
  const [activeColorIndex, setActiveColorIndex] = React.useState(0);

  React.useEffect(() => {
    if (!isMobile) return;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Range útil: 0.35 a 0.95 (mesma range das frases)
      const start = 0.35;
      const end = 0.95;
      const total = end - start;
      const step = total / colors.length;

      if (latest < start) {
        setActiveColorIndex(0);
        return;
      }

      if (latest >= end) {
        // Após a última frase, usa a cor final
        setActiveColorIndex(colors.length);
        return;
      }

      const relativeProgress = latest - start;
      const index = Math.floor(relativeProgress / step);
      setActiveColorIndex(Math.min(Math.max(0, index), colors.length - 1));
    });

    return () => unsubscribe();
  }, [scrollYProgress, colors.length, isMobile]);

  if (!isMobile) return null;

  // Determina a cor atual: usa a cor do índice ou a cor final
  const currentColor =
    activeColorIndex >= colors.length ? finalColor : colors[activeColorIndex];

  return (
    <motion.div
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        backgroundColor: currentColor,
        zIndex: 5,
      }}
      animate={{ backgroundColor: currentColor }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    />
  );
};
