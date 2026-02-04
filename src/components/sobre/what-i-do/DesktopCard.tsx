'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface DesktopCardProps {
  index: number;
  text: string;
  prefersReducedMotion: boolean;
}

export const DesktopCard = ({
  index,
  text,
  prefersReducedMotion,
}: DesktopCardProps) => {
  const [firstWord, ...restWords] = text.split(' ');
  const restText = restWords.join(' ');

  const variants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.article
      tabIndex={0}
      aria-label={text}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      className="group flex h-full min-h-[160px] flex-col gap-4 rounded-[14px] bg-[#150d2f] px-5 py-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)] outline-none ring-1 ring-white/5 transition hover:-translate-y-1 hover:bg-[#1a1138] focus-visible:ring-2 focus-visible:ring-[#4fe6ff]"
    >
      <div className="flex items-center gap-3">
        {/* Ícone Circular - Azul com Glow Roxo no Hover */}
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bluePrimary text-white transition-all duration-300 group-hover:bg-purpleDetails group-hover:shadow-[0_0_24px_rgba(135,5,242,0.6)] group-hover:scale-110">
          <ArrowUpRight size={18} strokeWidth={2.5} />
        </span>
        <p className="text-[1.05rem] font-semibold leading-snug text-white text-left">
          <span className="text-bluePrimary">{firstWord}</span> {restText}
        </p>
      </div>
    </motion.article>
  );
};
