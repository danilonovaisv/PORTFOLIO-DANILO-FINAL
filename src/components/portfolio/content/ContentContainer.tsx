'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Building2 } from 'lucide-react';
import type { PortfolioProject } from '@/types/project';
import PortfolioCTA from '@/components/portfolio/PortfolioCTA';
import {
    getFadeInUp,
    getTitleVariants,
    getMetaVariants,
} from '@/components/portfolio/modal/variants';

interface ContentContainerProps {
    project: PortfolioProject;
    shouldReduce?: boolean;
    accentColor?: string;
}

export const ContentContainer: FC<ContentContainerProps> = ({
    project,
    shouldReduce = false,
    accentColor: _accentColor
}) => {
    const fadeInUpVariants = getFadeInUp(shouldReduce);

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Title section */}
            <div className="flex flex-col gap-4">
                <motion.h2
                    initial="hidden"
                    animate="visible"
                    variants={getTitleVariants(shouldReduce)}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                >
                    {project.title}
                </motion.h2>

                {project.subtitle && (
                    <motion.p
                        variants={fadeInUpVariants}
                        className="text-xl text-blueAccent font-medium"
                    >
                        {project.subtitle}
                    </motion.p>
                )}

                {project.detail?.description && (
                    <motion.p
                        variants={fadeInUpVariants}
                        className="text-base md:text-lg text-white/70 leading-relaxed"
                    >
                        {project.detail.description}
                    </motion.p>
                )}
            </div>

            {/* Grid for Meta and Highlights */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Highlights */}
                {project.detail?.highlights && (
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">Destaques</h3>
                        <motion.ul
                            variants={fadeInUpVariants}
                            className="flex flex-col gap-3 list-none"
                        >
                            {project.detail.highlights.map((highlight, i) => (
                                <motion.li
                                    key={i}
                                    className="flex items-start gap-3 text-sm text-white/80"
                                    variants={fadeInUpVariants}
                                >
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blueAccent shrink-0" aria-hidden="true" />
                                    {highlight}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                )}

                {/* Right: Metadata */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={getMetaVariants(shouldReduce)}
                    className="flex flex-col gap-6"
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                            <Building2 className="w-5 h-5 text-blueAccent" />
                            <div>
                                <span className="block text-xs uppercase tracking-wider text-white/50">Cliente</span>
                                <span className="text-sm font-medium text-white">{project.client}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                            <Calendar className="w-5 h-5 text-blueAccent" />
                            <div>
                                <span className="block text-xs uppercase tracking-wider text-white/50">Ano</span>
                                <span className="text-sm font-medium text-white">{project.year}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tags */}
                    {project.tags && (
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, tagIndex) => (
                                <span
                                    key={`${project.id}-${tag}-${tagIndex}`}
                                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/60 px-1.5 py-0.5 text-[0.5rem] text-center uppercase tracking-[0.18em] text-void"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* External link / CTA */}
                    {project.detail?.externalUrl && (
                        <div className="mt-4">
                            <PortfolioCTA
                                href={project.detail.externalUrl}
                                label="VER PROJETO COMPLETO"
                                external
                                className="w-full md:w-auto"
                            />
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};
