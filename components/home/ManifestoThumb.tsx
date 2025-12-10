'use client';

import Image from 'next/image';
import React from 'react';
import { motion, MotionStyle } from 'framer-motion';
import { Play } from 'lucide-react';
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
      className="group relative flex w-[250px] max-w-full cursor-pointer items-center overflow-hidden rounded-2xl border border-white/60 bg-white/50 shadow-xl backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      aria-label="Abrir manifesto em vídeo"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={ASSETS.heroManifestThumb}
          alt="Thumb do manifesto em vídeo"
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 220px, 250px"
          priority={!prefersReducedMotion}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#111111] shadow-md ring-1 ring-black/5">
            <Play className="h-4 w-4" />
            manifesto
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default ManifestoThumb;
