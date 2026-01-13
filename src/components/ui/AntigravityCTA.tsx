'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/**
 * AntigravityCTA - Botão CTA inspirado em Lo&Behold Studio
 *
 * Características principais:
 * - Pílula e círculo separados mas conectados na ponta
 * - Animação ao hover: círculo se afasta da pílula (x: +8px)
 * - Ícone rotaciona de -45° para 0° simultaneamente
 * - Spring physics: stiffness 300, damping 25
 *
 * @param text - Texto do botão (default: "let's build something great")
 * @param href - URL de destino
 * @param onClick - Callback ao clicar
 * @param className - Classes CSS customizadas (sobrescreve posicionamento padrão)
 */

interface AntigravityCTAProps {
  text?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const AntigravityCTA: React.FC<AntigravityCTAProps> = ({
  text = "let's build something great",
  href = '/',
  onClick,
  className = 'fixed bottom-8 right-8 lg:bottom-12 lg:right-12 z-100 md:z-50',
}) => {
  // State para controlar hover
  const [isHovered, setIsHovered] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  // Spring physics config
  const springTransition = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 25,
  };

  // Variantes de animação do ícone (rotação + movimento para direita)
  const arrowVariants = {
    initial: { rotate: -45, x: 0 },
    hover: { rotate: 0, x: 8 }, // Move 8px para direita criando gap
  };

  // Variantes de animação do botão completo
  const buttonVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -2 },
  };

  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`
        relative group 
        inline-flex items-center 
        cursor-pointer 
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background
        ${className}
      `}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={buttonVariants}
      initial="initial"
      animate={isHovered ? 'hover' : 'initial'}
      transition={springTransition}
      role="button"
      tabIndex={0}
      aria-label={`${text} - Clique para acessar`}
    >
      {/* Ghost Glow - Apenas no hover, muito sutil */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl opacity-0 pointer-events-none"
        style={{ backgroundColor: '#8705f2' }}
        animate={{
          opacity: isHovered ? 0.2 : 0,
          scale: isHovered ? 1.3 : 1,
        }}
        transition={springTransition}
      />

      {/* Pílula de Texto */}
      <motion.div
        className="
          relative z-10 
          flex items-center justify-center 
          h-[68px] pl-10 pr-8
          min-w-[240px]
          text-white 
          shadow-lg
          rounded-full
          select-none
          transition-colors duration-300
        "
        style={{
          backgroundColor: isHovered ? '#8705f2' : '#0048ff',
        }}
      >
        <span className="text-lg font-medium tracking-wider whitespace-nowrap leading-none font-sans">
          {text}
        </span>
      </motion.div>

      {/* Círculo com Ícone (separado mas conectado na ponta) */}
      <motion.div
        ref={iconRef}
        className="
          relative z-20 
          flex items-center justify-center 
          h-[68px] w-[68px]
          -ml-1
          text-white 
          shadow-lg
          rounded-full
          transition-colors duration-300
        "
        style={{
          backgroundColor: isHovered ? '#8705f2' : '#0048ff',
        }}
        variants={arrowVariants}
        initial="initial"
        animate={isHovered ? 'hover' : 'initial'}
        transition={springTransition}
      >
        <ArrowUpRight
          size={28}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.div>
    </motion.a>
  );
};

export default AntigravityCTA;
