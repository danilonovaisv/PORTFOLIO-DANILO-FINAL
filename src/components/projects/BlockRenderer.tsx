'use client';

import React from 'react';
import Image from 'next/image';
import { m } from 'motion/react';
import { LandingPageBlock } from '@/types/landing-page';
import { ResponsiveCaptionTrack } from '@/components/ui/ResponsiveCaptionTrack';
import { sanitizeTailwindValue, supabaseLoader } from '@/lib/utils';
import { DEFAULT_CAPTIONS, DEFAULT_VIDEO_POSTER } from '@/lib/video';
import { YouTubePlayer } from '@/components/ui/YouTubePlayer';
import { GhostMarkdown } from '@/components/ui/GhostMarkdown';
import { ghostRise } from '@/config/motion';
import {
  extractYoutubeId,
  resolveLandingAsset,
} from '@/lib/media/asset-contract';

// fadeInUp is deprecated in favor of ghostRise for system consistency

interface BlockRendererProps {
  block: LandingPageBlock;
  index: number;
}

type TextConfig = LandingPageBlock['content']['textConfig'];

export default function BlockRenderer({
  block,
  index: _index,
}: BlockRendererProps) {
  const { type, content } = block;

  const renderAssetFallback = (label = 'Mídia indisponível') => (
    <div className="flex min-h-[220px] w-full items-center justify-center rounded-2xl border border-white/10 bg-slate-900/50 px-6 text-center text-sm text-white/60">
      {label}
    </div>
  );

  const renderText = (text?: string, config?: TextConfig, className = '') => {
    if (!text) return null;

    const textClasses = [
      config?.fontSize || 'text-lg md:text-xl',
      config?.fontWeight || 'font-light',
      config?.textAlign || '',
      config?.color && !config.color.startsWith('#')
        ? sanitizeTailwindValue(config.color)
        : '',
      'mb-4 leading-relaxed',
    ].join(' ');

    const hexColor =
      config?.color && config.color.startsWith('#') ? config.color : null;
    const dynamicColorClass = hexColor
      ? `md-text-${sanitizeTailwindValue(hexColor.replace(/[^a-zA-Z0-9]/g, ''))}`
      : '';

    return (
      <>
        {hexColor && (
          <style jsx global>{`
            .${dynamicColorClass} {
              color: ${hexColor};
            }
            .${dynamicColorClass} a {
              color: ${hexColor};
            }
          `}</style>
        )}

        <GhostMarkdown
          content={text}
          textConfig={config}
          className={`${className} ${dynamicColorClass}`}
          proseClassName={`max-w-none ${textClasses}`}
        />
      </>
    );
  };

  const renderMedia = (
    src?: string,
    type?: 'image' | 'video' | 'youtube',
    autoplay = true
  ) => {
    if (!src) return null;

    const resolved = resolveLandingAsset(src, type);
    if (!resolved.ok) return renderAssetFallback();

    const youtubeId =
      resolved.asset.provider === 'youtube'
        ? extractYoutubeId(resolved.asset.url)
        : null;

    if (youtubeId) {
      return (
        <div className="w-full relative rounded-2xl overflow-hidden bg-slate-900/50 border border-white/5 aspect-video">
          <YouTubePlayer
            videoId={youtubeId}
            autoplay={autoplay}
            hasNarration={true} // Add hasNarration to block content model if needed, default true
            className="absolute inset-0 w-full h-full"
          />
        </div>
      );
    }

    if (resolved.asset.type === 'video') {
      return (
        <div className="w-full relative rounded-2xl overflow-hidden bg-slate-900/50 border border-white/5">
          <video
            src={resolved.asset.url}
            className="w-full h-auto"
            autoPlay={autoplay}
            muted={autoplay}
            loop={autoplay}
            controls={!autoplay}
            playsInline
            preload={autoplay ? 'metadata' : 'none'}
            poster={DEFAULT_VIDEO_POSTER}
          >
            <ResponsiveCaptionTrack src={DEFAULT_CAPTIONS} />
          </video>
        </div>
      );
    }

    // Default to image
    return (
      <div className="w-full relative rounded-2xl overflow-hidden bg-slate-900/50">
        <Image
          loader={supabaseLoader}
          src={resolved.asset.url}
          alt={block.content.text || 'Mídia detalhada do projeto'}
          width={1600}
          height={900}
          quality={60}
          sizes="(max-width: 768px) 100vw, 80vw"
          className="w-full h-auto object-contain"
        />
      </div>
    );
  };

  // Content Switching
  const renderContent = () => {
    switch (type) {
      case 'text':
        return (
          <div className="std-grid">
            <div className="max-w-4xl mx-auto text-center">
              {renderText(content.text, content.textConfig)}
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="w-full max-w-[1680px] mx-auto px-4 md:px-0">
            {renderMedia(content.media, content.mediaType || 'image')}
          </div>
        );

      case 'video':
        return (
          <div className="w-full max-w-[1680px] mx-auto px-4 md:px-0">
            {renderMedia(content.media, content.mediaType || 'video', false)}
          </div>
        );

      case 'video-autoplay':
        return (
          <div className="w-full max-w-[1680px] mx-auto px-4 md:px-0">
            {renderMedia(content.media, content.mediaType || 'video', true)}
          </div>
        );

      case 'image-text':
        return (
          <div className="std-grid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                {renderMedia(content.media, content.mediaType || 'image')}
              </div>
              <div>{renderText(content.text, content.textConfig)}</div>
            </div>
          </div>
        );

      case 'text-image':
        return (
          <div className="std-grid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                {renderText(content.text, content.textConfig)}
              </div>
              <div className="order-1 md:order-2">
                {renderMedia(content.media, content.mediaType || 'image')}
              </div>
            </div>
          </div>
        );

      case 'image-image':
        return (
          <div className="std-grid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderMedia(content.media, content.mediaType || 'image')}
              {renderMedia(content.media2, content.mediaType2 || 'image')}
            </div>
          </div>
        );

      case 'image-video':
        return (
          <div className="std-grid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {renderMedia(content.media, content.mediaType || 'image')}
              {renderMedia(content.media2, content.mediaType2 || 'video', true)}
            </div>
          </div>
        );

      case 'video-text':
        return (
          <div className="std-grid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {renderMedia(content.media, content.mediaType || 'video', true)}
              {renderText(content.text, content.textConfig)}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <m.section
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={ghostRise}
    >
      {renderContent()}
    </m.section>
  );
}
