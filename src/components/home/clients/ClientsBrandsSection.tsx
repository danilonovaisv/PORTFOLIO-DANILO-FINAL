'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { HOME_CONTENT } from '@/config/content';

/**
 * ClientsBrandsSection - Exibe logotipos das marcas/clientes
 * Segue o Ghost System v3.0 com animações sutis e responsividade
 */
export default function ClientsBrandsSection() {
  const reducedMotion = useReducedMotion();
  const logos = HOME_CONTENT.clients.logos.slice(0, 12);

  return (
    <section
      id="clients"
      className="bg-[#0048ff] py-16 md:py-20 lg:py-24 relative z-10 overflow-hidden"
      aria-labelledby="clients-heading"
    >
      {/* Container usando std-grid padrão do projeto */}
      <div className="std-grid">
        {/* Título da seção */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="mb-10 md:mb-16 lg:mb-20"
        >
          <h2
            id="clients-heading"
            className="text-white text-[1.5rem] md:text-[2rem] font-bold text-center tracking-tight leading-tight lowercase"
          >
            {HOME_CONTENT.clients.title}
          </h2>
        </motion.div>

        {/* Grid de Logos com acessibilidade */}
        <motion.ul
          role="list"
          aria-label="Logotipos das marcas parceiras"
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8 md:gap-12 items-center justify-items-center w-full"
        >
          {logos.map((logo) => {
            const isSvg = logo.src?.toLowerCase().endsWith('.svg');
            const shouldEagerLoad = logo.id <= 3;

            return (
              <motion.li
                key={logo.id}
                role="listitem"
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
              >
                <div className="group relative w-28 h-14 sm:w-32 sm:h-16 md:w-40 md:h-20 flex items-center justify-center">
                  <Image
                    src={logo.src || ''}
                    alt={logo.alt}
                    fill
                    className="w-full h-full object-contain filter brightness-0 invert opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110 will-change-transform"
                    sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 160px"
                    loading={shouldEagerLoad ? 'eager' : 'lazy'}
                    priority={shouldEagerLoad}
                    unoptimized={isSvg}
                  />
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
