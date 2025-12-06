'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../../lib/constants';

type WordVariant = 'default' | 'accent';
type WordSize = 'lg' | 'sm';

const AnimatedWord: React.FC<{
  text: string;
  variant?: WordVariant;
  size?: WordSize;
  delayOffset?: number;
}> = ({ text, variant = 'default', size = 'lg', delayOffset = 0 }) => {
  const letters = text.split('');

  return (
    <span
      className={`word ${variant === 'accent' ? 'blue-start' : ''} ${size === 'sm' ? 'small' : ''}`}
      aria-label={text}
    >
      {letters.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          aria-hidden="true"
          style={{ '--i': index + delayOffset } as React.CSSProperties}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </span>
  );
};

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxEnabled, setParallaxEnabled] = useState(false);

  // Trigger animation on mount/view
  useEffect(() => {
    // Small delay to ensure render before animating
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateDeviceMode = () => {
      setParallaxEnabled(window.innerWidth >= 1024);
    };

    updateDeviceMode();
    window.addEventListener('resize', updateDeviceMode);
    return () => window.removeEventListener('resize', updateDeviceMode);
  }, []);

  // Control Scroll for timeline animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Monitor scroll for video audio
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (videoRef.current) {
      if (latest > 0.01) {
        videoRef.current.muted = false;
      } else {
        videoRef.current.muted = true;
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

  // Subtle mouse parallax (desktop only)
  const textParallaxX = useSpring(0, { stiffness: 110, damping: 18 });
  const textParallaxY = useSpring(0, { stiffness: 110, damping: 18 });
  const videoParallaxX = useSpring(0, { stiffness: 110, damping: 18 });
  const videoParallaxY = useSpring(0, { stiffness: 110, damping: 18 });

  const handleParallax = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!parallaxEnabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    const maxX = 20;
    const maxY = 14;

    textParallaxX.set(relativeX * maxX);
    textParallaxY.set(relativeY * maxY);
    videoParallaxX.set(relativeX * -maxX * 0.6);
    videoParallaxY.set(relativeY * -maxY * 0.6);
  };

  const resetParallax = () => {
    textParallaxX.set(0);
    textParallaxY.set(0);
    videoParallaxX.set(0);
    videoParallaxY.set(0);
  };

  const titleFade = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };
  const subTitleFade = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };
  const ctaFade = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[450vh] w-full bg-[#F4F5F7]"
    >
      <style>{`
        .main-title {
          font-family: "Inter", sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 0.9;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }

        .title-line {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          position: relative;
        }

        .title-line:nth-child(2) {
          margin-left: -0.3em;
        }

        .sub-text {
          font-family: "Inter", sans-serif;
          font-weight: 500;
          font-size: clamp(1rem, 2vw, 1.3rem);
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.35rem;
          color: #0057FF;
          margin-top: 0.5rem;
        }

        .word {
          --translate-distance: -1lh;
          --trans-duration: 800ms;
          --trans-delay-factor: 50ms;
          --trans-timing: cubic-bezier(0.34, 1.56, 0.64, 1);
          --font-size: clamp(4rem, 11vw, 9rem);
          --text-main: #101010;
          --text-hover: #0057FF;
          font-size: var(--font-size);
          color: var(--text-main);
          text-decoration: none;
          margin: 0;
          display: flex;
          overflow: hidden;
          cursor: pointer;
          line-height: 1;
          font-weight: 800;
        }

        .word.blue-start {
          --text-main: #0057FF;
          --text-hover: #101010;
        }

        .word.small {
          --font-size: inherit;
          line-height: 1.4;
          font-weight: 500;
          letter-spacing: normal;
        }

        .word > span {
          display: inline-block;
          translate: 0 var(--translate-distance);
          text-shadow: 0 1lh var(--text-hover);
          transition: translate var(--trans-duration) var(--trans-timing)
            calc(var(--i) * var(--trans-delay-factor));
        }

        .hero-text-visible .word > span {
          translate: 0 0;
        }

        .word:hover > span {
          translate: 0 var(--translate-distance);
        }

        .bracket {
          color: #0057FF;
          font-weight: 700;
          margin-right: 2px;
        }

        .bracket:last-child {
          margin-left: 2px;
          margin-right: 0;
        }
      `}</style>

      {/* Container Sticky */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        onMouseMove={handleParallax}
        onMouseLeave={resetParallax}
      >
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

          <motion.div
            style={{ x: textParallaxX, y: textParallaxY }}
            className="flex flex-col justify-center items-start h-full pt-24 md:pt-0 max-w-4xl gap-8"
          >
            {/* Título Principal */}
            <motion.div
              initial={titleFade.initial}
              animate={isVisible ? titleFade.animate : titleFade.initial}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="main-title"
            >
              <div className="title-line">
                <AnimatedWord text="Design," variant="accent" delayOffset={0} />
              </div>
              <div className="title-line">
                <AnimatedWord text="não" delayOffset={10} />
                <AnimatedWord text="é" delayOffset={12} />
                <AnimatedWord text="só" delayOffset={13} />
              </div>
              <div className="title-line">
                <AnimatedWord text="estética." delayOffset={18} />
              </div>
            </motion.div>

            {/* Subtítulo */}
            <motion.div
              initial={subTitleFade.initial}
              animate={isVisible ? subTitleFade.animate : subTitleFade.initial}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.35 }}
              className="relative"
            >
              <div className="bg-white/80 backdrop-blur-lg rounded-full px-6 py-3 flex flex-wrap items-center gap-2 sub-text">
                <span className="bracket" aria-hidden="true">
                  [
                </span>
                {[
                  'É',
                  'intenção,',
                  'é',
                  'estratégia,',
                  'é',
                  'experiência.',
                ].map((word, index) => (
                  <AnimatedWord
                    key={word + index}
                    text={word}
                    variant="accent"
                    size="sm"
                    delayOffset={index}
                  />
                ))}
                <span className="bracket" aria-hidden="true">
                  ]
                </span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={ctaFade.initial}
              animate={isVisible ? ctaFade.animate : ctaFade.initial}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.5 }}
              className="pointer-events-auto"
            >
              <motion.a
                href="/sobre"
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0 20px 45px -25px rgba(0, 87, 255, 0.7)',
                }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-10 py-5 text-white text-base md:text-lg font-semibold shadow-lg transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                get to know me better
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/25 group-hover:bg-white/35 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
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
          <motion.div
            style={{ x: videoParallaxX, y: videoParallaxY }}
            className="relative w-full h-full block group pointer-events-auto"
          >
            <video
              ref={videoRef}
              src={ASSETS.videoManifesto}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
