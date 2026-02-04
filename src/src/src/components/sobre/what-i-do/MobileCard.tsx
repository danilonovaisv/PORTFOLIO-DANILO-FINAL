'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileCardProps {
  index: number;
  text: string;
  prefersReducedMotion: boolean;
}

export const MobileCard = ({
  index,
  text,
  prefersReducedMotion,
}: MobileCardProps) => {
  const [firstWord, ...restWords] = text.split(' ');
  const restText = restWords.join(' ');

  const variants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
        delay: index * 0.08,
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
      viewport={{ once: true, amount: 0.25 }}
      variants={variants}
      className="group flex w-full items-center gap-4 rounded-[12px] bg-[#150d2f] px-4 py-4 text-left shadow-[0_16px_40px_-28px_rgba(0,0,0,0.6)] outline-none ring-1 ring-white/5 transition hover:-translate-y-0.5 hover:bg-[#1a1138] focus-visible:ring-2 focus-visible:ring-[#4fe6ff] min-h-[76px]"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
        <ArrowUpRight size={16} />
      </span>
      <p className="text-base font-semibold leading-snug text-white">
        <span className="text-primary">{firstWord}</span> {restText}
      </p>
    </motion.article>
  );
};
