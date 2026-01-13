'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const GHOST_EASE = [0.22, 1, 0.36, 1] as const;
const GHOST_SPRING = { damping: 30, stiffness: 200, mass: 1 } as const;

interface Category {
  id: string;
  title: string | string[] | readonly string[];
  slug: string;
  thumbnail: string;
  alignment: 'left' | 'center' | 'right';
  showLabel: boolean;
}

interface CategoryStripeProps {
  category: Category;
  index: number;
  isHovered: boolean;
  onHover: (_id: string | null) => void;
  prefersReducedMotion: boolean;
}

export function CategoryStripe({
  category,
  index,
  isHovered,
  onHover,
  prefersReducedMotion,
}: CategoryStripeProps) {
  const title = Array.isArray(category.title)
    ? category.title
    : [category.title];

  const stripeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stripeRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, GHOST_SPRING);
  const parallaxY = useTransform(smoothProgress, [0, 1], [-20, 20]);

  return (
    <motion.div
      ref={stripeRef}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        ease: GHOST_EASE,
        delay: index * 0.12,
      }}
    >
      <Link
        href={`/portfolio?category=${category.slug}`}
        className="block group"
        onMouseEnter={() => onHover(category.id)}
        onMouseLeave={() => onHover(null)}
      >
        {/* Desktop Stripe */}
        <div
          className={cn(
            'hidden lg:flex items-center py-8 border-t border-blueAccent/40 transition-all duration-300',
            category.alignment === 'right' && 'justify-end',
            category.alignment === 'center' && 'justify-center',
            category.alignment === 'left' && 'justify-start',
            isHovered ? 'gap-10' : 'gap-6'
          )}
        >
          {category.showLabel && (
            <span className="absolute left-6 lg:left-8 text-sm font-normal text-blueAccent/80 whitespace-nowrap">
              [what we love working on]
            </span>
          )}

          <motion.div
            className="relative overflow-hidden rounded-lg shrink-0"
            initial={false}
            animate={{
              width: isHovered ? 288 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.7,
              ease: GHOST_EASE,
            }}
          >
            <div className="relative w-[288px] aspect-video">
              <motion.div
                style={{ y: prefersReducedMotion ? 0 : parallaxY }}
                className="absolute inset-0 w-full h-[120%]"
              >
                <Image
                  src={category.thumbnail}
                  alt={title.join(' ')}
                  fill
                  className="object-cover"
                  sizes="288px"
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              {title.map((line, i) => (
                <span
                  key={i}
                  className={cn(
                    'text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight transition-colors duration-300',
                    isHovered ? 'text-bluePrimary' : 'text-white'
                  )}
                >
                  {line}
                </span>
              ))}
            </div>

            <motion.div
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300"
              initial={false}
              animate={{
                rotate: isHovered ? 0 : -45,
                backgroundColor: isHovered ? '#8705f2' : '#0048ff',
              }}
              transition={{
                duration: 0.5,
                ease: GHOST_EASE,
              }}
            >
              <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </motion.div>
          </div>
        </div>

        {/* Mobile Card */}
        <div className="lg:hidden flex items-center justify-between py-6 border-t border-blueAccent/40">
          <div className="flex flex-col">
            {title.map((line, i) => (
              <span
                key={i}
                className="text-xl font-normal tracking-tight text-white"
              >
                {line}
              </span>
            ))}
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#0048ff]">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
