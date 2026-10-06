import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageSEO } from '../constants/seoConfig';

export const usePageSEO = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const seo = getPageSEO(location.pathname);

    // Update document title
    document.title = seo.title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seo.description);

    // Update canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', seo.canonical);

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', seo.canonical);

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', seo.title);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', seo.description);

    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) twitterUrl.setAttribute('content', seo.canonical);

    // Update Page JSON-LD schema
    let pageSchemaScript = document.querySelector('script#page-jsonld');
    if (seo.schema) {
      if (!pageSchemaScript) {
        pageSchemaScript = document.createElement('script');
        pageSchemaScript.setAttribute('type', 'application/ld+json');
        pageSchemaScript.setAttribute('id', 'page-jsonld');
        document.head.appendChild(pageSchemaScript);
      }
      pageSchemaScript.textContent = JSON.stringify(seo.schema);
    } else if (pageSchemaScript) {
      pageSchemaScript.remove();
    }
  }, [location.pathname]);
};
