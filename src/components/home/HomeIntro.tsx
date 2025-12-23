'use client';

import * as React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import HeroPreloader from './HeroPreloader';
import HeroCopy from './HeroCopy';
import GhostStage from './GhostStage';
import HeroGhost from './HeroGhost';
import { ASSETS } from '@/lib/constants';

/**
 * HomeIntro orchestrates the transition between the Hero and the Manifesto Video.
 * It uses a scroll-driven expansion to transform a thumbnail video into a fullscreen experience.
 */
export default function HomeIntro() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smoothing the scroll progress for a more "ethereal" feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Hero Content Transitions (0 -> 0.15)
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 0.9]);
  const heroY = useTransform(smoothProgress, [0, 0.15], [0, -60]);

  // Video Thumb Expansion Transitions (0.1 -> 0.85)
  // Initially small and in the corner, it expands to cover the viewport.
  const videoWidth = useTransform(
    smoothProgress,
    [0.1, 0.85],
    ['24rem', '100%']
  );
  const videoHeight = useTransform(
    smoothProgress,
    [0.1, 0.85],
    ['13.5rem', '100vh']
  );
  const videoRadius = useTransform(
    smoothProgress,
    [0.1, 0.85],
    ['24px', '0px']
  );

  // Position transforms to move from bottom-right (offset) to full cover
  const videoRight = useTransform(smoothProgress, [0.1, 0.85], ['5%', '0%']);
  const videoBottom = useTransform(smoothProgress, [0.1, 0.85], ['5%', '0%']);

  // Parallax Depth for Ghost Background (fundo parece se afastar)
  const ghostOpacity = useTransform(smoothProgress, [0.4, 0.8], [1, 0]);
  const ghostScale = useTransform(smoothProgress, [0, 0.5], [1, 1.1]);
  const ghostBlur = useTransform(
    smoothProgress,
    [0.2, 0.5],
    ['blur(0px)', 'blur(10px)']
  );

  // Kinetic Typography Overlay (appears during expansion)
  const textOverlayOpacity = useTransform(
    smoothProgress,
    [0.6, 0.8, 0.95],
    [0, 1, 0]
  );
  const textOverlayY = useTransform(smoothProgress, [0.6, 0.9], [40, 0]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleThumbClick = () => {
    // Scroll to the end of this container to trigger full expansion
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  return (
    <>
      <HeroPreloader />

      {/* Scroll Container: 300vh provides enough scroll space for the transition */}
      <div ref={containerRef} className="relative h-[300vh]">
        {/* Sticky viewport content */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
          {/* Layer 1: Ghost Atmosphere (WebGL) */}
          <motion.div
            style={{
              opacity: ghostOpacity,
              scale: ghostScale,
              filter: ghostBlur,
            }}
            className="absolute inset-0 z-0 origin-center"
          >
            <GhostStage />
            {/* Dark gradient overlay for DEPTH */}
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(7,9,40,0.5)_0%,#050505_100%)] pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>

          {/* Layer 2: Hero Content (Text & CTA) */}
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none px-6"
          >
            <div className="pointer-events-auto mt-[-5vh]">
              <HeroCopy />
            </div>
          </motion.div>

          {/* NOVO LOCAL PARA O GHOST: Spectral Ghost posicionado no canto inferior direito */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 2,
              delay: 0.8,
              ease: [0.22, 1, 0.36, 1], // Custom ease-out
            }}
            style={{ opacity: ghostOpacity }} // Also fades out with the atmosphere on scroll
            className="absolute bottom-0 right-0 z-20 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] pointer-events-none"
          >
            <HeroGhost />
          </motion.div>

          {/* Layer 3: Expanding Manifesto Video */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.8,
                delay: 1.2, // Staggered entrance after ghost and text
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                width: videoWidth,
                height: videoHeight,
                borderRadius: videoRadius,
                right: videoRight,
                bottom: videoBottom,
              }}
              className="absolute pointer-events-auto cursor-pointer shadow-[0_40px_120px_rgba(0,0,0,0.8)] group bg-black overflow-hidden"
              onClick={handleThumbClick}
            >
              <video
                ref={videoRef}
                src={ASSETS.videoManifesto}
                muted
                loop
                autoPlay
                playsInline
                className="w-full h-full object-cover opacity-80"
              />

              {/* Kinetic Typography Overlay - Estética Manifesto */}
              <motion.div
                style={{ opacity: textOverlayOpacity, y: textOverlayY }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 pointer-events-none"
              >
                <h2 className="text-white font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter mix-blend-difference">
                  DESIGN IS
                  <br />
                  INTENTION
                </h2>
                <div className="mt-8 h-[2px] w-24 bg-white/40" />
              </motion.div>

              {/* Mute Toggle */}
              <motion.button
                style={{
                  opacity: useTransform(smoothProgress, [0.85, 0.95], [0, 1]),
                }}
                onClick={toggleMute}
                className="absolute bottom-12 right-12 z-50 p-5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center transition-all hover:bg-white/10 hover:scale-110 active:scale-90"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </motion.button>

              {/* Label for Thumb State */}
              <motion.div
                style={{
                  opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]),
                }}
                className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors pointer-events-none"
              >
                <div className="px-6 py-3 border border-white/10 bg-black/40 backdrop-blur-md rounded-full overflow-hidden relative">
                  <span className="text-white text-[10px] md:text-xs tracking-[0.4em] font-medium uppercase relative z-10">
                    PLAY MANIFESTO
                  </span>
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent w-full"
                  />
                </div>
              </motion.div>

              {/* Analog Noise Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

              {/* Scanlines Effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-size-[100%_4px,3px_100%]" />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
