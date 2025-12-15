export type MosaicItem = {
  id: string;
  imageSrc?: string;
  gradient: string;
  accent?: string;
  title: string;
  subtitle: string;
};

export type MosaicRow = {
  id: string;
  columns: 1 | 2 | 3;
  items: MosaicItem[];
};
