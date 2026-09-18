export type BlockType =
  | 'text'
  | 'image'
  | 'video'
  | 'video-autoplay'
  | 'html-video'
  | 'image-text'
  | 'text-image'
  | 'image-image'
  | 'image-video'
  | 'video-text'
  | 'quote-band'
  // Composições polimórficas dinâmicas (mídias livres: image | video | html)
  | 'media-1x'   // 1 bloco de mídia livre (fullwidth)
  | 'media-2x'   // 2 blocos de mídia lado a lado (tipo configurável por slot)
  | 'media-3x';  // 3 blocos de mídia em linha (tipo configurável por slot)

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
  media3?: string;
  alt?: string;
  alt2?: string;
  alt3?: string;
  poster?: string;
  order?: number;
  poster2?: string;
  poster3?: string;
  mediaType?: 'image' | 'video' | 'youtube' | 'html';
  mediaType2?: 'image' | 'video' | 'youtube' | 'html';
  mediaType3?: 'image' | 'video' | 'youtube' | 'html';
  bandColor?: string;
  html?: string;
  html2?: string;
  html3?: string;
  [key: string]: any;
}

export interface LandingPageBlock {
  id: string;
  type: BlockType;
  content: LandingPageBlockContent;
  // Transient fields for Admin UI
  file?: File | null;
  file2?: File | null;
  file3?: File | null;
  previewUrl?: string;
  previewUrl2?: string;
  previewUrl3?: string;
  order?: number;
}
