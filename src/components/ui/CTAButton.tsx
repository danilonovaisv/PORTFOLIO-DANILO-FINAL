'use client';

import { useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

/**
 * CTAButton Component - Compound Pill Standard
 *
 * Structure:
 * - Text Container: Full pill shape (rounded-full)
 * - Icon Container: Circular badge overlapping on right side
 *
 * Animation:
 * - Hover: translateY(-1px), ease-out, 200ms
 * - Arrow: rotates from -45deg to 0deg on hover
 * - Respects prefers-reduced-motion
 */
export const CTAButton: React.FC<CTAButtonProps> = ({
  href,
  children,
  variant = 'primary',
  className = '',
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

  // Check if it's an internal link (starts with / or #)
  const isInternalLink = href.startsWith('/') || href.startsWith('#');

  const buttonContent = (
    <>
      {/* Text Container - Full Pill Shape */}
      <span
        className={`inline-flex items-center px-10 py-4 ${v.bg} ${v.text} font-medium uppercase tracking-wide text-base rounded-full`}
      >
        {children}
      </span>

      {/* Icon Container - Circular Badge Overlapping Right */}
      <span
        className={`flex items-center justify-center w-14 h-14 ${v.iconBg} text-white rounded-full -ml-5 z-10`}
      >
        <ArrowRight
          className={`w-5 h-5 -rotate-45 ${
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
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ghost-green focus-visible:ring-offset-4 focus-visible:ring-offset-transparent
    ${className}
  `;

  if (isInternalLink) {
    return (
      <Link href={href} className={baseClasses}>
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
    >
      {buttonContent}
    </a>
  );
};

export default CTAButton;
