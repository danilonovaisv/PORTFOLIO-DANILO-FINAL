'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { ASSETS } from '@/lib/constants';

interface ManifestoThumbProps {
  scrollProgress?: MotionValue<number>;
  isMobile?: boolean;
}

const BASE_DESKTOP_WIDTH = 300;
const MOBILE_MAX_WIDTH = 420;
const ASPECT_RATIO = 9 / 16;

export default function ManifestoThumb({
  scrollProgress,
  isMobile = false,
}: ManifestoThumbProps) {
  const fallbackProgress = useMotionValue(0);
  const progress = scrollProgress ?? fallbackProgress;
  const prefersReducedMotion = useReducedMotion();

  const [targetScale, setTargetScale] = useState(4);
  const [baseWidth, setBaseWidth] = useState<number>(
    isMobile ? MOBILE_MAX_WIDTH : BASE_DESKTOP_WIDTH
  );

  useEffect(() => {
    const updateScaleTarget = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const initialWidth = isMobile
        ? Math.min(viewportWidth * 0.9, MOBILE_MAX_WIDTH)
        : BASE_DESKTOP_WIDTH;
      const initialHeight = initialWidth * ASPECT_RATIO;
      const scaleToWidth = viewportWidth / initialWidth;
      const scaleToHeight = viewportHeight / initialHeight;
      setBaseWidth(initialWidth);
      setTargetScale(
        isMobile
          ? Math.max(1.05, Math.max(scaleToWidth, scaleToHeight))
          : Math.max(scaleToWidth, scaleToHeight)
      );
    };

    updateScaleTarget();
    window.addEventListener('resize', updateScaleTarget);
    return () => window.removeEventListener('resize', updateScaleTarget);
  }, [isMobile]);

  const scale = useTransform(progress, [0, 1], [1, targetScale]);
  const borderRadius = useTransform(progress, [0, 1], [isMobile ? 8 : 16, 0]);

  const sizingClasses = useMemo(
    () =>
      prefersReducedMotion
        ? 'w-screen h-screen'
        : isMobile
          ? 'w-[90vw] max-w-[420px]'
          : 'max-w-[360px]',
    [prefersReducedMotion, isMobile]
  );

  const sizingStyle = prefersReducedMotion
    ? undefined
    : {
        width: isMobile ? undefined : baseWidth,
        aspectRatio: '16 / 9',
      };

  const motionStyle = prefersReducedMotion
    ? {
        borderRadius: 0,
        transform: 'none',
      }
    : {
        scale,
        borderRadius,
        transformOrigin: 'bottom right',
        willChange: 'transform, border-radius',
      };

  return (
    <div
      className="relative h-full w-full flex items-end justify-end pointer-events-none"
      role="region"
      aria-label="Manifesto video"
    >
      <motion.div
        style={{ ...motionStyle, ...sizingStyle }}
        className={`relative overflow-hidden bg-black shadow-2xl pointer-events-none ${sizingClasses}`}
      >
        <video
          src={ASSETS.videoManifesto}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Manifesto video presentation"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 pointer-events-none bg-black/10" />
      </motion.div>
    </div>
  );
}
