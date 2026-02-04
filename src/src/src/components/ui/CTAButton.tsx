/**
 * @deprecated Use `AntigravityCTA` instead for consistent CTA styling across the app.
 * This component is kept for backward compatibility but should not be used for new implementations.
 * The AntigravityCTA follows the "Compound Fusion" design pattern.
 */
'use client';

import { useId } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CTAButtonProps {
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactNode;
  // Adicionado 'ghost' à tipagem
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  className?: string;
  id?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  href,
  onClick,
  type = 'button',
  disabled = false,
  children,
  variant = 'primary',
  className = '',
  id,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const generatedId = useId();
  const uniqueId = id || `cta-btn-${generatedId.replace(/:/g, '')}`;

  const variants = {
    primary: {
      bg: 'bg-ghost-blue shadow-[0_0_30px_-5px_rgba(0,87,255,0.6)]',
      text: 'text-white',
      iconBg: 'bg-ghost-blue shadow-[0_0_30px_-5px_rgba(0,87,255,0.6)]',
    },
    secondary: {
      bg: 'bg-transparent border-2 border-ghost-blue shadow-[0_0_20px_-5px_rgba(0,87,255,0.2)]',
      text: 'text-ghost-blue',
      iconBg: 'bg-ghost-blue shadow-[0_0_20px_-5px_rgba(0,87,255,0.2)]',
    },
    accent: {
      bg: 'bg-ghost-green shadow-[0_0_30px_-5px_rgba(79,230,255,0.5)]',
      text: 'text-secondary',
      iconBg: 'bg-ghost-blue',
    },
    // Nova variante Ghost (Minimalista/Transparente)
    ghost: {
      bg: 'bg-transparent hover:bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg',
      text: 'text-white/90 hover:text-white',
      iconBg: 'bg-white/10 text-white',
    },
  };

  // Fallback de segurança: se variant não existir, usa primary
  const v = variants[variant] || variants.primary;

  const buttonContent = (
    <>
      <span
        className={`inline-flex items-center px-8 md:px-10 py-3 md:py-4 ${v.bg} ${v.text} font-medium uppercase tracking-wide text-sm md:text-base rounded-full whitespace-nowrap transition-all duration-300`}
      >
        {children}
      </span>

      <span
        className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 ${v.iconBg} text-white rounded-full -ml-4 md:-ml-5 z-10 transition-all duration-300`}
      >
        <ArrowRight
          className={`w-4 h-4 md:w-5 md:h-5 -rotate-45 ${
            prefersReducedMotion
              ? ''
              : 'transition-transform duration-300 group-hover:rotate-0'
          }`}
        />
      </span>
    </>
  );

  const baseClasses = `
    inline-flex items-center group relative
    ${prefersReducedMotion ? '' : 'hover:-translate-y-px transition ease-out duration-200'}
    ${disabled ? 'opacity-50 pointer-events-none' : ''}
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ghost-green focus-visible:ring-offset-4 focus-visible:ring-offset-transparent
    ${className}
  `;

  if (href) {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    const linkProps = {
      id: uniqueId,
      className: baseClasses,
      href,
      ...(isInternal ? {} : { target: '_blank', rel: 'noopener noreferrer' }),
    };

    if (isInternal) {
      return (
        <Link {...linkProps} role="button">
          {buttonContent}
        </Link>
      );
    }

    return (
      <a {...linkProps} role="button">
        {buttonContent}
      </a>
    );
  }

  const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    id: uniqueId,
    className: baseClasses,
    type,
    onClick,
    disabled,
  };

  return <button {...buttonProps}>{buttonContent}</button>;
};

export default CTAButton;
