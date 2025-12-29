'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

type Category = {
  id: string;
  title: string;
  align: 'start' | 'center' | 'end';
  thumb: string;
  ariaLabel: string;
};

function AlignClass(align: Category['align']) {
  switch (align) {
    case 'start':
      return 'md:justify-start';
    case 'center':
      return 'md:justify-center';
    case 'end':
      return 'md:justify-end';
  }
}

function AccordionRow({ category }: { category: Category }) {
  const reducedMotion = useReducedMotion();

  return (
    <Link
      href={`/portfolio?category=${encodeURIComponent(category.id)}`}
      className={`group flex w-full border-t border-[#0057FF]/50 py-8 md:py-14 items-center transition-colors ${AlignClass(
        category.align
      )} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded-md`}
      aria-label={category.ariaLabel}
    >
      <div className="flex items-center gap-5 md:gap-7 group-hover:gap-10 transition-[gap] duration-300 w-full">
        {/* Thumbnail revealer (no layout shift): fixed width, animate scaleX */}
        <div className="hidden md:block w-72 h-40 shrink-0 overflow-hidden rounded-md relative">
          <motion.div
            className="absolute inset-0 origin-left"
            style={{ willChange: 'transform,opacity' }}
            initial={false}
            animate={
              reducedMotion
                ? { scaleX: 1, opacity: 1 }
                : { scaleX: 0, opacity: 0 }
            }
            whileHover={reducedMotion ? undefined : { scaleX: 1, opacity: 1 }}
            transition={{
              duration: reducedMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src={category.thumb}
              alt=""
              fill
              unoptimized
              className="object-cover"
              aria-hidden="true"
            />
          </motion.div>
        </div>

        <h3 className="text-2xl md:text-5xl/none font-medium whitespace-nowrap text-[#111111]">
          {category.title}
        </h3>

        <div className="ml-auto md:ml-0 bg-[#0057FF] rounded-full p-2.5 md:p-3.5 shrink-0">
          <ArrowIcon className="text-white w-4 h-4 md:w-5 md:h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
        </div>
      </div>
    </Link>
  );
}

export default function PortfolioShowcaseSection() {
  const reducedMotion = useReducedMotion();

  const categories: Category[] = [
    {
      id: 'brand-campaigns',
      title: 'Brand & Campaigns',
      align: 'end',
      thumb:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
      ariaLabel: 'Ver projetos de Brand & Campaigns',
    },
    {
      id: 'videos-motions',
      title: 'Videos & Motions',
      align: 'center',
      thumb:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
      ariaLabel: 'Ver projetos de Videos & Motions',
    },
    {
      id: 'websites-webcampaigns-tech',
      title: 'Web Campaigns, Websites & Tech',
      align: 'start',
      thumb:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
      ariaLabel: 'Ver projetos de Web Campaigns, Websites & Tech',
    },
  ];

  return (
    <section
      id="portfolio-showcase"
      aria-label="Portfolio Categories"
      className="bg-[#F4F5F7] py-24 md:py-32 relative overflow-hidden"
    >
      <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)] relative">
        <div className="hidden md:block absolute left-[clamp(24px,5vw,96px)] -translate-y-16">
          <span className="text-[#0057FF] uppercase tracking-widest font-mono mix-blend-difference">
            [what we love working on]
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: reducedMotion ? 0.2 : 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-4xl md:text-6xl font-bold text-center mb-14 md:mb-20 text-[#111111]"
        >
          portfólio showcase
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reducedMotion ? 0 : 0.12 } },
          }}
          className="flex flex-col gap-10 md:gap-14"
        >
          {categories.map((c) => (
            <motion.div
              key={c.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reducedMotion ? 0.2 : 0.7 },
                },
              }}
            >
              <AccordionRow category={c} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20 flex flex-col md:flex-row md:justify-center gap-6">
          <PrimaryButton href="/portfolio" variant="outline">
            Ver todos os projetos →
          </PrimaryButton>
          <PrimaryButton href="/#contact" variant="solid">
            let&apos;s build something great →
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
