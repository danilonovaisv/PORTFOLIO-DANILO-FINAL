'use client';

/**
 * SplitText — Fragmenta texto em motion.span individuais.
 *
 * Estratégia:
 * • Usa React tree (não dangerouslySetInnerHTML) — layout estável durante scroll.
 * • Palavras/chars como motion.span com display:inline-block para stagger.
 * • aria-hidden no container visual; componente pai deve prover aria-label.
 *
 * Modos:
 *   'words' — split por espaço (padrão, melhor para h1)
 *   'chars' — split por caractere (manifesto, hero)
 *   'lines' — split por \n (texto pré-quebrado)
 */

import { type HTMLMotionProps, motion } from 'motion/react';
import React from 'react';

export type SplitTextMode = 'chars' | 'words' | 'lines';

interface SplitTextProps extends HTMLMotionProps<'span'> {
  text: string;
  mode?: SplitTextMode;
  className?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  mode = 'words',
  className,
  ...props
}) => {
  const getItems = (): string[] => {
    switch (mode) {
      case 'chars':
        return text.split('');
      case 'words':
        return text.split(/\s+/).filter(Boolean);
      case 'lines':
        return text.split('\n').filter(Boolean);
      default:
        return text.split(/\s+/).filter(Boolean);
    }
  };

  const items = getItems();

  return React.createElement(
    'span',
    { className, 'aria-hidden': 'true' },
    items.map((item, index) =>
      React.createElement(
        motion.span,
        {
          key: `${item}-${index}`,
          style: { display: 'inline-block' },
          className:
            mode === 'words' || mode === 'lines' ? 'mr-[0.25em] last:mr-0' : '',
          ...props,
        },
        item
      )
    )
  );
};
