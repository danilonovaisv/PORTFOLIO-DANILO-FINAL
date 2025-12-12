'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Volume2, VolumeX } from 'lucide-react';

const Manifesto: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle video mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Play video with delay when component mounts
  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          // Add a 0.5s delay before unmuting
          timeoutRef.current = setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              setIsMuted(false);
            }
          }, 500);

          // Play the video
          await videoRef.current.play();
        } catch (error) {
          console.warn('Autoplay failed:', error);
        }
      }
    };

    playVideo();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-title"
      className="w-full bg-[#F4F5F7]"
    >
      <div className="mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center gap-12 px-6 py-32 md:gap-16 md:px-8 md:py-48 lg:px-10">
        <div className="flex max-w-4xl flex-col items-center text-center space-y-6 md:space-y-8">
          <motion.h2
            id="manifesto-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-6xl"
          >
            manifesto
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-lg text-neutral-500 md:text-xl"
          >
            Design é intenção, estratégia e experiência. Este manifesto une
            narrativa e movimento para mostrar como a criatividade e a
            tecnologia trabalham juntas para amplificar mensagens e impactar
            pessoas.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full overflow-hidden rounded-3xl bg-gray-100 shadow-sm ring-1 ring-gray-200/80"
        >
          <div className="aspect-video md:aspect-21/9">
            {!hasError ? (
              <>
                <video
                  ref={videoRef}
                  src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
                  className="h-full w-full object-cover"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  controls={false}
                  onError={() => setHasError(true)}
                  aria-label="Vídeo Manifesto do Portfólio"
                />
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 rounded-full bg-black/30 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-black/50"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5 text-white" />
                  ) : (
                    <Volume2 className="h-5 w-5 text-white" />
                  )}
                </button>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-6 text-center text-gray-500">
                <AlertCircle className="mb-3 h-10 w-10 opacity-50" />
                <p className="font-medium">
                  Não foi possível carregar o vídeo.
                </p>
                <a
                  href="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-sm text-primary underline-offset-4 hover:underline"
                >
                  Assistir diretamente
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Manifesto;
