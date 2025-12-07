'use client';

import type { CSSProperties } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
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

type WordVariant = 'default' | 'accent';
type WordSize = 'lg' | 'sm';

type AnimatedWordProps = {
  text: string;
  variant?: WordVariant;
  size?: WordSize;
  delayOffset?: number;
  disableAnimation?: boolean;
};

const AnimatedWord = ({
  text,
  variant = 'default',
  size = 'lg',
  delayOffset = 0,
  disableAnimation = false,
}: AnimatedWordProps) => {
  const letters = text.split('');
  const letterOccurrences = new Map<string, number>();

  return (
    <span
      className={`word ${variant === 'accent' ? 'blue-start' : ''} ${size === 'sm' ? 'small' : ''}`}
      style={
        disableAnimation
          ? ({
              '--trans-duration': '0ms',
              '--trans-delay-factor': '0ms',
            } as CSSProperties)
          : undefined
      }
    >
      <span className="sr-only">{text}</span>
      <span className="word-letters" aria-hidden="true">
        {letters.map((letter, order) => {
          const occurrence = letterOccurrences.get(letter) ?? 0;
          letterOccurrences.set(letter, occurrence + 1);
          const letterDelay = order + delayOffset;
          return (
            <span
              key={`${text}-${letter}-${occurrence}`}
              className="animated-letter"
              style={{ '--i': letterDelay } as CSSProperties}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          );
        })}
      </span>
    </span>
  );
};

const SUBTITLE_SEQUENCE = (() => {
  const occurrences = new Map<string, number>();
  const tokens = ['É', 'intenção,', 'é', 'estratégia,', 'é', 'experiência.'];
  return tokens.map((token) => {
    const occurrence = occurrences.get(token) ?? 0;
    occurrences.set(token, occurrence + 1);
    return { token, occurrence };
  });
})();

