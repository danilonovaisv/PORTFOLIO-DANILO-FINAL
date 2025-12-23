'use client';

import React, { FC, useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { Button } from '@/ui/Button';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { ProjectCategory } from '@/lib/types';
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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.25,
      },
    },
  };

  const itemVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : 24,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
        },
      },
    }),
    [shouldReduceMotion]
  );

  const categoryList = useMemo(
    () =>
      CATEGORIES.map((category: ProjectCategory, index) => {
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
      }),
    [expandedId, hoveredId, handleExpand, itemVariants, setHoveredId]
  );

  return (
    <section
      id="portfolio-showcase"
      ref={sectionRef}
      className="relative w-full bg-[#F4F5F7] py-24 md:py-40 overflow-hidden min-h-screen flex flex-col justify-center items-center"
    >
      <div className="container mx-auto px-[clamp(1.25rem,5vw,6rem)] max-w-[92%] xl:max-w-420 relative z-10">
        <motion.div
          className="flex flex-col w-full mb-12 md:mb-16 items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
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
          className="flex flex-col w-full border-t border-black/10"
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
              href="/#contact"
              size="xl"
              className="group rounded-full shadow-xl hover:shadow-[#0057FF]/40 gap-4"
            >
              <span className="text-lg md:text-xl font-semibold tracking-wide">
                let’s build something great
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 group-hover:bg-white text-[#0057FF] transition-colors duration-300">
                <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#0057FF]" />
              </span>
            </Button>
          </motion.div>
        )}

        {expandedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-16 flex justify-start border-t border-neutral-200 pt-8"
          >
            <Button
              onClick={() => setExpandedId(null)}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-[#0057FF] hover:bg-transparent tracking-widest uppercase font-bold gap-3 group pl-0"
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
