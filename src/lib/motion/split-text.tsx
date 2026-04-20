'use client';

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
  const getSplitArray = () => {
    switch (mode) {
      case 'chars':
        return text.split('');
      case 'words':
        return text.split(/\s+/).filter(Boolean);
      case 'lines':
        return text.split('\n');
      default:
        return text.split(/\s+/);
    }
  };

  const items = getSplitArray();

  return (
    <span className={className} aria-hidden="true">
      {items.map((item, index) => (
        <motion.span
          key={`${item}-${index}`}
          className={
            mode === 'words' || mode === 'lines'
              ? 'inline-block mr-[0.25em]'
              : ''
          }
          style={{ display: 'inline-block' }}
          {...props}
        >
          {item}
        </motion.span>
      ))}
    </span>
  );
};
