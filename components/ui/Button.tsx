'use client';

import React from 'react';
import Link from 'next/link';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: boolean;
}

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      className = '',
      variant = 'primary',
      href,
      icon = true,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      'group relative rounded-full pl-8 pr-6 py-4 flex items-center gap-3 font-semibold text-base md:text-lg transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0057FF]/30';

    // Variants
    const variants = {
      primary:
        'bg-[#0057FF] text-white shadow-xl shadow-[#0057FF]/20 hover:shadow-[#0057FF]/40',
      secondary:
        'bg-[#111111] text-white shadow-xl shadow-black/20 hover:shadow-black/40',
      outline:
        'bg-transparent border-2 border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white',
    };

    const styles = `${baseStyles} ${variants[variant]} ${className}`;

    const content = (
      <>
        {children}
        {icon && (
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
            <ArrowRight className="w-4 h-4 text-current" />
          </span>
        )}
      </>
    );

    const animationProps = {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.98 },
    };

    if (href) {
      return (
        <motion.div {...animationProps} className="inline-block">
          <Link
            href={href}
            className={styles}
            ref={ref as React.Ref<HTMLAnchorElement>}
          >
            {content}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={styles}
        {...animationProps}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
