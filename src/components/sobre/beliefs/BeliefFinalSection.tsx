import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { MorphText } from '@/components/ui/MorphText';

interface BeliefFinalSectionProps {
  scrollProgress: MotionValue<number>;
  bgColor: string;
}

export const BeliefFinalSection: React.FC<BeliefFinalSectionProps> = ({
  scrollProgress,
  bgColor,
}) => {
  const opacity = useTransform(scrollProgress, [0.8, 1], [0, 1]);

  return (
    <motion.div
      style={{ opacity, backgroundColor: bgColor }}
      className="w-full h-screen flex flex-col items-center justify-center p-8 text-center relative z-20"
    >
      <div className="max-w-4xl w-full">
        <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight tracking-tight mb-8">
          <div className="overflow-visible inline-block mr-4">
            <MorphText progress={scrollProgress} range={[0.82, 0.92]}>
              O invisível
            </MorphText>
          </div>
          <div className="overflow-visible inline-block">
            <MorphText progress={scrollProgress} range={[0.85, 0.95]}>
              move o mundo.
            </MorphText>
          </div>
        </h2>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
          <MorphText progress={scrollProgress} range={[0.88, 0.98]}>
            E eu construo o que não pode ser ignorado.
          </MorphText>
        </p>
      </div>
    </motion.div>
  );
};
