'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const VIDEO_SOURCES = [
  {
    type: 'video/webm',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
  },
  {
    type: 'video/mp4',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
  },
];

const POSTER_IMAGE =
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80';

export default function ManifestoThumb() {
  const [posterVisible, setPosterVisible] = useState(true);
  const hasFadedRef = useRef(false);

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

  const handleVideoReady = () => {
    if (!hasFadedRef.current) {
      setPosterVisible(false);
      hasFadedRef.current = true;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 18, scale: 0.96 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed bottom-[5vh] right-[5vw] z-40 w-[min(280px,calc(35vw))] max-w-[320px] shadow-[0_25px_55px_rgba(3,7,17,0.45)] rounded-[18px] overflow-hidden bg-black/80 pointer-events-auto hover:scale-[1.02] transition-transform duration-300 ease-out"
      aria-label="Preview em vídeo"
    >
      <div className="relative w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={POSTER_IMAGE}
          onCanPlay={handleVideoReady}
          onLoadedData={handleVideoReady}
          className="w-full h-full object-cover"
        >
          {VIDEO_SOURCES.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>

        <div
          aria-hidden
          className="absolute inset-0 bg-black"
          style={{
            transition: 'opacity 300ms ease',
            opacity: posterVisible ? 1 : 0,
            backgroundImage: `linear-gradient(180deg,rgba(4,12,28,0.98) 0,rgba(2,4,12,0.2) 70%),url(${POSTER_IMAGE})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

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
      </div>
    </motion.div>
  );
}
