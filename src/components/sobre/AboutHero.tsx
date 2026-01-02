'use client';

import { motion } from 'framer-motion';
import { ABOUT_CONTENT } from '@/config/content';
import { kw } from './keywords';
import { useEditorialMotion } from '@/hooks/useEditorialMotion';
import EditorialText from '@/components/ui/EditorialText';

export function AboutHero() {
  const { variants } = useEditorialMotion();

  // Calculating delay factor for EditorialText (base 0.04s multiplier)
  // We want ~1.5s delay total for the text. 1.5 / 0.04 = 37.5
  const baseDelayIndex = 38;

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-end md:items-center bg-(--ghost-bg) overflow-hidden pt-24 md:pt-28 pb-14">
      {/* Background Videos - Atmosphere, not protagonist */}
      <video
        src={ABOUT_CONTENT.hero.videos.desktop}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="hidden lg:block absolute inset-0 w-full h-full object-cover object-top opacity-[0.6]"
      />
      <video
        src={ABOUT_CONTENT.hero.videos.mobile}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="block lg:hidden absolute inset-0 w-full h-full object-cover object-top opacity-[0.6]"
      />

      {/* Strong Dark Overlay for Legibility */}
      <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/70 to-black/90 pointer-events-none z-1" />

      {/* Content wrapper with invisible grid (ml-auto + padding) */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Layout Constraint: lg:max-w-[45vw] */}
        <div className="ml-auto w-full max-w-[780px] lg:max-w-[50vw] text-left md:text-right flex flex-col items-start md:items-end gap-8 md:gap-10">
          {/* Phantom Label - Starts after 1.2s */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="mr-0 md:mr-1"
          >
            <span className="inline-block px-3 py-1 border border-white/20 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-(--ghost-flare)">
              Profile
            </span>
          </motion.div>

          {/* Main Content Wrapper - Silence Start */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={1.2} // 1.2s accumulated delay for children
            variants={variants.staggerContainer}
            className="space-y-10 md:space-y-12 w-full"
          >
            {/* Headline Group - Tracking -0.03em */}
            <div className="space-y-3 md:space-y-4">
              <motion.h1
                variants={variants.fadeGhost}
                className="text-[clamp(38px,4.4vw,64px)] text-(--ghost-text) font-medium tracking-[-0.03em] leading-[1.05]"
              >
                Sou {kw('Danilo Novais.')}
              </motion.h1>

              <motion.p
                variants={variants.fadeGhost}
                className="text-[clamp(28px,3.2vw,48px)] text-(--ghost-text) font-medium tracking-[-0.03em] leading-[1.08]"
              >
                {kw('Você não vê')} tudo o que eu faço.
              </motion.p>

              <motion.p
                variants={variants.fadeGhost}
                className="text-[clamp(28px,3.2vw,48px)] text-(--ghost-text) font-medium tracking-[-0.03em] leading-[1.08]"
              >
                Mas sente quando {kw('funciona.')}
              </motion.p>
            </div>

            {/* Paragraph Group - Editorial Animation */}
            {/* We manually delay editorial text to start AFTER the headlines (1.2s + stagger) */}
            <div className="space-y-4 ml-0 md:ml-auto max-w-[620px] flex flex-col items-start md:items-end pt-2 md:pt-4">
              {ABOUT_CONTENT.hero.description.map((line, idx) => (
                <EditorialText
                  key={idx}
                  text={line}
                  // delay prop determines delayChildren inside EditorialText
                  // We need it to wait for 1.2s + headline animations (~0.5s)
                  // 1.7s / 0.04 = ~42
                  delay={baseDelayIndex + idx * 5}
                  className="text-base md:text-lg text-(--ghost-text-secondary) font-light leading-[1.8] tracking-tight text-left md:text-right w-full justify-end"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
