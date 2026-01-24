'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface MobilePreLayersProps {
  accentColor: string;
}

const MobilePreLayers = forwardRef<HTMLDivElement, MobilePreLayersProps>(
  (_, ref) => {
    // Ghost theme colors for pre-layers using CSS variables fallback
    const preLayerColors = [
      '#4fe6ff', // blueAccent
      '#8705f2', // purpleDetails
      '#f501d3', // Pink vibrant
    ];

    return (
      <div
        ref={ref}
        className="fixed top-0 right-0 bottom-0 w-full pointer-events-none z-49"
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
