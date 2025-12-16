export type MosaicItem = {
  id: string;
  imageSrc?: string;
  gradient: string;
  accent?: string;
  title: string;
  subtitle: string;
  aspectRatio?: number; // width/height ratio (e.g., 16/10 = 1.6)
};

export type MosaicRow = {
  id: string;
  columns: 1 | 2 | 3;
  items: MosaicItem[];
};
