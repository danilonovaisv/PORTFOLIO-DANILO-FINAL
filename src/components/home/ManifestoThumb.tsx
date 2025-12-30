'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { BRAND } from '@/config/brand';

type ManifestoThumbProps = {
  muted?: boolean;
};

const ManifestoThumb = forwardRef<HTMLVideoElement, ManifestoThumbProps>(
  ({ muted = true }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="w-full h-full"
      >
        <motion.video
          ref={ref}
          src={BRAND.video.manifesto}
          autoPlay
          muted={muted}
          loop
          playsInline
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            // Hardware acceleration
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
          }}
        />
      </motion.div>
    );
  }
);

ManifestoThumb.displayName = 'ManifestoThumb';

export default ManifestoThumb;
