'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LandingPageBlock } from '@/types/landing-page';

// Eliminamos a interface e usamos tipagem inline para evitar confusão de nomes

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

export default function BlockRenderer({
  block,
  index: _index,
}: {
  block: LandingPageBlock;
  index: number;
}) {
  const type = block.type;
  const content = block.content;

  // Resolvers for media helper
  // If content.media is a relative path (not starting with http), prepend Supabase URL
  const resolveMedia = (path?: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/site-assets/${path}`;
  };

  const renderText = (text?: string, className = '') => {
    if (!text) return null;
    return (
      <div className={`prose prose-invert max-w-none ${className}`}>
        {text.split('\n').map((line, i) => (
          <p
            key={i}
            className="mb-4 text-lg md:text-xl text-slate-300 font-light leading-relaxed"
          >
            {line}
          </p>
        ))}
      </div>
    );
  };

  const renderImage = (src?: string, alt = 'Project Image') => {
    const url = resolveMedia(src);
    if (!url) return null;
    return (
      <div className="w-full relative rounded-2xl overflow-hidden bg-slate-900/50">
        <Image
          src={url}
          alt={alt}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, 80vw"
          className="w-full h-auto object-contain"
        />
      </div>
    );
  };

  const renderVideo = (src?: string, autoplay = true) => {
    const url = resolveMedia(src);
    if (!url) return null;
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
              {renderText(content.text)}
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="w-full max-w-[1920px] mx-auto px-4 md:px-0">
            {renderImage(content.media)}
          </div>
        );

      case 'video':
        return (
          <div className="w-full max-w-[1920px] mx-auto px-4 md:px-0">
            {renderVideo(content.media, false)}
          </div>
        );

      case 'video-autoplay':
        return (
          <div className="w-full max-w-[1920px] mx-auto px-4 md:px-0">
            {renderVideo(content.media, true)}
          </div>
        );

      case 'image-text':
        return (
          <div className="std-grid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>{renderImage(content.media)}</div>
              <div>{renderText(content.text)}</div>
            </div>
          </div>
        );

      case 'text-image':
        return (
          <div className="std-grid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                {renderText(content.text)}
              </div>
              <div className="order-1 md:order-2">
                {renderImage(content.media)}
              </div>
            </div>
          </div>
        );

      case 'image-image':
        return (
          <div className="std-grid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderImage(content.media, 'Image 1')}
              {renderImage(content.media2, 'Image 2')}
            </div>
          </div>
        );

      case 'image-video':
        return (
          <div className="std-grid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {renderImage(content.media)}
              {renderVideo(content.media2, true)}
            </div>
          </div>
        );

      case 'video-text':
        return (
          <div className="std-grid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {renderVideo(content.media, true)}
              {renderText(content.text)}
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
