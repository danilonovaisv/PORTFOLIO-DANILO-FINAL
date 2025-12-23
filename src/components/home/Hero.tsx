'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GhostScene from './GhostScene';

interface HeroProps {
  style: {
    opacity: MotionValue<number>;
    scale: MotionValue<number>;
    y: MotionValue<number>;
  };
}

const Hero: React.FC<HeroProps> = ({ style }) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* 0. GHOST LAYER (Background) */}
      <div className="absolute inset-0 z-0 text-white">
        <GhostScene />
      </div>

      {/* 1. TEXT CONTENT */}
      <motion.div
        style={{
          opacity: style.opacity,
          scale: style.scale,
          y: style.y,
        }}
        className="absolute inset-0 container mx-auto px-6 md:px-12 lg:px-16 h-full z-10 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="text-center max-w-4xl relative z-20">
          <p className="mb-6 text-[#d9dade] text-lg md:text-xl tracking-wider uppercase font-light">
            [Creative Developer]
          </p>

          <h1 className="text-[#f0f0f0] text-5xl md:text-7xl font-bold leading-tight mb-8 tracking-tight">
            Design, não <br />é só estética.
          </h1>

          <p className="text-[#888888] text-xl md:text-2xl italic font-light">
            [Intenção. Estratégia. Experiência.]
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-12 pointer-events-auto">
          <a
            href="#portfolio"
            className="group bg-[#0057FF] text-white rounded-full pl-8 pr-6 py-4 flex items-center gap-3 font-semibold text-base md:text-lg shadow-lg shadow-[#0057FF]/20 hover:scale-105 transition-all duration-300"
          >
            Ver Projetos
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <ArrowRight className="w-4 h-4 text-white" />
            </span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
