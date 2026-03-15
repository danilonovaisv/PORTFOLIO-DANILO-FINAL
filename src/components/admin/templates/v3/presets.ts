import {
  Image as ImageIcon,
  Video,
  Layout,
  MessageSquare,
  Columns,
} from 'lucide-react';
import type { BlockType, LandingPageBlock } from '@/types/landing-page';

export const BASIC_PRESETS = [
  { type: 'text' as BlockType, label: 'Texto', icon: MessageSquare },
  { type: 'image' as BlockType, label: 'Imagem Full', icon: ImageIcon },
  { type: 'video' as BlockType, label: 'Vídeo Full', icon: Video },
  { type: 'video-autoplay' as BlockType, label: 'Vídeo Autoplay', icon: Video },
];

export const COMPOSITION_PRESETS = [
  { type: 'image-text' as BlockType, label: 'Imagem & Texto', icon: Columns },
  { type: 'text-image' as BlockType, label: 'Texto & Imagem', icon: Columns },
  { type: 'video-text' as BlockType, label: 'Vídeo & Texto', icon: Columns },
  { type: 'image-image' as BlockType, label: 'Imagem & Imagem', icon: Layout },
  { type: 'image-video' as BlockType, label: 'Imagem & Vídeo', icon: Layout },
  {
    type: 'quote-band' as BlockType,
    label: 'Faixa de Citação',
    icon: MessageSquare,
  },
];

export function createBlockDraft(
  type: BlockType,
  currentIndex: number
): LandingPageBlock {
  const needsMedia = [
    'image',
    'video',
    'video-autoplay',
    'image-text',
    'text-image',
    'video-text',
    'image-image',
    'image-video',
  ].includes(type);

  const needsMedia2 = ['image-image', 'image-video'].includes(type);

  const inferMediaType = (
    blockType: BlockType,
    secondary = false
  ): 'image' | 'video' | undefined => {
    if (!secondary) {
      if (
        blockType === 'video' ||
        blockType === 'video-autoplay' ||
        blockType === 'video-text'
      )
        return 'video';
      if (
        blockType === 'image' ||
        blockType === 'image-text' ||
        blockType === 'text-image' ||
        blockType === 'image-image' ||
        blockType === 'image-video'
      )
        return 'image';
    } else {
      if (blockType === 'image-video') return 'video';
      if (blockType === 'image-image') return 'image';
    }
    return undefined;
  };

  return {
    id: `block-${Date.now()}-${currentIndex}`,
    type,
    content: {
      text: '',
      text2: '',
      ...(needsMedia && {
        media: '',
        alt: '',
        mediaType: inferMediaType(type),
      }),
      ...(needsMedia2 && {
        media2: '',
        alt2: '',
        mediaType2: inferMediaType(type, true),
      }),
      ...(type === 'quote-band' && { bandColor: '#0048ff' }),
    },
    order: currentIndex,
  };
}
