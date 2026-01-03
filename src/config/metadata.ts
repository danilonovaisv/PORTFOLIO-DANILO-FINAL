import type { Metadata, Viewport } from 'next';
import { BRAND } from '@/config/brand';

/**
 * Global SEO Metadata
 * This file exports metadata for the entire site.
 * Import in layout.tsx or page.tsx as needed.
 */

export const siteMetadata: Metadata = {
  metadataBase: new URL(`https://${BRAND.domain}`),

  title: {
    default: `${BRAND.name} | Creative Developer`,
    template: `%s | ${BRAND.name}`,
  },

  description:
    'Portfólio de Danilo Novais - Creative Developer especializado em design digital, branding e motion design. Você não vê o design. Mas ele vê você.',

  keywords: [
    'Creative Developer',
    'Creative Development',
    'Creative technologist',
    'Design System',
    'User Experience',
    'WebGL',
    'WebGL Developer',
    'Three.js',
    'React Three Fiber',
    'R3F',
    'GLSL Shaders',
    'GSAP Animation',
    'Framer Motion',
    'Next.js',
    'React',
    'TypeScript',
    'Branding',
    'Motion Design',
    'São Paulo',
    'Brazil',
    'Portfolio',
    'Interactive Design',
    'Front-end Engineering',
  ],

  authors: [{ name: BRAND.name, url: `https://${BRAND.domain}` }],
  creator: BRAND.name,
  publisher: BRAND.name,

  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `https://${BRAND.domain}`,
    siteName: BRAND.name,
    title: `${BRAND.name} | Creative Developer`,
    description:
      'Você não vê o design. Mas ele vê você. Portfólio de projetos criativos.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${BRAND.name} - Creative Developer`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} | Creative Developer`,
    description: 'Você não vê o design. Mas ele vê você.',
    images: ['/opengraph-image'],
    creator: '@_novais',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: BRAND.logos.favicon,
    shortcut: BRAND.logos.favicon,
    apple: BRAND.logos.favicon,
  },

  manifest: '/manifest.json',

  alternates: {
    canonical: `https://${BRAND.domain}`,
  },
};

export const siteViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#050511' },
    { media: '(prefers-color-scheme: dark)', color: '#050511' },
  ],
};
