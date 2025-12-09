export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  imageUrl: string;
  layout: 'small' | 'medium' | 'wide' | 'rectangle';
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
  },
  {
    slug: 'bold-brand-redesign',
    title: 'Shaping a Bold New Brand',
    client: 'Studio Nova',
    category: 'branding',
    layout: 'medium',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
  },
  {
    slug: 'seasonal-visual-campaign',
    title: 'Key Visual for Seasonal Campaign',
    client: 'Aurora Collective',
    category: 'campaign',
    layout: 'wide',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
  },
  {
    slug: 'web-motion-experience',
    title: 'Web Experience in Motion',
    client: 'Flux Lab',
    category: 'web/motion',
    layout: 'rectangle',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
  },
  {
    slug: 'epic-look-campaign',
    title: 'Refreshing a Telecom Challenger',
    client: 'Epic',
    category: 'branding',
    layout: 'wide',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
  },
  {
    slug: 'fff-legal-identity',
    title: 'Designing Trust for FFF Legal',
    client: 'FFF Legal',
    category: 'branding / website',
    layout: 'medium',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
  },
];
