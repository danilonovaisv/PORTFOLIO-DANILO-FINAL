'use client';

import { motion } from 'framer-motion';

export interface SplitTextProps {
  text: string;
  className?: string;
  stagger?: number;
  trigger?: boolean;
}

export function SplitText({ text, className = '', stagger = 0.04, trigger = true }: SplitTextProps) {
  // Fragmenta em palavras ou caracteres
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: '0%',
      rotate: 0,
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: '100%',
      rotate: 5,
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate={trigger ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden" style={{ paddingRight: '0.25em', display: 'inline-block' }}>
          <motion.span variants={child} className="inline-block" style={{ transformOrigin: 'bottom left' }}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
