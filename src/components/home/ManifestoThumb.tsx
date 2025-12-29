'use client';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BRAND } from '@/config/brand';

type ManifestoThumbProps = {
  muted?: boolean;
};

const ManifestoThumb = forwardRef<HTMLVideoElement, ManifestoThumbProps>(
  ({ muted = true }, ref) => {
    const reducedMotion = useReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
      const element = containerRef.current;
      if (!element) return;

      // Intersection Observer for performance
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Once animated, we can disconnect
            observer.disconnect();
          }
        },
        {
          threshold: 0.1,
          rootMargin: '50px',
        }
      );

      observer.observe(element);

      return () => observer.disconnect();
    }, []);

    return (
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden aspect-video"
      >
        <motion.div
          className="relative h-full w-full"
          initial={{
            opacity: 0,
            scale: 1.1,
            filter: 'blur(4px)',
          }}
          animate={
            isInView
              ? {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
              }
              : undefined
          }
          transition={{
            duration: reducedMotion ? 0.3 : 1.2,
            ease: [0.25, 0.1, 0.25, 1], // cubic-bezier(0.25, 0.1, 0.25, 1)
          }}
        >
          <motion.video
            ref={ref}
            src={BRAND.video.manifesto}
            autoPlay
            muted={muted}
            loop
            playsInline
            className="h-full w-full cursor-pointer object-cover"
            aria-label="Manifesto video presentation"
            whileHover={reducedMotion ? undefined : { scale: 1.02 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              // Hardware acceleration
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform',
            }}
          />

          {/* Subtle gradient overlay for text readability */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
        </motion.div>
      </div>
    );
  }
);

ManifestoThumb.displayName = 'ManifestoThumb';

export default ManifestoThumb;
