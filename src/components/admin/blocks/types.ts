export type BlockType =
  | 'text'
  | 'image'
  | 'video'
  | 'image-text'
  | 'text-image'
  | 'image-image'
  | 'image-video'
  | 'video-text';

export interface LandingPageBlock {
  id: string;
  type: BlockType;
  content: {
    text?: string;
    text2?: string; // For blocks with multiple text areas
    media?: string; // URL or path
    media2?: string; // For blocks with multiple media
    mediaType?: 'image' | 'video' | 'youtube';
    mediaType2?: 'image' | 'video' | 'youtube';
    autoplay?: boolean; // For videos
  };
  file?: File | null; // Transient, for uploads
  file2?: File | null; // Transient
  previewUrl?: string; // Transient
  previewUrl2?: string; // Transient
}
