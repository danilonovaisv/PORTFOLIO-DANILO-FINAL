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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
      {/* Tag */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={startEntrance ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 1.0, duration: 1.0, ease: 'easeOut' }}
        className="font-mono text-[12px] uppercase tracking-[0.4em] text-cyan-400"
=======
    <div className="absolute inset-0 flex flex-col items-center justify-between z-10 py-[12vh] md:py-[10vh] pointer-events-none">
      {/* 1. TOPO: TAG [BRAND AWARENESS] */}
      <motion.span
=======
    <div className="absolute inset-0 flex flex-col items-center justify-between z-10 py-[12vh] md:py-[10vh] pointer-events-none">
      {/* 1. TOPO: TAG [BRAND AWARENESS] */}
      <motion.span
>>>>>>> Stashed changes
        initial={{ opacity: 0, y: -20 }}
        animate={
          startEntrance ? { opacity: 0.8, y: 0 } : { opacity: 0, y: -20 }
        }
        transition={{ delay: 3.0, duration: 1.0, ease: 'easeOut' }}
        className="font-mono text-[10px] md:text-[12px] uppercase tracking-[0.2em] text-cyan-400"
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      >
        [BRAND AWARENESS]
      </motion.span>

<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
      {/* 2. MEIO: Área Reservada para o Texto WebGL + SEO */}
      <div className="flex flex-col items-center justify-center flex-1 w-full relative">
        <div className="sr-only">
          <h1 className="text-8xl font-black">Você não vê o design.</h1>
          <h2 className="text-6xl font-black">Mas ele vê você.</h2>
        </div>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

        {/* Espaçador para o CTA Central */}
        <div className="h-[20vh] md:h-[30vh] w-full" />

        <motion.div
          className="pointer-events-auto mt-8 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={startEntrance ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 4.2, duration: 0.8 }}
        >
          <CTAButton href="/sobre" variant="primary">
            step inside
          </CTAButton>
        </motion.div>
      </div>

      {/* 3. FUNDO: CTA Secundário (Ghost) */}
      <motion.div
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        className="pt-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={startEntrance ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
=======
=======
>>>>>>> Stashed changes
        className="pointer-events-auto mt-auto"
        initial={{ opacity: 0 }}
        animate={startEntrance ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ delay: 4.8, duration: 1.0 }}
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      >
        <CTAButton href="/sobre" variant="ghost">
          step inside
        </CTAButton>
      </motion.div>
    </div>
  );
}

export default HeroCopy;
