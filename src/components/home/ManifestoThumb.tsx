import {
  useState,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { motion } from 'framer-motion';

// Video sources
const VIDEO_SOURCES = {
  local: '/assets/thumb-hero.mp4',
  remote:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
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
  const [videoError, setVideoError] = useState(false);

  useImperativeHandle(ref, () => ({
    setMuted: (muted: boolean) => {
      if (videoRef.current) {
        videoRef.current.muted = muted;
        setIsMuted(muted);
        if (!muted) {
          videoRef.current.play().catch(() => {
            /* Autoplay handler */
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
    <div
      className="relative w-full h-full cursor-pointer group"
      aria-label="Assistir manifesto em fullscreen"
      role="button"
      onClick={onClick}
    >
      {/* SETAS DE DESTAQUE (ARROW) - REPLICAÇÃO DA REFERÊNCIA 
        Posicionada fora do container do vídeo (top: -X), alinhada à direita.
      */}
      <div className="absolute right-0 -top-12 z-20 pointer-events-none mix-blend-difference">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-2 text-white"
        >
          {/* SVG Arrow Copiado da Referência */}
          <svg
            width="27"
            height="24"
            viewBox="0 0 27 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          >
            <path
              d="M1.27208 12L26.7279 12M1.27208 12L12.0072 22.7352M1.27208 12L12.0072 1.2648"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      </div>

      {/* Container do Vídeo com Overflow Hidden para Bordas */}
      <div className="relative w-full h-full overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          onError={handleVideoError}
          className="w-full h-full object-cover transform scale-105" // Scale ligeiro para evitar bordas brancas
          aria-label="Portfolio showreel video"
        />

        {/* Hover visual enhancement */}
        <div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"
          aria-hidden="true"
        />
      </div>
    </div>
  );
});

ManifestoThumb.displayName = 'ManifestoThumb';

export default ManifestoThumb;
