'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

// Ghost Motion Tokens
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeGhost = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

// Conteúdo oficial do protótipo interativo
const CLOSING_CONTENT = {
  text: [
    'Hoje sou Diretor de Criação,',
    'com mais de 10 anos de estrada.',
    '',
    'Já liderei marcas, agências, eventos',
    'e criei experiências para todos os canais.',
    '',
    'Agora, quero criar algo que permaneça —',
    'com você.',
  ],
  ctas: [
    { label: 'Fale comigo', href: '/contato', external: false },
    {
      label: 'Download Curriculum',
      href: '/cv.pdf',
      external: true,
    },
  ],
};

export function AboutClosing() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="min-h-[60vh] md:min-h-[80vh] flex items-center justify-center md:justify-start px-6 md:px-12 lg:px-24 bg-[#040013] py-16 md:py-24"
      aria-label="Fechamento"
    >
      <motion.div
        variants={fadeGhost}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        className="max-w-[560px] text-[#fcffff] text-center md:text-left"
      >
        {/* Texto de fechamento */}
        <div className="mb-8 md:mb-12">
          {CLOSING_CONTENT.text.map((line, i) =>
            line === '' ? (
              <br key={i} />
            ) : (
              <p
                key={i}
                className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed"
              >
                {line.includes('permaneça') ? (
                  <>
                    Agora, quero criar algo que{' '}
                    <span className="ghost-accent">permaneça</span> —
                  </>
                ) : (
                  line
                )}
              </p>
            )
          )}
        </div>

        {/* CTAs - Stack vertical mobile, row desktop */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
          {CLOSING_CONTENT.ctas.map((cta, i) =>
            cta.external ? (
              <a
                key={i}
                href={cta.href}
                className="text-[#fcffff] uppercase tracking-widest text-xs md:text-sm font-semibold 
                           border-b border-transparent hover:border-[#0048ff] 
                           transition-all duration-300 pb-1
                           min-h-[48px] flex items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                [ {cta.label} ]
              </a>
            ) : (
              <Link
                key={i}
                href={cta.href}
                className="text-[#fcffff] uppercase tracking-widest text-xs md:text-sm font-semibold 
                           border-b border-transparent hover:border-[#0048ff] 
                           transition-all duration-300 pb-1
                           min-h-[48px] flex items-center justify-center"
              >
                [ {cta.label} ]
              </Link>
            )
          )}
        </div>
      </motion.div>
    </section>
  );
}
