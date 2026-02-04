'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LandingPageBlock } from '@/types/landing-page';
import ReactMarkdown from 'react-markdown';
import { sanitizeTailwindValue } from '@/lib/utils';
import { DEFAULT_CAPTIONS, DEFAULT_VIDEO_POSTER } from '@/lib/video';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

interface BlockRendererProps {
  block: LandingPageBlock;
  index: number;
}

/** Configuration for text styling in blocks */
interface TextConfig {
  fontSize?: string;
  fontWeight?: string;
  textAlign?: string;
  color?: string;
}

export default function BlockRenderer({
  block,
  index: _index,
}: BlockRendererProps) {
  const { type, content } = block;

  const resolveMedia = (path?: string): string => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/site-assets/${path}`;
  };

  const getYouTubeId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const renderText = (text?: string, config?: TextConfig, className = '') => {
    if (!text) return null;

    // Sanitiza HTML embutido removendo atributos style/class perigosos que geram style como string (React error #62)
    const sanitizedText = text
      .replace(/\sstyle\s*=\s*(?:"[^"]*"|'[^']*')/gi, '')
      .replace(/\sclass(Name)?\s*=\s*(?:"[^"]*"|'[^']*')/gi, '');

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

        <div
          className={`prose prose-invert max-w-none ${className} ${dynamicColorClass}`}
        >
          <ReactMarkdown
            skipHtml
            components={{
              p: ({ children }) => <p className={textClasses}>{children}</p>,
              h1: ({ children }) => (
                <h2
                  className={`${config?.textAlign || ''} font-bold text-4xl md:text-6xl mb-8`}
                >
                  {children}
                </h2>
              ),
              h2: ({ children }) => (
                <h3
                  className={`${config?.textAlign || ''} font-bold text-3xl md:text-5xl mb-6`}
                >
                  {children}
                </h3>
              ),
              h3: ({ children }) => (
                <h4
                  className={`${config?.textAlign || ''} font-bold text-2xl md:text-4xl mb-4`}
                >
                  {children}
                </h4>
              ),
              ul: ({ children }) => (
                <ul
                  className={`${textClasses} list-disc pl-6 mb-4 space-y-2 text-left`}
                >
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol
                  className={`${textClasses} list-decimal pl-6 mb-4 space-y-2 text-left`}
                >
                  {children}
                </ol>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-white">{children}</strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
            }}
          >
            {sanitizedText}
          </ReactMarkdown>
        </div>
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
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&loop=1&playlist=${youtubeId}&controls=1&modestbranding=1&rel=0`}
            title="YouTube video player"
            className="absolute inset-0 w-full h-full"
            width={1280}
            height={720}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
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
            muted={false} // Autoplay with sound per user request
            loop={autoplay}
            controls={true}
            playsInline
            poster={DEFAULT_VIDEO_POSTER}
          >
            <track
              kind="captions"
              src={DEFAULT_CAPTIONS}
              srcLang="pt-BR"
              label="Português"
              default
            />
          </video>
        </div>
      );
    }

    // Default to image
    const url = resolveMedia(src);
    return (
      <div className="w-full relative rounded-2xl overflow-hidden bg-slate-900/50">
        <Image
          src={url}
          alt="Project media"
          width={1600}
          height={900}
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
