'use client';

import React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

// Configuração da Animação
const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
  }),
};

const childVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    y: 20, // O texto vem ligeiramente de baixo (slide up)
  },
};

interface EditorialTextProps extends HTMLMotionProps<'div'> {
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
}

export default function EditorialText({
  text,
  as: Component = 'div',
  className = '',
  delay = 1,
  ...props
}: EditorialTextProps) {
  const prefersReducedMotion = useReducedMotion();

  // Dividimos o texto em palavras para animar uma a uma
  // Preserva espaços para garantir layout correto
  const words = text.split(' ');

  if (prefersReducedMotion) {
    const Tag = Component as any;
    return (
      <Tag className={className} {...props}>
        {text}
      </Tag>
    );
  }

  return (
    <motion.div
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px' }}
      custom={delay}
      className={className}
      {...props}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
