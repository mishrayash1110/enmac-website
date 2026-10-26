import type {MetadataRoute} from 'next';
import {services} from '@/data/services';
import {guides} from '@/data/guides';
import {siteUrl} from '@/lib/site-url';
export const dynamic = 'force-static';
export default function sitemap():MetadataRoute.Sitemap {const root=siteUrl();if(!root)return [];return ['','/about','/loans','/guides','/calculators','/apply',...services.map(s=>`/loans/${s.slug}`),...guides.map(g=>`/guides/${g.slug}`)].map(p=>({url:`${root}${p}/`,changeFrequency:'monthly' as const,priority:p===''?1:0.7}))}
