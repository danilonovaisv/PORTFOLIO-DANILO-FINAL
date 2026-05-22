export type MediaFormat = 'square' | 'landscape';
export type MediaKind = 'image' | 'video';
export type MediaFit = 'cover' | 'contain';

export interface ProjectMedia {
  kind: MediaKind;
  src: string;
  format: MediaFormat;
  fit?: MediaFit;
  alt?: string;
}

export const MEDIA_FORMAT_CLASS = {
  square: 'aspect-square',
  landscape: 'aspect-video',
} as const satisfies Record<MediaFormat, string>;

export const MEDIA_FIT_CLASS = {
  cover: 'object-cover',
  contain: 'object-contain',
} as const satisfies Record<MediaFit, string>;

export function getDefaultMediaFit(kind: MediaKind): MediaFit {
  return kind === 'video' ? 'contain' : 'cover';
}
