"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const MANIFESTO_URL =
  "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4";

export function ManifestoSection() {
  const ref = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reduce = useReducedMotion();
  const [inView, setInView] = useState(false);

  // IntersectionObserver: in view => try unmute; out => mute.
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const visible = !!entry?.isIntersecting && entry.intersectionRatio > 0.35;
        setInView(visible);
      },
      { threshold: [0.0, 0.35, 1.0] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (inView) {
      // Autoplay policies: unmute may fail; keep graceful
      v.muted = false;
      v.play().catch(() => {
        v.muted = true;
        v.play().catch(() => {});
      });
    } else {
      v.muted = true;
    }
  }, [inView]);

  return (
    <section id="manifesto" ref={ref as any} className="mx-auto max-w-6xl px-6 py-20" aria-label="Manifesto">
      <motion.div
        className="overflow-hidden rounded-2xl border border-white/10 bg-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        initial={reduce ? false : { opacity: 0, scale: 0.98 }}
        whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <video
          ref={videoRef}
          className="aspect-video w-full object-cover"
          src={MANIFESTO_URL}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="Vídeo manifesto"
          onPlay={() => {
            // tracking hook
          }}
        />
      </motion.div>
    </section>
  );
}
