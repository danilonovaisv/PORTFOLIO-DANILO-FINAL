export type AssetKind = 'image' | 'video' | 'youtube';

export interface ZoomAsset {
  src: string;
  kind: AssetKind;
  alt: string;
  poster?: string;
  youtubeId?: string;
}

export interface IntroBodyBlock {
  type: 'text' | 'video_youtube';
  value: string;
  settings: { autoplay: boolean };
}
