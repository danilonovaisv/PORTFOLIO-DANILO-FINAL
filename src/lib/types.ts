import React from 'react';

export interface NavLink {
  label: string;
  href: string;
}

export interface ProjectCategory {
  id: string;
  label: string;
  thumbnailUrl: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string; // Used for filtering
  displayCategory?: string; // Used for UI tags
  client?: string;
  year?: string | number;
  imageUrl: string;
  isHero?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: React.ReactNode;
}
