'use client';

import React, { useRef } from 'react';
import {
  MotionValue,
  motion,
  useTransform,
} from 'framer-motion';
import { useIsMobile } from '@/components/sobre/beliefs/BeliefSection';
import { useMotionGate } from '@/hooks/useMotionGate';

interface GhostSceneProps {
  scrollProgress: MotionValue<number>;
}

const GhostScene: React.FC<GhostSceneProps> = ({ scrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const shouldReduceMotion = useMotionGate();
  const x = useTransform(
    scrollProgress,
    [0, 0.82, 1],
    [isMobile ? '-18vw' : '0vw', '0vw', '0vw']
  );
  const y = useTransform(
    scrollProgress,
    [0, 0.82, 1],
    [isMobile ? '-6vh' : '2vh', '0vh', '-1vh']
  );
  const scale = useTransform(
    scrollProgress,
    [0.02, 0.14, 0.82, 1],
    [0.48, isMobile ? 0.78 : 0.98, isMobile ? 0.82 : 1.04, 1.08]
  );
  const rotate = useTransform(
    scrollProgress,
    [0, 0.82, 1],
    [isMobile ? -10 : -4, isMobile ? 4 : 3, 0]
  );

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      ref={containerRef}
      style={{ x, y, scale, rotate }}
      className="pointer-events-none flex h-full w-full items-center justify-center"
      aria-hidden="true"
    >
      <div
        data-testid="ghost-figure"
        className="relative h-[46vh] w-[28vh] md:h-[66vh] md:w-[40vh]"
      >
        <div className="absolute inset-x-[16%] top-[7%] h-[20%] rounded-full bg-white/96 shadow-[0_0_42px_rgba(255,255,255,0.24)]" />
        <div className="absolute inset-x-[6%] top-[20%] h-[54%] rounded-[46%_46%_36%_36%/34%_34%_44%_44%] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(241,243,255,0.96)_60%,rgba(216,223,255,0.9)_100%)] shadow-[0_18px_70px_rgba(4,0,19,0.22)]" />
        <div className="absolute left-[10%] top-[62%] h-[14%] w-[24%] rounded-full bg-white/96" />
        <div className="absolute left-[38%] top-[68%] h-[15%] w-[24%] rounded-full bg-white/96" />
        <div className="absolute right-[10%] top-[62%] h-[14%] w-[24%] rounded-full bg-white/96" />

        <div className="absolute left-[39%] top-[31%] h-[4.6%] w-[4.6%] rounded-full bg-[#11131f]" />
        <div className="absolute right-[39%] top-[31%] h-[4.6%] w-[4.6%] rounded-full bg-[#11131f]" />

        <div className="absolute left-[12%] top-[4%] h-[3.6%] w-[76%] rounded-full bg-[#141726]" />
        <div className="absolute left-[24%] top-0 h-[12%] w-[52%] rounded-[22%_22%_8%_8%] bg-[#11131f]" />
        <div className="absolute left-[22%] top-[4.4%] h-[2.2%] w-[56%] rounded-full bg-[#ff496c]" />
      </div>
    </motion.div>
  );
};

export { GhostScene };
export default GhostScene;
