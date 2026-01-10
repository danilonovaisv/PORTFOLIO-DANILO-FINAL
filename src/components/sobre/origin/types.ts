export type OriginBlock = {
  type: 'block';
  title: string;
  text: string;
  description: string;
  highlight?: string;
  src: string;
  alt: string;
  aspectRatio?: string;
  preserveRatio?: boolean;
};

export type OriginMedia = {
  src: string;
  alt: string;
  aspectRatio?: string;
  preserveRatio?: boolean;
  type?: 'image' | 'video';
};
