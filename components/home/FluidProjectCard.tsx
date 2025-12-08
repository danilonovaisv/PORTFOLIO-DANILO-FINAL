'use client';

import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { ProjectShowcaseCard, ProjectViewport } from '../../lib/constants';

interface FluidProjectCardProps {
  card: ProjectShowcaseCard;
  index: number;
  viewport: ProjectViewport;
  className?: string;
}

const FluidProjectCard: React.FC<FluidProjectCardProps> = ({
  card,
  index,
  viewport,
  className,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      x.set(0);
      y.set(0);
    }
  }, [shouldReduceMotion, x, y]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = (event.clientX - rect.left) / rect.width - 0.5;
    const yPos = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos * 14);
    y.set(yPos * 12);
  };

  const aspectRatio = card.shape.aspectRatio[viewport] ?? 1.4;
  const borderRadiusValue = card.shape.borderRadius
    .map((value) => `${value}px`)
    .join(' ');

  return (
    <motion.div
      ref={cardRef}
      className={clsx(
        'relative overflow-hidden border border-white/40 bg-white/20 shadow-[0_35px_65px_rgba(15,23,42,0.35)]',
        className,
      )}
      style={{
        borderRadius: borderRadiusValue,
        aspectRatio,
        rotate: card.shape.rotation,
      }}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          delay: index * 0.08,
          type: 'spring',
          stiffness: 80,
          damping: 14,
        },
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              scale: 1.03,
              rotate: card.shape.rotation + 1.2,
              transition: { type: 'spring', stiffness: 250, damping: 20 },
            }
      }
      onPointerMove={shouldReduceMotion ? undefined : handlePointerMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center transition duration-700"
        style={{
          x,
          y,
          scale: viewport === 'mobile' ? 1 : 1.08,
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url(${card.imageUrl})`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: card.overlayGradient }}
      />
      <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-7">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.6em] text-white/70">
            {card.category}
          </p>
          <motion.h3
            className="text-2xl font-semibold leading-tight text-white md:text-3xl drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
            transition={{ duration: 0.4 }}
          >
            {card.title}
          </motion.h3>
          <p className="mt-2 text-base text-white/90 md:text-lg">
            {card.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/40 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-white/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div
        className="absolute -top-6 -left-6 h-20 w-20 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: card.accentColor }}
      />
      <div
        className="absolute bottom-8 right-6 h-10 w-24 rounded-full opacity-20 blur-xl"
        style={{ backgroundColor: card.accentColor }}
      />
    </motion.div>
  );
};

export default FluidProjectCard;
