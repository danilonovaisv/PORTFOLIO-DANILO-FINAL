'use client';

import Image from 'next/image';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '@/config/content';
import { CTAButton } from '@/components/ui/CTAButton';

const heroItems = PORTFOLIO_CONTENT.hero.items;

export default function PortfolioHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="portfolio-hero"
      className="relative overflow-hidden bg-[#050511] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,87,255,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(79,230,255,0.18),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(5,5,17,0.95)_40%,rgba(5,5,17,1)_100%)]" />

      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-10 px-[clamp(1.5rem,5vw,6rem)] pb-16 pt-28 md:pt-32">
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-sm uppercase tracking-[0.4em] text-white/60"
        >
          [portfólio]
        </motion.span>

        <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
          <div className="flex flex-col gap-6">
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-4xl leading-[1.05] md:text-5xl lg:text-6xl font-semibold tracking-tight"
            >
              Você não vê o design.
              <br />
              Mas ele guia cada escolha.
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
              className="max-w-2xl text-lg text-white/70 leading-relaxed"
            >
              Uma curadoria de campanhas, identidades, web e motion — pensadas
              para manter você no fluxo. Visual, silencioso, editorial.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 }}
              className="flex flex-wrap items-center gap-4"
            >
              <CTAButton href="#portfolio-showcase">portfolio showcase</CTAButton>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#4fe6ff]"
              >
                vamos trabalhar juntos
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4fe6ff]/40 bg-white/5 text-white transition duration-200 group-hover:bg-[#4fe6ff] group-hover:text-[#000022]">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </motion.div>
          </div>

          <div className="flex flex-col gap-4">
            <motion.div
              className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_70px_-40px_rgba(0,0,0,0.8)]"
              initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.96 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.12 }}
            >
              <div className="grid grid-cols-2 gap-3">
                {heroItems.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/5"
                  >
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5" />
                    <span className="absolute left-2 bottom-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-white/5 bg-[#0b1022]/70 px-4 py-3">
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-white/70">
                  <span className="h-2 w-2 rounded-full bg-[#4fe6ff] animate-pulse" />
                  ghost system
                </div>
                <span className="text-xs text-white/60">scroll para ler</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
