import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND } from '@/config/brand';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the privacy policy for Danilo Novais portfolio website, with details on data collection, usage, retention and user rights.',
  openGraph: {
    title: 'Privacy Policy',
    description:
      'Read the privacy policy for Danilo Novais portfolio website, with details on data collection, usage, retention and user rights.',
    url: `https://${BRAND.domain}/privacy-policy`,
    siteName: BRAND.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy',
    description:
      'Read the privacy policy for Danilo Novais portfolio website, with details on data collection, usage, retention and user rights.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: `https://${BRAND.domain}/privacy-policy`,
  },
};

export default function PrivacyPolicyAliasPage() {
  return (
    <section className="min-h-screen bg-background text-foreground">
      <div className="std-grid py-24">
        <h1 className="text-4xl font-semibold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-6 max-w-2xl text-base text-foreground/80">
          The official policy is available in Portuguese. Access the complete
          version at{' '}
          <Link href="/privacidade" className="underline underline-offset-4">
            /privacidade
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
