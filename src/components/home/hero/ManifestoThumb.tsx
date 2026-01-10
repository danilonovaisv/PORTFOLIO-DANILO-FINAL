'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export interface ManifestoThumbProps {
  heroRef: RefObject<HTMLElement | null>;
  src?: string;
}

const VIDEO_DESCRIPTION_ID = 'manifesto-thumb-video-description';

const ManifestoThumb: React.FC<ManifestoThumbProps> = ({
  heroRef,
  src = 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
}) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [audioOn, setAudioOn] = useState(false);

  // Z-Index control state
  const [zIndexState, setZIndexState] = useState(30);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    // Always load on mobile, check visibility on desktop
    if (!isDesktop) {
      setShouldLoad(true);
      return;
    }

    if (!wrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // --- DESKTOP TRANSFORMS ---
  const width = useTransform(
    smoothProgress,
    [0, 0.12, 0.46, 0.78],
    ['300px', '300px', '100vw', '100vw']
  );
  // Initial height aspect ratio roughly 16:9 or similar
  const height = useTransform(
    smoothProgress,
    [0, 0.12, 0.46, 0.78],
    ['170px', '170px', '100vh', '100vh']
  );
  const right = useTransform(
    smoothProgress,
    [0, 0.12, 0.46],
    ['24px', '24px', '0px'] // 1.5rem = 24px (bottom-6 right-6)
  );
  const bottom = useTransform(
    smoothProgress,
    [0, 0.12, 0.46],
    ['24px', '24px', '0px']
  );
  const borderRadius = useTransform(
    smoothProgress,
    [0, 0.12, 0.46],
    ['12px', '12px', '0px']
  );

  const fadeOut = useTransform(smoothProgress, [0.78, 1], [1, 0]);

  // Handle Logic Updates
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      // Audio Logic
      if (latest >= 0.78) {
        setAudioOn(false);
      } else if (latest >= 0.46) {
        setAudioOn(true);
        setZIndexState(50); // Expanded
      } else {
        setAudioOn(false);
        setZIndexState(30); // Initial
      }
    });

    return () => unsubscribe();
  }, [smoothProgress]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (audioOn) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
    } else {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
    }
  }, [audioOn]);

  const handleExpand = () => {
    // Programmatic scroll to trigger expansion
    const heroHeight = window.innerHeight * 2.5; // 250vh
    // We want to reach roughly 0.5 progress to ensure full expansion (0.46 threshold)
    // Offset is 'start start' to 'end start' => full section height
    const targetScroll = heroHeight * 0.5;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  if (!isDesktop) {
    // --- MOBILE RENDER ---
    // Positioned absolute at bottom, mimicking "below copy" visually
    return (
      <div
        className="absolute bottom-24 left-6 right-6 z-20 aspect-9/14 rounded-xl overflow-hidden shadow-2xl border border-white/10"
        aria-label="Manifesto Video Mobile"
      >
        {shouldLoad && (
          <video
            className="w-full h-full object-cover"
            src={src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        )}
      </div>
    );
  }

  // --- DESKTOP RENDER ---
  return (
    <motion.div
      ref={wrapperRef}
      onClick={handleExpand}
      className="video-wrapper absolute cursor-pointer pointer-events-auto overflow-hidden bg-black shadow-2xl border border-white/10"
      style={{
        width,
        height,
        right,
        bottom,
        borderRadius,
        opacity: fadeOut,
        zIndex: zIndexState,
        willChange: 'width, height, right, bottom',
      }}
    >
      {shouldLoad ? (
        <>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Vídeo showreel demonstrando projetos de design gráfico"
            aria-describedby={VIDEO_DESCRIPTION_ID}
          />
          <p id={VIDEO_DESCRIPTION_ID} className="sr-only">
            Vídeo de apresentação dos trabalhos em estratégia, branding e motion
            design.
          </p>
        </>
      ) : (
        <div className="w-full h-full bg-neutral-900 animate-pulse" />
      )}
    </motion.div>
  );
};

export default ManifestoThumb;
