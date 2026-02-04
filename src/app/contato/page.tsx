import type { Metadata } from 'next';
import ContactSection from '@/components/home/contact/ContactSection';
import SiteFooter from '@/components/layout/SiteFooter';
import { BRAND } from '@/config/brand';

export const metadata: Metadata = {
  title: 'Contato | Danilo Novais',
  description:
    'Fale com Danilo Novais para projetos de branding, motion e experiências digitais. Formulário direto, e-mail e redes para iniciar a conversa.',
  openGraph: {
    title: 'Contato | Danilo Novais',
    description:
      'Entre em contato para projetos de branding, motion e experiências digitais. Resposta rápida e foco em soluções sob medida.',
    url: `https://${BRAND.domain}/contato`,
    siteName: BRAND.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Contato | Danilo Novais',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contato | Danilo Novais',
    description:
      'Entre em contato para projetos de branding, motion e experiências digitais.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: `https://${BRAND.domain}/contato`,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ContactSection />
      <SiteFooter />
    </div>
  );
}
