// src/components/home/ManifestoThumb.tsx
'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ASSETS } from '@/lib/constants';

// Função auxiliar de tracking (segura para SSR)
function track(event: string, detail?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  // Descomenta a linha abaixo se tiveres o listener configurado
  // window.dispatchEvent(new CustomEvent('portfolio:track', { detail: { event, ...detail } }));
  console.warn(`Tracking: ${event}`, detail);
}

export default function ManifestoThumb() {
  const reduceMotion = useReducedMotion();
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const rootRef = React.useRef<HTMLElement | null>(null);
  const hasPlayedRef = React.useRef(false);

  React.useEffect(() => {
    const el = rootRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const io = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          try {
            if (!hasPlayedRef.current) {
              await video.play();
              hasPlayedRef.current = true;
              track('manifesto_video_auto_play');
            }
            // Tenta ativar o som (pode falhar dependendo do browser)
            video.muted = false;
          } catch {
            video.muted = true;
          }
        } else {
          video.muted = true;
        }
      },
      { threshold: [0, 0.55, 0.75] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="manifesto"
      ref={rootRef}
      aria-label="Manifesto"
      className="w-full bg-[#0E0F12] py-16 px-4 md:px-8 flex justify-center"
    >
      <div className="w-full max-w-[1240px]">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl shadow-[0_26px_90px_rgba(0,0,0,0.35)] bg-white/5"
        >
          <div className="aspect-video w-full">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={ASSETS.videoManifesto}
              autoPlay
              loop
              muted
              playsInline
              controls={true} // Útil para mobile
              preload="metadata"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
