'use client';

import { FC } from 'react';
import Image from 'next/image';
import { isVideo } from '@/lib/utils';
import { DEFAULT_VIDEO_POSTER } from '@/lib/video';
import { applyImageFallback } from '@/lib/utils';
import { Play } from 'lucide-react';

interface MediaContainerProps {
    activeMedia: string;
    allMedia: string[];
    title: string;
    onSelect: (_media: string) => void;
    onMainClick: (_media: string) => void;
    isMotion?: boolean;
}

export const MediaContainer: FC<MediaContainerProps> = ({
    activeMedia,
    allMedia,
    title,
    onSelect,
    onMainClick,
    isMotion = false,
}) => {
    return (
        <div className="flex flex-col gap-6 w-full h-full">
            {/* Main Display Area */}
            <div className="relative w-full overflow-hidden rounded-2xl bg-white/5 shadow-2xl ring-1 ring-white/10">
                <div className="aspect-video w-full flex items-center justify-center bg-void/40">
                    {isVideo(activeMedia) ? (
                        <video
                            key={activeMedia}
                            src={activeMedia}
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster={DEFAULT_VIDEO_POSTER}
                            className={`w-full h-full ${isMotion ? 'object-contain' : 'object-cover'}`}
                        />
                    ) : (
                        <Image
                            key={activeMedia}
                            src={activeMedia}
                            alt={title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 1024px) 100vw, 80vw"
                            priority
                            onError={applyImageFallback}
                        />
                    )}
                </div>

                {/* Label for Motion & Video */}
                {isMotion && (
                    <div className="absolute top-4 left-4 z-20">
                        <span className="inline-flex items-center rounded-full bg-void/60 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90">
                            Motion & Video
                        </span>
                    </div>
                )}

                {/* Lightbox Trigger Overlay */}
                <button
                    type="button"
                    onClick={() => onMainClick(activeMedia)}
                    className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    aria-label="Ampliar mídia"
                />
            </div>

            {/* Thumbnail Gallery */}
            {allMedia.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                    {allMedia.map((media, index) => {
                        const isActive = activeMedia === media;
                        const isVid = isVideo(media);

                        return (
                            <button
                                key={`${media}-${index}`}
                                onClick={() => onSelect(media)}
                                className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ring-2 ${isActive ? 'ring-blueAccent scale-105 z-10' : 'ring-white/5 opacity-60 hover:opacity-100 hover:ring-white/20'
                                    }`}
                                aria-label={`Visualizar mídia ${index + 1}`}
                            >
                                {isVid ? (
                                    <div className="relative w-full h-full">
                                        <video
                                            src={media}
                                            className="w-full h-full object-cover"
                                            muted
                                            playsInline
                                            preload="metadata"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                            <Play className="w-5 h-5 text-white fill-current opacity-80" />
                                        </div>
                                    </div>
                                ) : (
                                    <Image
                                        src={media}
                                        alt={`${title} thumb ${index}`}
                                        fill
                                        className="object-cover"
                                        sizes="80px"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
