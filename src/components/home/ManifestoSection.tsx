'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const MANIFESTO_VIDEO_URL =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4'

export default function ManifestoSection() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const inView = useInView(sectionRef, { amount: 0.65 })
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Sempre autoplay; áudio é tentado apenas quando em foco.
    const ensurePlay = async () => {
      try {
        await video.play()
      } catch {
        // ignora: browsers podem bloquear autoplay
      }
    }

    if (inView) {
      // tenta desmutar automaticamente (pode falhar em alguns browsers)
      video.muted = false
      ensurePlay().catch(() => {})
      // se o browser bloquear, volta para mute (sem quebrar)
      const t = window.setTimeout(() => {
        if (video.paused) {
          video.muted = true
          ensurePlay().catch(() => {})
        }
      }, 150)
      return () => window.clearTimeout(t)
    } else {
      video.muted = true
      ensurePlay().catch(() => {})
    }
  }, [inView])

  return (
    <section
      id="manifesto"
      ref={(n) => {
        sectionRef.current = n
      }}
      className="bg-[#0B0B0D] py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-black"
        >
          {errored ? (
            <div className="flex aspect-video w-full items-center justify-center text-sm text-white/70">
              Não foi possível carregar o manifesto em vídeo
            </div>
          ) : (
            <video
              ref={videoRef}
              className="aspect-video w-full object-cover"
              autoPlay
              loop
              playsInline
              muted
              preload="metadata"
              onError={() => setErrored(true)}
            >
              <source src={MANIFESTO_VIDEO_URL} type="video/mp4" />
            </video>
          )}
        </motion.div>
      </div>
    </section>
  )
}
