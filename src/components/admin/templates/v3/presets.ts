import {
  Image as ImageIcon,
  Video,
  Layout,
  MessageSquare,
  Columns,
} from 'lucide-react';
import type { BlockType, LandingPageBlock } from '@/types/landing-page';

export const BASIC_PRESETS = [
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
  return {
    id: `block-${Date.now()}-${currentIndex}`,
    type,
    content: {
      text: '',
      text2: '',
      bandColor: type === 'quote-band' ? '#0048ff' : undefined,
    },
    order: currentIndex,
  };
}
