export const ADMIN_NAVIGATION = {
  dashboard: '/admin',
  trabalhos: {
    index: '/admin/trabalhos',
    new: '/admin/trabalhos/new',
    detail: (id: string) => `/admin/trabalhos/${id}`,
  },
  tags: '/admin/tags',
  midia: '/admin/midia',
  'landing-pages': '/admin/landing-pages',
  config: '/admin/config',
} as const;
