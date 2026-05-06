'use client';

import React from 'react';
import type { ZoomAsset } from '../../types';

// Specialized Blocks
import { AlpaBlockTitle } from './AlpaBlockTitle';
import { AlpaBlockTextFull } from './AlpaBlockTextFull';
import { AlpaBlockImageFull } from './AlpaBlockImageFull';
import { AlpaBlockVideoFull } from './AlpaBlockVideoFull';
import { AlpaBlockGrid2Col } from './AlpaBlockGrid2Col';
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
  switch (block.type) {
    case 'section-title':
      return (
        <AlpaBlockTitle
          text={block.text}
          revealInitial={revealInitial}
          revealVisible={revealVisible}
        />
      );

    case 'text-full':
      return (
        <AlpaBlockTextFull
          title={block.title}
          content={block.content}
          accentColor={accentColor}
          revealInitial={revealInitial}
          revealVisible={revealVisible}
        />
      );

    case 'image-full':
      return (
        <AlpaBlockImageFull
          src={block.src}
          alt={block.alt}
          caption={block.caption}
          revealInitial={revealInitial}
          revealVisible={revealVisible}
          openAsset={openAsset}
        />
      );

    case 'video-full':
      return (
        <AlpaBlockVideoFull
          src={block.src}
          poster={block.poster}
          revealInitial={revealInitial}
          revealVisible={revealVisible}
        />
      );

    case 'grid-2-col':
      return (
        <AlpaBlockGrid2Col
          columns={block.columns}
          revealInitial={revealInitial}
          revealVisible={revealVisible}
          openAsset={openAsset}
        />
      );

    case 'spacer':
      return <AlpaBlockSpacer height={block.height} />;

    default:
      console.warn(`[AlpaBlock] Unsupported block type: ${block.type}`);
      return null;
  }
}
