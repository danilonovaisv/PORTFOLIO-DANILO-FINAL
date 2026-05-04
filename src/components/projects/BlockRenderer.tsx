'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LandingPageBlock } from '@/types/landing-page';
import { ResponsiveCaptionTrack } from '@/components/ui/ResponsiveCaptionTrack';
import { cn, sanitizeTailwindValue, supabaseLoader } from '@/lib/utils';
import { DEFAULT_CAPTIONS, DEFAULT_VIDEO_POSTER } from '@/lib/video';
import { buildSupabaseStorageUrl } from '@/lib/supabase/urls';
import { YouTubePlayer } from '@/components/ui/YouTubePlayer';
import { GhostMarkdown } from '@/components/ui/GhostMarkdown';
import { GHOST_EASE } from '@/config/motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: GHOST_EASE,
    },
  },
};

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

  const resolveMedia = (path?: string): string => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return buildSupabaseStorageUrl('site-assets', path) ?? path;
  };

  const getYouTubeId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

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

    const youtubeId = getYouTubeId(src);
    const actualType = youtubeId
      ? 'youtube'
      : type || (src.match(/\.(mp4|webm|ogg)$/i) ? 'video' : 'image');

    if (actualType === 'youtube' && youtubeId) {
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

    if (actualType === 'video') {
      const url = resolveMedia(src);
      return (
        <div className="w-full relative rounded-2xl overflow-hidden bg-slate-900/50 border border-white/5">
          <video
            src={url}
            className="w-full h-auto"
            autoPlay={autoplay}
            muted={autoplay}
            loop={autoplay}
            controls={!autoplay}
            playsInline
            poster={DEFAULT_VIDEO_POSTER}
          >
            <ResponsiveCaptionTrack src={DEFAULT_CAPTIONS} />
          </video>
        </div>
      );
    }

    // Default to image
    const url = resolveMedia(src);
    return (
      <div className="w-full relative rounded-2xl overflow-hidden bg-slate-900/50">
        <Image
          loader={supabaseLoader}
          src={url}
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
          <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-0">
            {renderMedia(content.media, 'image')}
          </div>
        );

      case 'video':
        return (
          <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-0">
            {renderMedia(content.media, 'video', false)}
          </div>
        );

      case 'video-autoplay':
        return (
          <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-0">
            {renderMedia(content.media, 'video', true)}
          </div>
        );

      case 'image-text':
        return (
          <div className="std-grid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>{renderMedia(content.media, 'image')}</div>
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
                {renderMedia(content.media, 'image')}
              </div>
            </div>
          </div>
        );

      case 'image-image':
        return (
          <div className="std-grid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderMedia(content.media, 'image')}
              {renderMedia(content.media2, 'image')}
            </div>
          </div>
        );

      case 'image-video':
        return (
          <div className="std-grid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {renderMedia(content.media, 'image')}
              {renderMedia(content.media2, 'video', true)}
            </div>
          </div>
        );

      case 'video-text':
        return (
          <div className="std-grid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {renderMedia(content.media, 'video', true)}
              {renderText(content.text, content.textConfig)}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.section
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={fadeInUp}
    >
      {renderContent()}
    </motion.section>
  );
}
