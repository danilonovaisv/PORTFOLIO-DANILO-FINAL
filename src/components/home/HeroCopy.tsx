'use client';

import { motion } from 'framer-motion';
import { CTAButton } from '@/components/ui/CTAButton';

export function HeroCopy() {
  return (
    <div className="mx-auto max-w-[1680px] w-full text-white relative z-10 flex flex-col items-center justify-center text-center px-[clamp(24px,5vw,96px)]">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#fcffff]/60 mb-8"
      >
        [BRAND AWARENESS]
      </motion.p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-12">
        {/* Ghost Icon/Visual from Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="w-32 h-32 md:w-48 md:h-48 relative shrink-0"
        >
          {/* Blue Ghost Glow */}
          <div className="absolute inset-0 bg-[#0057FF] rounded-full blur-2xl opacity-40 animate-pulse" />
          <div className="relative w-full h-full bg-[url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/ghost-character.webp')] bg-contain bg-center bg-no-repeat filter drop-shadow-[0_0_20px_rgba(79,230,255,0.6)]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter text-left text-[#fcffff]"
        >
          Você não <br /> vê o design.
        </motion.h1>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-2xl md:text-4xl font-medium text-[#fcffff]/80 mb-12"
      >
        Mas ele vê você.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <CTAButton href="/portfolio">step inside</CTAButton>
      </motion.div>
    </div>
  );
}

export default HeroCopy;
