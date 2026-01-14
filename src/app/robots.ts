import type { MetadataRoute } from 'next';
import { BRAND } from '@/config/brand';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin',
      },
    ],
    sitemap: `https://${BRAND.domain}/sitemap.xml`,
  };
}
