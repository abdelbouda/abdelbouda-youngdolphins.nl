import { useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}

export default function SEO({ title, description, keywords }: SEOProps) {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = title;
    
    // Base meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords || '' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:locale', content: language === 'nl' ? 'nl_NL' : 'en_US' },
      { property: 'og:image', content: 'https://youngdolphins.nl/favicon.svg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: 'https://youngdolphins.nl/favicon.svg' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'robots', content: 'index, follow' },
    ];

    metaTags.forEach(tag => {
      const selector = tag.name ? `meta[name="${tag.name}"]` : `meta[property="${tag.property}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (tag.name) element.setAttribute('name', tag.name);
        if (tag.property) element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://youngdolphins.nl');

    // Structured Data (Schema.org LocalBusiness)
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Young Dolphins Zwemschool",
      "logo": "https://youngdolphins.nl/favicon.svg",
      "image": "https://youngdolphins.nl/favicon.svg",
      "description": description,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Wilhelminalaan 54",
        "addressLocality": "Monnickendam",
        "postalCode": "1141 CW",
        "addressRegion": "Noord-Holland",
        "addressCountry": "NL"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 52.4632,
        "longitude": 5.0347
      },
      "url": "https://youngdolphins.nl",
      "telephone": "06-28421354",
      "priceRange": "€€",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "08:00",
          "closes": "20:00"
        }
      ]
    };

    const scriptId = 'structured-data-local-main';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(schema);

  }, [title, description, keywords, language]);

  return null;
}
