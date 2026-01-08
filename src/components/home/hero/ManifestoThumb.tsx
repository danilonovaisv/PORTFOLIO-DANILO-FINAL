'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

// ============================================================================
// ManifestoThumb - Desktop Floating Video with Scroll-to-Fullscreen Behavior
// ============================================================================
// BEHAVIOR:
// - Starts as floating thumbnail at bottom-right (30vw width)
// - Scroll: Scales from [0.3, 1], morphs position to center, reduces borderRadius
// - At fullscreen: Holds for 2s, unmutes video
// - When leaving Hero: Video mutes again
// - Click: Jumps directly to fullscreen state
// - Hover: Scale 1 → 1.05
// ============================================================================

const VIDEO_SRC =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4';

const POSTER_IMAGE =
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80';

export default function ManifestoThumb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [posterVisible, setPosterVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hasFadedRef = useRef(false);
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll progress tracking (relative to hero section)
  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end end'],
  });

  // Transform values based on scroll
  // 0 = start (thumbnail), 1 = end (fullscreen)
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.7], [0.3, 0.6, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.7, 1], [18, 8, 0]);
  const x = useTransform(scrollYProgress, [0, 0.7], ['0%', '-50%']);
  const y = useTransform(scrollYProgress, [0, 0.7], ['0%', '-50%']);

  // Track when we reach fullscreen state
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const reachedFullscreen = latest > 0.85;

    if (reachedFullscreen && !isFullscreen) {
      setIsFullscreen(true);
      // Unmute after reaching fullscreen
      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }

      // Hold for 2 seconds at fullscreen
      holdTimeoutRef.current = setTimeout(() => {
        // After hold, mute again if scroll continues
      }, 2000);
    } else if (!reachedFullscreen && isFullscreen) {
      setIsFullscreen(false);
      // Mute when leaving fullscreen
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }

      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
      }
    }
  });

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
      }
    };
  }, []);

  // Auto-reveal poster after timeout
  useEffect(() => {
    if (!posterVisible) return undefined;
    const timeout = setTimeout(() => {
      if (!hasFadedRef.current) {
        setPosterVisible(false);
        hasFadedRef.current = true;
      }
    }, 700);
    return () => clearTimeout(timeout);
  }, [posterVisible]);

  const handleVideoReady = useCallback(() => {
    if (!hasFadedRef.current) {
      setPosterVisible(false);
      hasFadedRef.current = true;
    }
  }, []);

  // Click to jump to fullscreen
  const handleClick = useCallback(() => {
    if (isFullscreen) return;

    // Scroll to fullscreen position
    window.scrollTo({
      top: window.innerHeight * 1.5, // Approximate fullscreen scroll position
      behavior: 'smooth',
    });
  }, [isFullscreen]);

  // Toggle sound on click when fullscreen
  const handleSoundToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  }, []);

  return (
    <>
      {/* Desktop Only - Hidden on mobile (lg breakpoint) */}
      <motion.div
        ref={containerRef}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="hidden lg:block fixed z-40 pointer-events-auto cursor-pointer"
        style={{
          // Dynamic positioning based on scroll
          bottom: isFullscreen ? '50%' : '5vh',
          right: isFullscreen ? '50%' : '5vw',
          width: isFullscreen ? '100vw' : 'min(320px, 30vw)',
          height: isFullscreen ? '100vh' : 'auto',
          aspectRatio: isFullscreen ? 'auto' : '16/9',
          scale: isHovered && !isFullscreen ? 1.05 : scale,
          borderRadius,
          x: isFullscreen ? x : 0,
          y: isFullscreen ? y : 0,
        }}
        initial={{ opacity: 0, translateY: 18, scale: 0.96 }}
        animate={{ opacity: 1, translateY: 0, scale: scale.get() }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        aria-label={
          isFullscreen ? 'Vídeo em tela cheia' : 'Clique para expandir o vídeo'
        }
      >
        <div
          className="relative w-full h-full overflow-hidden bg-black/80"
          style={{ borderRadius: 'inherit' }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            poster={POSTER_IMAGE}
            onCanPlay={handleVideoReady}
            onLoadedData={handleVideoReady}
            className="w-full h-full object-cover"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>

          {/* Poster overlay fade */}
          <div
            aria-hidden
            className="absolute inset-0 bg-black transition-opacity duration-300"
            style={{
              opacity: posterVisible ? 1 : 0,
              backgroundImage: `linear-gradient(180deg,rgba(4,12,28,0.98) 0,rgba(2,4,12,0.2) 70%),url(${POSTER_IMAGE})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Preview label - Only visible when not fullscreen */}
          {!isFullscreen && (
            <div className="pointer-events-none absolute -top-3 -right-4 flex items-center gap-1 text-[0.65rem] tracking-[0.3em] uppercase text-white/70">
              <span className="font-mono leading-none">preview</span>
              <svg
                viewBox="0 0 24 24"
                width={18}
                height={18}
                className="fill-none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <path d="M4 12h14m-6-6 6 6-6 6" />
              </svg>
            </div>
          )}

          {/* Shadow overlay for thumbnail state */}
          {!isFullscreen && (
            <div
              className="absolute inset-0 shadow-[0_25px_55px_rgba(3,7,17,0.45)]"
              style={{ borderRadius: 'inherit' }}
              aria-hidden
            />
          )}

          {/* Sound toggle button - Visible in fullscreen */}
          {isFullscreen && (
            <button
              type="button"
              onClick={handleSoundToggle}
              className="absolute bottom-6 right-6 z-10 flex items-center justify-center 
                         w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm text-white 
                         transition-all duration-300 
                         hover:bg-black/70 hover:scale-105
                         focus-visible:outline-none focus-visible:ring-2 
                         focus-visible:ring-[#4fe6ff] focus-visible:ring-offset-2
                         focus-visible:ring-offset-black/50"
              aria-label={
                isMuted ? 'Ativar som do vídeo' : 'Desativar som do vídeo'
              }
              aria-pressed={isMuted ? 'false' : 'true'}
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Volume2 className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          )}

          {/* Sound indicator */}
          {isFullscreen && !isMuted && (
            <motion.div
              className="absolute bottom-6 left-6 flex items-center gap-2 
                         bg-black/60 backdrop-blur-sm rounded-full px-4 py-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <span className="w-2 h-2 bg-[#4fe6ff] rounded-full animate-pulse" />
              <span className="text-white text-sm font-mono uppercase tracking-wider">
                Sound On
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
