'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ASSETS } from '../../lib/constants';

// ============================================================================
// HERO COMPONENT
// Layout: Two-column grid (Text left, Media right)
// Animations: Parallax on TEXT only, Video layer unchanged
// ============================================================================

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [manualAudioOverride, setManualAudioOverride] = useState<'muted' | 'unmuted' | null>(null);

  // Text Parallax State (mouse-driven)
  const [textOffset, setTextOffset] = useState({ x: 0, y: 0 });
  const targetOffset = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lazy load video
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ============================================================================
  // TEXT PARALLAX LOGIC (Mouse-driven, smooth interpolation)
  // Inspired by: https://codepen.io/cbolson/pen/NPNjvOQ
  // ============================================================================
  const lerp = (start: number, end: number, factor: number): number => {
    return start + (end - start) * factor;
  };

  const animateParallax = useCallback(() => {
    setTextOffset(prev => ({
      x: lerp(prev.x, targetOffset.current.x, 0.08),
      y: lerp(prev.y, targetOffset.current.y, 0.08),
    }));
    animationFrameId.current = requestAnimationFrame(animateParallax);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || isMobile) return;
    animationFrameId.current = requestAnimationFrame(animateParallax);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animateParallax, shouldReduceMotion, isMobile]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || isMobile) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate offset from center (-0.5 to 0.5)
    const xRatio = (clientX / innerWidth) - 0.5;
    const yRatio = (clientY / innerHeight) - 0.5;
    
    // Max movement in pixels (subtle effect)
    const maxX = 12;
    const maxY = 8;
    
    targetOffset.current = {
      x: xRatio * maxX * 2,
      y: yRatio * maxY * 2,
    };
  };

  const handleMouseLeave = () => {
    targetOffset.current = { x: 0, y: 0 };
  };

  // ============================================================================
  // VIDEO LAYER LOGIC (UNCHANGED - keeping original behavior)
  // ============================================================================
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const portfolioThreshold = 0.92;
    if (latest <= 0.01 || latest >= portfolioThreshold) {
      applyMuteState(true, true);
      return;
    }
    if (manualAudioOverride === null) {
      applyMuteState(false);
    }
  });

  const applyMuteState = (mute: boolean, resetOverride = false) => {
    setIsMuted(mute);
    if (resetOverride) setManualAudioOverride(null);
    if (videoRef.current) {
      videoRef.current.muted = mute;
      if (!mute && videoRef.current.paused) {
        videoRef.current.play().catch(() => null);
      }
    }
  };

  const handleAudioToggle = () => {
    const nextMuted = !isMuted;
    setManualAudioOverride(nextMuted ? 'muted' : 'unmuted');
    applyMuteState(nextMuted);
  };

  // Video transforms (UNCHANGED from original)
  const videoScale = useTransform(
    scrollYProgress,
    [0, 0.25],
    [0.25, shouldReduceMotion ? 0.9 : 1]
  );
  const videoX = useTransform(scrollYProgress, [0, 0.25], ['35%', '0%']);
  const videoY = useTransform(scrollYProgress, [0, 0.25], ['30%', '0%']);
  const videoRadius = useTransform(
    scrollYProgress,
    [0, 0.2],
    [shouldReduceMotion ? 4 : 12, 0]
  );

  // Video parallax springs (UNCHANGED)
  const videoParallaxX = useSpring(0, { stiffness: 110, damping: 18 });
  const videoParallaxY = useSpring(0, { stiffness: 110, damping: 18 });

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[320vh] md:min-h-[400vh] lg:min-h-[450vh] w-full bg-[#F4F5F7]"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* ================================================================ */}
        {/* TEXT CONTENT LAYER - With Parallax */}
        {/* ================================================================ */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="h-full w-full max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 flex items-center">
            
            {/* Text Block with Parallax Transform */}
            <div
              ref={textContainerRef}
              className="pointer-events-auto max-w-2xl"
              style={{
                transform: `translate(${textOffset.x}px, ${textOffset.y}px)`,
                willChange: 'transform',
              }}
            >
              {/* Main Heading with Gradient Text */}
              <div className="relative">
                <h1 className="font-sans font-extrabold leading-[0.9] tracking-tight text-[clamp(3rem,8vw,6rem)]">
                  <span className="block bg-gradient-to-r from-[#0057FF] via-[#0077FF] to-[#00A3FF] bg-clip-text text-transparent italic">
                    Design,
                  </span>
                  <span className="block bg-gradient-to-r from-[#0057FF] via-[#0077FF] to-[#00A3FF] bg-clip-text text-transparent italic">
                    não é só
                  </span>
                  <span className="block text-[#101010]">
                    estética.
                  </span>
                </h1>

                {/* Tag: [ BRAND AWARENESS ] - Positioned to the right, vertically centered */}
                <div 
                  className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-full ml-8 whitespace-nowrap"
                  style={{
                    transform: `translate(${textOffset.x * 1.3}px, calc(-50% + ${textOffset.y * 1.3}px))`,
                  }}
                >
                  <span className="text-[#0057FF] font-semibold tracking-[0.25em] text-sm uppercase">
                    [ BRAND AWARENESS ]
                  </span>
                </div>
              </div>

              {/* Subtitle */}
              <div 
                className="mt-8 mb-10"
                style={{
                  transform: `translate(${textOffset.x * 0.6}px, ${textOffset.y * 0.6}px)`,
                }}
              >
                <p className="font-medium text-lg md:text-xl text-[#0057FF] flex flex-wrap items-center gap-2">
                  <span className="font-bold">[</span>
                  <span>É intenção, é estratégia, é experiência.</span>
                  <span className="font-bold">]</span>
                </p>
              </div>

              {/* CTA Button - Minimal hover animation only */}
              <div
                style={{
                  transform: `translate(${textOffset.x * 0.4}px, ${textOffset.y * 0.4}px)`,
                }}
              >
                <a
                  href="/sobre"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-8 py-4 text-white text-lg font-semibold shadow-lg transition-all duration-200 hover:bg-[#0047D4] hover:scale-[1.03] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0057FF]"
                >
                  get to know me better
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              </div>

              {/* Mobile Tag Fallback */}
              <div className="lg:hidden mt-8">
                <span className="text-[#0057FF] font-semibold tracking-[0.2em] text-xs uppercase">
                  [ BRAND AWARENESS ]
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* VIDEO LAYER - UNCHANGED FROM ORIGINAL */}
        {/* ================================================================ */}
        <motion.div
          style={{
            scale: videoScale,
            x: videoX,
            y: videoY,
            borderRadius: videoRadius,
          }}
          className="absolute z-40 w-full h-full flex items-center justify-center origin-center pointer-events-none"
        >
          <motion.div
            style={{ x: videoParallaxX, y: videoParallaxY }}
            className="relative w-full h-full pointer-events-auto px-0"
          >
            <div className="absolute inset-0 bg-black">
              {shouldLoad ? (
                <video
                  ref={videoRef}
                  src={ASSETS.videoManifesto}
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                  preload="none"
                  className="w-full h-full object-cover transition-opacity duration-500"
                  aria-label="Vídeo manifesto em destaque"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#e0e7ff] to-[#f4f7ff] animate-pulse" />
              )}
              <div className="absolute bottom-4 left-4 flex gap-3">
                <button
                  type="button"
                  onClick={handleAudioToggle}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/85 text-[#0057FF] text-xl shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors hover:bg-white"
                  aria-label={isMuted ? 'Ativar áudio do manifesto' : 'Silenciar áudio do manifesto'}
                >
                  {isMuted ? '🔇' : '🔊'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
