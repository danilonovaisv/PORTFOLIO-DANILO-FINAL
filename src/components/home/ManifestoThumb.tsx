import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';
import { BRAND } from '@/config/brand';

// Video sources - prioritize remote (Single Source of Truth) from content.ts
const VIDEO_SOURCES = {
  remote: BRAND.video.manifesto,
} as const;

export interface ManifestoThumbHandle {
  setMuted: (_muted: boolean) => void;
}

interface ManifestoThumbProps {
  onClick?: () => void;
}

export const ManifestoThumb = forwardRef<
  ManifestoThumbHandle,
  ManifestoThumbProps
>(({ onClick }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  useImperativeHandle(ref, () => ({
    setMuted: (muted: boolean) => {
      if (videoRef.current) {
        videoRef.current.muted = muted;
        setIsMuted(muted);
        if (!muted) {
          videoRef.current.play().catch(() => {
            // Handle potential autoplay block if unmuted manually
          });
        }
      }
    },
  }));

  const videoSrc = VIDEO_SOURCES.remote;

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden cursor-pointer group rounded-2xl shadow-2xl"
      aria-label="Assistir manifesto em fullscreen"
      role="button"
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              scale: 1.05,
              transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
            }
      }
      whileTap={
        reducedMotion
          ? undefined
          : {
              scale: 0.98,
              transition: { duration: 0.15 },
            }
      }
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="w-full h-full object-cover"
        aria-label="Portfolio showreel video"
      />

      {/* Hover overlay with gradient */}
      <motion.div
        className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />

      {/* Ghost glow effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow:
            '0 0 40px rgba(79, 230, 255, 0.3), inset 0 0 60px rgba(79, 230, 255, 0.1)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        aria-hidden="true"
      />

      {/* Play icon indicator */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
          <Play
            className="w-8 h-8 text-white ml-1"
            fill="white"
            aria-hidden="true"
          />
        </div>
      </motion.div>

      {/* Subtle ambient vignette (always visible) */}
      <div
        className="absolute inset-0 pointer-events-none bg-linear-to-br from-transparent via-transparent to-black/40"
        aria-hidden="true"
      />

      {/* Focus ring for accessibility */}
      <div
        className="absolute inset-0 pointer-events-none ring-2 ring-primary ring-offset-2 ring-offset-transparent rounded-2xl opacity-0 group-focus-visible:opacity-100 transition-opacity"
        aria-hidden="true"
      />
    </motion.div>
  );
});

ManifestoThumb.displayName = 'ManifestoThumb';

export default ManifestoThumb;
