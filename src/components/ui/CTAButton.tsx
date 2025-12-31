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
      bg: 'bg-[#0048ff]',
      text: 'text-white',
      iconBg: 'bg-[#0048ff]',
    },
    secondary: {
      bg: 'bg-transparent border-2 border-[#0048ff]',
      text: 'text-[#0048ff]',
      iconBg: 'bg-[#0048ff]',
    },
    accent: {
      bg: 'bg-[#4fe6ff]',
      text: 'text-[#0e0e0e]',
      iconBg: 'bg-[#0048ff]',
    },
  };

  const v = variants[variant];

  // Check if it's an internal link (starts with / or #)
  const isInternalLink = href.startsWith('/') || href.startsWith('#');

  const buttonContent = (
    <>
      {/* Text Container - Full Pill Shape */}
      <span
        className={`inline-flex items-center px-8 py-3 ${v.bg} ${v.text} font-medium uppercase tracking-wide text-sm rounded-full`}
      >
        {children}
      </span>

      {/* Icon Container - Circular Badge Overlapping Right */}
      <span
        className={`flex items-center justify-center w-12 h-12 ${v.iconBg} text-white rounded-full -ml-4`}
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
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4fe6ff] focus-visible:ring-offset-4 focus-visible:ring-offset-transparent
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
