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

// Assets
export const ASSETS = {
  logoLight:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg',
  logoDark:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/logo.svg',
  videoManifesto:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
  heroAbstractModel: '/media/abstract_element.glb', // Fallback to procedural if not found
};

// Navigation
export const NAV_LINKS: NavLink[] = [
  { label: 'home', href: '#hero' },
  { label: 'sobre', href: '/sobre' },
  { label: 'portfolio showcase', href: '/portfolio' },
  { label: 'contato', href: '#contact' },
];

// Portfolio Categories
export const CATEGORIES: ProjectCategory[] = [
  {
    id: 'brand-campaigns',
    label: 'Brand & Campaigns',
    thumbnailUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
  },
  {
    id: 'videos-motions',
    label: 'Videos & Motions',
    thumbnailUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
  },
  {
    id: 'websites-webcampaigns-tech',
    label: 'Web Campaigns, Websites & Tech',
    thumbnailUrl:
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
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client1.svg',
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client2.svg',
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client3.svg',
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client4.svg',
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client5.svg',
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client6.svg',
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client7.svg',
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client8.svg',
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client9.svg',
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client10.svg',
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client11.svg',
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client12.svg',
];

export const SOCIALS = [
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/danilonovais',
    icon: <Linkedin size={20} />,
  },
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
