'use client';

import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { PORTFOLIO_MOSAIC_DATA } from '@/config/content';
import { floatMemory } from '@/lib/motionTokens';

export default function AboutOrigin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const prefersReducedMotion = useReducedMotion();

  // Floating images configuration (using existing project images as placeholders)
  // We pick a few images from the config to "float"
  const floatingImages = [
    {
      src: PORTFOLIO_MOSAIC_DATA[0].items[0].imageSrc,
      className:
        'absolute top-[10%] right-[10%] w-48 md:w-64 aspect-[3/4] object-cover rounded-lg',
      yRange: [100, -100],
    },
    {
      src: PORTFOLIO_MOSAIC_DATA[1].items[0].imageSrc,
      className:
        'absolute top-[40%] right-[25%] w-64 md:w-80 aspect-video object-cover rounded-lg z-0',
      yRange: [200, -200],
    },
    {
      src: PORTFOLIO_MOSAIC_DATA[2].items[0].imageSrc,
      className:
        'absolute bottom-[10%] right-[5%] w-56 md:w-72 aspect-square object-cover rounded-lg',
      yRange: [150, -150],
    },
    {
      src: PORTFOLIO_MOSAIC_DATA[0].items[1].imageSrc,
      className:
        'absolute top-[60%] left-[5%] w-40 md:w-56 aspect-[4/5] object-cover rounded-lg -z-10',
      yRange: [50, -50],
    },
  ];

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[140vh] py-24 md:py-40 overflow-hidden flex items-center"
      aria-label="Origem Criativa"
    >
      {/* Floating Images Background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {floatingImages.map((img, i) => {
          const y = useTransform(scrollYProgress, [0, 1], img.yRange);
          return (
            <motion.div
              key={i}
              style={{ y: prefersReducedMotion ? 0 : y }}
              variants={floatMemory}
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-10%' }}
              custom={i * 0.2}
              className={img.className}
            >
              <Image
                src={img.src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 w-full max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        <div className="max-w-2xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: '-20%' }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.h2
              variants={fadeUpVariant}
              className="text-sm font-mono uppercase tracking-[0.2em] text-[#4fe6ff] mb-8 font-bold"
            >
              Origem
            </motion.h2>

            <motion.div
              variants={fadeUpVariant}
              className="space-y-6 md:space-y-8 text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-white/90"
            >
              <p>
                Desde cedo, sempre prestei atenção no que ficava — não só no que
                aparecia.
              </p>
              <p>
                Rabiscos viraram ideias. Ideias viraram projetos. E os projetos
                começaram a deixar rastros.
              </p>
              <p>
                Foi ali que entendi: design não é enfeite. É ferramenta
                invisível de transformação.
              </p>
              <p className="text-white/70">
                Estudei Comunicação, mergulhei no design, no branding e hoje uso
                inteligência artificial para expandir o alcance sem perder a
                essência humana da criação.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
