import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import MainLayout from '../components/layout/MainLayout';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F4F5F7',
};

export const metadata: Metadata = {
  title: 'Portfólio — Danilo Novais | Design, não é só estética.',
  description:
    'Design estratégico, branding, campanhas, motion e experiências digitais em WebGL/3D. Portfólio de Danilo Novais com projetos que unem intenção, estratégia e experiência.',
  openGraph: {
    title: 'Portfólio — Danilo Novais | Design, não é só estética.',
    description:
      'Design estratégico, branding, campanhas, motion e experiências digitais em WebGL/3D. Portfólio de Danilo Novais.',
    url: 'https://portfoliodanilo.com',
    siteName: 'Danilo Novais Portfolio',
    images: [
      {
        url: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
        width: 1200,
        height: 630,
        alt: 'Capa do portfólio de Danilo Novais',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfólio — Danilo Novais | Design, não é só estética.',
    description:
      'Branding, campanhas, motion e experiências digitais com WebGL/3D. Design estratégico para impacto real.',
    creator: '@danilo_novais',
    images: [
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
    ],
  },
  icons: {
    icon: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg',
    shortcut:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`scroll-smooth antialiased ${inter.variable} ${outfit.variable}`}
    >
      <body className="bg-[#F4F5F7] text-[#111111] font-sans">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
