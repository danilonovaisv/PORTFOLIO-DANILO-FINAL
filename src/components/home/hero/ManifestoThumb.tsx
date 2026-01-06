import {
  useState,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { motion, MotionStyle } from 'framer-motion';

// Video sources - prioritize local, fallback to Supabase
const VIDEO_SOURCES = {
  local: '/assets/thumb-hero.mp4',
  remote:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
} as const;

export interface ManifestoThumbHandle {
  setMuted: (_muted: boolean) => void;
}

interface ManifestoThumbProps {
  style?: MotionStyle;
  onClick?: () => void;
}

const ManifestoThumb = forwardRef<ManifestoThumbHandle, ManifestoThumbProps>(
  ({ style, onClick }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [videoError, setVideoError] = useState(false);

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

    const handleVideoError = useCallback(() => {
      if (!videoError) {
        setVideoError(true);
      }
    }, [videoError]);

    const videoSrc = videoError ? VIDEO_SOURCES.remote : VIDEO_SOURCES.local;

    return (
      <motion.div
        style={style}
        className="hidden lg:block absolute bottom-12 right-12 z-30 aspect-video overflow-hidden shadow-2xl origin-bottom-right cursor-pointer group"
        aria-label="Assistir manifesto em fullscreen"
        role="button"
        onClick={onClick}
        initial={{ opacity: 0, scale: 0.92, y: 60, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: [1.02, 1], y: 0, filter: 'blur(0px)' }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 1.5,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Video element */}
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          onError={handleVideoError}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          aria-label="Portfolio showreel video"
        />

        {/* Hover visual enhancement (subtle darken) */}
        <div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"
          aria-hidden="true"
        />

        {/* Subtle gradient overlay for depth */}
        <div
          className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/30 via-transparent to-transparent opacity-60"
          aria-hidden="true"
        />

        {/* Icone de seta (mantido do original por estilo) */}
        <div className="absolute bottom-3 right-3 text-white/50 bg-black/20 p-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>
    );
  }
);

ManifestoThumb.displayName = 'ManifestoThumb';

export default ManifestoThumb;
