'use client';

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
  const formattedNumber = `${index + 1}`.padStart(2, '0');

  const variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.article
      tabIndex={0}
      aria-label={text}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={variants}
      className="group relative flex flex-col items-center justify-center text-center text-white outline-none bg-[#0048ff] w-full h-auto min-h-[100px] py-6 rounded-[12px] px-6 gap-2 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[#4fe6ff]"
    >
      <div className="text-[1.75rem] font-black leading-none text-[#8705f2] transition-colors duration-200 group-hover:text-white">
        {formattedNumber}
      </div>
      <p className="text-[1rem] font-bold leading-[1.4] whitespace-normal wrap-break-word">
        <span className="text-white">{text}</span>
      </p>
    </motion.article>
  );
};
