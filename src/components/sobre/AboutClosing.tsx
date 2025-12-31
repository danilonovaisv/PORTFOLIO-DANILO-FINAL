'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Download } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';
import { fadeGhost } from '@/lib/motionTokens';

export default function AboutClosing() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative min-h-[80vh] py-24 flex flex-col justify-center"
      aria-label="Fechamento"
    >
      <div className="w-full max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        <div className="max-w-3xl">
          <motion.div
            variants={fadeGhost}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ margin: '-10%' }}
            className="text-3xl md:text-6xl lg:text-7xl font-light leading-tight text-white mb-12"
          >
            <p className="mb-6">
              Hoje sou{' '}
              <span className="text-[#0057FF] font-medium">
                Diretor de Criação
              </span>
              ,<br />
              com mais de 10 anos de estrada.
            </p>
            <p className="mb-6 text-white/90">
              Já liderei marcas, agências, eventos
              <br />e criei experiências para todos os canais.
            </p>
            <p>
              Agora, quero criar algo que permaneça —<br />
              <span className="italic">com você.</span>
            </p>
          </motion.div>

          <motion.div
            variants={fadeGhost}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ margin: '-10%' }}
            custom={0.4}
            className="flex flex-wrap gap-6 items-center"
          >
            <CTAButton href="mailto:dannovaisv@gmail.com">
              Fale comigo
            </CTAButton>

            <a
              href="/curriculum.pdf"
              target="_blank"
              className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 hover:border-[#0057FF] hover:bg-[#0057FF]/10 text-white transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              <span className="font-medium tracking-wide">
                Download Curriculum
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
