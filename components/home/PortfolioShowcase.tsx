'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { HOMEPAGE_CONTENT } from '../../config/homepageContent';

const splitLabel = (label: string) => {
  const commaParts = label
    .split(',')
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (commaParts.length > 1) {
    return commaParts;
  }

  const ampersandParts = label.split(' & ').map((segment) => segment.trim());

  return ampersandParts.length > 1 ? ampersandParts : [label];
};

const PortfolioShowcaseSection: React.FC = () => {
  const showcase = HOMEPAGE_CONTENT.portfolioShowcase;

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="relative w-full bg-[#f5f5f5] py-24 overflow-hidden"
    >
      <div className="container mx-auto flex flex-col gap-12 px-6 md:px-8 max-w-[90%] md:max-w-7xl">
        <div className="flex flex-col items-center gap-4">
          <div className="text-sm uppercase tracking-[0.35em] text-[#0057FF]">
            portfólio showcase
          </div>
          <h2
            id="portfolio-title"
            className="text-center text-4xl md:text-6xl font-bold tracking-tight text-[#111111]"
          >
            <span className="text-[#0057FF]">portfólio</span>{' '}
            <span className="text-[#111111]">showcase</span>
          </h2>
        </div>

        <div className="flex w-full justify-start text-[0.65rem] uppercase tracking-[0.6em] text-[#777]">
          [ what we love working on ]
        </div>

        <div className="flex flex-col divide-y divide-[#dcdfe8] rounded-[32px] border border-[#dcdfe8] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          {showcase.categories.map((category) => {
            const segments = splitLabel(category.label);
            return (
              <Link
                key={category.id}
                href={showcase.finalCtaHref}
                className="group flex w-full items-center justify-between gap-6 px-6 py-10 transition-transform duration-500 ease-out hover:-translate-y-1 hover:bg-[#f5f7ff]"
                aria-label={`Explorar ${category.label}`}
              >
                <div className="flex w-full flex-1 flex-col gap-1 text-left">
                  {segments.map((segment, index) => (
                    <span
                      key={`${segment}-${index}`}
                      className="block text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] text-[#111111] transition-colors duration-300 group-hover:text-[#0057FF]"
                    >
                      {segment}
                    </span>
                  ))}
                </div>

                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0057FF] text-white shadow-md shadow-[#0057FF]/40 transition-all duration-500 group-hover:bg-white group-hover:text-[#0057FF]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Link
            href="#contato"
            className="group inline-flex items-center gap-4 rounded-full bg-[#0057FF] px-10 py-5 text-lg font-semibold text-white shadow-xl shadow-[#0057FF]/30 transition-all duration-300 hover:shadow-[#0057FF]/60"
          >
            <span className="uppercase tracking-[0.45em]">let's build something great</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-[#0057FF] transition-colors duration-300 group-hover:bg-white group-hover:text-[#0057FF]">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioShowcaseSection;
