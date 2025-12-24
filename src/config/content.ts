export const HOME_CONTENT = {
  hero: {
    tag: '[BRAND AWARENESS]',
    title: ['Design, não é', 'só estética.'],
    subtitle: '[É intenção, é estratégia, é experiência.]',
    cta: 'get to know me better →',
  },
  showcase: {
    title: 'portfólio showcase',
    categories: [
      {
        id: 'brand-campaigns',
        label: 'Brand & Campaigns',
        thumb:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
      },
      {
        id: 'videos-motions',
        label: 'Videos & Motions',
        thumb:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/y2mate.com%20-%20promoao_ta_podendo_nestle_ta_de_volta__wanzLKTQOE_1080p.mp4',
      },
      {
        id: 'websites-webcampaigns-tech',
        label: 'Web Campaigns, Websites & Tech',
        thumb:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
      },
    ],
  },
  featuredProjects: [
    {
      slug: 'magic-radio-branding',
      title: 'Magic — devolvendo a magia ao rádio',
      category: 'branding & campanha',
      client: 'Magic',
      year: 2023,
      img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
    },
    {
      slug: 'branding-project-01',
      title: 'Uma marca ousada e consistente',
      category: 'branding',
      client: 'Cliente confidencial',
      year: 2022,
      img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
    },
    {
      slug: 'key-visual-campaign',
      title: 'Key visual para campanha sazonal',
      category: 'campanha',
      client: 'Cliente confidencial',
      year: 2021,
      img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
    },
    {
      slug: 'webdesigner-motion',
      title: 'Experiência web em movimento',
      category: 'web & motion',
      client: 'Cliente confidencial',
      year: 2023,
      img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
    },
  ],
  clients: Array.from({ length: 12 }, (_, i) => ({
    name: `Client ${i + 1}`,
    src: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client${i + 1}.svg`,
  })),
};
