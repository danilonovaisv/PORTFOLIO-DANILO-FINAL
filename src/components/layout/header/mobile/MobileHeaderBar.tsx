'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { m, Variants } from 'motion/react';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

interface MobileHeaderBarProps {
  logoUrl: string;
  onLogoClick: () => void;
  children: ReactNode;
  isLight?: boolean;
  menuOpen?: boolean;
}
export default function MobileHeaderBar({
  logoUrl,
  onLogoClick,
  children,
  isLight = false,
  menuOpen = false,
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
    <m.header
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={`fixed left-0 right-0 top-0 pointer-events-auto ${
        isLight ? 'header--light' : ''
      }`}
      style={{
        zIndex: menuOpen
          ? 'var(--z-layer-mobile-menu-control)'
          : 'var(--z-layer-mobile-header)',
      }}
    >
      <div
        className={`w-full min-h-[60px] pointer-events-auto transition-colors duration-standard ${
          isLight
            ? 'bg-background/40 border-b border-white/10 shadow-xl'
            : 'bg-background/40 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20'
        }`}
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <div className="flex items-center justify-between h-full w-full max-w-[1680px] mx-auto px-6 md:px-16">
          <m.div variants={itemVariants}>
            <Link href="/" onClick={onLogoClick}>
              <Image
                src={logoUrl}
                alt="Danilo Novais — Head de Criação & Diretor de Criação Sênior"
                width={124}
                height={39}
                className="block h-auto w-[clamp(88px,24vw,124px)] object-contain"
                priority
                unoptimized
              />
            </Link>
          </m.div>

          <m.div variants={itemVariants}>{children}</m.div>
        </div>
      </div>
    </m.header>
  );
}
