'use client';

import React, { forwardRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { BRAND } from '@/config/brand';

type ManifestoThumbProps = {
  muted?: boolean;
};

const ManifestoThumb = forwardRef<HTMLVideoElement, ManifestoThumbProps>(
  ({ muted = true }, ref) => {
    const reducedMotion = useReducedMotion();

    return (
      <motion.video
        ref={ref}
        src={BRAND.video.manifesto}
        autoPlay
        muted={muted}
        loop
        playsInline
        className="h-full w-full cursor-pointer object-cover"
        aria-label="Manifesto video presentation"
        whileHover={reducedMotion ? undefined : { scale: 1.05 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    );
  }
);

ManifestoThumb.displayName = 'ManifestoThumb';

export default ManifestoThumb;
