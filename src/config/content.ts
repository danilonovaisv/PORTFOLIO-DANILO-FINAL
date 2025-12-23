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
        thumbnailUrl:
          'https://loandbehold.studio/app/uploads/2025/04/Magic-1.png',
        posterUrl:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
      },
      {
        id: 'videos-motions',
        label: 'Videos & Motions',
        thumbnailUrl: 'https://loandbehold.studio/app/uploads/2025/04/Epic.png',
        posterUrl:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
      },
      {
        id: 'websites-webcampaigns-tech',
        label: 'Web Campaigns, Websites & Tech',
        thumbnailUrl:
          'https://loandbehold.studio/app/uploads/2025/04/Unilever.png',
        posterUrl:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
      },
    ],
  },
  featuredProjects: [
    {
      slug: 'magic-radio-branding',
      title: 'Magic — devolvendo a magia ao rádio',
      category: 'branding & campanha',
      client: 'Magic',
      year: '2023',
      imageUrl:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
      isHero: true,
      displayCategory: 'branding & campanha',
    },
    {
      slug: 'branding-project-01',
      title: 'Uma marca ousada e consistente',
      category: 'branding',
      client: 'Cliente confidencial',
      year: '2022',
      imageUrl:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
      isHero: false,
      displayCategory: 'branding',
    },
    {
      slug: 'key-visual-campaign',
      title: 'Key visual para campanha sazonal',
      category: 'campanha',
      client: 'Cliente confidencial',
      year: '2021',
      imageUrl:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
      isHero: false,
      displayCategory: 'campanha',
    },
    {
      slug: 'webdesigner-motion',
      title: 'Experiência web em movimento',
      category: 'web & motion',
      client: 'Cliente confidencial',
      year: '2023',
      imageUrl:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
      isHero: false,
      displayCategory: 'web & motion',
    },
  ],
  clients: Array.from({ length: 12 }, (_, i) => ({
    name: `Client ${i + 1}`,
    src: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client${i + 1}.svg`,
  })),
};
