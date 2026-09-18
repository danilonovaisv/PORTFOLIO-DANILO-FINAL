import {
  Image as ImageIcon,
  Video,
  Layout,
  MessageSquare,
  Columns,
  Code,
} from 'lucide-react';
import type { BlockType, LandingPageBlock } from '@/types/landing-page';

export const BASIC_PRESETS = [
  { type: 'text' as BlockType, label: 'Text', icon: MessageSquare },
  { type: 'image' as BlockType, label: 'Full Image', icon: ImageIcon },
  { type: 'video' as BlockType, label: 'Full Video', icon: Video },
  { type: 'video-autoplay' as BlockType, label: 'Autoplay Video', icon: Video },
  { type: 'html-video' as BlockType, label: 'HTML Video', icon: Code },
];

/**
 * System_Compositions — Blocos de múltipla mídia.
 *
 * Os novos tipos media-1x / media-2x / media-3x são polimórficos:
 * cada slot aceita image | video | html de forma independente,
 * configurável no BlockEditorV3 por slot.
 *
 * Os tipos legados abaixo são mantidos para compatibilidade retroativa
 * com landing pages existentes.
 */
export const COMPOSITION_PRESETS = [
  // --- Novos: livres por quantidade de blocos ---
  { type: 'media-1x' as BlockType, label: '1× Mídia Livre', icon: Layout },
  { type: 'media-2x' as BlockType, label: '2× Mídias Livres', icon: Columns },
  { type: 'media-3x' as BlockType, label: '3× Mídias Livres', icon: Columns },
  // --- Legados (mantidos) ---
  { type: 'image-text' as BlockType, label: 'Image & Text', icon: Columns },
  { type: 'text-image' as BlockType, label: 'Text & Image', icon: Columns },
  { type: 'video-text' as BlockType, label: 'Video & Text', icon: Columns },
  { type: 'image-image' as BlockType, label: 'Image & Image', icon: Layout },
  { type: 'image-video' as BlockType, label: 'Image & Video', icon: Layout },
  {
    type: 'quote-band' as BlockType,
    label: 'Quote Band',
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
    'html-video',
    'image-text',
    'text-image',
    'video-text',
    'image-image',
    'image-video',
    'media-1x',
    'media-2x',
    'media-3x',
  ].includes(type);

  const needsMedia2 = [
    'image-image',
    'image-video',
    'media-2x',
    'media-3x',
  ].includes(type);
  const needsMedia3 = ['media-3x'].includes(type);

  const inferMediaType = (
    blockType: BlockType,
    secondary = false
  ): 'image' | 'video' | 'html' | undefined => {
    if (!secondary) {
      if (blockType === 'html-video') return 'html';
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
      // Polimórficos: padrão image (o editor permite alterar por slot)
      if (
        blockType === 'media-1x' ||
        blockType === 'media-2x' ||
        blockType === 'media-3x'
      )
        return 'image';
    } else {
      if (blockType === 'image-video') return 'video';
      if (blockType === 'image-image') return 'image';
      // Polimórficos slot 2: padrão image
      if (blockType === 'media-2x' || blockType === 'media-3x') return 'image';
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
      ...(needsMedia3 && {
        media3: '',
        alt3: '',
        mediaType3: 'image',
      }),
      ...(type === 'quote-band' && { bandColor: '#0048ff' }),
      ...(type === 'html-video' && {
        html: '',
      }),
    },
    order: currentIndex,
  };
}
