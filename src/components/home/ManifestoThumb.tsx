import {
  useState,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';

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
    <div
      className="relative w-full h-full overflow-hidden cursor-pointer group"
      aria-label="Assistir manifesto em fullscreen"
      role="button"
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
      onClick={onClick}
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
        className="w-full h-full object-cover"
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
    </div>
  );
});

ManifestoThumb.displayName = 'ManifestoThumb';

export default ManifestoThumb;
