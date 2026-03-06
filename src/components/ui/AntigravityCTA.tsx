'use client';

import React, { useRef, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { BRAND } from '@/config/brand';
import { useMotionGate } from '@/hooks/useMotionGate';
import { cn } from '@/lib/utils';

/**
 * AntigravityCTA - Botão CTA inspirado em Lo&Behold Studio
 *
 * Características principais:
 * - Pílula e círculo separados mas conectados na ponta
 * - Animação ao hover: deslocamento vertical sutil e ajuste de opacidade
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
  onClick?: (_event: MouseEvent<HTMLAnchorElement | HTMLDivElement>) => void;
  /**
   * Custom color override for the button (Pill + Circle).
   * Used in Project Templates to match the project's theme.
   * If provided, overrides the default Blue (bluePrimary).
   */
  color?: string;
  className?: string;
  /**
   * Render as a div instead of an anchor.
   * Useful when placed inside another Link component to avoid invalid nesting.
   */
  as?: 'a' | 'div' | 'button';
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
}

const AntigravityCTA: React.FC<AntigravityCTAProps> = ({
  text = "let's build something great",
  href = '/',
  onClick,
  color, // Custom color prop
  // Mobile: bottom-20 para evitar gesture bar, right-4 para edge comfort
  // Desktop: posição original
  className = 'fixed bottom-20 right-4 sm:bottom-12 sm:right-8 lg:bottom-12 lg:right-12 z-100 md:z-50',
  as = 'a',
  type,
  target,
  rel,
}) => {
  // State para controlar hover
  const [isHovered, setIsHovered] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const Component = motion[as as keyof typeof motion] as any;
  const reduceMotion = useMotionGate();

  // Spring physics config
  const springTransition = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 25,
  };

  // Variantes do ícone seguindo Ghost Motion (sem rotate/scale)
  const arrowVariants = {
    initial: { y: 0, opacity: 0.92 },
    hover: { y: -3, opacity: 1 },
  };

  // Variantes de animação do botão completo (Ghost Era Specification)
  const buttonVariants = {
    initial: { y: 0 },
    hover: { y: -1 }, // Sutil -1px deslocamento
  };

  const mainColor = color || BRAND.colors.bluePrimary; // Default Blue

  return (
    <Component
      href={as === 'a' ? href : undefined}
      target={as === 'a' ? target : undefined}
      rel={as === 'a' ? rel : undefined}
      type={as === 'button' ? type : undefined}
      onClick={onClick}
      className={cn(
        'relative group',
        'cta-button',
        'inline-flex items-center',
        'cursor-pointer',
        'min-w-fit',
        'rounded-full',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-bluePrimary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={buttonVariants}
      initial="initial"
      animate={isHovered ? 'hover' : 'initial'}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
            duration: 0.2,
            ease: [0, 0, 0.2, 1], // cubic-bezier(0, 0, 0.2, 1)
          }
      }
      role="button"
      tabIndex={0}
      aria-label={`${text} - Clique para acessar`}
    >
      {/* Ghost Glow - Apenas no hover, muito sutil */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl opacity-0 pointer-events-none"
        style={{ backgroundColor: 'var(--color-purpleDetails)' }}
        animate={{
          opacity: isHovered ? 0.2 : 0,
        }}
        transition={reduceMotion ? { duration: 0 } : springTransition}
      />

      {/* Pílula de Texto - Mobile-First Sizing */}
      <motion.div
        className="
          relative z-10 
          flex items-center justify-center 
          h-12 sm:h-14 lg:h-[68px]
          pl-5 pr-4 sm:pl-8 sm:pr-6 lg:pl-10 lg:pr-8
          w-[220px] sm:w-[280px] lg:w-[340px]
          text-white 
          shadow-lg
          rounded-full
          select-none
          transition-colors duration-200
          active:translate-y-px
          will-change-transform
        "
        style={{
          backgroundColor: mainColor, // Custom or Default Blue
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
          active:translate-y-px
          will-change-transform
        "
        style={{
          // Circle becomes Purple on hover, otherwise matches Pill
          backgroundColor: isHovered ? 'var(--color-purpleDetails)' : mainColor,
        }}
        variants={arrowVariants}
        initial="initial"
        animate={isHovered ? 'hover' : 'initial'}
        transition={reduceMotion ? { duration: 0 } : springTransition}
      >
        <ArrowUpRight
          className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.div>
    </Component>
  );
};

export default AntigravityCTA;
