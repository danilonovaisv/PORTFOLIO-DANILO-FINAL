import { NavLink, Project, ProjectCategory } from './types';
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Phone,
  Mail,
  Globe,
} from 'lucide-react';
import React from 'react';
import { MAIN_ROUTES } from '../config/navigation';

// Assets
export const ASSETS = {
  logoLight:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg',
  logoDark:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/logo.svg',
  videoManifesto:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
  heroAbstractModel: '/media/torus_dan.glb',
  heroManifestThumb:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/videos-motions-thumb.webp',
  manifestoPoster:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/videos-motions-thumb.webp',
};

// Navigation
export const NAV_LINKS: NavLink[] = MAIN_ROUTES.map((route) => {
  const anchor = route.anchor ?? '';
  return {
    label: route.label,
    href: anchor ? `${route.path}${anchor}` : route.path,
  };
});

export type ProjectViewport = 'desktop' | 'tablet' | 'mobile';

export interface DynamicProjectShape {
  borderRadius: [number, number, number, number];
  aspectRatio: Record<ProjectViewport, number>;
  gridOffset?: {
    columnSpan?: number;
    rowSpan?: number;
  };
  rotation: number;
}

export interface ProjectShowcaseCard {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  tags: string[];
  category: string;
  overlayGradient: string;
  accentColor: string;
  shape: DynamicProjectShape;
  liveUrl?: string;
  overlayText?: string[];
}

export const PROJECT_SHOWCASE_CARDS: ProjectShowcaseCard[] = [
  {
    id: 'magic-radio',
    title: 'Bringing the Magic Back to Radio',
    subtitle: 'Magic',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
    tags: ['Branding'],
    category: 'branding',
    overlayGradient:
      'linear-gradient(135deg, rgba(0,87,255,0.75) 0%, rgba(0,0,0,0.05) 100%)',
    accentColor: '#0057FF',
    shape: {
      borderRadius: [32, 48, 18, 24],
      aspectRatio: { desktop: 2, tablet: 1.4, mobile: 0.8 },
      gridOffset: { columnSpan: 2, rowSpan: 1 },
      rotation: -1.5,
    },
  },
  {
    id: 'fearless-sportswear',
    title: 'Taking Sportswear to the Skies',
    subtitle: 'Fearless',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
    tags: ['campaign'],
    category: 'campaign',
    overlayGradient:
      'linear-gradient(145deg, rgba(239,68,68,0.7) 0%, rgba(249,115,22,0.35) 100%)',
    accentColor: '#f97316',
    shape: {
      borderRadius: [48, 24, 32, 16],
      aspectRatio: { desktop: 1.6, tablet: 1.1, mobile: 0.9 },
      gridOffset: { columnSpan: 1, rowSpan: 2 },
      rotation: 2,
    },
    overlayText: ['Fearless.', 'Unmatched.'],
  },
  {
    id: 'epic-look',
    title: 'Refreshing a Telecom Challenger',
    subtitle: 'Epic',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
    tags: ['branding'],
    category: 'branding',
    overlayGradient:
      'linear-gradient(215deg, rgba(16,185,129,0.6) 0%, rgba(14,165,233,0.35) 100%)',
    accentColor: '#10b981',
    shape: {
      borderRadius: [26, 38, 48, 22],
      aspectRatio: { desktop: 1.8, tablet: 1.3, mobile: 0.8 },
      gridOffset: { columnSpan: 1, rowSpan: 1 },
      rotation: -2.2,
    },
  },
  {
    id: 'fff-legal',
    title: 'Designing Trust — The FFF Legal Identity',
    subtitle: 'FFF Legal',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
    tags: ['branding'],
    category: 'branding',
    overlayGradient:
      'linear-gradient(120deg, rgba(79,70,229,0.65) 0%, rgba(14,165,233,0.4) 100%)',
    accentColor: '#4f46e5',
    shape: {
      borderRadius: [34, 16, 32, 48],
      aspectRatio: { desktop: 1.4, tablet: 1, mobile: 0.7 },
      gridOffset: { columnSpan: 2, rowSpan: 1 },
      rotation: 1,
    },
  },
];

