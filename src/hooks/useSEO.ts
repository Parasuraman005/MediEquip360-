import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  path?: string;
  type?: string;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80';
const BASE_URL = 'https://ais-pre-7zduyzxga6nddgbvzpyz6a-13777060248.asia-east1.run.app';

export function useSEO({ title, description, image = DEFAULT_IMAGE, path = '', type = 'website' }: SEOProps) {
  useEffect(() => {
    // Document Title
    const fullTitle = title.includes('MediEquip360') ? title : `${title} | MediEquip360`;
    document.title = fullTitle;

    // Helper to update meta tag
    const updateMeta = (selector: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) element.setAttribute('name', name);
        } else if (selector.startsWith('meta[property=')) {
          const prop = selector.match(/property="([^"]+)"/)?.[1];
          if (prop) element.setAttribute('property', prop);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Meta Description
    updateMeta('meta[name="description"]', description);

    // Open Graph
    updateMeta('meta[property="og:title"]', fullTitle);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:image"]', image);
    updateMeta('meta[property="og:type"]', type);

    const fullUrl = `${BASE_URL}${path.startsWith('/') ? path : '/' + path}`;
    updateMeta('meta[property="og:url"]', fullUrl);

    // Twitter
    updateMeta('meta[name="twitter:title"]', fullTitle);
    updateMeta('meta[name="twitter:description"]', description);
    updateMeta('meta[name="twitter:image"]', image);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);
  }, [title, description, image, path, type]);
}
