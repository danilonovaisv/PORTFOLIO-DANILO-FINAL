'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { HOME_CONTENT } from '@/config/content';
import { useSiteAssetsByPrefix } from '@/contexts/site-assets';

export default function ClientsBrandsSection() {
  const reducedMotion = useReducedMotion();
  const assets = useSiteAssetsByPrefix('clients.').filter(
    (asset) => asset.publicUrl
  );

  const logos =
    assets.length > 0
      ? assets.map((asset) => ({
          id: asset.key,
          src: asset.publicUrl,
          alt: asset.description ?? asset.key,
        }))
      : HOME_CONTENT.clients.logos;

  const hasLogos = logos.length > 0;

  return (
    <section
      id="clients"
      className="bg-[#0048ff] py-4 md:py-20 lg:py-24 relative z-10 overflow-hidden"
      aria-label="marcas com as quais já trabalhei"
    >
      <div className="max-w-[1680px] mx-auto px-4 md:px-[clamp(24px,5vw,96px)]">
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="mb-8 md:mb-16 lg:mb-20"
        >
          <h2 className="text-white text-[1.5rem] md:text-[2rem] font-bold text-center tracking-tight leading-tight lowercase">
            {HOME_CONTENT.clients.title}
          </h2>
        </motion.div>

        {hasLogos ? (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10%' }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center w-full"
          >
            {logos.map((logo) => (
              <motion.div
                key={logo.id}
                variants={{
                  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
                  show: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: {
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="group relative w-32 h-16 md:w-40 md:h-20 flex items-center justify-center"
                aria-label={logo.alt}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="w-full h-full object-contain filter brightness-0 invert opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110 will-change-transform"
                  sizes="(max-width: 768px) 128px, (max-width: 1200px) 160px, 160px"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p
            role="status"
            className="text-center text-white/40 text-sm font-mono uppercase tracking-widest"
            aria-live="polite"
          >
            Nenhum parceiro cadastrado.
          </p>
        )}
      </div>
    </section>
  );
}
