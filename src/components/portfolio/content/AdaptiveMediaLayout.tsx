'use client';

import { FC, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PortfolioProject } from '@/types/project';
import { getMediaAspectRatio, MediaAspectRatio } from '@/lib/media-utils';
import { MediaContainer } from './MediaContainer';
import { ContentContainer } from './ContentContainer';
import { getContentVariants } from '@/components/portfolio/modal/variants';
import { ImageLightbox } from '@/components/portfolio/ImageLightbox';
import { sanitizeTailwindValue } from '@/lib/utils';

interface AdaptiveMediaLayoutProps {
    project: PortfolioProject;
    heroMedia: string;
    shouldReduce?: boolean;
}

export const AdaptiveMediaLayout: FC<AdaptiveMediaLayoutProps> = ({
    project,
    heroMedia,
    shouldReduce = false,
}) => {
    const [aspectRatio, setAspectRatio] = useState<MediaAspectRatio>('horizontal');
    const [activeMedia, setActiveMedia] = useState(heroMedia);
    const [isDetecting, setIsDetecting] = useState(true);
    const [lightboxSource, setLightboxSource] = useState<string | null>(null);

    // Sanitize accent color
    const sanitizedAccentColor = project.accentColor
        ? sanitizeTailwindValue(project.accentColor)
        : undefined;

    // Combine hero media + gallery
    const allMedia = useMemo(() => {
        const list: string[] = [];
        if (heroMedia) list.push(heroMedia);
        if (project.detail?.gallery) {
            project.detail.gallery.forEach(m => {
                if (!list.includes(m)) list.push(m);
            });
        }
        return list;
    }, [heroMedia, project.detail?.gallery]);

    // Handle active media changes from outside (e.g. project change)
    useEffect(() => {
        setActiveMedia(heroMedia);
    }, [heroMedia]);

    // Detect aspect ratio of the ACTIVE media
    useEffect(() => {
        setIsDetecting(true);
        getMediaAspectRatio(activeMedia, (ratio) => {
            setAspectRatio(ratio);
            setIsDetecting(false);
        });
    }, [activeMedia]);

    const isMotion = project.category === 'motion';
    const contentVariants = getContentVariants(shouldReduce);

    // Loading skeleton state
    if (isDetecting && activeMedia === heroMedia) {
        return (
            <div className="w-full h-[60vh] bg-white/5 animate-pulse rounded-2xl flex items-center justify-center">
                <span className="text-white/20 text-sm tracking-widest uppercase">Detectando Dimensões...</span>
            </div>
        );
    }

    // Choose layout based on aspect ratio
    // If vertical/square: side-by-side grid
    // If horizontal: stacked layout
    const isHorizontal = aspectRatio === 'horizontal';

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={isHorizontal ? 'horizontal' : 'vertical'}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={contentVariants}
                className="w-full"
            >
                {isHorizontal ? (
                    /* Horizontal Layout (Legacy-ish but cleaned up) */
                    <div className="flex flex-col gap-10">
                        <MediaContainer
                            activeMedia={activeMedia}
                            allMedia={allMedia}
                            title={project.title}
                            onSelect={setActiveMedia}
                            onMainClick={setLightboxSource}
                            isMotion={isMotion}
                        />
                        <hr className="border-white/5" />
                        <ContentContainer
                            project={project}
                            shouldReduce={shouldReduce}
                            accentColor={sanitizedAccentColor}
                        />
                    </div>
                ) : (
                    /* Vertical/Square Layout (E-commerce style) */
                    <div className="grid md:grid-cols-[1fr,0.85fr] gap-8 lg:gap-12 items-start">
                        <div className="sticky top-0">
                            <MediaContainer
                                activeMedia={activeMedia}
                                allMedia={allMedia}
                                title={project.title}
                                onSelect={setActiveMedia}
                                onMainClick={setLightboxSource}
                                isMotion={isMotion}
                            />
                        </div>
                        <div className="flex flex-col gap-8">
                            <ContentContainer
                                project={project}
                                shouldReduce={shouldReduce}
                                accentColor={sanitizedAccentColor}
                            />
                        </div>
                    </div>
                )}

                <ImageLightbox
                    isOpen={Boolean(lightboxSource)}
                    src={lightboxSource}
                    alt={project.title}
                    onClose={() => setLightboxSource(null)}
                />
            </motion.div>
        </AnimatePresence>
    );
};
