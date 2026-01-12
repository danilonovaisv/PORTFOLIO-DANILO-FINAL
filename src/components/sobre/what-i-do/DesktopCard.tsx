'use client';

import { motion, useSpring, useTransform, MotionValue } from 'framer-motion';

interface DesktopCardProps {
  index: number;
  text: string;
  scrollProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
}

export const DesktopCard = ({
  index,
  text,
  scrollProgress,
  prefersReducedMotion,
}: DesktopCardProps) => {
  const staggerDelay = index * 0.02;

  const translateX = useTransform(
    scrollProgress,
    [0.05 + staggerDelay, 0.25 + staggerDelay, 0.8],
    ['60vw', '0vw', '0vw']
  );

  const opacity = useTransform(
    scrollProgress,
    [0.05 + staggerDelay, 0.2 + staggerDelay],
    [0, 1]
  );

  const blur = useTransform(
    scrollProgress,
    [0.05 + staggerDelay, 0.2 + staggerDelay],
    [8, 0]
  );

  const smoothX = useSpring(translateX, {
    stiffness: 40,
    damping: 30,
    restDelta: 0.001,
  });

  const smoothOpacity = useSpring(opacity, {
    stiffness: 40,
    damping: 30,
    restDelta: 0.001,
  });

  const smoothBlur = useSpring(blur, {
    stiffness: 40,
    damping: 30,
    restDelta: 0.001,
  });

  const formattedNumber = `${index + 1}`.padStart(2, '0');

  if (prefersReducedMotion) {
    return (
      <article
        tabIndex={0}
        aria-label={text}
        className="group relative flex flex-row items-center text-white outline-none bg-[#0048ff] min-h-[140px] w-[260px] shrink-0 rounded-[16px] px-5 py-5 gap-4 focus-visible:ring-2 focus-visible:ring-[#4fe6ff]"
      >
        <div className="text-[2.5rem] font-black leading-none text-[#8705f2]">
          {formattedNumber}
        </div>
        <p className="text-[0.95rem] font-bold leading-tight">
          <span className="text-white">{text}</span>
        </p>
      </article>
    );
  }

  return (
    <motion.article
      tabIndex={0}
      aria-label={text}
      className="group relative flex flex-row items-center text-white outline-none will-change-transform bg-[#0048ff] min-h-[140px] w-[260px] shrink-0 rounded-[16px] px-5 py-5 gap-4 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[#4fe6ff]"
      style={{
        x: smoothX,
        opacity: smoothOpacity,
        filter: useTransform(smoothBlur, (v) => `blur(${v}px)`),
      }}
    >
      <div className="text-[2.5rem] font-black leading-none text-[#8705f2] transition-colors duration-200 group-hover:text-white">
        {formattedNumber}
      </div>
      <p className="text-[0.95rem] font-bold leading-tight">
        <span className="text-white">{text}</span>
      </p>
    </motion.article>
  );
};
