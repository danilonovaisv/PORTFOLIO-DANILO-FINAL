import { ReactNode } from 'react';

export interface ProjectCategory {
  id: string;
  label: string;
  thumb: string;
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
  displayCategory?: string;
  img: string;
  isHero?: boolean;
  year: number;
}

export interface Asset {
  videoManifesto: string;
  favicon: string;
  logoLight: string;
  logoDark: string;
}
