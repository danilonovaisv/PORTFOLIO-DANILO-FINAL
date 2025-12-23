// src/components/home/ManifestoSection.tsx
'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { BRAND } from '@/config/brand';

const manifestoVideoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="w-full py-32 bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="max-w-6xl w-full px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="text-[#0057FF] text-xs font-bold uppercase tracking-[0.6em] mb-4 block">
            Manifesto
          </span>
          <h2 className="text-[#F0F0F0] text-3xl md:text-5xl font-bold tracking-tighter max-w-2xl mx-auto leading-tight">
            Uma visão sobre o design além do pixel.
          </h2>
        </motion.div>

        <motion.div
          variants={manifestoVideoVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl relative border border-white/5"
        >
          <video
            src={BRAND.video.manifesto}
            muted
            loop
            playsInline
            autoPlay
            className="w-full h-full object-cover"
          />
          {/* Overlay sutil para profundidade */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] pointer-events-none" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 text-center text-[#888888] max-w-xl text-sm md:text-base leading-relaxed tracking-wide font-medium"
        >
          Explore como transformamos complexidade em simplicidade, estratégia em
          impacto e design em experiência.
        </motion.p>
      </div>
    </section>
  );
}
