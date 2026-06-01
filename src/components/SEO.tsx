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
    
    const siteUrl = 'https://youngdolphins.nl';
    const ogImage = 'https://youngdolphins.nl/dolphin-og.png';
    const favicon = 'https://youngdolphins.nl/favicon.svg';

    // Base meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords || '' },
      { name: 'author', content: 'Young Dolphins Zwemschool' },
      { name: 'theme-color', content: '#0ea5e9' },
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
      
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: siteUrl },
      { property: 'og:locale', content: language === 'nl' ? 'nl_NL' : 'en_US' },
      { property: 'og:locale:alternate', content: language === 'nl' ? 'en_US' : 'nl_NL' },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:site_name', content: 'Young Dolphins' },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:site', content: '@youngdolphins' },
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
    canonical.setAttribute('href', siteUrl);

    // Alternate language links
    ['nl', 'en'].forEach(lang => {
      let link = document.querySelector(`link[hreflang="${lang}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', lang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', `${siteUrl}?lang=${lang}`);
    });

    // Structured Data - LocalBusiness
    const schemaId = 'structured-data-local';
    let script = document.getElementById(schemaId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "SportsActivityLocation",
      "name": "Young Dolphins Zwemschool",
      "alternateName": language === 'nl' ? "Young Dolphins Zwemschool" : "Young Dolphins Swim School",
      "description": description,
      "url": siteUrl,
      "logo": favicon,
      "image": ogImage,
      "telephone": "+31628421354",
      "email": "info@youngdolphins.nl",
      "priceRange": "€€",
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
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "08:00",
          "closes": "20:00"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/youngdolphins",
        "https://www.instagram.com/youngdolphins",
        "https://www.tiktok.com/@youngdolphins"
      ],
      "offers": {
        "@type": "Offer",
        "name": language === 'nl' ? "Gratis Proefles" : "Free Trial Lesson",
        "price": "0",
        "priceCurrency": "EUR",
        "url": `${siteUrl}/#signup-form`
      }
    };

    script.text = JSON.stringify(schema);

    // FAQ Structured Data (als we op de FAQ sectie zijn)
    if (window.location.hash === '#faq') {
      const faqId = 'structured-data-faq';
      let faqScript = document.getElementById(faqId) as HTMLScriptElement;
      if (!faqScript) {
        faqScript = document.createElement('script');
        faqScript.id = faqId;
        faqScript.type = 'application/ld+json';
        document.head.appendChild(faqScript);
      }

      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": language === 'nl' ? "Hoe lang duurt het om een zwemdiploma te halen?" : "How long does it take to get a swimming diploma?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": language === 'nl' ? "Dit hangt af van leeftijd, zelfvertrouwen en lesfrequentie. De meeste kinderen halen diploma A in ongeveer 12-18 maanden met wekelijkse lessen." : "This depends on age, self-confidence, and lesson frequency. Most children get diploma A in about 12-18 months with weekly lessons."
            }
          },
          {
            "@type": "Question",
            "name": language === 'nl' ? "Kan ik direct starten met zwemles in Monnickendam?" : "Can I start swimming lessons in Monnickendam immediately?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": language === 'nl' ? "Ja! Bij Young Dolphins in Monnickendam kan je kind direct starten met zwemles. We hebben geen wachtlijsten." : "Yes! At Young Dolphins in Monnickendam, your child can start swimming lessons immediately. We have no waiting lists."
            }
          }
        ]
      };
      faqScript.text = JSON.stringify(faqSchema);
    }

  }, [title, description, keywords, language]);

  return null;
}