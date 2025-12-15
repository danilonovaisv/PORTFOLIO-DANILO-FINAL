export type Project = {
  slug: string;
  title: string;
  client: string;
  tags: string[];
  layout: 'normal' | 'wide';
  imageUrl: string;
  imageAlt: string;
  description: string;
};

export const featuredProjects: Project[] = [
  {
    slug: 'magic-radio-branding',
    title: 'Bringing the Magic Back to Radio',
    client: 'Magic',
    tags: ['branding'],
    layout: 'normal',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
    imageAlt:
      'Visual identity for Magic radio featuring purple background and yellow logo',
    description:
      'Identidade sonora e visuais fluídos que celebram o rádio com atitude futurista.',
  },
  {
    slug: 'taking-sportswear',
    title: 'Taking Sportswear to the Skies',
    client: 'Eurosport',
    tags: ['campaign'],
    layout: 'normal', // Updated: Eurosport is normal width in reference row 1
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
    imageAlt: 'Athlete floating against a colorful sky background',
    description:
      'Campanha editorial que combina movimento, cor e atitude para uma marca ousada.',
  },
  {
    slug: 'epic-look-campaign',
    title: 'Refreshing a Telecom Challenger',
    client: 'EPIC',
    tags: ['branding'],
    layout: 'wide', // Updated: Epic is full width in reference row 2
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
    imageAlt: 'Person looking at smartphone with Epic Look text overlay',
    description:
      'Key visual cinematográfico que reposiciona a marca como parceira urbana disruptiva.',
  },
  {
    slug: 'fff-legal-identity',
    title: 'Designing Trust – The FFF Legal Identity',
    client: 'FFF Legal',
    tags: ['branding', 'website'],
    layout: 'normal',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
    imageAlt: 'FFF Legal logo textual design on building facade',
    description:
      'Narrativa visual sólida para transmitir confiança e consistência em múltiplas telas.',
  },
];
