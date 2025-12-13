'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../../lib/constants';
import { AlertCircle } from 'lucide-react';

const Manifesto: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const manifestRef = useRef<HTMLDivElement>(null);

  const updateMute = useCallback((mute: boolean) => {
    setIsMuted(mute);
    if (videoRef.current) {
      videoRef.current.muted = mute;
      if (!mute) {
        videoRef.current.volume = 1;
      }
    }
  }, []);

  useEffect(() => {
    if (!manifestRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldPlayWithSound =
          entry.isIntersecting && entry.intersectionRatio >= 0.55;

        updateMute(!shouldPlayWithSound);
      },
      { threshold: [0.55] }
    );

    observer.observe(manifestRef.current);

    return () => {
      observer.disconnect();
    };
  }, [updateMute]);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const portfolioSection = document.getElementById('portfolio-showcase');
    if (!portfolioSection) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          updateMute(true);
        }
      },
      { threshold: [0.1] }
    );

    observer.observe(portfolioSection);

    return () => observer.disconnect();
  }, [updateMute]);

  return (
    <section
      id="manifesto"
      className="w-full bg-[#F4F5F7] px-4 py-10 sm:px-6 sm:py-14"
    >
      <motion.div
        ref={manifestRef}
        initial={{ opacity: 0.6, scale: 1.02 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl bg-gray-100 shadow-sm"
      >
        <div className="relative w-full overflow-hidden aspect-video sm:aspect-21/9">
          {!hasError ? (
            <motion.video
              ref={videoRef}
              src={ASSETS.videoManifesto}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted={isMuted}
              loop
              playsInline
              controls
              onError={() => setHasError(true)}
              aria-label="Vídeo Manifesto do Portfólio"
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500 p-6 text-center">
              <AlertCircle className="w-10 h-10 mb-3 opacity-50" />
              <p className="font-medium">Não foi possível carregar o vídeo.</p>
              <a
                href={ASSETS.videoManifesto}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-primary text-sm hover:underline underline-offset-4"
              >
                Assistir diretamente
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Manifesto;
