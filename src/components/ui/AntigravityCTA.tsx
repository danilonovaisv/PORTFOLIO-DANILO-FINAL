'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * AntigravityCTA - High Fidelity Physics-Based Button
 * Updated to match the "Oval Ends" design from the provided images.
 */

type CTAVariant = 'primary' | 'secondary' | 'ghost';
type CTASize = 'sm' | 'md' | 'lg';

interface AntigravityCTAProps {
  href?: string;
  onClick?: () => void;
  label: string;
  variant?: CTAVariant;
  size?: CTASize;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  hideArrow?: boolean;
}

const springConfig = { type: 'spring' as const, stiffness: 400, damping: 25 };

const variantConfigs: Record<
  CTAVariant,
  {
    pill: string;
    icon: string;
    text: string;
    glow: string;
  }
> = {
  primary: {
    pill: 'bg-[rgb(0,87,255)] border-transparent',
    icon: 'bg-[rgb(0,87,255)] border-none', // Oval pill doesn't need fusion border
    text: 'text-white',
    glow: 'bg-blue-500',
  },
  secondary: {
    pill: 'bg-transparent border border-white/20 group-hover:border-white/40',
    icon: 'bg-transparent border border-white/20 group-hover:border-white/40',
    text: 'text-[rgb(0,87,255)] font-bold',
    glow: 'bg-blue-400/10',
  },
  ghost: {
    pill: 'bg-transparent border border-white/10 backdrop-blur-sm group-hover:bg-white/5',
    icon: 'bg-transparent border border-white/10 backdrop-blur-sm group-hover:bg-white/5',
    text: 'text-white/80 group-hover:text-white',
    glow: 'bg-white/5',
  },
};

const sizeConfigs: Record<
  CTASize,
  {
    height: string;
    padding: string;
    text: string;
    iconWidth: string;
    arrowSize: number;
  }
> = {
  sm: {
    height: 'h-[48px]',
    padding: 'px-6',
    text: 'text-sm',
    iconWidth: 'w-[48px]',
    arrowSize: 20,
  },
  md: {
    height: 'h-[58px]',
    padding: 'px-8',
    text: 'text-base',
    iconWidth: 'w-[58px]',
    arrowSize: 24,
  },
  lg: {
    height: 'h-[64px]',
    padding: 'px-10',
    text: 'text-lg',
    iconWidth: 'w-[64px]',
    arrowSize: 28,
  },
};

export function AntigravityCTA({
  href,
  onClick,
  label,
  variant = 'primary',
  size = 'md',
  className = '',
  ariaLabel,
  external = false,
  type = 'button',
  disabled = false,
  hideArrow = false,
}: AntigravityCTAProps) {
  const prefersReducedMotion = useReducedMotion();
  const styles = variantConfigs[variant];
  const dimensions = sizeConfigs[size];

  const iconVariants: Variants = {
    initial: { rotate: -45, x: 0 },
    hover: {
      rotate: 0,
      x: hideArrow ? 0 : 8,
      transition: springConfig,
    },
  };

  const content = (
    <>
      {/* 1. GLOW EFFECT */}
      <div
        className={cn(
          'absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 scale-95 group-hover:scale-110 blur-xl pointer-events-none',
          styles.glow
        )}
      />

      {/* 2. PILL (Always Rounded-Full) */}
      <div
        className={cn(
          'relative z-10 flex items-center justify-center h-full transition-all duration-300 rounded-full border',
          dimensions.padding,
          styles.pill,
          styles.text
        )}
      >
        <span
          className={cn(
            dimensions.text,
            'font-medium tracking-wide whitespace-nowrap lowercase'
          )}
        >
          {label}
        </span>
      </div>

      {/* 3. CORE (Separate Circle Icon) */}
      {!hideArrow && (
        <motion.div
          className={cn(
            'relative z-20 flex items-center justify-center h-full aspect-square -ml-2 transition-all duration-300 rounded-full border',
            dimensions.iconWidth,
            styles.icon,
            styles.text
          )}
          variants={iconVariants}
        >
          <ArrowUpRight size={dimensions.arrowSize} strokeWidth={2.5} />
        </motion.div>
      )}
    </>
  );

  const sharedProps = {
    className: cn(
      'relative group inline-flex items-center cursor-pointer focus:outline-none z-50',
      dimensions.height,
      disabled && 'opacity-50 pointer-events-none',
      className
    ),
    initial: 'initial',
    whileHover: prefersReducedMotion ? 'initial' : 'hover',
    whileTap: prefersReducedMotion ? 'initial' : 'press',
    animate: 'initial',
    'aria-label': ariaLabel || label,
  };

  const pressEffect = {
    scale: 0.97,
    transition: { type: 'spring' as const, stiffness: 500, damping: 15 },
  };

  if (href) {
    const isExternal =
      external || href.startsWith('http') || href.startsWith('mailto:');

    if (href.startsWith('/') || href.startsWith('#')) {
      return (
        <motion.div
          {...sharedProps}
          whileHover={prefersReducedMotion ? {} : { y: -4 }}
          whileTap={prefersReducedMotion ? {} : pressEffect}
          transition={springConfig}
        >
          <Link href={href} className="flex h-full items-center">
            {content}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...sharedProps}
        whileHover={prefersReducedMotion ? {} : { y: -4 }}
        whileTap={prefersReducedMotion ? {} : pressEffect}
        transition={springConfig}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...sharedProps}
      whileHover={prefersReducedMotion ? {} : { y: -4 }}
      whileTap={prefersReducedMotion ? {} : pressEffect}
      transition={springConfig}
    >
      {content}
    </motion.button>
  );
}

export default AntigravityCTA;
