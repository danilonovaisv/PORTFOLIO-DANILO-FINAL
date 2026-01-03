'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface MobilePreLayersProps {
  accentColor: string;
}

const MobilePreLayers = forwardRef<HTMLDivElement, MobilePreLayersProps>(
  ({ accentColor }, ref) => {
    // Ghost theme colors for pre-layers using CSS variables fallback
    const preLayerColors = [
      'var(--color-ghost-prelayer-1, #0a0b1a)',
      'var(--color-ghost-prelayer-2, #0d0f26)',
      accentColor + '20',
    ];

    return (
      <div
        ref={ref}
        className="fixed top-0 right-0 bottom-0 w-full pointer-events-none z-40"
        aria-hidden="true"
      >
        {preLayerColors.map((color, i) => (
          <motion.div
            key={i}
            className="sm-prelayer absolute top-0 right-0 h-full w-full"
            initial={false}
            animate={{ backgroundColor: color }}
          />
        ))}
      </div>
    );
  }
);

MobilePreLayers.displayName = 'MobilePreLayers';
export default MobilePreLayers;
