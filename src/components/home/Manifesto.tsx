'use client';

import React, { useRef } from 'react';
import { motion, MotionValue, useMotionValueEvent } from 'framer-motion';
import { ASSETS } from '../../lib/constants';

interface ManifestoProps {
  style: {
    scale: MotionValue<number>;
    x: MotionValue<string>;
    y: MotionValue<string>;
    borderRadius: MotionValue<number>;
  };
  scrollProgress: MotionValue<number>;
}

const Manifesto: React.FC<ManifestoProps> = ({ style, scrollProgress }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Smart Mute/Unmute based on scroll
  useMotionValueEvent(scrollProgress, 'change', (latest) => {
    if (videoRef.current) {
      // Unmute when video starts expanding (approx 0.05) until end of section
      if (latest > 0.05 && latest < 0.95) {
        videoRef.current.muted = false;
      } else {
        videoRef.current.muted = true;
      }
    }
  });

  return (
    <motion.div
      style={{
        scale: style.scale,
        x: style.x,
        y: style.y,
        borderRadius: style.borderRadius,
      }}
      className="absolute inset-0 z-40 flex items-center justify-center overflow-hidden shadow-2xl origin-center bg-black"
    >
      <div className="relative w-full h-full">
        {/* Overlay para dar o look 'Manifesto' quando expandido */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />

        <video
          ref={videoRef}
          src={ASSETS.videoManifesto}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Manifesto Content - visible only when expanded? 
            Or always there but clipped? 
            Let's keep it simple for now as per instructions "Thumb de Vídeo... Video Loop" */}
      </div>
    </motion.div>
  );
};

export default Manifesto;
