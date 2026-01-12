'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion'; // Motor de física
import { ArrowRight } from 'lucide-react'; // Changed from ArrowUpRight to ArrowRight per spec

interface HeroAntigravityCTAProps {
  text?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const HeroAntigravityCTA: React.FC<HeroAntigravityCTAProps> = ({
  text = "let's build something great",
  href = '#',
  onClick,
  className = '',
}) => {
  // Configuração da Física (Spring)
  // stiffness: rigidez da mola (quanto maior, mais rápido)
  // damping: amortecimento (quanto menor, mais "bouncy" fica)
  const springConfig = { type: 'spring', stiffness: 400, damping: 25 } as const;

  // Variantes para orquestrar animações pai-filho
  const iconVariants: Variants = {
    initial: {
      rotate: 0,
      x: 0,
    },
    hover: {
      rotate: 0,
      x: 6, // Move 6px para a direita (efeito esticar)
      transition: springConfig,
    },
  };

  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`
        relative group flex items-center justify-center cursor-pointer
        focus:outline-none z-50 no-underline
        ${className}
      `}
      // Animação de elevação e Glow no Container Pai
      whileHover="hover" // Set hover state for variants
      initial="initial"
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="relative flex items-center"
        whileHover={{ y: -4 }} // Levita 4px
        transition={springConfig}
      >
        {/* --- GLOW EFFECT (Camada de Brilho) --- 
            Usamos um div absoluto atrás para controlar o blur/glow 
            sem afetar a nitidez do texto.
        */}
        <div
          className="
          absolute inset-0 rounded-full 
          bg-blue-500 blur-xl opacity-0 
          group-hover:opacity-60 transition-opacity duration-500
          scale-90 group-hover:scale-110
        "
        />

        {/* --- 1. PÍLULA DE TEXTO (Esquerda) --- */}
        <div
          className="
          relative z-10
          flex items-center justify-center
          h-[64px] pl-8 pr-12
          bg-[#0057ff] text-white
          rounded-full
        "
        >
          <span className="text-lg font-medium tracking-wide whitespace-nowrap">
            {text}
          </span>
        </div>

        {/* --- 2. NÚCLEO DO ÍCONE (Direita) --- */}
        <motion.div
          className="
            relative z-20
            flex items-center justify-center
            h-[64px] w-[64px]
            /* MARGEM NEGATIVA: Cria a fusão visual */
            -ml-8
            bg-[#0057ff] text-white
            rounded-full
          "
          // Conecta este elemento ao hover do pai (motion.a)
          variants={iconVariants}
        >
          <ArrowRight size={28} strokeWidth={2.5} />
        </motion.div>
      </motion.div>
    </motion.a>
  );
};

export default HeroAntigravityCTA;
