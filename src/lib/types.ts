import { ReactNode } from 'react';

export interface ProjectCategory {
  id: string;
  label: string;
  thumbnailUrl: string;
  posterUrl: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Social {
  platform: string;
  url: string;
  icon: ReactNode;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  displayCategory: string;
  imageUrl: string;
  isHero: boolean;
  year?: string;
}

export interface Asset {
  videoManifesto: string;
  favicon: string;
  logoLight: string;
  logoDark: string;
}
