import { MetadataRoute } from 'next';

export const revalidate = 86400; // Cache sitemap for 24 hours

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bdsm.zozero94.com';
  const lastModified = new Date('2026-08-17');

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/test`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9
    }
  ];
}
