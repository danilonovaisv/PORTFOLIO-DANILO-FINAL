export const HOME_CONTENT = {
  hero: {
    title: ['Você não vê o design.'],
    subtitle: '[Mas ele vê você.]',
    cta: 'step inside →',
  },

  showcase: {
    title: 'portfólio showcase',
    cta: { label: 'vamos trabalhar juntos', href: '/portfolio' },
    categories: [
      { id: 'brand-campaigns', label: 'Brand & Campaigns' },
      { id: 'videos-motions', label: 'Videos & Motions' },
      { id: 'websites-tech', label: 'Web Campaigns, Websites & Tech' },
    ],
  },

  clients: {
    title: 'marcas com as quais já trabalhei',
    // Gerador de URLs para os 12 SVGs monocromáticos
    logos: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      src: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client${i + 1}.svg`,
      alt: `Client Logo ${i + 1}`,
    })),
  },

  contact: {
    title: 'contato',
    subtitle: 'Tem uma pergunta ou quer trabalhar junto?',
  },
};
