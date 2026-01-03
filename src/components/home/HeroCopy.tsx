'use client';

import { motion } from 'framer-motion';
import { CTAButton } from '@/components/ui/CTAButton';

interface HeroCopyProps {
  startEntrance?: boolean;
  enable3D?: boolean;
}

export function HeroCopy({
  startEntrance = false,
  enable3D = true,
}: HeroCopyProps) {
  // Se o 3D estiver ativo, escondemos o texto visualmente (mas mantemos para SEO).
  // Se o 3D estiver inativo (mobile/erro), mostramos o texto.
  const textContainerClass = enable3D
    ? 'sr-only'
    : 'flex flex-col items-center justify-center text-center relative z-20 px-4';

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between z-10 py-[12vh] md:py-[10vh] pointer-events-none">
      {/* TOPO: TAG */}
      <motion.span
        initial={{ opacity: 0, y: -20 }}
        animate={
          startEntrance ? { opacity: 0.8, y: 0 } : { opacity: 0, y: -20 }
        }
        transition={{ delay: 3.0, duration: 1.0, ease: 'easeOut' }}
        className="font-mono text-[10px] md:text-[12px] uppercase tracking-[0.2em] text-cyan-400"
      >
        [BRAND AWARENESS]
      </motion.span>

      {/* MEIO: TEXTO + BOTÃO */}
      <div className="flex flex-col items-center justify-center flex-1 w-full relative">
        <div className={textContainerClass}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-4">
            Você não vê <br className="hidden md:block" /> o design.
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white/80 tracking-tight">
            Mas ele vê você.
          </h2>
        </div>

        {/* Espaçador para o botão quando o texto é 3D */}
        {enable3D && <div className="h-[20vh] md:h-[30vh] w-full" />}

        {/* CTA Button */}
        <motion.div
          className={`pointer-events-auto ${enable3D ? 'mt-8 md:mt-12' : 'mt-12'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={startEntrance ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 4.2, duration: 0.8 }}
        >
          <CTAButton href="/sobre" variant="primary">
            step inside
          </CTAButton>
        </motion.div>
      </div>

      {/* FUNDO: BOTÃO SECUNDÁRIO */}
      <motion.div
        className="pointer-events-auto mt-auto"
        initial={{ opacity: 0 }}
        animate={startEntrance ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ delay: 4.8, duration: 1.0 }}
      >
        <CTAButton href="/sobre" variant="ghost">
          step inside
        </CTAButton>
      </motion.div>
    </div>
  );
}

export default HeroCopy;