// Portfolio Categories
export const CATEGORIES: ProjectCategory[] = [
  {
    id: 'brand-campaigns',
    label: 'Brand & Campaigns',
    thumbnailUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/brand-video.mp4',
    posterUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
  },
  {
    id: 'videos-motions',
    label: 'Videos & Motions',
    thumbnailUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/motion-video.mp4',
    posterUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
  },
  {
    id: 'websites-webcampaigns-tech',
    label: 'Web Campaigns, Websites & Tech',
    thumbnailUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/web-video.mp4',
    posterUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
  },
];

// Featured Projects
export const FEATURED_PROJECTS: Project[] = [
  {
    slug: 'magic-radio-branding',
    title: 'Magic — devolvendo a magia ao rádio',
    category: 'branding',
    displayCategory: 'branding & campanha',
    client: 'Magic',
    year: '2023',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
  },
  {
    slug: 'branding-project-01',
    title: 'Uma marca ousada e consistente',
    category: 'branding',
    displayCategory: 'branding',
    client: 'Cliente confidencial',
    year: '2022',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
  },
  {
    slug: 'key-visual-campaign',
    title: 'Key visual para campanha sazonal',
    category: 'campaign',
    displayCategory: 'campanha',
    client: 'Cliente confidencial',
    year: '2021',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
    isHero: true,
  },
  {
    slug: 'webdesigner-motion',
    title: 'Experiência web em movimento',
    category: 'web',
    displayCategory: 'web & motion',
    client: 'Cliente confidencial',
    year: '2023',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
  },
];

// Client Logos (Using placeholders for simplicity as per request, but mapping to provided URLs)
export const CLIENT_LOGOS = [
  {
    name: 'Brand Awareness Partner 1',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client1.svg',
  },
  {
    name: 'Brand Awareness Partner 2',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client2.svg',
  },
  {
    name: 'Brand Awareness Partner 3',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client3.svg',
  },
  {
    name: 'Brand Awareness Partner 4',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client4.svg',
  },
  {
    name: 'Brand Awareness Partner 5',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client5.svg',
  },
  {
    name: 'Brand Awareness Partner 6',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client6.svg',
  },
  {
    name: 'Brand Awareness Partner 7',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client7.svg',
  },
  {
    name: 'Brand Awareness Partner 8',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client8.svg',
  },
  {
    name: 'Brand Awareness Partner 9',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client9.svg',
  },
  {
    name: 'Brand Awareness Partner 10',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client10.svg',
  },
  {
    name: 'Brand Awareness Partner 11',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client11.svg',
  },
  {
    name: 'Brand Awareness Partner 12',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client12.svg',
  },
];

export const SOCIALS = [
  {
    platform: 'Instagram',
    url: 'https://instagram.com/danilo_novais',
    icon: <Instagram size={20} />,
  },
  {
    platform: 'Facebook',
    url: 'https://facebook.com/danilonovaisvilela',
    icon: <Facebook size={20} />,
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/danilonovais',
    icon: <Linkedin size={20} />,
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com/danilo_novais',
    icon: <Twitter size={20} />,
  },
];

export const CONTACT_INFO = [
  {
    label: '+55 11 98396 6838',
    href: 'tel:+5511983966838',
    icon: <Phone size={20} />,
  },
  {
    label: 'dannovaisv@gmail.com',
    href: 'mailto:dannovaisv@gmail.com',
    icon: <Mail size={20} />,
  },
  {
    label: 'danilo@portfoliodanilo.com',
    href: 'mailto:danilo@portfoliodanilo.com',
    icon: <Mail size={20} />,
  },
  {
    label: 'portfoliodanilo.com',
    href: 'https://portfoliodanilo.com',
    icon: <Globe size={20} />,
  },
];
