'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { CategoryConfig } from './PortfolioShowcaseSection';
import { ArrowIcon } from '@/components/ui/ArrowIcon';

type Alignment = 'start' | 'center' | 'end';

interface AccordionRowProps {
    category: CategoryConfig;
    alignment: Alignment;
    index: number;
    parentInView: boolean;
    prefersReducedMotion: boolean | null;
    thumb?: string;
}

const alignmentClasses: Record<Alignment, string> = {
    start: 'md:justify-start',
    center: 'md:justify-center',
    end: 'md:justify-end',
};

export default function AccordionRow({
    category,
    alignment,
    index,
    parentInView,
    prefersReducedMotion,
    thumb,
}: AccordionRowProps) {
    const delay = index * 0.15;

    return (
        <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={parentInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
            transition={
                prefersReducedMotion
                    ? undefined
                    : { duration: 1, ease: [0.22, 1, 0.36, 1], delay }
            }
            className="w-full"
        >
            <Link
                href={`/portfolio?category=${category.id}`}
                className={`group flex flex-col md:flex-row w-full items-center border-t border-[#0057FF]/30 py-8 md:py-16 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background justify-center ${alignmentClasses[alignment]}`}
                aria-label={`Ver projetos de ${category.titleDesktop.replace(/\n/g, ' ')}`}
            >
                {/* Mobile Thumbnail (Always Visible) */}
                <div className="md:hidden w-full aspect-video relative overflow-hidden rounded-lg mb-6 bg-white/5">
                     {thumb && (
                        <Image
                            src={thumb}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 0px"
                        />
                    )}
                     {/* Overlay sutil para garantir leitura se tiver texto sobreposto (futuro), ou apenas estética */}
                     <div className="absolute inset-0 bg-black/10" />
                </div>

                <div className="flex w-full md:w-fit items-center justify-between md:justify-start gap-4 transition-all duration-300 group-hover:gap-6 md:gap-14 max-w-full md:max-w-[90%]">
                    {/* Desktop Thumbnail Revealer */}
                    <div className="relative hidden md:block h-32 w-0 overflow-hidden rounded-md bg-black/5 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-64">
                        {thumb && (
                            <Image
                                src={thumb}
                                alt=""
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(min-width: 1024px) 256px, 0px"
                            />
                        )}
                    </div>

                    {/* Content Container */}
                    <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-6">
                        {/* Category Title */}
                        <h3 className="text-3xl md:text-[clamp(2.5rem,5.5vw,6rem)] font-medium leading-none tracking-tighter text-white transition-colors duration-500 group-hover:text-[#0057FF] text-left">
                            <span className="hidden whitespace-pre md:inline">
                                {category.titleDesktop}
                            </span>
                            <span className="md:hidden block">
                                {category.titleMobile}
                            </span>
                        </h3>

                         {/* Arrow Icon [→] */}
                         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0057FF] text-white transition-all duration-500 group-hover:scale-110 group-hover:bg-[#4fe6ff] group-hover:text-[#000022] md:h-16 md:w-16">
                            <ArrowIcon className="-rotate-45 h-5 w-5 transition-transform duration-500 group-hover:rotate-0 md:h-8 md:w-8" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
