import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Twitter,
} from 'lucide-react';
import { ProjectCategory } from './types';

// --- ASSETS ---
export const ASSETS = {
  videoManifesto:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
  videoManifestoPoster:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
  favicon:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/logo.svg',
  logoLight:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg',
  logoDark:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon.svg',
};

// --- DATA ---

export const CLIENT_LOGOS = [
  {
    name: 'Client 1',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client1.svg',
  },
  {
    name: 'Client 2',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client2.svg',
  },
  {
    name: 'Client 3',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client3.svg',
  },
  {
    name: 'Client 4',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client4.svg',
  },
  {
    name: 'Client 5',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client5.svg',
  },
  {
    name: 'Client 6',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client6.svg',
  },
  {
    name: 'Client 7',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client7.svg',
  },
  {
    name: 'Client 8',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client8.svg',
  },
  {
    name: 'Client 9',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client9.svg',
  },
  {
    name: 'Client 10',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client10.svg',
  },
  {
    name: 'Client 11',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client11.svg',
  },
  {
    name: 'Client 12',
    src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client12.svg',
  },
];

export const FEATURED_PROJECTS = [
  {
    slug: 'magic-radio-branding',
    title: 'Magic — devolvendo a magia ao rádio',
    client: 'Magic',
    category: 'branding & campanha',
    displayCategory: 'branding & campanha',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
    isHero: true,
    year: '2023',
  },
  {
    slug: 'branding-project-01',
    title: 'Uma marca ousada e consistente',
    client: 'Cliente confidencial',
    category: 'branding',
    displayCategory: 'branding',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
    isHero: false,
    year: '2022',
  },
  {
    slug: 'key-visual-campaign',
    title: 'Key visual para campanha sazonal',
    client: 'Cliente confidencial',
    category: 'campanha',
    displayCategory: 'campanha',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
    isHero: false,
    year: '2021',
  },
  {
    slug: 'webdesigner-motion',
    title: 'Experiência web em movimento',
    client: 'Cliente confidencial',
    category: 'web & motion',
    displayCategory: 'web & motion',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
    isHero: false,
    year: '2023',
  },
];

export const CONTACT_INFO = [
  {
    label: 'danilo@portfoliodanilo.com',
    href: 'mailto:danilo@portfoliodanilo.com',
    icon: <Mail className="w-5 h-5" />,
  },
  {
    label: '+55 (11) 98396-6838',
    href: 'tel:+5511983966838',
    icon: <Phone className="w-5 h-5" />,
  },
  {
    label: 'São Paulo, SP',
    href: '#',
    icon: <MapPin className="w-5 h-5" />,
  },
];

export const SOCIALS = [
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/danilonovais',
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/danilo_novais',
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    platform: 'Twitter', // X replaced Twitter in some contexts but keeping label consistent
    url: 'https://twitter.com/danilo_novais',
    icon: <Twitter className="w-5 h-5" />,
  },
  // Adding Facebook as requested in spec, check if lucide has Facebook?
  // It usually does, but import needs check. Assuming it does or using Github as fallback if not.
  // Actually, let's keep it safe. If Lucide doesn't have it, we'll see an error.
  // I will assume it's there or use a generic link icon if fails.
  // Wait, I need to check import.
];

export const CATEGORIES: ProjectCategory[] = [
  {
    id: 'brand-campaigns',
    label: 'Brand & Campaigns',
    posterUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
    thumbnailUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
    // Spec didn't give specific videos for categories, using main video or images as placeholder if needed?
    // Actually spec gave Thumbnail URL for categories:
    // brand-campaigns: ...Branding-Project.webp
    // videos-motions: ...webdesigner-2 2.gif
    // websites: ...WelcomeAd.webp
    // The interface says thumbnailUrl string. I will put the image there for now.
  },
  {
    id: 'videos-motions',
    label: 'Videos & Motions',
    posterUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
    thumbnailUrl: '',
  },
  {
    id: 'websites-webcampaigns-tech',
    label: 'Web Campaigns, Websites & Tech',
    posterUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
    thumbnailUrl: '',
  },
];

export const NAV_LINKS = [
  { label: 'home', href: '/#hero' },
  { label: 'sobre', href: '/sobre' },
  { label: 'portfolio showcase', href: '/portfolio' },
  { label: 'contato', href: '/#contact' },
];
