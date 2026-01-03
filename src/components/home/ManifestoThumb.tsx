import { useState, useRef, forwardRef, useImperativeHandle } from 'react';

import { HOME_CONTENT } from '@/config/content';

// Video sources - prioritize remote (Single Source of Truth) from content.ts
// We removed local fallback to ensure consistency with the design system.
const VIDEO_SOURCES = {
  remote: HOME_CONTENT.hero.video,
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

  /*
   * SIMPLIFIED SOURCE LOGIC:
   * We now trust the supabase CDN URL strictly.
   * If error handling is needed later, we can add a toast or placeholder.
   */
  const videoSrc = VIDEO_SOURCES.remote;

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