const BASE_EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];
const BASE_DURATION = 0.65;

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxEnabled, setParallaxEnabled] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [manualAudioOverride, setManualAudioOverride] = useState<
    'muted' | 'unmuted' | null
  >(null);

  // Trigger animation on mount/view
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateDeviceMode = () => {
      setParallaxEnabled(!shouldReduceMotion && window.innerWidth >= 1024);
    };

    updateDeviceMode();
    window.addEventListener('resize', updateDeviceMode);
    return () => window.removeEventListener('resize', updateDeviceMode);
  }, [shouldReduceMotion]);

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

  const applyMuteState = (mute: boolean, resetOverride = false) => {
    setIsMuted(mute);
    if (resetOverride) {
      setManualAudioOverride(null);
    }
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

  // Control Scroll for timeline animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Monitor scroll for video audio
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

  // Animations (mantêm suavidade mas respeitam preferências de movimento reduzido)
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.15],
    [1, shouldReduceMotion ? 1 : 0]
  );
  const contentScale = useTransform(
    scrollYProgress,
    [0, 0.15],
    [1, shouldReduceMotion ? 1 : 0.95]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.15],
    [0, shouldReduceMotion ? 0 : -50]
  );

  // Video transitions
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

  // Subtle mouse parallax (desktop only)
  const videoParallaxX = useSpring(0, { stiffness: 110, damping: 18 });
  const videoParallaxY = useSpring(0, { stiffness: 110, damping: 18 });

  const handleParallax = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!parallaxEnabled || shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    const maxX = 20;
    const maxY = 14;

    // Only set video parallax, no text parallax
    videoParallaxX.set(relativeX * -maxX * 0.6);
    videoParallaxY.set(relativeY * -maxY * 0.6);
  };

  const resetParallax = () => {
    videoParallaxX.set(0);
    videoParallaxY.set(0);
  };

  const titleFade = {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
  };

  const subTitleFade = {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
  };

  const ctaFade = {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
  };

  const textContainerClasses = useMemo(
    () =>
      [
        'absolute inset-0 mx-auto h-full w-full max-w-screen-xl px-4 sm:px-8 lg:px-16 z-10 pointer-events-none',
        shouldReduceMotion
          ? 'hero-text-visible'
          : isVisible
            ? 'hero-text-visible'
            : '',
      ].join(' '),
    [isVisible, shouldReduceMotion]
  );

  return (
    /* biome-ignore lint/correctness/useUniqueElementIds: anchor needed for navigation */
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[320vh] md:min-h-[400vh] lg:min-h-[450vh] w-full bg-[#F4F5F7]"
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

        .sub-text {
          font-family: "Inter", sans-serif;
          font-weight: 500;
          font-size: clamp(1rem, 2vw, 1.35rem);
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.35rem;
          color: #0057FF;
          margin-top: 0.5rem;
          align-self: flex-start;
        }

        .word {
          --translate-distance: -1lh;
          --trans-duration: 800ms;
          --trans-delay-factor: 50ms;
          --trans-timing: cubic-bezier(0.34, 1.56, 0.64, 1);
          --font-size: clamp(3.5rem, 9.5vw, 7.5rem);
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

        .word .word-letters {
          display: inline-flex;
          gap: 0;
        }

        .word.small {
          --font-size: inherit;
          line-height: 1.4;
          font-weight: 500;
          letter-spacing: normal;
        }

        .word-letters > span {
          display: inline-block;
          translate: 0 var(--translate-distance);
          text-shadow: 0 1lh var(--text-hover);
          transition: translate var(--trans-duration) var(--trans-timing)
            calc(var(--i) * var(--trans-delay-factor));
        }

        .hero-text-visible .word-letters > span {
          translate: 0 0;
        }

        .word:hover .word-letters > span {
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

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>

      {/* Plano de fundo suave para reforçar contraste e guiar a leitura */}
      <div
        className="absolute inset-0 bg-linear-to-b from-[#f6f7fb] via-white to-[#eef3ff]"
        aria-hidden="true"
      />

      {/* Container Sticky */}
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-4 sm:px-6"
        role="presentation"
        tabIndex={-1}
        onMouseMove={handleParallax}
        onMouseLeave={resetParallax}
      >
        {/* 1. TEXT CONTENT LAYER */}
        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
          className={textContainerClasses}
        >
          <motion.div
            className="flex flex-col justify-center items-start h-full pt-24 md:pt-0 w-full max-w-5xl gap-8 lg:gap-10 pointer-events-auto px-1 sm:px-4"
          >
            {/* Título Principal */}
            <motion.h1
              initial={titleFade.initial}
              animate={isVisible ? titleFade.animate : titleFade.initial}
              transition={{
                duration: BASE_DURATION,
                ease: BASE_EASE,
                delay: 0.2,
              }}
              className="main-title relative w-full"
            >
              <div className="w-full">
                {/* Mobile View: 2 lines, centered */}
                <div className="flex flex-col items-center gap-2 md:hidden">
                  <div className="title-line justify-center">
                    <AnimatedWord
                      text="Design,"
                      variant="accent"
                      delayOffset={0}
                      disableAnimation={shouldReduceMotion}
                    />
                    <AnimatedWord
                      text="não"
                      delayOffset={10}
                      disableAnimation={shouldReduceMotion}
                    />
                    <AnimatedWord
                      text="é"
                      delayOffset={12}
                      disableAnimation={shouldReduceMotion}
                    />
                  </div>
                  <div className="title-line justify-center">
                    <AnimatedWord
                      text="só"
                      delayOffset={13}
                      disableAnimation={shouldReduceMotion}
                    />
                    <AnimatedWord
                      text="estética."
                      delayOffset={18}
                      disableAnimation={shouldReduceMotion}
                    />
                  </div>
                </div>

                {/* Desktop View: 3 lines, left aligned with indent */}
                <div className="hidden flex-col items-start gap-2 md:flex">
                  <div className="title-line relative z-10">
                    <AnimatedWord
                      text="Design,"
                      variant="accent"
                      delayOffset={0}
                      disableAnimation={shouldReduceMotion}
                    />
                  </div>
                  <div className="title-line pl-20">
                    <AnimatedWord
                      text="não"
                      delayOffset={10}
                      disableAnimation={shouldReduceMotion}
                    />
                    <AnimatedWord
                      text="é"
                      delayOffset={12}
                      disableAnimation={shouldReduceMotion}
                    />
                    <AnimatedWord
                      text="só"
                      delayOffset={13}
                      disableAnimation={shouldReduceMotion}
                    />
                  </div>
                  <div className="title-line">
                    <AnimatedWord
                      text="estética."
                      delayOffset={18}
                      disableAnimation={shouldReduceMotion}
                    />
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.8,
                  duration: BASE_DURATION,
                  ease: BASE_EASE,
                }}
                className="hidden md:flex items-center justify-center absolute left-full ml-10 top-[38%]"
                aria-hidden="true"
              >
                <span className="text-[#0057FF] font-semibold tracking-[0.3em] text-sm uppercase whitespace-nowrap">
                  [ BRAND AWARENESS ]
                </span>
              </motion.div>
            </motion.h1>

            {/* Subtítulo */}
            <motion.div
              initial={subTitleFade.initial}
              animate={isVisible ? subTitleFade.animate : subTitleFade.initial}
              transition={{
                duration: BASE_DURATION,
                ease: BASE_EASE,
                delay: 0.35,
              }}
              className="relative w-full"
            >
              <div className="sub-text flex flex-wrap items-center gap-2">
                <span className="bracket block" aria-hidden="true">
                  [
                </span>
                {SUBTITLE_SEQUENCE.map(({ token, occurrence }, index) => (
                  <AnimatedWord
                    key={`${token}-${occurrence}`}
                    text={token}
                    variant="accent"
                    size="sm"
                    delayOffset={index}
                    disableAnimation={shouldReduceMotion}
                  />
                ))}
                <span className="bracket block" aria-hidden="true">
                  ]
                </span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={ctaFade.initial}
              animate={isVisible ? ctaFade.animate : ctaFade.initial}
              transition={{
                duration: BASE_DURATION,
                ease: BASE_EASE,
                delay: 0.5,
              }}
              className="pointer-events-auto"
            >
              <motion.a
                href="/sobre"
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0 20px 45px -25px rgba(0, 87, 255, 0.7)',
                  backgroundColor: '#1A69FF',
                }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-6 sm:px-8 md:px-10 py-4 md:py-5 text-white text-base md:text-lg font-semibold shadow-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white min-h-13"
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
                <div className="w-full h-full bg-linear-to-br from-[#e0e7ff] to-[#f4f7ff] animate-pulse" />
              )}
              <div className="absolute bottom-4 left-4 flex gap-3">
                <button
                  type="button"
                  onClick={handleAudioToggle}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/85 text-[#0057FF] text-xl shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label={
                    isMuted
                      ? 'Ativar áudio do manifesto'
                      : 'Silenciar áudio do manifesto'
                  }
                >
                  {isMuted ? '🔇' : '🔊'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
