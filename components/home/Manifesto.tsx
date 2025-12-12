"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../../lib/constants';
import { AlertCircle } from 'lucide-react';

const Manifesto: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section id="manifesto" className="w-full bg-[#F4F5F7]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden bg-gray-100 shadow-sm"
      >
        {!hasError ? (
          <video
            ref={videoRef}
            src={ASSETS.videoManifesto}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls
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