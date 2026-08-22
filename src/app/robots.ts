import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://bdsm.zozero94.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/analyzing', '/api/']
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
