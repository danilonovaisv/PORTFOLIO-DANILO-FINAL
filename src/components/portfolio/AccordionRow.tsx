'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleLinkClick = (e: React.MouseEvent) => {
        if (isMobile && !isExpanded) {
            e.preventDefault();
            setIsExpanded(true);
        }
    };

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
                onClick={handleLinkClick}
                className={`group flex w-full flex-col md:flex-row items-center md:py-16 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${alignmentClasses[alignment]} ${
                   isExpanded ? 'py-8 gap-6' : 'py-6 gap-4'
                }`}
                aria-label={`Ver projetos de ${category.titleDesktop.replace(/\n/g, ' ')}`}
                aria-expanded={isExpanded}
            >
                    {/* Content Container */}
                    <div className="flex w-full flex-col md:flex-row items-center justify-between md:justify-center gap-4 transition-all duration-300 md:group-hover:gap-6 md:gap-14 max-w-full md:max-w-[90%] text-left">
                        {/* Thumbnail - Mobile Only (Expandable) */}
                        <AnimatePresence>
                            {isExpanded && thumb && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="relative block w-full overflow-hidden rounded-md md:hidden border border-white/10 order-2 md:order-none"
                                >
                                    <div className="aspect-video relative w-full">
                                        <Image
                                            src={thumb}
                                            alt=""
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 0px"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Thumbnail Revealer - Desktop Only */}
                        <div className="relative hidden h-32 w-0 overflow-hidden rounded-md bg-black/5 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-72 md:block">
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

                    {/* Inner Content (Title + Arrow) */}
                    <div className="flex w-full md:w-auto items-center justify-between md:justify-start gap-4 md:gap-6 order-1 md:order-none">
                        {/* Category Title */}
                        <h3 className="text-3xl font-medium leading-none tracking-tighter text-white transition-colors duration-500 md:group-hover:text-[#4fe6ff] md:text-[clamp(2.5rem,5.5vw,6rem)] text-left">
                            <span className="hidden md:inline">
                                {category.id === 'websites-webcampaigns-tech' ? (
                                    <>
                                        {/* Force split into two lines for this specific category */}
                                        Web Campaigns,
                                        <br />
                                        Websites & Tech
                                    </>
                                ) : (
                                    category.titleDesktop
                                )}
                            </span>
                            <span className="md:hidden">{category.titleMobile}</span>
                        </h3>

                         {/* Arrow Icon [→] - Always Visible */}
                         <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0057FF] text-white transition-all duration-500 md:group-hover:scale-110 md:group-hover:bg-[#4fe6ff] md:group-hover:text-[#000022] md:h-16 md:w-16 ${isExpanded ? 'bg-[#4fe6ff] text-[#000022]' : ''}`}>
                            <ArrowIcon className="-rotate-45 h-5 w-5 transition-transform duration-500 md:group-hover:rotate-0 md:h-8 md:w-8" />
                        </div>
                    </div>
                    <div
                      aria-hidden
                      className="hidden md:flex h-3 w-3 shrink-0 rounded-full bg-[#0057FF] transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
            </Link>
        </motion.div>
    );
}
