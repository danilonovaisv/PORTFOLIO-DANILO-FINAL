'use client';
import React from 'react';
import { cubicBezier, useScroll, useTransform } from 'framer-motion';
import { BeliefSection, BeliefMobileTextLayer } from '../beliefs/BeliefSection';
import { BeliefFinalSection } from '../beliefs/BeliefFinalSection';
import { BeliefFixedHeader } from '../beliefs/BeliefFixedHeader';
import { BeliefFinalSectionOverlay } from '../beliefs/BeliefFinalSectionOverlay';
import { BRAND } from '@/config/brand';
import dynamic from 'next/dynamic';

const GhostScene = dynamic(() => import('../3d/GhostScene'), { ssr: false });

const PHRASES = [
  'Um\nvídeo\nque\nrespira.',
  'Uma\nmarca\nque se\nreconhece.',
  'Um\ndetalhe\nque\nfica.',
  'Crio\npara\ngerar\npresença.',
  'Mesmo\nquando\nnão\nestou\nali.',
  'Mesmo\nquando\nninguém\npercebe\no esforço.',
];

const COLORS = [
  BRAND.colors.bluePrimary,
  BRAND.colors.purpleDetails,
  BRAND.colors.pinkDetails,
  BRAND.colors.bluePrimary,
  BRAND.colors.purpleDetails,
  BRAND.colors.pinkDetails,
];

export const AboutBeliefs: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // Easing Ghost Padrão
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

  // Opacidade do Header Fixo
  const headerOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.12, 0.85, 0.95],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  return (
    <section ref={containerRef} className="relative w-full">
      {/* LAYER 1: Backgrounds coloridos (Behind Everything) */}
      <div className="relative pointer-events-none z-10 w-full">
        <BeliefFixedHeader opacity={headerOpacity} progress={scrollYProgress} />

        {PHRASES.map((phrase, index) => (
          <BeliefSection
            key={index}
            text={phrase}
            bgColor={COLORS[index] || COLORS[0]}
            isFirst={index === 0}
          />
        ))}
        <BeliefFinalSection
          scrollProgress={scrollYProgress}
          bgColor={BRAND.colors.bluePrimary}
        />
      </div>

      {/* LAYER 2: Texto Mobile Fixed no Footer */}
      <BeliefMobileTextLayer
        phrases={PHRASES}
        scrollYProgress={scrollYProgress}
      />

      {/* LAYER 4: Final Text Overlay (Z-40) - Background for Ghost */}
      <div className="absolute bottom-0 left-0 w-full h-screen pointer-events-none z-40">
        <BeliefFinalSectionOverlay />
      </div>

      {/* LAYER 3: Canvas 3D (Sticky - Top Layer Z-50) */}
      {/* Mobile: Ghost positioned to align vertically with text block in footer */}
      {/* Desktop: Centered in viewport */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-50">
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-auto flex md:items-center md:justify-end items-end justify-start">
          {/* 3D Scene Wrapper - Responsive Positioning */}
          <div className="w-full h-full md:absolute md:inset-0 relative">
            <GhostScene scrollProgress={scrollYProgress} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBeliefs;
