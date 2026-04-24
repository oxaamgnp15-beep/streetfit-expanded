import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.WEB_ORIGIN || 'http://localhost:3000';
  const routes = ['/', '/exercises', '/planner', '/progress', '/settings', '/coach', '/admin'];
  return routes.map((p)=>({ url: new URL(p, base).toString(), changefreq: 'weekly', priority: p==='/'?1:0.7 }));
}
