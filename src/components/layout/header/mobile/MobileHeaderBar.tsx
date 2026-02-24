'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { motion, Variants } from 'framer-motion';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

interface MobileHeaderBarProps {
  logoUrl: string;
  onLogoClick: () => void;
  children: ReactNode;
  isLight?: boolean;
}
export default function MobileHeaderBar({
  logoUrl,
  onLogoClick,
  children,
  isLight = false,
}: MobileHeaderBarProps) {
  const containerVariants: Variants = {
    hidden: { y: -64, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: MOTION_TOKENS.duration.normal,
        ease: GHOST_EASE,
        staggerChildren: MOTION_TOKENS.stagger.normal,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -15, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: MOTION_TOKENS.duration.normal,
        ease: GHOST_EASE,
      },
    },
  };

  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={`fixed top-0 left-0 right-0 z-[1000] pointer-events-auto ${isLight ? 'header--light' : ''
        }`}
    >
      <div
        className={`w-full h-[60px] pointer-events-auto transition-colors duration-300 ${isLight
            ? 'bg-background/40 border-b border-white/10 shadow-xl'
            : 'bg-background/40 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20'
          }`}
      >
        <div className="flex items-center justify-between h-full w-full max-w-[1680px] mx-auto px-6 md:px-16">
          <motion.div variants={itemVariants}>
            <Link href="/" onClick={onLogoClick}>
              <Image
                src={logoUrl}
                alt="Danilo Novais — Creative Developer"
                width={80}
                height={80}
                style={{ height: 'clamp(32px, 8vw, 44px)', width: 'auto' }}
                className="object-contain"
                unoptimized
                loading="eager"
              />
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>{children}</motion.div>
        </div>
      </div>
    </motion.header>
  );
}
