'use client';

import { motion } from 'framer-motion';
import GlassSurface from '@/components/ui/GlassSurface';

interface HeroGlowProps {
  className?: string;
}

const GhostIcon = () => (
  <svg viewBox="0 0 64 64" className="relative w-24 h-24 text-white/90 drop-shadow-[0_0_30px_rgba(0,87,255,0.8)]" fill="none">
    <path
      d="M13 23.5c0-9.393 7.607-17 17-17s17 7.607 17 17V55c0 1.105-.895 2-2 2h-5c-1.105 0-2-1-2-2s-1.1-2-2.2-2c-1.1 0-2.05 1.1-3.2 2s-2.6 0-3.7-2c-1.1-2-2.6-2-3.7-2s-2.6 2-3.7 2c-1.1 0-2.1-.9-2.1-2s-1-2-2-2h-3c-1.105 0-2-.895-2-2V23.5Z"
      fill="currentColor"
    />
    <circle cx="24" cy="28" r="3" fill="#070a1e" />
    <circle cx="40" cy="28" r="3" fill="#070a1e" />
  </svg>
);

export default function HeroGlow({ className = '' }: HeroGlowProps) {
  return (
    <motion.div
      className={`pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, y: [-6, 0, -6] }}
      transition={{ duration: 3.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    >
      <GlassSurface
        width={250}
        height={250}
        borderRadius={200}
        brightness={60}
        opacity={0.85}
        blur={14}
        displace={0.4}
        backgroundOpacity={0.5}
        saturation={1.6}
        distortionScale={-140}
        redOffset={2}
        greenOffset={20}
        blueOffset={40}
        mixBlendMode="screen"
        className="bg-white/10"
      >
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1D38FF]/70 via-[#0A0E34]/40 to-[#00D2FF]/30 blur-[90px]" />
          <div className="relative flex items-center justify-center">
            <GhostIcon />
          </div>
        </div>
      </GlassSurface>
    </motion.div>
  );
}
