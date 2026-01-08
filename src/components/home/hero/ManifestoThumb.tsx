'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useLenis } from '@/hooks/useLenis';

// ============================================================================
// ManifestoThumb - Desktop Floating Video with Scroll-to-Fullscreen Behavior
// ============================================================================

const VIDEO_SRC =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4';

interface ManifestoThumbProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const ENTRY_ANIMATION = {
  initial: {
    opacity: 0,
    scale: 0.96,
    y: 16,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  transition: {
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1] as const,
  },
};

export default function ManifestoThumb({ sectionRef }: ManifestoThumbProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lenis = useLenis();

  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [entryComplete, setEntryComplete] = useState(false);

  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasLockedRef = useRef(false);

  // Scroll progress tracking (relative to hero section)
  // Hero is 250vh, so scroll goes from 0 to 1
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Transform values based on scroll (Specs matched)
  const borderRadius = useTransform(scrollYProgress, [0, 0.8], ['16px', '0px']);

  // Posicionamento: bottom-right -> center
  // Usando right/bottom para manter o inicial bottom-right
  const right = useTransform(scrollYProgress, [0, 0.8], ['3vw', '50%']);
  const bottom = useTransform(scrollYProgress, [0, 0.8], ['4vh', '50%']);

  // Editorial opacity: some no final do scroll
  const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  // Center alignment offset
  const x = useTransform(scrollYProgress, [0, 0.8], ['0%', '50%']);
  const y = useTransform(scrollYProgress, [0, 0.8], ['0%', '50%']);

  const width = useTransform(scrollYProgress, [0, 0.8], ['30vw', '100vw']);
  const height = useTransform(scrollYProgress, [0, 0.8], ['16.875vw', '100vh']);
  const INITIAL_RIGHT = '4.5vw';
  const INITIAL_BOTTOM = '4.5vh';
  const INITIAL_WIDTH = '30vw';
  const INITIAL_HEIGHT = '16.875vw';
  const INITIAL_X = '0%';
  const INITIAL_Y = '0%';

  // Track scroll for logic (Sound, Lock, etc)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const reachedFullscreen = latest >= 0.8;
    const leavingHero = latest > 0.95;

    // sound logic: mute when leaving hero
    if (leavingHero && !isMuted) {
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }

    // fullscreen logic
    if (reachedFullscreen && !isFullscreen && !leavingHero) {
      setIsFullscreen(true);

      // Unmute at fullscreen
      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }

      // Lock scroll 2s (only once per entry)
      if (!hasLockedRef.current && lenis) {
        hasLockedRef.current = true;
        setIsHolding(true);
        lenis.stop();

        if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
        holdTimeoutRef.current = setTimeout(() => {
          lenis.start();
          setIsHolding(false);
        }, 2000);
      }
    } else if (!reachedFullscreen && isFullscreen) {
      setIsFullscreen(false);
      hasLockedRef.current = false;

      // Mute when leaving center
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  });

  const handleEntryComplete = useCallback(() => {
    setEntryComplete(true);
  }, []);

  // Click behavior: Jump to fullscreen logic
  const handleClick = useCallback(() => {
    if (!entryComplete || isFullscreen || !lenis) return;

    // Smooth scroll to the trigger point
    lenis.scrollTo('#manifesto-trigger', {
      offset: -window.innerHeight * 0.2,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 * Math.pow(2, -10 * t)), // expo out
    });
  }, [entryComplete, isFullscreen, lenis]);

  const rightStyle = entryComplete ? right : INITIAL_RIGHT;
  const bottomStyle = entryComplete ? bottom : INITIAL_BOTTOM;
  const xStyle = entryComplete ? x : INITIAL_X;
  const yStyle = entryComplete ? y : INITIAL_Y;
  const widthStyle = entryComplete ? width : INITIAL_WIDTH;
  const heightStyle = entryComplete ? height : INITIAL_HEIGHT;
  const opacityStyle = entryComplete ? opacity : 1;
  const pointerEventsStyle = entryComplete ? 'auto' : 'none';

  useEffect(() => {
    return () => {
      if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
      if (lenis) lenis.start();
    };
  }, [lenis]);

  return (
    <>
      <motion.div
        onClick={handleClick}
        className="hidden lg:block fixed z-30 cursor-pointer overflow-hidden shadow-2xl"
        aria-label="Preview em vídeo"
        style={{
          right: rightStyle,
          bottom: bottomStyle,
          x: xStyle,
          y: yStyle,
          maxWidth: '1920px',
          aspectRatio: '16/9',
          borderRadius,
          opacity: opacityStyle,
          width: widthStyle,
          height: heightStyle,
          pointerEvents: pointerEventsStyle,
        }}
        initial={ENTRY_ANIMATION.initial}
        animate={ENTRY_ANIMATION.animate}
        transition={ENTRY_ANIMATION.transition}
        onAnimationComplete={handleEntryComplete}
        whileHover={
          entryComplete && !isFullscreen
            ? { scale: 1.02, transition: { duration: 0.3, ease: 'easeOut' } }
            : undefined
        }
      >
        <div className="relative w-full h-full bg-black">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>

          {/* Sound Toggle Button (Visible in Fullscreen) */}
          {isFullscreen && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                if (videoRef.current) {
                  videoRef.current.muted = !videoRef.current.muted;
                  setIsMuted(videoRef.current.muted);
                }
              }}
              className="absolute bottom-8 right-8 z-10 w-14 h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-black/60 transition-colors"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </motion.button>
          )}

          {/* Holding Indicator */}
          {isHolding && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'linear' }}
              className="absolute bottom-0 left-0 h-1 bg-[#0048ff] z-20"
            />
          )}
        </div>
      </motion.div>
    </>
  );
}
