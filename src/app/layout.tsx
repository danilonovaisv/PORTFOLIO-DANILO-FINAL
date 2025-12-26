import React from 'react';
import localFont from 'next/font/local';
import type { Metadata, Viewport } from 'next';

import SmoothScroll from '@/components/layout/SmoothScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BRAND } from '@/config/brand';
import { SOCIALS } from '@/config/navigation';

import './globals.css';

const ttNorms = localFont({
  src: [
    { path: '../fonts/TT Norms Pro Thin.woff2', weight: '100' },
    { path: '../fonts/TT Norms Pro Light.woff2', weight: '300' },
    { path: '../fonts/TT Norms Pro Regular.woff2', weight: '400' },
    { path: '../fonts/TT Norms Pro Medium.woff2', weight: '500' },
    { path: '../fonts/TT Norms Pro Bold.woff2', weight: '700' },
  ],
  variable: '--font-tt-norms',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portfoliodanilo.com'),
  title: {
    default: `${BRAND.name} | Creative Developer & Interactive Designer`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    'Especialista em WebGL, R3F e animações interativas. Criação de experiências digitais onde design e estratégia se encontram.',
  keywords: [
    'Creative Developer',
    'Three.js',
    'React Three Fiber',
    'R3F',
    'WebGL',
    'Next.js',
    'Frontend Engineer',
    'Brazil',
    'Danilo Novais',
  ],
  authors: [{ name: BRAND.name, url: 'https://portfoliodanilo.com' }],
  creator: BRAND.name,
  publisher: BRAND.name,
  category: 'technology',
  openGraph: {
    title: `${BRAND.name} | Creative Developer`,
    description:
      'Design é intenção, estratégia e experiência. Explore projetos imersivos em WebGL e 3D.',
    url: 'https://portfoliodanilo.com',
    siteName: `${BRAND.name} Portfolio`,

    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} | Creative Developer`,
    description: 'Experiências digitais com WebGL, Motion e 3D.',
    creator: '@danilo_novais',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: BRAND.logos.favicon,
    shortcut: BRAND.logos.favicon,
    apple: BRAND.logos.favicon,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050505',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={ttNorms.variable}>
      <body
        className={`${ttNorms.className} bg-surface-main text-text-main selection:bg-[#0057FF] selection:text-white`}
      >
        <SmoothScroll>
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-white"
          >
            Pular para o conteúdo
          </a>

          <div className="min-h-screen font-sans">
            <Header />
            <main id="conteudo" className="pb-32">
              {children}
            </main>
            <Footer />
          </div>
        </SmoothScroll>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: BRAND.name,
              url: 'https://portfoliodanilo.com',
              jobTitle: 'Creative Developer',
              sameAs: [
                SOCIALS.linkedin,
                SOCIALS.instagram,
                SOCIALS.twitter,
                SOCIALS.facebook,
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
