// src/components/sobre/SobreHero.tsx
'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { motionTokens } from './motionTokens';

type SobreHeroProps = { videoSrc: string; poster?: string };

export default function SobreHero({ videoSrc, poster }: SobreHeroProps) {
  const reduce = useReducedMotion();
  const lines = [
    <>Sou <span className="ghost-accent">Danilo Novais</span>.</>,
    <>Você <span className="ghost-accent">não vê</span> tudo o que eu faço.</>,
    <>Mas sente quando <span className="ghost-accent">funciona</span>.</>,
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden" aria-label="Hero — Sobre">
      <div className="absolute inset-0">
        {reduce ? (
          <img src={poster || '/sobre/hero-frame.jpg'} alt="Frame do manifesto" className="h-full w-full object-cover opacity-70" />
        ) : (
          <video src={videoSrc} poster={poster} autoPlay muted loop playsInline className="h-full w-full object-cover opacity-70" aria-label="Manifesto em vídeo" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 h-full">
        <div className="mx-auto grid h-full max-w-6xl grid-cols-12 px-6">
          <div className="col-span-12 md:col-span-6" />
          <div className="col-span-12 md:col-span-6 flex items-center">
            <div className="ml-auto max-w-[560px] text-left md:text-right text-white">
              {lines.map((line, i) => (
                <motion.p
                  key={i}
                  variants={motionTokens.riseSoft}
                  initial="hidden"
                  animate="visible"
                  transition={{ ...motionTokens.riseSoft.visible.transition, delay: i * 0.3 }}
                  className="text-3xl md:text-5xl leading-tight"
                  style={reduce ? { filter: 'none', transform: 'none' } : undefined}
                >
                  {line}
                </motion.p>
              ))}
              <motion.p
                variants={motionTokens.fadeGhost}
                initial="hidden"
                animate="visible"
                transition={{ ...motionTokens.fadeGhost.visible.transition, delay: lines.length * 0.3 }}
                className="mt-4 text-base md:text-lg text-white/70"
                style={reduce ? { filter: 'none' } : undefined}
              >
                Crio design que observa, entende e guia experiências — com intenção, estratégia e tecnologia — na medida certa.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
