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
    <section className="relative min-h-screen flex items-center bg-(--ghost-bg) overflow-hidden pb-16 md:pb-20">
      {/* Background Videos - Atmosphere, not protagonist */}
      <video
        src={ABOUT_CONTENT.hero.videos.desktop}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="hidden lg:block absolute inset-0 w-full h-full object-cover object-top opacity-[0.55]"
      />
      <video
        src={ABOUT_CONTENT.hero.videos.mobile}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="block lg:hidden absolute inset-0 w-full h-full object-cover object-top opacity-[0.55]"
      />

      {/* Strong Dark Overlay for Legibility */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/65 to-black/90 pointer-events-none z-1" />

      {/* Content wrapper with invisible grid (ml-auto + padding) */}
      <div className="relative z-10 w-full pr-[8vw] px-6">
        {/* Layout Constraint: lg:max-w-[45vw] */}
        <div className="ml-auto w-full max-w-[42ch] md:max-w-[56ch] text-right flex flex-col items-end">
          {/* Phantom Label - Starts after 1.2s */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="mb-6 mr-1"
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
            className="space-y-12 w-full"
          >
            {/* Headline Group - Tracking -0.03em */}
            <div className="space-y-4 w-full">
              <motion.h1
                variants={variants.ghostIn}
                className="text-[clamp(44px,4.5vw,64px)] text-(--ghost-text) font-medium tracking-[-0.03em] leading-[1.05]"
              >
                Sou {kw('Danilo Novais.')}
              </motion.h1>

              <motion.p
                variants={variants.ghostIn}
                className="text-[clamp(32px,3.5vw,48px)] text-(--ghost-text) font-medium tracking-[-0.03em] leading-[1.05]"
              >
                {kw('Você não vê')} tudo o que eu faço.
              </motion.p>

              <motion.p
                variants={variants.ghostIn}
                className="text-[clamp(32px,3.5vw,48px)] text-(--ghost-text) font-medium tracking-[-0.03em] leading-[1.05]"
              >
                Mas sente quando {kw('funciona.')}
              </motion.p>
            </div>

            {/* Paragraph Group - Editorial Animation */}
            {/* We manually delay editorial text to start AFTER the headlines (1.2s + stagger) */}
            <div className="space-y-4 ml-auto w-full flex flex-col items-end pt-4 mt-16 md:mt-10">
              {ABOUT_CONTENT.hero.description.map((line, idx) => (
                <EditorialText
                  key={idx}
                  text={line}
                  // delay prop determines delayChildren inside EditorialText
                  // We need it to wait for 1.2s + headline animations (~0.5s)
                  // 1.7s / 0.04 = ~42
                  delay={baseDelayIndex + idx * 5}
                  className="text-base text-(--ghost-text-secondary) font-light leading-[1.8] tracking-tight text-right w-full justify-end"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
