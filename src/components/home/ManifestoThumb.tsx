// src/components/home/ManifestoThumb.tsx
'use client';

import { motion } from 'framer-motion';
import { BRAND } from '@/config/brand';
import { ArrowUpRight } from 'lucide-react';

export default function ManifestoThumb() {
  const scrollToManifesto = () => {
    const section = document.getElementById('manifesto');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      onClick={scrollToManifesto}
      className="relative z-20 group cursor-pointer flex flex-col items-end"
    >
      <div className="relative mb-2">
        {/* Corner Arrow Indicator as per reference */}
        <motion.div
          animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-6 -right-6 text-white/40 group-hover:text-white transition-colors"
        >
          <ArrowUpRight strokeWidth={1} size={32} />
        </motion.div>

        <div className="relative w-48 md:w-64 aspect-video rounded-lg overflow-hidden shadow-2xl border border-white/5 transition-all duration-500 group-hover:scale-105 group-hover:border-white/20">
          <video
            src={BRAND.video.manifesto}
            muted
            loop
            playsInline
            autoPlay
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
        </div>
      </div>

      <div className="text-right pr-2">
        <span className="text-[9px] uppercase tracking-[0.4em] text-[#888888] font-bold group-hover:text-[#F0F0F0] transition-colors">
          The Manifesto
        </span>
      </div>
    </motion.div>
  );
}
