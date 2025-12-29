'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BRAND } from '@/config/brand';

export default function ManifestoSection() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement | null>(null);
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
    <section
      id="manifesto"
      ref={containerRef}
      className="block md:hidden w-full bg-ghost-void overflow-hidden"
      style={{ aspectRatio: '16/9' }}
      aria-label="Manifesto (vídeo)"
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
        <video
          src={BRAND.video.manifesto}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            // Hardware acceleration
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
          }}
        />

        {/* Subtle gradient overlay for text readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </motion.div>
    </section>
  );
}
