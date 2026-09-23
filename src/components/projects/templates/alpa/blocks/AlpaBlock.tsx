'use client';

import React from 'react';
import type { ZoomAsset } from '../../types';
import { HTMLVideoBlock } from '@/components/ui/HTMLVideoBlock';

import { m } from 'motion/react';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

// Specialized Blocks
import { AlpaBlockTitle } from './AlpaBlockTitle';
import { AlpaBlockTextFull } from './AlpaBlockTextFull';
import { AlpaBlockImageFull } from './AlpaBlockImageFull';
import { AlpaBlockVideoFull } from './AlpaBlockVideoFull';
import { AlpaBlockGrid2Col } from './AlpaBlockGrid2Col';
import { AlpaBlockMediaText } from './AlpaBlockMediaText';
import { AlpaBlockSpacer } from './AlpaBlockSpacer';

interface AlpaBlockProps {
  block: any;
  prefersReducedMotion: boolean;
  accentColor: string;
  revealInitial: any;
  revealVisible: any;
  openAsset: (
    _asset: ZoomAsset,
    _event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

/**
 * AlpaBlock Dispatcher
 * Routes block data to specialized Ghost-compliant components.
 */
export function AlpaBlock({
  block,
  accentColor,
  revealInitial,
  revealVisible,
  openAsset,
}: AlpaBlockProps) {
  // Support both legacy and LandingPageBlock structure from Admin
  const type = block.type;
  const content = block.content || {};

  switch (type) {
    case 'section-title':
      return (
        <AlpaBlockTitle
          text={block.text || content.text}
          revealInitial={revealInitial}
          revealVisible={revealVisible}
        />
      );

    case 'text':
    case 'text-full':
      return (
        <AlpaBlockTextFull
          title={block.title}
          content={content.text || block.content}
          accentColor={accentColor}
          revealInitial={revealInitial}
          revealVisible={revealVisible}
        />
      );

    case 'image':
    case 'image-full':
      return (
        <AlpaBlockImageFull
          src={content.media || block.src}
          alt={content.alt || block.alt}
          caption={content.text || block.caption}
          revealInitial={revealInitial}
          revealVisible={revealVisible}
          openAsset={openAsset}
        />
      );

    case 'video':
    case 'video-autoplay':
    case 'video-full':
      return (
        <AlpaBlockVideoFull
          src={content.media || block.src}
          poster={content.poster || block.poster}
          revealInitial={revealInitial}
          revealVisible={revealVisible}
        />
      );

    case 'html-video':
      return (
        <m.div
          initial={revealInitial}
          whileInView={revealVisible}
          viewport={{ once: true, margin: '-10%' }}
          transition={{
            duration: MOTION_TOKENS.duration.normal,
            ease: GHOST_EASE,
          }}
          className="w-full mb-12 md:mb-20 px-4 md:px-0"
        >
          <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-none bg-transparent">
            <HTMLVideoBlock
              preserveVideoFrame
              html={content.html || block.html}
              media={content.media || block.src}
              title={content.text || block.title || 'HTML Video Preview'}
              frameless
              className="w-full h-full"
            />
          </div>
        </m.div>
      );

    case 'image-image':
    case 'image-video':
    case 'grid-2-col': {
      const columns = block.columns || [
        {
          type: content.mediaType || 'image',
          src: content.media,
          alt: content.alt,
        },
        {
          type: content.mediaType2 || 'image',
          src: content.media2,
          alt: content.alt2,
        },
      ];
      return (
        <AlpaBlockGrid2Col
          columns={columns}
          revealInitial={revealInitial}
          revealVisible={revealVisible}
          openAsset={openAsset}
        />
      );
    }

    case 'image-text':
    case 'video-text':
    case 'text-image':
    case 'text-video':
      return (
        <AlpaBlockMediaText
          media={content.media}
          mediaType={content.mediaType}
          text={content.text}
          layout={type.startsWith('text') ? 'text-media' : 'media-text'}
          alt={content.alt}
          poster={content.poster}
          revealInitial={revealInitial}
          revealVisible={revealVisible}
          openAsset={openAsset}
        />
      );

    case 'spacer':
      return <AlpaBlockSpacer height={block.height || content.height} />;

    default:
      console.warn(`[AlpaBlock] Unsupported block type: ${type}`);
      return null;
  }
}
