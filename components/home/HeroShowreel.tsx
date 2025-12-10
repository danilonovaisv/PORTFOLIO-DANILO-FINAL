'use client';

import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import React, { useMemo, useRef } from 'react';

export type HeroShowreelProps = {
  videoSrc: string;
  posterSrc?: string;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  shouldLoad?: boolean;
  hasError?: boolean;
  onError?: () => void;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  overlayContent?: React.ReactNode;
  prefersReducedMotion?: boolean;
};

const SPRING_STIFFNESS = 120;
const SPRING_DAMPING = 24;

export default function HeroShowreel({
  videoSrc,
  posterSrc,
  videoRef,
  shouldLoad = true,
  hasError,
  onError,
  loadingFallback,
  errorFallback,
  overlayContent,
  prefersReducedMotion,
}: HeroShowreelProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end start'],
  });

  const easedProgress = useSpring(scrollYProgress, {
    stiffness: SPRING_STIFFNESS,
    damping: SPRING_DAMPING,
    mass: 0.9,
  });

  const scale = useTransform(
    easedProgress,
    [0, 0.65],
    prefersReducedMotion ? [1, 1] : [0.95, 1.06]
  );
  const borderRadius = useTransform(easedProgress, [0, 0.65], [24, 0]);
  const maxWidth = useTransform(easedProgress, [0, 0.65], ['1200px', '100vw']);
  const opacity = useTransform(easedProgress, [0, 0.2], [0.9, 1]);
  const shadowIntensity = useTransform(easedProgress, [0, 0.65], [0.24, 0.06]);
  const boxShadow = useMotionTemplate`0 28px 120px rgba(0,0,0,${shadowIntensity})`;

  const videoContent = useMemo(() => {
    if (hasError) return errorFallback;
    if (!shouldLoad) return loadingFallback;

    return (
      <video
        ref={videoRef as React.RefObject<HTMLVideoElement> | undefined}
        src={videoSrc}
        poster={posterSrc}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        controls={false}
        onError={onError}
        aria-label="Showreel manifesto de Danilo Novais"
        title="Showreel manifesto de Danilo Novais"
      />
    );
  }, [
    errorFallback,
    hasError,
    loadingFallback,
    onError,
    posterSrc,
    shouldLoad,
    videoRef,
    videoSrc,
  ]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-visible pb-16 pt-8"
    >
      <motion.div
        style={{
          scale,
          borderRadius,
          maxWidth,
          opacity,
          boxShadow,
        }}
        className="relative mx-auto h-[60vh] min-h-[360px] w-full overflow-hidden bg-black will-change-[transform,border-radius]"
      >
        {videoContent}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/40" />
        {overlayContent ? (
          <div className="absolute inset-0">{overlayContent}</div>
        ) : null}
      </motion.div>
    </div>
  );
}
