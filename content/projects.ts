export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  layout: 'small' | 'medium' | 'wide' | 'rectangle';
  imageUrl: string;
  imageAlt: string;
  description: string;
};

export const featuredProjects: Project[] = [
  {
    slug: 'magic-radio-branding',
    title: 'Bringing the Magic Back to Radio',
    client: 'Magic',
    category: 'branding',
    layout: 'small',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
    imageAlt: 'Cartão roxo com o lettering Magic em amarelo vibrante',
    description:
      'Identidade sonora e visuais fluídos que celebram o rádio com atitude futurista.',
  },
  {
    slug: 'taking-sportswear',
    title: 'Taking Sportswear to the Skies',
    client: 'Eurosport',
    category: 'campaign',
    layout: 'medium',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
    imageAlt: 'Atleta flutuando em tons vibrantes diante de um céu multicolorido',
    description:
      'Campanha editorial que combina movimento, cor e atitude para uma marca ousada.',
  },
  {
    slug: 'epic-look-campaign',
    title: 'Refreshing a Telecom Challenger',
    client: 'Epic',
    category: 'branding',
    layout: 'wide',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
    imageAlt: 'Pessoa olhando para o celular diante de um skyline urbano iluminado',
    description:
      'Key visual cinematográfico que reposiciona a marca como parceira urbana disruptiva.',
  },
  {
    slug: 'fff-legal-identity',
    title: 'Designing Trust — The FFF Legal Identity',
    client: 'FFF Legal',
    category: 'branding / website',
    layout: 'rectangle',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
    imageAlt:
      'Fachada escura com a logomarca FFF Legal aplicada em elementos de metal e luz',
    description:
      'Narrativa visual sólida para transmitir confiança e consistência em múltiplas telas.',
  },
];
