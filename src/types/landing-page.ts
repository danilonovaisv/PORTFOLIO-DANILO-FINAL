export type BlockType =
  | 'text'
  | 'image'
  | 'video'
  | 'video-autoplay'
  | 'image-text'
  | 'text-image'
  | 'image-image'
  | 'image-video'
  | 'video-text';

export interface TextConfig {
  fontSize?: string; // e.g., 'text-lg', 'text-4xl', or custom values
  fontWeight?: string; // e.g., 'font-light', 'font-bold'
  color?: string; // hex or tailwind class
  textAlign?: 'left' | 'center' | 'right' | 'justify';
}

export interface LandingPageBlockContent {
  text?: string;
  text2?: string;
  textConfig?: TextConfig;
  textConfig2?: TextConfig;
  media?: string;
  media2?: string;
  mediaType?: 'image' | 'video' | 'youtube';
  mediaType2?: 'image' | 'video' | 'youtube';
  autoplay?: boolean;
}

export interface LandingPageBlock {
  id: string;
  type: BlockType;
  content: LandingPageBlockContent;
  // Transient fields for Admin UI
  file?: File | null;
  file2?: File | null;
  previewUrl?: string;
  previewUrl2?: string;
}
