'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import { ArrowRight, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { ASSETS } from '../../lib/constants';

// Reference Animation Logic adapted for React
// Uses the specific linear() easing from the provided CSS reference
const RefAnimatedText: React.FC<{
  text: string;
  className?: string;
  delayStart?: number; // offset index for stagger
}> = ({ text, className, delayStart = 0 }) => {
  const letters = text.split('');

  return (
    <p
      className={`ref-word-anim flex overflow-hidden leading-[0.9] ${className}`}
      aria-label={text}
    >
      {letters.map((letter, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ '--i': i + delayStart } as React.CSSProperties}
          className="block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </p>
  );
};

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasUnmutedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Trigger animation on mount/view
  useEffect(() => {
    // Small delay to ensure render before animating
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Control Scroll for timeline animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Monitor scroll for video audio
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (videoRef.current) {
      // Unmute once when the user engages the section; avoid re-muting on scroll
      if (!hasUnmutedRef.current && latest > 0.01 && latest < 0.9) {
        videoRef.current.muted = false;
        setIsMuted(false);
        hasUnmutedRef.current = true;
      } else if (latest > 0.9) {
        // Mute when approaching the next section
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  });

  // Animations
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // Video transitions
  const videoScale = useTransform(scrollYProgress, [0, 0.25], [0.25, 1]);
  const videoX = useTransform(scrollYProgress, [0, 0.25], ['35%', '0%']);
  const videoY = useTransform(scrollYProgress, [0, 0.25], ['30%', '0%']);
  const videoRadius = useTransform(scrollYProgress, [0, 0.2], [12, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[450vh] w-full bg-[#F4F5F7]"
    >
      {/* Inject specific CSS for the reference animation */}
      <style>{`
        .ref-word-anim {
          --trans-duration: 3000ms; /* Updated to match reference exactly */
          --trans-delay-factor: 20ms; /* Updated to match reference exactly */
          /* The specific linear easing from the reference */
          --trans-timing-function: linear(0, 0.011 0.6%, 0.041 1.2%, 0.173 2.6%, 0.894 7.4%, 1.128 9.3%, 1.271 11.1%, 1.311 12%, 1.333 13%, 1.328 14.4%, 1.286 15.9%, 1.031 21%, 0.95 23%, 0.907 24.7%, 0.888 26.5%, 0.89 27.9%, 0.904 29.4%, 1.034 42.5%, 0.997 49.3%, 0.987 53.3%, 1.004 66.5%, 1);
        }
        
        .ref-word-anim span {
          transform: translateY(110%);
          opacity: 0;
          transition: transform var(--trans-duration) var(--trans-timing-function), opacity var(--trans-duration) var(--trans-timing-function);
          transition-delay: calc(var(--i) * var(--trans-delay-factor));
        }

        .hero-text-visible .ref-word-anim span {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>

      {/* Container Sticky */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* 1. TEXT CONTENT LAYER */}
        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
          className={`absolute inset-0 container mx-auto px-6 md:px-12 lg:px-16 h-full z-10 pointer-events-none ${isVisible ? 'hero-text-visible' : ''}`}
        >
          {/* TAG LATERAL: BRAND AWARENESS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden md:block"
          >
            <span className="text-[#0057FF] font-medium tracking-widest text-lg md:text-xl">
              [ BRAND AWARENESS ]
            </span>
          </motion.div>

          <div className="flex flex-col justify-center items-start h-full pt-24 md:pt-0 max-w-4xl">
            {/* Título Principal */}
            <div className="text-[4.5rem] md:text-7xl lg:text-[7.5rem] font-extrabold tracking-[-0.04em] mb-6 md:mb-10 font-sans flex flex-col items-start gap-1">
              {/* Animação unificada (Mobile & Desktop) usando a referência CSS */}
              <div className="flex flex-col items-start gap-0">
                <RefAnimatedText
                  text="Design,"
                  className="text-[#0057FF]"
                  delayStart={0}
                />
                <RefAnimatedText
                  text="não é só"
                  className="text-[#111111]"
                  delayStart={7}
                />
                <RefAnimatedText
                  text="estética."
                  className="text-[#111111]"
                  delayStart={15}
                />
              </div>
            </div>

            {/* Subtítulo */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 1.8 }}
              className="mb-10 md:mb-14 relative"
            >
              <p className="text-[#0057FF] text-lg md:text-xl font-medium tracking-wide bg-white/5 backdrop-blur-sm rounded-lg pr-4 inline-block">
                [ É intenção, é estratégia, é experiência. ]
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="pointer-events-auto" // Re-enable clicks
            >
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
            </motion.div>

            {/* Anchor link to manifesto section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
            >
              <a
                href="#manifesto"
                className="flex flex-col items-center group"
                aria-label="Scroll to manifesto section"
              >
                <span className="text-sm text-gray-600 mb-1 group-hover:text-gray-900 transition-colors">
                  manifesto
                </span>
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* 2. VIDEO LAYER (Foreground) */}
        <motion.div
          style={{
            scale: videoScale,
            x: videoX,
            y: videoY,
            borderRadius: videoRadius,
          }}
          className="absolute z-40 w-full h-full flex items-center justify-center overflow-hidden shadow-2xl origin-center bg-black pointer-events-none"
        >
          <div className="relative w-full h-full block group pointer-events-auto">
            {!hasError ? (
              <>
                <video
                  ref={videoRef}
                  src={ASSETS.videoManifesto}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-opacity duration-500"
                  onError={() => setHasError(true)}
                />
                <button
                  onClick={toggleMute}
                  className="absolute bottom-8 right-8 bg-black/30 backdrop-blur-sm rounded-full p-3 hover:bg-black/50 transition-all duration-300 z-50 opacity-0 group-hover:opacity-100"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6 text-white" />
                  ) : (
                    <Volume2 className="w-6 h-6 text-white" />
                  )}
                </button>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-gray-500 p-6 text-center">
                <AlertCircle className="w-10 h-10 mb-3 opacity-50" />
                <p className="font-medium">
                  Não foi possível carregar o vídeo.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
