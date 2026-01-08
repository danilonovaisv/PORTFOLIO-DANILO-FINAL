'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './ManifestoThumb.module.css';

const POSTER_IMAGE =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4';

export default function ManifestoThumb({
  sectionRef,
}: {
  sectionRef?: React.RefObject<HTMLElement | null>;
}) {
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
      ref={sectionRef as any}
      className="hidden lg:block fixed bottom-[5vh] right-[5vw] z-30 w-[min(280px,calc(35vw))] max-w-[320px] shadow-[0_25px_55px_rgba(3,7,17,0.45)] rounded-[18px] overflow-hidden bg-black/80 pointer-events-auto transition-transform duration-300 ease-out"
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
          <source
            src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
            type="video/mp4"
          />
        </video>

        <div
          aria-hidden
          className={styles.videoOverlay}
          style={
            {
              opacity: posterVisible ? 1 : 0,
              '--poster-gradient': `linear-gradient(180deg,rgba(4,12,28,0.98) 0,rgba(2,4,12,0.2) 70%),url(${POSTER_IMAGE})`,
            } as React.CSSProperties
          }
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
