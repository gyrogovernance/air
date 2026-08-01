import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { absoluteUrl, getPageSeo, SITE_NAME, SITE_KEYWORDS } from '../lib/seo';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Keeps document title, description, canonical, and social meta in sync with the route. */
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = getPageSeo(pathname);
    const url = absoluteUrl(page.path);
    const keywords = (page.keywords ?? SITE_KEYWORDS).join(', ');

    document.title = page.title;

    upsertMeta('name', 'description', page.description);
    upsertMeta('name', 'keywords', keywords);
    upsertMeta('name', 'robots', page.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1');

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', page.title);
    upsertMeta('property', 'og:description', page.description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:locale', 'en_US');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', page.title);
    upsertMeta('name', 'twitter:description', page.description);

    upsertLink('canonical', url);
  }, [pathname]);

  return null;
}
