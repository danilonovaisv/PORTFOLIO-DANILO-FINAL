'use client';

import React, { useRef } from 'react';
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useTransform,
  useMotionValue,
} from 'framer-motion';
import { ASSETS } from '../../lib/constants';
import { ArrowDownRight } from 'lucide-react';

interface ManifestoThumbProps {
  style?: {
    scale: MotionValue<number>;
    x: MotionValue<string>;
    y: MotionValue<string>;
    borderRadius: MotionValue<number>;
    opacity?: MotionValue<number>;
  };
  scrollProgress?: MotionValue<number>;
}

const ManifestoThumb: React.FC<ManifestoThumbProps> = ({
  style,
  scrollProgress,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // --- Default Values for robustness (if used in static Hero) ---
  const defaultScale = useMotionValue(1);
  const defaultX = useMotionValue('0%');
  const defaultY = useMotionValue('0%');
  const defaultRadius = useMotionValue(12);
  const defaultProgress = useMotionValue(0);

  const safeStyle = {
    scale: style?.scale || defaultScale,
    x: style?.x || defaultX,
    y: style?.y || defaultY,
    borderRadius: style?.borderRadius || defaultRadius,
  };

  const safeProgress = scrollProgress || defaultProgress;

  // Smart Mute/Unmute
  useMotionValueEvent(safeProgress, 'change', (latest) => {
    if (videoRef.current) {
      if (latest > 0.1 && latest < 0.9) {
        videoRef.current.muted = false;
      } else {
        videoRef.current.muted = true;
      }
    }
  });

  // Fade out the arrow and label when the video expands
  // video starts expanding at 0.0, ends at 0.25
  const elementOpacity = useTransform(safeProgress, [0, 0.05], [1, 0]);

  return (
    <motion.div
      style={{
        scale: safeStyle.scale,
        x: safeStyle.x,
        y: safeStyle.y,
        borderRadius: safeStyle.borderRadius,
      }}
      className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden shadow-2xl origin-center bg-black cursor-pointer group"
      role="region"
      aria-label="Manifesto Video"
      layoutId="manifesto-video" // Added layoutId for Framer Motion shared layout
    >
      <div className="relative w-full h-full">
        {/* Thumb Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

        <video
          ref={videoRef}
          src={ASSETS.videoManifesto}
          poster={ASSETS.videoManifestoPoster}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Floating Arrow (Indicator) */}
        <motion.div
          style={{ opacity: elementOpacity }}
          className="absolute -top-12 -left-12 z-40 text-white hidden md:block" // Keep z-40 to be above video
        >
          {/* Note: In the design the arrow points TO the video. 
                 Positioning it relative to the video container. 
                 We place it top-left, pointing down-right.
             */}
          <ArrowDownRight className="w-12 h-12 text-white/80 animate-pulse" />
        </motion.div>

        {/* Label on Thumb */}
        <motion.div
          style={{ opacity: elementOpacity }}
          className="absolute bottom-4 left-4 z-20"
        >
          <span className="text-white/80 text-xs font-mono tracking-widest uppercase bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
            [Manifesto]
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ManifestoThumb;
