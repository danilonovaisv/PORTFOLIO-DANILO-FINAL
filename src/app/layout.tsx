import React from 'react';
import { Inter, Outfit } from 'next/font/google';
import { Metadata } from 'next';
import SmoothScroll from '@/layouts/SmoothScroll';
import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import { ASSETS } from '@/lib/constants';
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

export const metadata: Metadata = {
  metadataBase: new URL('https://portfoliodanilo.com'),
  title: {
    default: 'Danilo Novais | Creative Developer',
    template: '%s | Danilo Novais',
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
  authors: [{ name: 'Danilo Novais', url: 'https://portfoliodanilo.com' }],
  creator: 'Danilo Novais',
  publisher: 'Danilo Novais',
  openGraph: {
    title: 'Danilo Novais | Creative Developer',
    description:
      'Design, não é só estética. É intenção, estratégia e experiência.',
    url: 'https://portfoliodanilo.com',
    siteName: 'Danilo Novais Portfolio',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Danilo Novais | Creative Developer',
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
    icon: ASSETS.favicon,
    shortcut: ASSETS.favicon,
    apple: ASSETS.favicon,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable}`}>
      <body
        className={`${inter.className} bg-surface-main text-text-main selection:bg-[#0057FF] selection:text-white`}
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
              name: 'Danilo Novais',
              url: 'https://portfoliodanilo.com',
              jobTitle: 'Creative Developer',
              sameAs: [
                'https://linkedin.com/in/danilonovais',
                'https://instagram.com/danilo_novais',
                'https://twitter.com/danilo_novais',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
