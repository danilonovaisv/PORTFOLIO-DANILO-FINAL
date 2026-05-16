'use client';

import { FC, useState, useEffect, useMemo } from 'react';
import { m, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import type { PortfolioProject } from '@/types/project';
import { getAssetUrl, isVideo, isYouTubeUrl, getYouTubeEmbedUrl, getYouTubeThumbnailUrl, applyImageFallback, ASSET_PLACEHOLDER } from '@/lib/utils';
import { ResponsiveCaptionTrack } from '@/components/ui/ResponsiveCaptionTrack';
import { DEFAULT_CAPTIONS, DEFAULT_VIDEO_POSTER } from '@/lib/video';
import { CaseBodyRenderer } from '@/components/portfolio/CaseBodyRenderer';
import { ImageLightbox } from '@/components/portfolio/ImageLightbox';

import { injectSupabaseProxy } from '@/lib/supabase/urls';
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
    const [isLoaded, setIsLoaded] = useState(false);

    // Reset loading state when media changes
    useEffect(() => {
        setIsLoaded(false);
    }, [activeMedia]);

    // Combine hero media + gallery
    const galleryMedia = useMemo(() => {
        const list: string[] = [];
        const hiddenMedia = new Set(
            [
                project.thumbnailMedia,
                project.image,
                project.imageLandscape,
                project.imageSquare
            ].filter(
                (entry): entry is string => typeof entry === 'string' && entry.trim() !== ''
            )
        );

        // Ensure heroMedia is always available in the thumbnails (if valid)
        const resolvedHero = getAssetUrl(heroMedia, { isVideo: isVideo(heroMedia) });
        if (resolvedHero && resolvedHero !== ASSET_PLACEHOLDER && !hiddenMedia.has(heroMedia)) {
            list.push(resolvedHero);
        }

        if (project.detail?.gallery) {
            project.detail.gallery.forEach(m => {
                if (m && typeof m === 'string' && m.trim() !== '') {
                    const isVidInternal = isVideo(m);
                    const resolved = getAssetUrl(m, { isVideo: isVidInternal });

                    if (resolved !== ASSET_PLACEHOLDER && !hiddenMedia.has(m) && !list.includes(resolved)) {
                        list.push(resolved);
                    }
                }
            });
        }
        return list;
    }, [project.detail?.gallery, project.thumbnailMedia, heroMedia]);

    const activeMediaIndex = useMemo(
        () => galleryMedia.findIndex((media) => media === activeMedia),
        [activeMedia, galleryMedia]
    );

    useEffect(() => {
        if (galleryMedia.length > 0 && !galleryMedia.includes(activeMedia)) {
            // Keep the heroMedia active originally, but if they click gallery they change it.
            // When opening, if heroMedia is valid, it stays active.
        }
    }, [galleryMedia]);

    useEffect(() => {
        if (heroMedia && heroMedia.trim() !== '') {
            setActiveMedia(getAssetUrl(heroMedia, { isVideo: isVideo(heroMedia) }));
        } else if (galleryMedia.length > 0) {
            setActiveMedia(galleryMedia[0]);
        }
    }, [heroMedia, galleryMedia]);

    useEffect(() => {
        if (activeMediaIndex < 0) return;
        const preloadCandidates = [galleryMedia[activeMediaIndex - 1], galleryMedia[activeMediaIndex + 1]].filter(
            (entry): entry is string => Boolean(entry) && !isVideo(entry)
        );

        preloadCandidates.forEach((entry) => {
            const image = new window.Image();
            image.src = entry;
        });
    }, [activeMediaIndex, galleryMedia]);

    const contentVariants = getContentVariants(shouldReduce);
    const isMotion = project.category === 'motion';

    const activeYouTubeEmbed = isYouTubeUrl(activeMedia)
        ? getYouTubeEmbedUrl(activeMedia)
        : null;
    const isVid = isVideo(activeMedia);
    const activeLightboxIndex = lightboxSource
        ? galleryMedia.findIndex((media) => media === lightboxSource)
        : -1;

    const openLightbox = (media: string) => {
        if (isVideo(media) || isYouTubeUrl(media)) return;
        setLightboxSource(media);
    };

    const stepLightbox = (direction: 'prev' | 'next') => {
        if (activeLightboxIndex < 0 || galleryMedia.length <= 1) return;
        const delta = direction === 'next' ? 1 : -1;
        const nextIndex = (activeLightboxIndex + delta + galleryMedia.length) % galleryMedia.length;
        const nextMedia = galleryMedia[nextIndex];
        if (!nextMedia) return;
        if (isVideo(nextMedia) || isYouTubeUrl(nextMedia)) {
            setLightboxSource(null);
            setActiveMedia(nextMedia);
            return;
        }
        setLightboxSource(nextMedia);
        setActiveMedia(nextMedia);
    };

    return (
        <AnimatePresence mode="wait">
            <m.div
                key="cinematic-layout"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={contentVariants}
                className="w-full flex-1"
            >
                <section className="relative w-full group overflow-hidden bg-transparent">
                    {/* HERO MEDIA */}
                    <div className="relative w-full aspect-video max-h-[70vh] bg-black/40 overflow-hidden flex items-center justify-center">
                        {/* Ghost Media Placeholder */}
                        <AnimatePresence>
                            {!isLoaded && activeMedia && (
                                <m.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-10 flex items-center justify-center bg-background"
                                >
                                    <div className="w-10 h-10 border-2 border-bluePrimary/20 border-t-bluePrimary rounded-full animate-spin" />
                                </m.div>
                            )}
                        </AnimatePresence>
                        {!activeMedia ? (
                            <div className="relative z-10 flex h-full w-full items-center justify-center px-6 text-center">
                                <div className="max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
                                    Este post nao possui midia interna publicada. A thumb permanece apenas na listagem.
                                </div>
                            </div>
                        ) : activeYouTubeEmbed ? (
                            <iframe
                                src={activeYouTubeEmbed}
                                title={project.title}
                                className="absolute inset-0 w-full h-full border-none z-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        ) : isVid ? (
                                <video
                                    key={activeMedia}
                                    src={getAssetUrl(activeMedia, { isVideo: true })}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    controls
                                    preload="metadata"
                                    poster={DEFAULT_VIDEO_POSTER}
                                    className={`absolute inset-0 w-full h-full object-contain z-0 transition-opacity duration-normal ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    onLoadedData={() => setIsLoaded(true)}
                                    onLoadedMetadata={(event) => {
                                        // Spec: POP-UP DE PROJETO (SEM LANDING PAGE) §6.2
                                        // Vídeo do modal deve autoplay com muted obrigatório.
                                        event.currentTarget.muted = true;
                                        void event.currentTarget.play().catch(() => undefined);
                                    }}
                                >
                                    <ResponsiveCaptionTrack src={DEFAULT_CAPTIONS} />
                                </video>
                        ) : (
                            <div
                                className="absolute inset-0 flex w-full h-full items-center justify-center z-0 cursor-pointer px-4 py-4 md:px-8 md:py-8"
                                onClick={() => openLightbox(activeMedia)}
                            >
                                <Image
                                    src={getAssetUrl(activeMedia, { width: 1920, quality: 80 })}
                                    alt={project.title}
                                    width={1920}
                                    height={1080}
                                    className={`max-h-full h-auto w-auto max-w-full object-contain transition-all duration-normal ${isLoaded ? 'opacity-90' : 'opacity-0'}`}
                                    sizes="100vw"
                                    priority
                                    unoptimized
                                    onLoadingComplete={() => setIsLoaded(true)}
                                    onError={applyImageFallback}
                                />
                            </div>
                        )}

                        {/* Ghost Ambient Gradient */}
                        {!activeMedia ? null : !isVid && !activeYouTubeEmbed && (
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90 pointer-events-none z-10" />
                        )}

                        {/* Motion & Video Label */}
                        {isMotion && (
                            <div className="absolute top-4 left-6 md:left-12 z-20 pointer-events-none">
                                <span className="inline-flex items-center rounded-full bg-neutral/60 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                                    Motion & Video
                                </span>
                            </div>
                        )}
                    </div>

                    {/* THUMBNAILS CAROUSEL */}
                    <div className="w-full max-w-[1680px] mx-auto px-6 md:px-12 relative z-30 mt-6 md:mt-8 mb-12">
                        {galleryMedia.length > 0 && (
                            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                                {galleryMedia.map((media, idx) => {
                                    const isActive = activeMedia === media;
                                    const isThumbVid = isVideo(media);
                                    const youtubeThumb = isYouTubeUrl(media)
                                        ? getYouTubeThumbnailUrl(media)
                                        : null;

                                    return (
                                        <button
                                            key={`${media}-${idx}`}
                                            onClick={() => setActiveMedia(media)}
                                            aria-label={`Visualizar miniatura ${idx + 1}`}
                                            className={`relative w-32 md:w-48 aspect-video flex-shrink-0 rounded-lg overflow-hidden border-2 cursor-pointer transition-colors outline-none
                                                ${isActive ? 'border-blueAccent ring-4 ring-blueAccent/20 z-10' : 'border-white/20 hover:border-white/50 opacity-70 hover:opacity-100'}
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
                                                    <video src={`${getAssetUrl(media, { isVideo: true })}#t=0.001`} className="w-full h-full object-cover bg-black/5" muted playsInline preload="metadata" />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                                                        <Play className="w-6 h-6 text-white fill-current opacity-80" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <Image
                                                    src={getAssetUrl(media, { width: 400, quality: 70 })}
                                                    alt={`Thumbnail ${idx}`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="200px"
                                                    unoptimized
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* DETAILS / TEXT CONTENT */}
                    <div className="w-full max-w-[1680px] mx-auto px-6 md:px-12 relative z-30 pb-24">
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
                            {(project.caseBody || project.detail?.description) ? (
                                <div>
                                    <CaseBodyRenderer content={(project.caseBody || project.detail?.description) as string} />
                                </div>
                            ) : null}
                            {/* Tags were conceptually removed from Modal primary view per audit */}

                            {/* External link / CTA */}
                            {project.detail?.externalUrl && (
                                <div className="pt-16 mt-12 flex justify-start">
                                    <a className="group inline-flex items-center gap-1.5 no-underline" href={project.detail.externalUrl} target="_blank" rel="noopener noreferrer" aria-label="Ver projeto completo externamente">
                                        <div className="h-16 px-8 flex items-center justify-center bg-bluePrimary rounded-full hover:bg-blueHover transition-all duration-fast ease-ghost shadow-[0_0_20px_rgba(0,72,255,0.3)] hover:shadow-[0_0_30px_rgba(0,72,255,0.5)]">
                                            <span className="text-white text-lg font-medium tracking-wide lowercase">ver projeto completo</span>
                                        </div>
                                        <div className="h-16 w-16 flex-shrink-0 flex items-center justify-center bg-bluePrimary rounded-full hover:bg-blueHover transition-all duration-fast ease-ghost shadow-[0_0_20px_rgba(0,72,255,0.3)] hover:shadow-[0_0_30px_rgba(0,72,255,0.5)]">
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
                    hasPrev={galleryMedia.length > 1}
                    hasNext={galleryMedia.length > 1}
                    onPrev={() => stepLightbox('prev')}
                    onNext={() => stepLightbox('next')}
                />
            </m.div>
        </AnimatePresence>
    );
};
