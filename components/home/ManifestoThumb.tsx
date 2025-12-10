'use client';

import React from 'react';
import { motion, MotionStyle } from 'framer-motion';
import { ASSETS } from '@/lib/constants';

type ManifestoThumbProps = {
  onClick: () => void;
  motionStyle?: MotionStyle;
  prefersReducedMotion?: boolean;
};

const ManifestoThumb: React.FC<ManifestoThumbProps> = ({
  onClick,
  motionStyle,
  prefersReducedMotion,
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      style={motionStyle}
      className="flex w-[240px] max-w-full cursor-pointer items-center overflow-hidden rounded-[16px] border-4 border-[#00c3ff] bg-white/20 shadow-xl transition-shadow hover:shadow-[0_30px_50px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c3ff] focus-visible:ring-offset-2"
      aria-label="Abrir manifesto em vídeo"
    >
      <div className="relative h-full w-full bg-black">
        <video
          src={ASSETS.videoManifesto}
          className="h-full w-full object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
          autoPlay={!prefersReducedMotion}
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="Thumb do vídeo manifesto do portfólio de Danilo Novais"
          title="Thumb do vídeo manifesto do portfólio de Danilo Novais"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/5">
          <div className="h-14 w-14 rounded-full border border-white/20 bg-white/10" />
        </div>
      </div>
    </motion.button>
  );
};

export default ManifestoThumb;
