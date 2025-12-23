"use client";

import { motion, useReducedMotion } from "framer-motion";

const MANIFESTO_URL =
  "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4";

export function ManifestoThumb() {
  const reduce = useReducedMotion();

  return (
    <a
      href="#manifesto"
      aria-label="Ir para o vídeo manifesto"
      className="block"
      onClick={(e) => {
        // smooth scroll, but keep hash for deep-linking
        e.preventDefault();
        document.querySelector("#manifesto")?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", "#manifesto");
      }}
      data-track="hero_thumb_click"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        initial={reduce ? false : { opacity: 0, scale: 1.03 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        whileHover={reduce ? undefined : { scale: 1.01 }}
      >
        <video
          className="aspect-video w-full object-cover"
          src={MANIFESTO_URL}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </motion.div>
    </a>
  );
}
