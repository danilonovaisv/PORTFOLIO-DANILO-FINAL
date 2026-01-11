'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * AntigravityCTA - Compound Fusion Button
 *
 * Design Spec (Workflow "Compound Fusion"):
 * - Container: flex, h-[64px], gap-[-1px] for seamless fusion
 * - Pill (left): rounded-l-full, bg-[rgb(0,87,255)]
 * - Icon Sphere (right): aspect-square, rounded-r-full
 * - Hover: -translate-y-px, 200ms ease-out
 * - Color transition: 300ms (slower than movement for "trail" effect)
 *
 * Variants:
 * - primary: Blue background, white text
 * - secondary: Transparent with blue border, blue text
 * - ghost: Transparent with subtle border
 */

type CTAVariant = 'primary' | 'secondary' | 'ghost';
type CTASize = 'sm' | 'md' | 'lg';

interface AntigravityCTAProps {
  /** Link destination (internal or external) */
  href?: string;
  /** Click handler (if no href) */
  onClick?: () => void;
  /** Button label */
  label: string;
  /** Visual variant */
  variant?: CTAVariant;
  /** Size variant */
  size?: CTASize;
  /** Additional CSS classes */
  className?: string;
  /** Aria label for accessibility */
  ariaLabel?: string;
  /** Whether to open in new tab (for external links) */
  external?: boolean;
  /** Button type (if used as button) */
  type?: 'button' | 'submit' | 'reset';
  /** Disabled state */
  disabled?: boolean;
  /** Hide the arrow icon */
  hideArrow?: boolean;
  /** Enable showcase-specific idle arrow animation */
  animateArrowIdle?: boolean;
}

// Style configurations per variant
const variantStyles: Record<
  CTAVariant,
  { pill: string; icon: string; text: string }
> = {
  primary: {
    pill: 'bg-[rgb(0,87,255)] group-hover:bg-[rgb(50,120,255)] shadow-[0_0_30px_-5px_rgba(0,87,255,0.5)]',
    icon: 'bg-[rgb(0,87,255)] group-hover:bg-[rgb(50,120,255)] shadow-[0_0_30px_-5px_rgba(0,87,255,0.5)]',
    text: 'text-white',
  },
  secondary: {
    pill: 'bg-transparent border-2 border-[rgb(0,87,255)] group-hover:bg-[rgb(0,87,255)]/10 shadow-[0_0_20px_-8px_rgba(0,87,255,0.3)]',
    icon: 'bg-transparent border-2 border-[rgb(0,87,255)] group-hover:bg-[rgb(0,87,255)]/10',
    text: 'text-[rgb(0,87,255)] group-hover:text-[rgb(0,87,255)]',
  },
  ghost: {
    pill: 'bg-transparent border border-white/20 backdrop-blur-sm group-hover:bg-white/5',
    icon: 'bg-transparent border border-white/20 backdrop-blur-sm group-hover:bg-white/5',
    text: 'text-white/90 group-hover:text-white',
  },
};

// Size configurations
const sizeStyles: Record<
  CTASize,
  {
    height: string;
    padding: string;
    iconSize: string;
    text: string;
    arrow: string;
  }
> = {
  sm: {
    height: 'h-[48px]',
    padding: 'pl-5 pr-3',
    iconSize: 'w-[48px]', // aspect-square handled by h-full and aspect-square
    text: 'text-sm',
    arrow: 'w-4 h-4',
  },
  md: {
    height: 'h-[58px]',
    padding: 'pl-7 pr-4',
    iconSize: 'w-[58px]',
    text: 'text-base',
    arrow: 'w-5 h-5',
  },
  lg: {
    height: 'h-[64px]',
    padding: 'pl-8 pr-4',
    iconSize: 'w-[64px]',
    text: 'text-lg',
    arrow: 'w-6 h-6',
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
  animateArrowIdle = false,
}: AntigravityCTAProps) {
  const prefersReducedMotion = useReducedMotion();

  const styles = variantStyles[variant];
  const sizes = sizeStyles[size];

  // Animation classes
  const motionClasses = prefersReducedMotion
    ? ''
    : 'transition-transform duration-200 ease-out hover:-translate-y-px active:translate-y-0';
  const arrowAnimationClasses =
    animateArrowIdle && !prefersReducedMotion
      ? 'animate-showcase-arrow-idle group-hover:animate-none'
      : '';

  // Shared content for both link and button
  const content = (
    <>
      {/* NÓ 1: CÁPSULA DE TEXTO (Esquerda) */}
      <div
        className={`
          flex items-center justify-center
          h-full
          ${sizes.padding}
          ${styles.pill}
          ${styles.text}
          ${hideArrow ? 'rounded-full' : 'rounded-l-full'}
          transition-colors duration-300
        `}
      >
        <span
          className={`${sizes.text} font-medium tracking-wide whitespace-nowrap lowercase`}
        >
          {label}
        </span>
      </div>

      {/* NÓ 2: ESFERA DO ÍCONE (Direita) */}
      {!hideArrow && (
        <div
          className={`
            flex items-center justify-center
            h-full aspect-square
            ${styles.icon}
            ${styles.text}
            rounded-r-full
            transition-all duration-300
          `}
        >
          <ArrowUpRight
            className={`${sizes.arrow} transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 ${arrowAnimationClasses}`}
            strokeWidth={2}
          />
        </div>
      )}
    </>
  );

  // Base container classes
  const containerClasses = `
    group
    relative
    inline-flex flex-row items-center justify-center
    ${sizes.height}
    cursor-pointer
    ${motionClasses}
    ${disabled ? 'opacity-50 pointer-events-none' : ''}
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  // If it's a link
  if (href) {
    const isExternal =
      external ||
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:');
    const isInternal = href.startsWith('/') || href.startsWith('#');

    if (isInternal && !isExternal) {
      return (
        <Link
          href={href}
          className={containerClasses}
          aria-label={ariaLabel || label}
        >
          {content}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={containerClasses}
        aria-label={ariaLabel || label}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  // If it's a button
  return (
    <button
      type={type}
      onClick={onClick}
      className={containerClasses}
      aria-label={ariaLabel || label}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

export default AntigravityCTA;
