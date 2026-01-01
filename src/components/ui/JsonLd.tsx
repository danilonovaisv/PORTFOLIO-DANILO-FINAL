import { BRAND } from '@/config/brand';

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: BRAND.name,
    url: `https://${BRAND.domain}`,
    image: BRAND.logos.light,
    jobTitle: 'Creative Developer & Designer',
    sameAs: [
      `https://github.com/danilonovaisv`,
      `https://linkedin.com/in/danilonovaisv`,
      `https://instagram.com/_novais`,
    ],
    description:
      'Portfólio de Danilo Novais - Creative Developer especializado em design digital, branding e motion design.',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${BRAND.name} | Portfolio`,
    url: `https://${BRAND.domain}`,
    description: 'Você não vê o design. Mas ele vê você.',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([schema, websiteSchema]),
      }}
    />
  );
}
