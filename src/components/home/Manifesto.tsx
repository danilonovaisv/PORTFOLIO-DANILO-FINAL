'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const MANIFESTO_VIDEO_URL =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4';

function track(event: string, detail?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('portfolio:track', { detail: { event, ...detail } })
  );
}

export default function ManifestoSection() {
  const reduceMotion = useReducedMotion();
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const rootRef = React.useRef<HTMLElement | null>(null);
  const hasPlayedRef = React.useRef(false);

  // Áudio ativo somente enquanto a seção estiver em foco (IntersectionObserver)
  React.useEffect(() => {
    const el = rootRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const io = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          // Mantém autoplay mudo (política do browser), tenta desmutar com grace
          // Se o browser bloquear, continua mudo (comportamento esperado).
          try {
            if (!hasPlayedRef.current) {
              // primeiro play (mudo)
              await video.play();
              hasPlayedRef.current = true;
              track('manifesto_video_auto_play');
            }

            video.muted = false;
            track('manifesto_audio_unmuted_auto');
          } catch {
            // Bloqueado sem gesto do usuário → ok, permanece mudo
            video.muted = true;
          }
        } else {
          video.muted = true;
          track('manifesto_audio_muted_on_leave');
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
      className="bg-[#0E0F12] py-16"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={[
            'overflow-hidden rounded-2xl',
            'shadow-[0_26px_90px_rgba(0,0,0,0.35)]',
            'bg-white/5',
          ].join(' ')}
        >
          <div className="aspect-video w-full">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={MANIFESTO_VIDEO_URL}
              autoPlay
              loop
              muted
              playsInline
              controls
              preload="metadata"
              aria-label="Vídeo manifesto"
              data-track="manifesto_video_auto_play"
              onPlay={() => track('manifesto_video_auto_play')}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
