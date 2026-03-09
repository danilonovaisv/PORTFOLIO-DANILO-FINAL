import type { Metadata, Viewport } from 'next';
import { BRAND } from '@/config/brand';

/**
 * Global SEO Metadata
 * This file exports metadata for the entire site.
 * Import in layout.tsx or page.tsx as needed.
 */

export const siteMetadata: Metadata = {
  metadataBase: new URL(`https://portfoliodanilo.com`),

  title: {
    default: 'Danilo Novais | Creative Developer',
    template: '%s | Danilo Novais | Creative Developer',
  },

  description:
    'Você não vê o design. Mas ele vê você. Portfólio de Danilo Novais.',

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

  authors: [{ name: 'Danilo Novais', url: 'https://portfoliodanilo.com' }],
  creator: 'Danilo Novais',
  publisher: 'Danilo Novais',

  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://portfoliodanilo.com',
    siteName: 'Danilo Novais',
    title: 'Danilo Novais | Creative Developer',
    description:
      'Você não vê o design. Mas ele vê você. Portfólio de Danilo Novais.',
    images: [
      {
        url: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-assets/assets-prop/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Danilo Novais | Creative Developer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Danilo Novais | Creative Developer',
    description:
      'Você não vê o design. Mas ele vê você. Portfólio de Danilo Novais.',
    images: [
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-assets/assets-prop/og-image.png',
    ],
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
    icon: [
      { url: BRAND.assets.logos.favicon, type: 'image/svg+xml' },
      {
        url: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/global/logos/global.logo_header_light.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: BRAND.assets.logos.favicon,
    apple: [
      { url: BRAND.assets.logos.favicon, type: 'image/svg+xml' },
      {
        url: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/global/logos/global.logo_header_light.svg',
        type: 'image/svg+xml',
      },
    ],
    other: [
      {
        rel: 'logo',
        url: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/global/logos/global.logo_header_light.svg',
      },
    ],
  },

  manifest: '/manifest.json',

  alternates: {
    canonical: `https://${BRAND.domain}`,
  },
  other: {
    logo: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/global/logos/global.logo_header_light.svg',
  },
};

export const siteViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: BRAND.colors.background },
    { media: '(prefers-color-scheme: dark)', color: BRAND.colors.background },
  ],
};
