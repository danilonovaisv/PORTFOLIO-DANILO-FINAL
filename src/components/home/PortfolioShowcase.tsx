'use client';

import React, { FC, useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { HOME_CONTENT } from '@/config/content';
import { Button } from '@/components/ui/Button';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ProjectCategory } from '@/lib/types';
import { MOTION_TOKENS } from '@/config/motion';
import CategoryStripe from './CategoryStripe';

const PortfolioShowcase: FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldReduceMotion = prefersReducedMotion;

  const handleExpand = useCallback((id: string): void => {
    setHoveredId(null);
    setExpandedId((prev: string | null): string | null =>
      prev === id ? null : id
    );
  }, []);

  // --- ANIMATION VARIANTS ---
  const fadeInUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION_TOKENS.duration.normal,
        ease: MOTION_TOKENS.easing.base,
        when: 'beforeChildren',
        staggerChildren: MOTION_TOKENS.stagger.tight,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: MOTION_TOKENS.stagger.normal,
        delayChildren: 0.1, // Reduced from 0.25
      },
    },
  };

  const itemVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : 15,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: MOTION_TOKENS.duration.normal,
          ease: MOTION_TOKENS.easing.base,
        },
      },
    }),
    [shouldReduceMotion]
  );

  const categoryList = useMemo(
    () =>
      (HOME_CONTENT.showcase.categories as ProjectCategory[]).map(
        (category: ProjectCategory, index) => {
          const isExpanded = expandedId === category.id;
          const isHidden = expandedId !== null && !isExpanded;
          const isHovered = hoveredId === category.id;
          const isWebItem = category.id === 'websites-webcampaigns-tech';

          if (isHidden) return null;

          return (
            <CategoryStripe
              key={category.id}
              category={category}
              index={index}
              isExpanded={isExpanded}
              isHovered={isHovered}
              onExpand={handleExpand}
              onHover={setHoveredId}
              isWebItem={isWebItem}
              itemVariants={itemVariants}
            />
          );
        }
      ),
    [expandedId, hoveredId, handleExpand, itemVariants, setHoveredId]
  );

  return (
    <section
      id="portfolio-showcase"
      ref={sectionRef}
      className="relative w-full bg-[#F4F5F7] py-24 md:py-40 overflow-hidden min-h-screen flex flex-col justify-center items-center"
    >
      <div className="mx-auto w-full px-[clamp(1.5rem,5vw,6rem)] max-w-[1680px] relative z-10">
        <motion.div
          className="flex flex-col w-full mb-12 md:mb-16 items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-5%' }}
          variants={fadeInUp}
        >
          <div className="w-full flex justify-center mb-6 md:mb-8">
            <h2 className="text-center font-display text-[clamp(3.5rem,8vw,6rem)] font-bold tracking-tighter leading-[0.9]">
              <span className="text-[#0057FF]">portfólio</span>{' '}
              <span className="text-[#111111]">showcase</span>
            </h2>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col w-full border-t border-black/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <AnimatePresence mode="sync">{categoryList}</AnimatePresence>
        </motion.div>

        {!expandedId && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-24 md:mt-32 flex justify-center w-full"
          >
            <Button
              href="/portfolio"
              size="xl"
              className="group rounded-full shadow-xl hover:shadow-[#0057FF]/40 gap-4"
            >
              <span className="text-lg md:text-xl font-semibold tracking-wide uppercase">
                veja mais
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 group-hover:bg-white text-[#0057FF] transition-colors duration-300">
                <ArrowUpRight className="w-5 h-5 text-white group-hover:text-[#0057FF]" />
              </span>
            </Button>
          </motion.div>
        )}

        {expandedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-16 flex justify-start border-t border-black/5 pt-8"
          >
            <Button
              onClick={() => setExpandedId(null)}
              variant="ghost"
              size="sm"
              className="text-[#666666] hover:text-[#0057FF] hover:bg-transparent tracking-widest uppercase font-bold gap-3 group pl-0"
            >
              <span className="group-hover:-translate-x-1 transition-transform">
                ←
              </span>{' '}
              Voltar para a lista
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PortfolioShowcase;
