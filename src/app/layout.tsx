import React from 'react';
import localFont from 'next/font/local';
import { Metadata, Viewport } from 'next';
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
    default: `${BRAND.name} | Creative Developer & Interactive Designer`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    'Especialista em WebGL, R3F e animações interativas. Danilo Novais cria experiências digitais onde design e estratégia se encontram.',
  keywords: [
    'Creative Developer',
    'WebGL Developer Brazil',
    'Three.js Expert',
    'React Three Fiber Portfolio',
    'Interactive Web Design',
    'Motion Graphics Web',
    'Frontend Engineer 3D',
    'Next.js Specialist',
    'Danilo Novais',
  ],
  authors: [{ name: BRAND.name, url: 'https://portfoliodanilo.com' }],
  creator: BRAND.name,
  publisher: BRAND.name,
  category: 'technology',
  openGraph: {
    title: `${BRAND.name} | Creative Developer & Interactive Designer`,
    description:
      'Design, não é só estética. É intenção, estratégia e experiência. Explore o portfólio de um especialista em experiências digitais imersivas.',
    url: 'https://portfoliodanilo.com',
    siteName: `${BRAND.name} Portfolio`,
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: `${BRAND.name} Creative Portfolio`,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} | Creative Developer`,
    description: 'Criando o futuro da web com 3D, WebGL e interatividade.',
    creator: '@danilo_novais',
    images: ['/opengraph-image.png'],
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050505',
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
