'use client';

import { useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CTAButtonProps {
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
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
  };

  const v = variants[variant];

  const buttonContent = (
    <>
      <span
        className={`inline-flex items-center px-8 md:px-10 py-3 md:py-4 ${v.bg} ${v.text} font-medium uppercase tracking-wide text-sm md:text-base rounded-full whitespace-nowrap`}
      >
        {children}
      </span>

      <span
        className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 ${v.iconBg} text-white rounded-full -ml-4 md:-ml-5 z-10`}
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
    inline-flex items-center group
    ${prefersReducedMotion ? '' : 'hover:-translate-y-px transition ease-out duration-200'}
    ${disabled ? 'opacity-50 pointer-events-none' : ''}
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ghost-green focus-visible:ring-offset-4 focus-visible:ring-offset-transparent
    ${className}
  `;

  if (href) {
    const isInternalLink = href.startsWith('/') || href.startsWith('#');
    if (isInternalLink) {
      return (
        <Link href={href} className={baseClasses} id={id}>
          {buttonContent}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        id={id}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {buttonContent}
    </button>
  );
};

export default CTAButton;
