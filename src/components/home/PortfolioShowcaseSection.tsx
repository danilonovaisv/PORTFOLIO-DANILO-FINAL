'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowIcon } from '@/components/ui/ArrowIcon';

const ITEMS = [
  {
    id: 'brand-campaigns',
    href: '/portfolio#brand-campaigns',
    label: 'Brand & Campaigns',
    alignment: 'justify-end' as const, // Right
    thumb:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
  },
  {
    id: 'videos-motions',
    href: '/portfolio#videos-motions',
    label: 'Videos & Motions',
    alignment: 'justify-center' as const, // Center
    thumb:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
  },
  {
    id: 'websites-webcampaigns-tech',
    href: '/portfolio#websites-webcampaigns-tech',
    labelLine1: 'Web Campaigns,',
    labelLine2: 'Websites & Tech',
    alignment: 'justify-start' as const, // Left
    thumb:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
  },
];

export default function PortfolioShowcaseSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="portfolio-showcase"
      aria-label="Portfolio Categories"
      className="bg-[#F4F5F7] py-24 md:py-32 relative overflow-hidden"
    >
      <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)] relative">
        {/* Header */}
        <div className="relative mb-20 flex flex-col items-center justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: reducedMotion ? 0.2 : 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-4xl md:text-6xl font-bold text-center"
          >
            <span className="text-text-dark">portfólio </span>
            <span className="text-[#0057FF]">showcase</span>
          </motion.h2>

          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2">
            <span className="text-text-muted text-sm tracking-widest uppercase font-medium">
              [ what we love working on ]
            </span>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col border-b border-[#0057FF]/30 relative">
          {/* Floating Label - Positioned next to first item on desktop */}
          <div className="hidden lg:block absolute left-0 top-18 -translate-y-1/2">
            <span className="text-text-muted text-sm tracking-widest uppercase font-medium">
              [ what we love working on ]
            </span>
          </div>

          {ITEMS.map((item, index) => {
            const isThirdItem = index === 2;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`group flex w-full border-t border-[#0057FF]/30 py-8 md:py-14 items-center ${item.alignment} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded-md transition-colors`}
              >
                <div className="flex items-center justify-center w-full md:w-auto">
                  {/* Image Block (Desktop) */}
                  <div className="hidden md:block w-0 overflow-hidden group-hover:w-72 transition-all duration-700 h-40 rounded-md relative group-hover:mr-10 ease-in-out">
                    <div className="w-72 h-40 relative">
                      <Image
                        src={item.thumb}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Title & Icon Block */}
                  <div className="flex items-center gap-7 group-hover:gap-10 transition-all duration-300 ease-in-out">
                    {isThirdItem ? (
                      // Third item: two lines
                      <div className="flex flex-col text-3xl sm:text-5xl xl:text-7xl font-medium text-text-dark text-center md:text-left">
                        <span>{item.labelLine1}</span>
                        <span>{item.labelLine2}</span>
                      </div>
                    ) : (
                      // First and second items: single line
                      <span className="text-3xl sm:text-5xl xl:text-7xl font-medium text-text-dark text-center md:text-left">
                        {'label' in item ? item.label : ''}
                      </span>
                    )}
                    <div className="bg-[#0057FF] aspect-square rounded-full p-2.5 md:p-3 shrink-0 flex items-center justify-center">
                      <ArrowIcon className="text-white w-4 h-4 md:w-5 md:h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 flex justify-center">
          <Link
            href="/portfolio"
            className="group relative inline-flex items-center gap-3 bg-[#0057FF] text-white py-5 px-8 rounded-full hover:-translate-y-px transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF]"
          >
            <span className="font-medium lowercase">let's build something great</span>
            <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
