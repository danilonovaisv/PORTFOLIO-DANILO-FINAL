'use client';

import React, { forwardRef } from 'react';
import Link from 'next/link';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const MotionLink = motion.create(Link);

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  loading?: boolean;
  asExternal?: boolean;
  target?: string;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      href,
      loading,
      disabled,
      children,
      asExternal,
      target,
      ...props
    },
    ref
  ) => {
    // Base Classes
    const baseStyles =
      'inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 ring-offset-white disabled:pointer-events-none disabled:opacity-50 select-none';

    // Variants
    const variants = {
      primary:
        'bg-[#0057FF] text-white shadow-lg shadow-[#0057FF]/25 hover:shadow-[#0057FF]/40 border border-transparent',
      secondary:
        'bg-white text-[#111111] border border-neutral-200 hover:bg-neutral-50 shadow-sm',
      outline:
        'bg-transparent text-[#111111] border border-neutral-200 hover:bg-neutral-50 hover:text-black',
      ghost: 'bg-transparent text-[#111111] hover:bg-neutral-100',
      link: 'text-[#0057FF] hover:underline underline-offset-4 p-0 h-auto font-medium shadow-none',
    };

    // Sizes
    const sizes = {
      sm: 'min-h-[36px] h-auto py-2 px-4 text-xs font-bold uppercase tracking-wider',
      md: 'min-h-[44px] h-auto py-2.5 px-6 text-sm font-semibold',
      lg: 'min-h-[56px] h-auto py-4 px-8 text-base md:text-lg font-semibold',
      xl: 'min-h-[64px] h-auto py-5 px-10 text-lg md:text-xl font-bold',
      icon: 'h-11 w-11 p-0',
    };

    const combinedClassName = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      // Text wrapping logic for long labels
      size !== 'icon' && 'text-center text-balance',
      className
    );

    // Motion Props for "Premium" feel (only for solid/outline buttons usually)
    const isInteractive = variant !== 'link' && !disabled && !loading;
    const motionProps = isInteractive
      ? {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
        }
      : {};

    const content = (
      <>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </>
    );

    // 1. Link Logic
    if (href) {
      if (asExternal) {
        return (
          <motion.a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            className={combinedClassName}
            {...motionProps}
            {...(props as unknown as HTMLMotionProps<'a'>)}
          >
            {content}
          </motion.a>
        );
      }
      return (
        <MotionLink
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClassName}
          {...motionProps}
          {...(props as unknown as HTMLMotionProps<'a'>)}
        >
          {content}
        </MotionLink>
      );
    }

    // 2. Button Logic
    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        disabled={disabled || loading}
        {...motionProps}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
