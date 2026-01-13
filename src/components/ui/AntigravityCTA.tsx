'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * AntigravityCTA - High Fidelity Physics-Based Button
 * Updated to match the "Oval Ends" design from the provided images.
 * Implements "Ghost Design" Lo&Behold replica physics and visual style.
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

// Physics tuned for "Antigravity" feel (bouncy but controlled)
const springConfig = { type: 'spring' as const, stiffness: 450, damping: 22 };

const variantConfigs: Record<
  CTAVariant,
  {
    pill: string; // Styles for the text container
    icon: string; // Styles for the icon container
    text: string; // Text color/style
    glow: string; // Background glow effect
    fusion: boolean; // Whether to apply the negative margin fusion effect
  }
> = {
  primary: {
    // Lo&Behold Style: Blue filled, fusion effect
    pill: 'bg-[rgb(0,87,255)]/90 backdrop-blur-sm border-transparent rounded-l-full rounded-r-none z-10',
    icon: 'bg-[rgb(0,87,255)]/90 backdrop-blur-sm border-none rounded-full border-l-4 border-[rgb(0,87,255)]/90 z-20 shadow-2xl',
    text: 'text-white',
    glow: 'bg-gradient-to-r from-blue-500 to-purple-600',
    fusion: true,
  },
  secondary: {
    // Border style, separated elements (no fusion)
    pill: 'bg-transparent border border-white/20 group-hover:border-white/40 rounded-full',
    icon: 'bg-transparent border border-white/20 group-hover:border-white/40 rounded-full',
    text: 'text-[rgb(0,87,255)] font-bold',
    glow: 'bg-blue-400/10',
    fusion: false,
  },
  ghost: {
    // Subtle style
    pill: 'bg-transparent border border-white/10 backdrop-blur-sm group-hover:bg-white/5 rounded-full',
    icon: 'bg-transparent border border-white/10 backdrop-blur-sm group-hover:bg-white/5 rounded-full',
    text: 'text-white/80 group-hover:text-white',
    glow: 'bg-white/5',
    fusion: false,
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
    iconMargin: string; // Overlap amount
  }
> = {
  sm: {
    height: 'h-[48px]',
    padding: 'px-6',
    text: 'text-sm',
    iconWidth: 'w-[48px]',
    arrowSize: 20,
    iconMargin: '-ml-3',
  },
  md: {
    height: 'h-[58px]',
    padding: 'px-8',
    text: 'text-base',
    iconWidth: 'w-[58px]',
    arrowSize: 24,
    iconMargin: '-ml-3.5',
  },
  lg: {
    height: 'h-[64px]',
    padding: 'px-10 pr-6', // Adjusted padding for fusion look
    text: 'text-lg',
    iconWidth: 'w-[64px]',
    arrowSize: 28,
    iconMargin: '-ml-4',
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

  // Specific motion variants for the icon
  const iconVariants: Variants = {
    initial: { rotate: -45, x: 0, strokeWidth: 2.5 },
    hover: {
      rotate: 0,
      x: hideArrow ? 0 : 8, // Move icon right on hover
      strokeWidth: 3.5, // Thicker stroke on hover
      transition: springConfig,
    },
  };

  const content = (
    <>
      {/* 1. GLOW EFFECT (Atmospheric) */}
      <div
        className={cn(
          'absolute inset-0 rounded-full blur-xl pointer-events-none transition-all duration-300',
          'opacity-0 group-hover:opacity-70',
          'scale-[0.9] group-hover:scale-[1.12]',
          variant === 'primary'
            ? 'drop-shadow-none group-hover:drop-shadow-[0_0_32px_rgba(0,87,255,0.8)]'
            : '',
          styles.glow
        )}
      />

      {/* 2. PILL (Text Container) */}
      <div
        className={cn(
          'flex items-center justify-center transition-all duration-300 shadow-lg',
          dimensions.height,
          dimensions.padding,
          styles.pill,
          styles.text,
          // If not fusion, strict full rounded. If fusion, regulated by variant config (handled there)
          !styles.fusion && 'rounded-full'
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

      {/* 3. CORE (Icon Container) */}
      {!hideArrow && (
        <motion.div
          className={cn(
            'flex items-center justify-center transition-all duration-300',
            dimensions.height,
            dimensions.iconWidth,
            styles.fusion ? dimensions.iconMargin : 'ml-2', // Apply negative margin only for fusion
            styles.icon,
            styles.text,
            // If not fusion, strict full rounded
            !styles.fusion && 'rounded-full border'
          )}
          variants={iconVariants}
        >
          <ArrowUpRight size={dimensions.arrowSize} />
        </motion.div>
      )}
    </>
  );

  const sharedProps = {
    className: cn(
      'relative group inline-flex items-center justify-center cursor-pointer focus:outline-none z-50', // Added justify-center
      disabled && 'opacity-50 pointer-events-none',
      className
    ),
    initial: 'initial',
    whileHover: prefersReducedMotion ? 'initial' : 'hover',
    whileTap: prefersReducedMotion ? 'initial' : 'press',
    animate: 'initial',
    'aria-label': ariaLabel || label,
  };

  const hoverEffect = {
    y: -6, // Elevation
    scale: 1.02, // Subtle grow
    transition: springConfig,
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
          whileHover={prefersReducedMotion ? {} : hoverEffect}
          whileTap={prefersReducedMotion ? {} : pressEffect}
        >
          <Link href={href} className="flex items-center">
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
        whileHover={prefersReducedMotion ? {} : hoverEffect}
        whileTap={prefersReducedMotion ? {} : pressEffect}
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
      whileHover={prefersReducedMotion ? {} : hoverEffect}
      whileTap={prefersReducedMotion ? {} : pressEffect}
    >
      {content}
    </motion.button>
  );
}

export default AntigravityCTA;
