'use client';

import { motion } from 'framer-motion';
import { CTAButton } from '@/components/ui/CTAButton';

interface HeroCopyProps {
  startEntrance?: boolean;
}

export function HeroCopy({ startEntrance = false }: HeroCopyProps) {
  // Configuração de animação para consistência
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
      {/* Tag */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={startEntrance ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 1.0, duration: 1.0, ease: 'easeOut' }}
        className="font-mono text-[12px] uppercase tracking-[0.4em] text-cyan-400"
      >
        [BRAND AWARENESS]
      </motion.span>

      {/* Main Headlines - DOM Text for crispness and accessibility */}
      <motion.div
        className="flex flex-col items-center leading-none z-10"
        initial="hidden"
        animate={startEntrance ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h1
          variants={itemVariants}
          className="text-[clamp(3.5rem,8vw,6rem)] font-black tracking-tight text-[#d9dade]"
        >
          Você não vê <br /> o design.
        </motion.h1>
        <motion.h2
          variants={itemVariants}
          className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tight text-[#d9dade] mt-4 opacity-90"
        >
          Mas ele vê você.
        </motion.h2>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        className="pt-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={startEntrance ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <CTAButton href="/sobre" variant="primary">
          step inside
        </CTAButton>
      </motion.div>
    </div>
  );
}

export default HeroCopy;
