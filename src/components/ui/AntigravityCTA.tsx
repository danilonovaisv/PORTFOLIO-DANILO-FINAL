'use client';

import React, { useState, type MouseEvent } from 'react';
import { m } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { BRAND } from '@/config/brand';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';
import { useMotionGate } from '@/hooks/useMotionGate';
import { cn } from '@/lib/utils';

interface AntigravityCTAProps {
  text?: string;
  href?: string;
  onClick?: (
    _event: MouseEvent<HTMLAnchorElement | HTMLDivElement | HTMLButtonElement>
  ) => void;
  color?: string;
  className?: string;
  as?: 'a' | 'div' | 'button';
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
  size?: 'default' | 'compact';
}

const AntigravityCTA: React.FC<AntigravityCTAProps> = ({
  text = "let's build something great",
  href = '/',
  onClick,
  color,
  className = 'fixed bottom-20 right-4 sm:bottom-12 sm:right-8 lg:bottom-12 lg:right-12 z-100 md:z-50',
  as = 'a',
  type,
  target,
  rel,
  size = 'default',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useMotionGate();
  const mainColor = color || BRAND.colors.bluePrimary;
  const isCompact = size === 'compact';
  const transition = reduceMotion
    ? { duration: 0 }
    : {
        duration: MOTION_TOKENS.duration.fast,
        ease: GHOST_EASE,
      };

  const commonProps = {
    onClick: onClick as any,
    className: cn(
      'relative group cta-button inline-flex items-center cursor-pointer min-w-fit rounded-full text-white no-underline visited:text-white hover:text-white',
      'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-bluePrimary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      className
    ),
    onHoverStart: () => setIsHovered(true),
    onHoverEnd: () => setIsHovered(false),
    initial: false,
    animate: { y: isHovered ? -1 : 0 },
    transition,
    role: 'button',
    tabIndex: 0,
    'aria-label': `${text} - Clique para acessar`,
  };

  const content = (
    <>
      <m.div
        className="pointer-events-none absolute inset-0 rounded-full blur-2xl"
        style={{ backgroundColor: 'var(--color-purpleDetails)' }}
        initial={false}
        animate={{ opacity: isHovered ? 0.2 : 0 }}
        transition={transition}
      />

      <m.div
        className={cn(
          'relative z-10 inline-flex items-center rounded-full',
          isCompact ? 'gap-2' : 'gap-0.5 sm:gap-1'
        )}
        initial={false}
        animate={{
          columnGap: isHovered
            ? isCompact
              ? '0.875rem'
              : '0.5rem'
            : isCompact
              ? '0.5rem'
              : '0.125rem',
        }}
        transition={transition}
      >
        <div
          className={cn(
            'relative z-10 flex items-center justify-center rounded-full text-white shadow-lg select-none active:translate-y-px will-change-transform',
            isCompact
              ? 'h-10 pl-4 pr-3 text-sm sm:h-11 sm:pl-5 sm:pr-4'
              : 'h-12 w-[220px] pl-5 pr-4 text-sm sm:h-14 sm:w-[280px] sm:pl-8 sm:pr-6 sm:text-base lg:h-[68px] lg:w-[340px] lg:pl-10 lg:pr-8 lg:text-lg'
          )}
          style={{
            backgroundColor: mainColor,
            transition: `background-color ${MOTION_TOKENS.duration.fast}s var(--ease-ghost)`,
          }}
        >
          <span className="whitespace-nowrap font-sans font-medium leading-none tracking-wide text-white sm:tracking-wider">
            {text}
          </span>
        </div>

        <m.div
          className={cn(
            'relative z-20 flex items-center justify-center rounded-full text-white shadow-lg active:translate-y-px will-change-transform',
            isCompact
              ? 'h-10 w-10 sm:h-11 sm:w-11'
              : 'h-12 w-12 sm:h-14 sm:w-14 lg:h-[68px] lg:w-[68px]'
          )}
          initial={false}
          animate={{
            x: isHovered ? (isCompact ? 3 : 5) : 0,
            backgroundColor: isHovered
              ? 'var(--color-purpleDetails)'
              : mainColor,
          }}
          transition={transition}
          style={{ willChange: 'transform, background-color' }}
        >
          <ArrowUpRight
            className={cn(
              isCompact
                ? 'h-4 w-4 sm:h-5 sm:w-5'
                : 'h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7'
            )}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </m.div>
      </m.div>
    </>
  );

  if (as === 'button') {
    return (
      <m.button type={type} {...commonProps}>
        {content}
      </m.button>
    );
  }

  if (as === 'div') {
    return (
      <m.div {...commonProps}>
        {content}
      </m.div>
    );
  }

  return (
    <m.a href={href} target={target} rel={rel} {...commonProps}>
      {content}
    </m.a>
  );
};

export default AntigravityCTA;
