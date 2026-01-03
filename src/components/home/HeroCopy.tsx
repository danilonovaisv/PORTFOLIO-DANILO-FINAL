'use client';

import { motion } from 'framer-motion';
import { CTAButton } from '@/components/ui/CTAButton';

interface HeroCopyProps {
  startEntrance?: boolean;
}

export function HeroCopy({ startEntrance = false }: HeroCopyProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-12">
      {/* Tag */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={startEntrance ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 3.0, duration: 1.0, ease: 'easeOut' }}
        className="font-mono text-[12px] uppercase tracking-[0.4em] text-cyan-400"
      >
        [BRAND AWARENESS]
      </motion.span>

      {/* Main Headlines */}
      <motion.div
        className="flex flex-col items-center leading-none"
        initial={{ opacity: 0, y: 20 }}
        animate={startEntrance ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 3.2, duration: 1.0, ease: 'easeOut' }}
      >
        <h1 className="text-[clamp(5rem,12vw,8rem)] font-black tracking-tight text-white">
          Você não vê <br /> o design.
        </h1>
        <h2 className="text-[clamp(4rem,10vw,6rem)] font-black tracking-tight text-white mt-4">
          Mas ele vê você.
        </h2>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        className="pt-8"
        initial={{ opacity: 0 }}
        animate={startEntrance ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 4.4, duration: 0.8 }}
      >
        <CTAButton href="/sobre" variant="primary">
          step inside
        </CTAButton>
      </motion.div>
    </div>
  );
}

export default HeroCopy;
