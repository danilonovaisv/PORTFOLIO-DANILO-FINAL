'use client';

import React, { useRef, useState, type MouseEvent } from 'react';
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
  onClick?: (_event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

const AntigravityCTA: React.FC<AntigravityCTAProps> = ({
  text = "let's build something great",
  href = '/',
  onClick,
  // Mobile: bottom-20 para evitar gesture bar, right-4 para edge comfort
  // Desktop: posição original
  className = 'fixed bottom-20 right-4 sm:bottom-12 sm:right-8 lg:bottom-12 lg:right-12 z-100 md:z-50',
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

      {/* Pílula de Texto - Mobile-First Sizing */}
      <motion.div
        className="
          relative z-10 
          flex items-center justify-center 
          h-12 sm:h-14 lg:h-[68px]
          pl-5 pr-4 sm:pl-8 sm:pr-6 lg:pl-10 lg:pr-8
          min-w-cta-mobile sm:min-w-cta-tablet lg:min-w-cta-desktop
          text-white 
          shadow-lg
          rounded-full
          select-none
          transition-colors duration-200
          active:scale-[0.98]
        "
        style={{
          backgroundColor: isHovered ? '#8705f2' : '#0048ff',
        }}
      >
        <span className="text-sm sm:text-base lg:text-lg font-medium tracking-wide sm:tracking-wider whitespace-nowrap leading-none font-sans">
          {text}
        </span>
      </motion.div>

      {/* Círculo com Ícone - Mobile-First Touch Target (min 48px) */}
      <motion.div
        ref={iconRef}
        className="
          relative z-20 
          flex items-center justify-center 
          h-12 w-12 sm:h-14 sm:w-14 lg:h-[68px] lg:w-[68px]
          -ml-0.5 sm:-ml-1
          text-white 
          shadow-lg
          rounded-full
          transition-colors duration-200
          active:scale-95
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
          className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.div>
    </motion.a>
  );
};

export default AntigravityCTA;
