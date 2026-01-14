import { BRAND } from '@/config/brand';

type JsonLdProps = {
  logoUrl?: string;
};

export default function JsonLd({ logoUrl }: JsonLdProps) {
  const personSchema = {
    '@type': 'Person',
    name: BRAND.name,
    url: `https://${BRAND.domain}`,
    image: logoUrl ?? BRAND.assets.logos.logoLight,
    jobTitle: 'Creative Developer & Designer',
    sameAs: [
      'https://github.com/danilonovaisv',
      'https://linkedin.com/in/danilonovaisv',
      'https://instagram.com/_novais',
    ],
    description:
      'Creative Developer especializado em WebGL, R3F, Next.js e experiências digitais interativas.',
    knowsAbout: [
      'WebGL',
      'React Three Fiber',
      'Three.js',
      'Next.js',
      'TypeScript',
      'Motion Design',
      'Branding',
      'Creative Development',
      'Interactive Design',
    ],
  };

  const websiteSchema = {
    '@type': 'WebSite',
    name: `${BRAND.name} | Portfolio`,
    url: `https://${BRAND.domain}`,
    description: 'Você não vê o design. Mas ele vê você.',
    inLanguage: 'pt-BR',
  };

  const portfolioSchema = {
    '@type': 'CollectionPage',
    name: 'Portfolio - Danilo Novais',
    description:
      'Seleção curada de projetos de Branding, Motion Design e Creative Development.',
    url: `https://${BRAND.domain}/portfolio`,
    isPartOf: {
      '@type': 'WebSite',
      url: `https://${BRAND.domain}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [personSchema, websiteSchema, portfolioSchema],
        }),
      }}
    />
  );
}
