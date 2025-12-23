// src/components/home/ManifestoThumb.tsx
'use client';

import { motion } from 'framer-motion';
import { BRAND } from '@/config/brand';

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
      className="relative z-20 group cursor-pointer"
    >
      <div className="relative w-64 md:w-80 aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 transition-transform duration-500 group-hover:scale-105">
        <video
          src={BRAND.video.manifesto}
          muted
          loop
          playsInline
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#888888] font-bold group-hover:text-[#F0F0F0] transition-colors">
          Assista ao Manifesto
        </span>
      </div>
    </motion.div>
  );
}
