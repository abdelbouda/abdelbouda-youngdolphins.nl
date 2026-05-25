import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
}

export default function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    document.title = title;

    // Structured Data (Schema.org LocalBusiness)
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Young Dolphins Zwemschool",
      "logo": "https://youngdolphins.nl/favicon.svg",
      "description": description,
      "url": "https://youngdolphins.nl",
      "telephone": "06-28421354",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Wilhelminalaan 54",
        "addressLocality": "Monnickendam",
        "postalCode": "1141 CW",
        "addressCountry": "NL"
      }
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
  }, [title, description]);

  return null;
}
