import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Twitter,
  Facebook, // Adicionado conforme spec
} from 'lucide-react';
import { getGhostAssetUrl } from '@/utils/utils';

// Se não tiveres um ficheiro de tipos, podes definir aqui ou importar
// import { ProjectCategory } from './types';
export type ProjectCategory = {
  id: string;
  label: string;
  posterUrl: string;
  thumbnailUrl: string;
};

// --- 1. ASSETS GLOBAIS ---
export const ASSETS = {
  videoManifesto: getGhostAssetUrl('site-assets/home/home.manifesto_video.mp4'),
  favicon: getGhostAssetUrl('logo_site/logo.svg'),
  logoLight: getGhostAssetUrl('logo_site/faivcon-02.svg'),
  logoDark: getGhostAssetUrl('logo_site/faivcon.svg'),
};

// --- 2. CONTEÚDO DA HOME (TEXTOS) ---
export const HOME_CONTENT = {
  hero: {
    tag: '[BRAND AWARENESS]',
    // O componente HeroCopy espera um array para quebrar a linha visualmente
    title: ['Design,não é', 'só estética.'],
    subtitle: '[É intenção, é estratégia, é experiência.]',
    cta: 'get to know me better',
  },
};

// --- 3. DADOS DE NAVEGAÇÃO ---
export const NAV_LINKS = [
  { label: 'home', href: '/#hero' },
  { label: 'sobre', href: '/sobre' },
  { label: 'portfolio showcase', href: '/portfolio' },
  { label: 'contato', href: '/#contact' },
];

// --- 4. PROJETOS EM DESTAQUE ---
export const FEATURED_PROJECTS = [
  {
    slug: 'magic-radio-branding',
    title: 'Magic — devolvendo a magia ao rádio',
    client: 'Magic',
    category: 'branding & campanha',
    displayCategory: 'branding & campanha',
    imageUrl: getGhostAssetUrl('project-images/Brand-Identity%20copy.webp'),
    isHero: true,
    year: '2023',
  },
  {
    slug: 'branding-project-01',
    title: 'Uma marca ousada e consistente',
    client: 'Cliente confidencial',
    category: 'branding',
    displayCategory: 'branding',
    imageUrl: getGhostAssetUrl('project-images/Branding-Project.webp'),
    isHero: false,
    year: '2022',
  },
  {
    slug: 'key-visual-campaign',
    title: 'Key visual para campanha sazonal',
    client: 'Cliente confidencial',
    category: 'campanha',
    displayCategory: 'campanha',
    imageUrl: getGhostAssetUrl('project-images/Key-Visual.webp'),
    isHero: false,
    year: '2021',
  },
  {
    slug: 'webdesigner-motion',
    title: 'Experiência web em movimento',
    client: 'Cliente confidencial',
    category: 'web & motion',
    displayCategory: 'web & motion',
    imageUrl: getGhostAssetUrl('project-images/webdesigner-2%202.gif'),
    isHero: false,
    year: '2023',
  },
];

// --- 5. CATEGORIAS (PORTFOLIO SHOWCASE) ---
export const CATEGORIES: ProjectCategory[] = [
  {
    id: 'brand-campaigns',
    label: 'Brand & Campaigns',
    posterUrl: getGhostAssetUrl('project-images/Branding-Project.webp'),
    thumbnailUrl: '',
  },
  {
    id: 'videos-motions',
    label: 'Videos & Motions',
    posterUrl: getGhostAssetUrl('project-images/webdesigner-2%202.gif'),
    thumbnailUrl: '',
  },
  {
    id: 'websites-webcampaigns-tech',
    label: 'Web Campaigns, Websites & Tech',
    posterUrl: getGhostAssetUrl('project-images/WelcomeAd_800x500px.webp'),
    thumbnailUrl: '',
  },
];

// --- 6. CLIENTES ---
export const CLIENT_LOGOS = [
  {
    name: 'Client 1',
    src: getGhostAssetUrl('client-logos/client1.svg'),
  },
  {
    name: 'Client 2',
    src: getGhostAssetUrl('client-logos/client2.svg'),
  },
  {
    name: 'Client 3',
    src: getGhostAssetUrl('client-logos/client3.svg'),
  },
  {
    name: 'Client 4',
    src: getGhostAssetUrl('client-logos/client4.svg'),
  },
  {
    name: 'Client 5',
    src: getGhostAssetUrl('client-logos/client5.svg'),
  },
  {
    name: 'Client 6',
    src: getGhostAssetUrl('client-logos/client6.svg'),
  },
  {
    name: 'Client 7',
    src: getGhostAssetUrl('client-logos/client7.svg'),
  },
  {
    name: 'Client 8',
    src: getGhostAssetUrl('client-logos/client8.svg'),
  },
  {
    name: 'Client 9',
    src: getGhostAssetUrl('client-logos/client9.svg'),
  },
  {
    name: 'Client 10',
    src: getGhostAssetUrl('client-logos/client10.svg'),
  },
  {
    name: 'Client 11',
    src: getGhostAssetUrl('client-logos/client11.svg'),
  },
  {
    name: 'Client 12',
    src: getGhostAssetUrl('client-logos/client12.svg'),
  },
];

// --- 7. CONFIGURAÇÃO DE CONTATO ---
export const CONTACT_CONFIG = {
  title: 'contato',
  subtitle: 'Tem uma pergunta ou quer trabalhar junto?',
  formAction: 'https://formsubmit.co/danilo@portfoliodanilo.com',
  submitLabel: 'Enviar Mensagem',
  emails: {
    primary: 'dannovaisv@gmail.com',
    secondary: 'danilo@portfoliodanilo.com',
  },
};

export const CONTACT_INFO = [
  {
    label: 'danilo@portfoliodanilo.com', // Usando o secundário para display conforme spec visual ou primário? A spec lista ambos.
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
    platform: 'Facebook', // Adicionado da Spec
    url: 'https://facebook.com/danilonovaisvilela',
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com/danilo_novais',
    icon: <Twitter className="w-5 h-5" />,
  },
];

// --- 8. FOOTER ---
export const FOOTER_CONTENT = {
  copyright: '© 2025 Danilo Novais Vilela — todos os direitos reservados.',
};
