'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../../lib/constants';
import HeroScene from './HeroScene';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  // Mouse tracking for HeroScene
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth);
      mouseY.set(clientY / innerHeight);
    },
    [mouseX, mouseY]
  );

  // Scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Video audio control
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (videoRef.current) {
      if (latest > 0.01 && latest < 0.9) {
        videoRef.current.muted = false;
      } else {
        videoRef.current.muted = true;
      }
    }
  });

  // Content transforms (mantidos)
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // Video transforms (mantidos)
  const videoScale = useTransform(scrollYProgress, [0, 0.25], [0.25, 1]);
  const videoX = useTransform(scrollYProgress, [0, 0.25], ['35%', '0%']);
  const videoY = useTransform(scrollYProgress, [0, 0.25], ['30%', '0%']);
  const videoRadius = useTransform(scrollYProgress, [0, 0.2], [12, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative h-[250vh] w-full bg-[#06071f]"
      aria-label="Hero section"
    >
      {/* Container Sticky */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* 0. GHOST / CANVAS LAYER */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <HeroScene
            mouseX={mouseX}
            mouseY={mouseY}
            scrollYProgress={scrollYProgress}
            reducedMotion={!!reduceMotion}
          />
        </div>

        {/* 1. TEXT CONTENT (SEM ANIMAÇÃO) */}
        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
          className="absolute inset-0 container mx-auto px-6 md:px-12 lg:px-16 h-full z-10 pointer-events-none flex items-center justify-center"
        >
          <div className="text-center max-w-4xl">
            <p className="mb-6 text-[#d9dade] text-lg md:text-xl tracking-wider uppercase">
              [BRAND AWARENESS]
            </p>

            <h1 className="text-[#d9dade] text-4xl md:text-6xl font-bold leading-tight mb-8">
              Design, não <br />é só estética.
            </h1>

            <p className="text-[#d9dade] text-2xl md:text-3xl italic">
              [É intenção, é estratégia, é experiência.]
            </p>
          </div>
        </motion.div>

        {/* 2. VIDEO LAYER (INALTERADO) */}
        <motion.div
          style={{
            scale: videoScale,
            x: videoX,
            y: videoY,
            borderRadius: videoRadius,
          }}
          className="absolute z-40 w-full h-full flex items-center justify-center overflow-hidden shadow-2xl origin-center bg-black/5 pointer-events-none"
        >
          <div className="relative w-full h-full block group pointer-events-auto">
            <video
              ref={videoRef}
              src={ASSETS.videoManifesto}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          </div>
        </motion.div>

        {/* CTA (INALTERADO) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
          <motion.a
            href="/sobre"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 2.0,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 30px -10px rgba(0, 87, 255, 0.5)',
            }}
            whileTap={{ scale: 0.98 }}
            className="group bg-[#0057FF] text-white rounded-full pl-8 pr-6 py-4 flex items-center gap-3 font-semibold text-base md:text-lg shadow-xl shadow-[#0057FF]/20 transition-all"
          >
            get to know me better
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <ArrowRight className="w-4 h-4 text-white" />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
