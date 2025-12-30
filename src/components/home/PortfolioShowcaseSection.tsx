'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowIcon } from '@/components/ui/ArrowIcon';

import { HOME_CONTENT } from '@/config/content';

export default function PortfolioShowcaseSection() {
  const reducedMotion = useReducedMotion();
  const { showcase } = HOME_CONTENT;

  return (
    <section
      id="portfolio-showcase"
      aria-label="Portfolio Categories"
      className="bg-section-bg py-24 md:py-32 relative overflow-hidden"
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
            <span className="text-primary">{showcase.title.split(' ')[1]}</span>
          </motion.h2>

          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2">
            <span className="text-text-muted text-sm tracking-widest uppercase font-medium">
              [ what we love working on ]
            </span>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col border-b border-primary/30 relative">
          {/* Floating Label - Positioned next to first item on desktop */}
          <div className="hidden lg:block absolute left-0 top-18 -translate-y-1/2">
            <span className="text-text-muted text-sm tracking-widest uppercase font-medium">
              [ what we love working on ]
            </span>
          </div>

          {showcase.categories.map((item, index) => {
            const isThirdItem = index === 2;
            const alignment =
              index === 0
                ? 'justify-end'
                : index === 1
                  ? 'justify-center'
                  : 'justify-start';

            return (
              <Link
                key={item.id}
                href={`/portfolio#${item.id}`}
                className={`group flex w-full border-t border-primary/30 py-8 md:py-14 items-center ${alignment} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md transition-colors`}
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
                      // Third item: two lines if possible or just the label
                      <div className="flex flex-col text-3xl sm:text-5xl xl:text-7xl font-medium text-text-dark text-center md:text-left">
                        {item.label.includes(',') ? (
                          <>
                            <span>{item.label.split(',')[0]},</span>
                            <span>{item.label.split(',')[1]}</span>
                          </>
                        ) : (
                          <span>{item.label}</span>
                        )}
                      </div>
                    ) : (
                      // First and second items: single line
                      <span className="text-3xl sm:text-5xl xl:text-7xl font-medium text-text-dark text-center md:text-left">
                        {item.label}
                      </span>
                    )}
                    <div className="bg-primary aspect-square rounded-full p-2.5 md:p-3 shrink-0 flex items-center justify-center">
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
            href={showcase.cta.href}
            className="group relative inline-flex items-center gap-3 bg-primary text-white py-5 px-8 rounded-full hover:-translate-y-px transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          >
            <span className="font-medium lowercase">
              {showcase.cta.label.replace(' →', '')}
            </span>
            <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
