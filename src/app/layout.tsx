import React from 'react';
import localFont from 'next/font/local';
import { Metadata } from 'next';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BRAND } from '@/config/brand';
import { SOCIALS } from '@/config/navigation';
import './globals.css';

const ttNorms = localFont({
  src: [
    {
      path: '../fonts/TT Norms Pro Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/TT Norms Pro Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/TT Norms Pro Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/TT Norms Pro Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/TT Norms Pro Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-tt-norms',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portfoliodanilo.com'),
  title: {
    default: `${BRAND.name} | Creative Developer`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    'Portfólio de Danilo Novais - Designer e Desenvolvedor focado em Motion, 3D e Experiências Interativas.',
  keywords: [
    'Creative Developer',
    'WebGL',
    'R3F',
    'Next.js',
    'Motion Design',
    'Interactive Developer',
    'Web Design',
    '3D',
    'React',
    'Brazil',
    'Danilo Novais',
  ],
  authors: [{ name: BRAND.name, url: 'https://portfoliodanilo.com' }],
  creator: BRAND.name,
  publisher: BRAND.name,
  openGraph: {
    title: `${BRAND.name} | Creative Developer`,
    description:
      'Design, não é só estética. É intenção, estratégia e experiência.',
    url: 'https://portfoliodanilo.com',
    siteName: `${BRAND.name} Portfolio`,
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} | Creative Developer`,
    description:
      'Design, não é só estética. É intenção, estratégia e experiência.',
    creator: '@danilo_novais',
  },
  alternates: {
    canonical: '/',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${ttNorms.variable}`}>
      <body
        className={`${ttNorms.className} bg-surface-main text-text-main selection:bg-[#0057FF] selection:text-white`}
      >
        <SmoothScroll>
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-9999 focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-[#0057FF]"
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
