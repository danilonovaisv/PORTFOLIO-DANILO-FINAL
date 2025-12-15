'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../../lib/constants';
import { AlertCircle } from 'lucide-react';

const Manifesto: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Entrou na tela: Toca e tira o mudo
            videoElement.play().catch((e) => {
              // eslint-disable-next-line no-console
              console.log('Autoplay blocked:', e);
            });
            videoElement.muted = false;
            // eslint-disable-next-line no-console
            console.log('manifesto_video_auto_play');
            // eslint-disable-next-line no-console
            console.log('manifesto_audio_unmuted_auto');
          } else {
            // Saiu da tela: Mute
            videoElement.muted = true;
            // eslint-disable-next-line no-console
            console.log('manifesto_audio_muted_on_leave');
          }
        });
      },
      { threshold: 0.6 } // 60% visível para ativar
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleVideoComplete = () => {
    // eslint-disable-next-line no-console
    console.log('manifesto_video_complete');
  };

  return (
    <section id="manifesto" className="w-full bg-[#F4F5F7]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        className="relative w-full aspect-video md:aspect-21/9 overflow-hidden bg-gray-100 shadow-sm"
      >
        {!hasError ? (
          <video
            ref={videoRef}
            src={ASSETS.videoManifesto}
            className="w-full h-full object-cover"
            playsInline
            onEnded={handleVideoComplete}
            onError={() => setHasError(true)}
            aria-label="Vídeo Manifesto do Portfólio"
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
      </motion.div>
    </section>
  );
};

export default Manifesto;
