'use client';

import React, { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import Hero from './Hero';
import Manifesto from './Manifesto';

const HomeIntro: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // TRANSITIONS
  // Input Range: [0, 0.25] -> First 25% of the 250vh section
  // 0.0 -> 0.15: Hero Text Fades Out
  // 0.0 -> 0.25: Video Expands to Fullscreen

  // Hero Content Transforms
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // Manifesto Video Transforms
  // Starts small (thumb), moves to center, becomes full.
  const videoScale = useTransform(scrollYProgress, [0, 0.25], [0.25, 1]);
  // Position moves from bottom-rightish to center
  const videoX = useTransform(scrollYProgress, [0, 0.25], ['35%', '0%']);
  const videoY = useTransform(scrollYProgress, [0, 0.25], ['30%', '0%']);
  const videoRadius = useTransform(scrollYProgress, [0, 0.2], [24, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh] w-full bg-[#06071f]"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layer 1: Hero (Ghost + Text) */}
        <Hero
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
          }}
        />

        {/* Layer 2: Manifesto (Video) */}
        <Manifesto
          style={{
            scale: videoScale,
            x: videoX,
            y: videoY,
            borderRadius: videoRadius,
          }}
          scrollProgress={scrollYProgress}
        />
      </div>
    </section>
  );
};

export default HomeIntro;
