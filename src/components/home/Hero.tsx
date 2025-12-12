'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'

const HeroGlassCanvas = dynamic(() => import('./HeroGlassCanvas'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-[28px] bg-white/40 backdrop-blur-sm" />
  ),
})

const MANIFESTO_VIDEO_URL =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4'

const easeOutFn = (t: number) => 1 - Math.pow(1 - t, 2)

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Texto perde foco no scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2])
  const textTranslateY = useTransform(scrollYProgress, [0, 0.7], [0, -24])

  // Thumb ganha destaque no scroll (sem fullscreen)
  const thumbScale = prefersReducedMotion
    ? 1
    : useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const thumbTranslateY = prefersReducedMotion
    ? 0
    : useTransform(scrollYProgress, [0, 1], [0, -24])

  const [thumbErrored, setThumbErrored] = useState(false)
  const [thumbCanPlay, setThumbCanPlay] = useState(true)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // reduz trabalho de GPU/CPU quando não está no topo (heurística simples)
    // não altera conteúdo textual; apenas otimiza a thumb em scroll mais profundo
    if (prefersReducedMotion) return
    if (v > 0.9) setThumbCanPlay(false)
    else setThumbCanPlay(true)
  })

  const containerVariants = {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.08, delayChildren: 0.12 },
    },
  }

  const fadeUp = (delay = 0) => ({
    initial: { y: 18, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: easeOutFn, delay },
    },
  })

  const titleLine = {
    initial: prefersReducedMotion ? { opacity: 0 } : { y: 16, opacity: 0 },
    animate: prefersReducedMotion
      ? { opacity: 1, transition: { duration: 0.4 } }
      : { y: 0, opacity: 1, transition: { duration: 0.8, ease: easeOutFn } },
  }

  const handleScrollToManifesto = () => {
    const el = document.getElementById('manifesto')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="hero"
      ref={(n) => {
        heroRef.current = n
      }}
      className="relative min-h-[100svh] bg-[#F4F5F7] pt-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left column (texto) */}
          <motion.div
            className="relative z-10"
            style={{ opacity: textOpacity, y: textTranslateY }}
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.p
              className="mb-6 inline-flex rounded-md bg-transparent text-base font-medium text-[#0057FF]"
              {...fadeUp(0)}
            >
              [ BRAND AWARENESS ]
            </motion.p>

            <div className="leading-[0.9]">
              <motion.h1 className="text-5xl font-extrabold tracking-tight text-[#111111] sm:text-6xl lg:text-7xl">
                <motion.span className="block text-[#0057FF]" variants={titleLine}>
                  Design,
                </motion.span>
                <motion.span className="block" variants={titleLine}>
                  não é só
                </motion.span>
                <motion.span className="block" variants={titleLine}>
                  estética.
                </motion.span>
              </motion.h1>
            </div>

            <motion.p
              className="mt-6 inline-block rounded-md bg-white/55 px-5 py-3 text-lg font-medium text-[#0057FF] backdrop-blur-sm"
              {...fadeUp(0.05)}
            >
              [É intenção, é estratégia, é experiência.]
            </motion.p>

            <motion.div className="mt-10" {...fadeUp(0.1)}>
              <Link
                href="/sobre"
                className="inline-flex items-center gap-4 rounded-full bg-[#0057FF] px-10 py-4 text-base font-medium text-white shadow-sm transition-transform hover:-translate-y-[1px] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F4F5F7]"
                data-event="hero_cta_click"
              >
                <span>get to know me better →</span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 17L17 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 7h8v8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column (3D + tag + thumb) */}
          <div className="relative">
            <div className="relative h-[560px] w-full lg:h-[680px]">
              {/* 3D Canvas */}
              <div className="absolute inset-0">
                <HeroGlassCanvas className="h-full w-full" scrollYProgress={scrollYProgress} />
              </div>

              {/* Tag (bloco translúcido) */}
              <div className="pointer-events-none absolute right-0 top-10 w-full max-w-[420px] rounded-md bg-white/35 px-12 py-9 backdrop-blur-sm">
                <p className="text-xl font-medium tracking-wide text-[#0057FF]">
                  [ BRAND AWARENESS ]
                </p>
              </div>

              {/* Thumb do vídeo manifesto */}
              <motion.button
                type="button"
                onClick={handleScrollToManifesto}
                className="group absolute bottom-8 right-0 w-[240px] cursor-pointer rounded-xl border border-black/5 bg-white/10 p-2 shadow-sm backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F4F5F7] sm:w-[280px]"
                style={
                  prefersReducedMotion
                    ? undefined
                    : {
                        scale: thumbScale as any,
                        y: thumbTranslateY as any,
                        willChange: 'transform',
                      }
                }
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                aria-label="Ir para manifesto em vídeo"
                data-event="hero_thumb_click"
              >
                <div className="relative overflow-hidden rounded-lg bg-black">
                  {/* Sem overlay (sem texto, sem badge, sem ícone sobreposto ao vídeo) */}
                  {thumbErrored ? (
                    <div className="flex aspect-video w-full items-center justify-center bg-black text-sm text-white/70">
                      Vídeo Manifesto
                    </div>
                  ) : (
                    <motion.video
                      className="aspect-video w-full object-cover"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7, ease: easeOutFn }}
                      muted
                      autoPlay={thumbCanPlay}
                      loop
                      playsInline
                      preload="metadata"
                      onError={() => setThumbErrored(true)}
                    >
                      <source src={MANIFESTO_VIDEO_URL} type="video/mp4" />
                    </motion.video>
                  )}
                </div>

                {/* seta decorativa fora do vídeo (não é overlay) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-6 left-4 text-[#0057FF] opacity-70 transition-opacity group-hover:opacity-100"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 17L17 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 7h8v8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
