'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  arrowAnimation?: boolean;
  className?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  href,
  children,
  variant = 'primary',
  arrowAnimation = true,
  className = '',
}) => {
  const variants = {
    primary: 'bg-[#0048ff] text-white',
    secondary:
      'bg-transparent border-2 border-[#0048ff] text-[#0048ff] hover:bg-[#0048ff] hover:text-white',
    accent: 'bg-[#4fe6ff] text-[#0e0e0e] hover:bg-[#0048ff] hover:text-white',
  };

  return (
    <motion.a
      href={href}
      className={`
        inline-flex items-stretch rounded-full
        font-medium uppercase tracking-wide
        transition-colors duration-300
        focus-visible:outline-2 focus-visible:outline-[#4fe6ff] focus-visible:outline-offset-4
        ${variants[variant]} ${className}
      `}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      <span className="px-6 py-3">{children}</span>
      <motion.span
        className="flex items-center justify-center w-12 h-12 rounded-full"
        whileHover={arrowAnimation ? { x: 4 } : {}}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <ArrowRight className="w-5 h-5" />
      </motion.span>
    </motion.a>
  );
};
