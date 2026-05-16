'use client';

import React from 'react';
import { AlpaBlock } from './blocks/AlpaBlock';
import type { ZoomAsset } from '../types';

interface AlpaContentProps {
  blocks: any[];
  prefersReducedMotion: boolean;
  accentColor: string;
  revealInitial: any;
  revealVisible: any;
  openAsset: (
    _asset: ZoomAsset,
    _event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function AlpaContent({
  blocks,
  prefersReducedMotion,
  accentColor,
  revealInitial,
  revealVisible,
  openAsset,
}: AlpaContentProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="relative z-10 mx-auto max-w-[1680px] pb-24">
      {blocks.map((block, idx) => (
        <AlpaBlock
          key={block.id || idx}
          block={block}
          prefersReducedMotion={prefersReducedMotion}
          accentColor={accentColor}
          revealInitial={revealInitial}
          revealVisible={revealVisible}
          openAsset={openAsset}
        />
      ))}
    </div>
  );
}
