'use client';

import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import HeroPreloader from './HeroPreloader';
import HeroCopy from './HeroCopy';
import ManifestoThumb from './ManifestoThumb';
import GhostStage from './GhostStage';
import ManifestoSection from './ManifestoSection';

export default function HomeHero() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Desktop morph (thumb -> fullscreen)
  const scaleVideo = useTransform(scrollYProgress, [0, 1], [0.4, 3.2]);
  const xVideo = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const yVideo = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const rightVideo = useTransform(scrollYProgress, [0, 1], ['5vw', '50%']);
  const bottomVideo = useTransform(scrollYProgress, [0, 1], ['5vw', '50%']);
  const videoWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ['min(360px, 26vw)', 'calc(100vw - 1.5rem)']
  );
  const borderRadius = useTransform(scrollYProgress, [0, 1], ['18px', '0px']);

  return (
    <>
      <section
        id="hero"
        ref={ref}
        className="relative h-[200vh] overflow-hidden bg-[radial-gradient(circle_at_30%_30%,#0b0d3a_0%,#06071f_55%,#06071f_100%)]"
        aria-label="Hero"
      >
        <HeroPreloader />

        {/* sticky stage */}
        <div className="sticky top-0 h-screen">
          {/* WebGL Layer */}
          <div className="absolute inset-0 z-20">
            <GhostStage />
          </div>

          {/* Editorial Copy (SEM animação / SEM binding de scroll) */}
          <div className="absolute z-10 inset-0 flex flex-col items-center justify-center text-center px-6">
            <HeroCopy />
          </div>

          {/* Manifesto Thumb - Desktop */}
          <motion.div
            aria-label="Vídeo manifesto"
            className="absolute z-30 overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.55)] hidden md:block"
            style={{
              width: reducedMotion ? 'min(520px, 34vw)' : videoWidth,
              aspectRatio: '16/9',
              right: reducedMotion ? '5vw' : rightVideo,
              bottom: reducedMotion ? '5vw' : bottomVideo,
              x: reducedMotion ? '0%' : xVideo,
              y: reducedMotion ? '0%' : yVideo,
              scale: reducedMotion ? 1 : scaleVideo,
              borderRadius,
              transformOrigin: '100% 100%',
            }}
            onClick={() => {
              // Desktop click: "skip" -> scroll to end of hero
              if (typeof window === 'undefined') return;
              if (window.innerWidth >= 768) {
                const top =
                  (ref.current?.offsetTop ?? 0) +
                  (ref.current?.clientHeight ?? 0) -
                  window.innerHeight;
                window.scrollTo({
                  top,
                  behavior: reducedMotion ? 'auto' : 'smooth',
                });
              }
            }}
          >
            <ManifestoThumb muted />
            <div className="pointer-events-none absolute top-3 right-3">
              <div className="h-9 w-9 rounded-full bg-white/10 border border-white/15 grid place-items-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="-rotate-45"
                >
                  <path
                    d="M7 17L17 7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 7H17V15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile manifesto como seção independente */}
      <ManifestoSection />
    </>
  );
}
