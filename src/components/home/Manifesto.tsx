"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ASSETS } from "../../lib/constants";
import { AlertCircle } from "lucide-react";

const Manifesto: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [forceMute, setForceMute] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mantém o áudio desativado em mobile
  useEffect(() => {
    const updateAudioPreference = () => {
      const isMobile = window.innerWidth < 768;
      setForceMute(isMobile);
      if (isMobile && videoRef.current) {
        videoRef.current.muted = true;
      }
    };

    updateAudioPreference();
    window.addEventListener("resize", updateAudioPreference);
    return () => window.removeEventListener("resize", updateAudioPreference);
  }, []);

  // Lazy-load: só inicia carregamento quando metade da seção está visível
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Controla áudio baseado no viewport e estado da página
  useEffect(() => {
    if (!shouldLoad) return;
    const sectionEl = sectionRef.current;
    const videoEl = videoRef.current;
    if (!sectionEl || !videoEl) return;

    const evaluateVisibility = () => {
      if (!videoRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const fullyVisible = rect.top >= 0 && rect.bottom <= viewportHeight;
      const partiallyVisible = rect.bottom > 0 && rect.top < viewportHeight;
      const pageHidden = document.visibilityState === "hidden";

      if (forceMute || pageHidden || !partiallyVisible) {
        videoRef.current.muted = true;
        if (!videoRef.current.paused) {
          videoRef.current.pause();
        }
        return;
      }

      if (fullyVisible) {
        videoRef.current.muted = false;
        if (videoRef.current.paused) {
          videoRef.current.play().catch(() => null);
        }
      } else {
        videoRef.current.muted = true;
        if (!videoRef.current.paused) {
          videoRef.current.pause();
        }
      }
    };

    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        evaluateVisibility();
        frame = 0;
      });
    };

    evaluateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", evaluateVisibility);
    document.addEventListener("visibilitychange", evaluateVisibility);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", evaluateVisibility);
      document.removeEventListener("visibilitychange", evaluateVisibility);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [forceMute, shouldLoad]);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      aria-labelledby="video-manifesto-title"
      aria-describedby="video-manifesto-description"
      className="w-full bg-[#F4F5F7] px-6 py-16"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        <div>
          <h2
            id="video-manifesto-title"
            className="text-2xl font-semibold text-[#111111]"
          >
            Vídeo Manifesto
          </h2>
          <p
            id="video-manifesto-description"
            className="text-base text-[#111111]/80"
          >
            Este vídeo apresenta meu manifesto em design. O áudio é ativado
            automaticamente quando visível em tela cheia.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg"
        >
          {!hasError ? (
            shouldLoad ? (
              <video
                ref={videoRef}
                src={ASSETS.videoManifesto}
                className="aspect-video h-full w-full max-w-full object-contain"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                controls
                // @ts-expect-error - atributo experimental ainda sem tipagem
                loading="lazy"
                onError={() => setHasError(true)}
                aria-label="Vídeo Manifesto do portfólio"
              />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-[#e4ebff] to-[#f5f8ff] text-sm text-[#5b6b7f]">
                Preparando manifesto...
              </div>
            )
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500 p-6 text-center">
              <AlertCircle className="mb-3 h-10 w-10 opacity-50" />
              <p className="font-medium">Não foi possível carregar o vídeo.</p>
              <a
                href={ASSETS.videoManifesto}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-[#0057FF] text-sm underline-offset-4 hover:underline"
              >
                Assistir diretamente
              </a>
            </div>
          )}
        </motion.div>

        {forceMute && (
          <p className="text-sm text-[#111111]/60">
            Em dispositivos móveis o áudio permanece desativado para respeitar o
            ambiente do usuário.
          </p>
        )}
      </div>
    </section>
  );
};

export default Manifesto;
