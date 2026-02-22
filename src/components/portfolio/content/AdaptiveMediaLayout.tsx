'use client';

import { FC, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Play } from 'lucide-react';
import type { PortfolioProject } from '@/types/project';
import { isVideo, isYouTubeUrl, getYouTubeEmbedUrl, getYouTubeThumbnailUrl, applyImageFallback } from '@/lib/utils';
import { DEFAULT_CAPTIONS, DEFAULT_VIDEO_POSTER } from '@/lib/video';
import { ImageLightbox } from '@/components/portfolio/ImageLightbox';

import { getContentVariants } from '@/components/portfolio/modal/variants';

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
    const [activeMedia, setActiveMedia] = useState(heroMedia);
    const [lightboxSource, setLightboxSource] = useState<string | null>(null);

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

    useEffect(() => {
        setActiveMedia(heroMedia);
    }, [heroMedia]);

    const contentVariants = getContentVariants(shouldReduce);
    const isMotion = project.category === 'motion';

    const activeYouTubeEmbed = isYouTubeUrl(activeMedia)
        ? getYouTubeEmbedUrl(activeMedia)
        : null;
    const isVid = isVideo(activeMedia);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="cinematic-layout"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={contentVariants}
                className="w-full flex-1"
            >
                <section className="relative w-full group overflow-hidden bg-transparent">
                    {/* HERO MEDIA */}
                    <div className="relative w-full aspect-video max-h-[70vh] bg-black/50 overflow-hidden flex items-center justify-center">
                        {activeYouTubeEmbed ? (
                            <iframe
                                src={activeYouTubeEmbed}
                                title={project.title}
                                className="absolute inset-0 w-full h-full border-none z-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : isVid ? (
                            <video
                                key={activeMedia}
                                src={activeMedia}
                                autoPlay
                                muted={false}
                                playsInline
                                controls
                                preload="metadata"
                                poster={DEFAULT_VIDEO_POSTER}
                                className="absolute inset-0 w-full h-full object-contain z-0"
                                onLoadedMetadata={(event) => {
                                    event.currentTarget.muted = false;
                                    void event.currentTarget.play().catch(() => undefined);
                                }}
                            >
                                <track
                                    kind="captions"
                                    src={DEFAULT_CAPTIONS}
                                    srcLang="pt-BR"
                                    label="Português"
                                    default
                                />
                            </video>
                        ) : (
                            <div className="absolute inset-0 w-full h-full z-0 cursor-pointer" onClick={() => setLightboxSource(activeMedia)}>
                                <Image
                                    src={activeMedia}
                                    alt={project.title}
                                    fill
                                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.02]"
                                    sizes="100vw"
                                    priority
                                    onError={applyImageFallback}
                                />
                            </div>
                        )}

                        {/* Ghost Ambient Gradient */}
                        {!isVid && !activeYouTubeEmbed && (
                            <div className="absolute inset-0 bg-gradient-to-t from-[#040013] via-[#040013]/20 to-transparent opacity-90 pointer-events-none z-10" />
                        )}

                        {/* Motion & Video Label */}
                        {isMotion && (
                            <div className="absolute top-4 left-6 md:left-12 z-20 pointer-events-none">
                                <span className="inline-flex items-center rounded-full bg-[#0b0d3a]/60 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                                    Motion & Video
                                </span>
                            </div>
                        )}
                    </div>

                    {/* THUMBNAILS CAROUSEL */}
                    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-30 mt-6 md:mt-8 mb-12">
                        {allMedia.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                                {allMedia.map((media, idx) => {
                                    const isActive = activeMedia === media;
                                    const isThumbVid = isVideo(media);
                                    const youtubeThumb = isYouTubeUrl(media)
                                        ? getYouTubeThumbnailUrl(media)
                                        : null;

                                    return (
                                        <button
                                            key={`${media}-${idx}`}
                                            onClick={() => setActiveMedia(media)}
                                            className={`relative w-32 md:w-48 aspect-video flex-shrink-0 rounded-lg overflow-hidden border-2 cursor-pointer transition-colors outline-none
                                                ${isActive ? 'border-[#4fe6ff] ring-4 ring-[#4fe6ff]/20 z-10' : 'border-white/20 hover:border-white/50 opacity-70 hover:opacity-100'}
                                            `}
                                        >
                                            {youtubeThumb ? (
                                                <div className="relative w-full h-full">
                                                    <Image src={youtubeThumb} alt={`Thumbnail ${idx}`} fill className="object-cover" sizes="200px" unoptimized />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                        <Play className="w-6 h-6 text-white fill-current opacity-90" />
                                                    </div>
                                                </div>
                                            ) : isThumbVid ? (
                                                <div className="relative w-full h-full">
                                                    <video src={media} className="w-full h-full object-cover" muted playsInline preload="metadata" />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                        <Play className="w-6 h-6 text-white fill-current opacity-80" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <Image src={media} alt={`Thumbnail ${idx}`} fill className="object-cover" sizes="200px" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* DETAILS / TEXT CONTENT */}
                    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-30 pb-24">
                        <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-2 drop-shadow-2xl font-display">
                            {project.title}
                        </h1>
                        {project.subtitle && (
                            <p className="text-xl md:text-2xl text-gray-300 font-light mb-8 max-w-3xl leading-relaxed">
                                {project.subtitle}
                            </p>
                        )}

                        <div className="flex flex-row flex-wrap gap-8 items-center text-sm border-t border-white/10 pt-6 mb-12 w-full">
                            {project.category && (
                                <div className="flex flex-row items-baseline gap-2">
                                    <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Categoria</span>
                                    <span className="text-white text-base font-medium uppercase font-sans">{project.category}</span>
                                </div>
                            )}
                            {project.client && (
                                <div className="flex flex-row items-baseline gap-2">
                                    <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Cliente</span>
                                    <span className="text-white text-base font-medium">{project.client}</span>
                                </div>
                            )}
                            {project.year && (
                                <div className="flex flex-row items-baseline gap-2">
                                    <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Ano</span>
                                    <span className="text-white text-base font-medium">{project.year}</span>
                                </div>
                            )}
                        </div>

                        <div className="max-w-3xl flex flex-col gap-10">
                            {project.detail?.description && (
                                <div className="prose prose-lg prose-invert max-w-none">
                                    <p className="text-xl md:text-2xl leading-relaxed text-gray-200 font-light">
                                        {project.detail.description}
                                    </p>
                                </div>
                            )}

                            {/* Tags and Highlights */}
                            <div className="flex flex-col md:flex-row gap-10">
                                {project.detail?.highlights && (
                                    <div className="flex-1 flex flex-col gap-4">
                                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">Destaques</h3>
                                        <ul className="flex flex-col gap-3 list-none p-0 m-0">
                                            {project.detail.highlights.map((highlight, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm md:text-base text-white/80">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4fe6ff] shrink-0 shadow-[0_0_8px_rgba(79,230,255,0.8)]" aria-hidden="true" />
                                                    {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {project.tags && (
                                    <div className="flex-1 flex flex-col gap-4">
                                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">Tecnologias</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag, tagIndex) => (
                                                <span
                                                    key={`${project.id}-${tag}-${tagIndex}`}
                                                    className="inline-flex items-center justify-center rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-colors px-3 py-1.5 text-xs text-center uppercase tracking-wider text-white"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* External link / CTA */}
                            {project.detail?.externalUrl && (
                                <div className="pt-16 mt-12 flex justify-start">
                                    <a className="group inline-flex items-center gap-1.5 no-underline" href={project.detail.externalUrl} target="_blank" rel="noopener noreferrer">
                                        <div className="h-16 px-8 flex items-center justify-center bg-[#0048ff] rounded-full hover:bg-[#1a5cff] hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(0,72,255,0.3)] hover:shadow-[0_0_30px_rgba(0,72,255,0.5)]">
                                            <span className="text-white text-lg font-medium tracking-wide lowercase">ver projeto completo</span>
                                        </div>
                                        <div className="h-16 w-16 flex-shrink-0 flex items-center justify-center bg-[#0048ff] rounded-full hover:bg-[#1a5cff] hover:rotate-45 transition-all duration-300 shadow-[0_0_20px_rgba(0,72,255,0.3)] hover:shadow-[0_0_30px_rgba(0,72,255,0.5)]">
                                            <span className="material-icons-round text-white text-2xl">north_east</span>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

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
