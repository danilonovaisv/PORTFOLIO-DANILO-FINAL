'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * GhostAura - Camadas visuais etéreas flutuantes
 * Inspirado na estética "Ghost" do CodePen: https://codepen.io/danilonovaisv/pen/YPWyrdW
 * Cria orbs com blur e movimento flutuante para reforçar a atmosfera etérea.
 *
 * Performance: Usa blur mais leve no mobile para evitar jank
 */
export default function GhostAura() {
  // Mobile usa blur menor para performance
  const auraCommon = 'absolute rounded-full bg-white pointer-events-none';

  return (
    <div className="absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      {/* Orb Superior Esquerdo - Movimento lento e sutil */}
      <motion.div
        className={cn(
          auraCommon,
          'w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96',
          'top-[15%] left-[5%] sm:top-[20%] sm:left-[10%]',
          'blur-2xl sm:blur-3xl',
          'opacity-[0.08]'
        )}
        animate={{
          y: [0, 30, 0],
          x: [0, -10, 0],
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Orb Inferior Direito - Movimento oposto para contraste */}
      <motion.div
        className={cn(
          auraCommon,
          'w-72 h-72 sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]',
          'bottom-[10%] right-[2%] sm:bottom-[15%] sm:right-[5%]',
          'blur-2xl sm:blur-3xl',
          'opacity-[0.06]'
        )}
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Orb Central - Blue Accent para reforçar a paleta Ghost */}
      <motion.div
        className={cn(
          'absolute rounded-full pointer-events-none',
          'w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]',
          'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'blur-[60px] sm:blur-[80px] md:blur-[100px]',
          'bg-[#0048ff]/10'
        )}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.05, 0.12, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Orb Accent - Cyan para highlight sutil */}
      <motion.div
        className={cn(
          'absolute rounded-full pointer-events-none',
          'w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64',
          'top-[25%] right-[15%] sm:top-[30%] sm:right-[20%]',
          'blur-2xl sm:blur-[60px] md:blur-[80px]',
          'bg-[#4fe6ff]/10'
        )}
        animate={{
          y: [0, -20, 0],
          opacity: [0.04, 0.09, 0.04],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Orb Glow Extra - Intensifica o centro no CodePen style */}
      <motion.div
        className={cn(
          'absolute rounded-full pointer-events-none',
          'w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56',
          'top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2',
          'blur-xl sm:blur-2xl md:blur-[50px]',
          'bg-[#00f0ff]/8'
        )}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
    </div>
  );
}
