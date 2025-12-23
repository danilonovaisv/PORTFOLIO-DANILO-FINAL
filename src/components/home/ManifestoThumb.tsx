'use client';

import { motion, MotionProps } from 'framer-motion';
import { useRef, useState } from 'react';

interface ManifestoThumbProps extends MotionProps {
  className?: string;
  style?: React.CSSProperties | any; // frame-motion styles
  onClick?: () => void;
}

export default function ManifestoThumb({
  className,
  style,
  onClick,
  ...props
}: ManifestoThumbProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click if any
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!videoRef.current.muted);
    }
  };

  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer group ${className || ''}`}
      style={style}
      onClick={onClick}
      aria-label="Assista ao vídeo manifesto"
      {...props}
    >
      <video
        ref={videoRef}
        src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
        muted={isMuted}
        loop
        playsInline
        autoPlay
        className="w-full h-full object-cover"
      />

      {/* Mute/Unmute Button - Visible on Ghost/Hover or always if needed */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-30 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
      >
        {isMuted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
    </motion.div>
  );
}
