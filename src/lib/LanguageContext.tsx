import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'nl' | 'en';

const translations = {
  hero_badge: { nl: '🚀 Nu geopend in Monnickendam - Beperkte plekken', en: '🚀 Now open in Monnickendam - Limited spots' },
  hero_title: { nl: 'Zwemles in Amsterdam & Monnickendam: Direct Starten', en: 'Swimming Lessons Amsterdam & Monnickendam: Start Now' },
  hero_subtitle: { nl: 'Bij Young Dolphins zwemschool starten kinderen direct met zwemles zonder wachtlijst. Professionele ABC-trajecten in Amsterdam (Noord, Oost, Zuid, West) en Monnickendam.', en: 'At Young Dolphins swim school, children start swimming lessons immediately without a waiting list. Professional ABC tracks in Amsterdam and Monnickendam.' },
  cta_register: { nl: 'Schrijf je direct in', en: 'Register Now' },
  cta_contact: { nl: '06-28421354', en: 'Call 06-28421354' },
  sticky_bar_text: { nl: 'Nieuwe groepen starten in Monnickendam!', en: 'New groups starting in Monnickendam!' },
  whatsapp_tooltip: { nl: 'Vraag stellen via WhatsApp?', en: 'Ask a question via WhatsApp?' },
  nav_home: { nl: 'Home', en: 'Home' },
  nav_lessons: { nl: 'Zwemlessen', en: 'Lessons' },
  nav_locations: { nl: 'Locaties', en: 'Locations' },
  nav_about: { nl: 'Over ons', en: 'About us' },
  nav_pricing: { nl: 'Tarieven', en: 'Pricing' },
  nav_faq: { nl: 'FAQ', en: 'FAQ' },
  pricing_starter_title: { nl: 'Starter', en: 'Starter' },
  pricing_starter_price: { nl: '€25', en: '€25' },
  pricing_starter_desc: { nl: 'Wekelijkse lessen van 45 minuten. Solid basis voor elk kind om watervrij te worden en de eerste zwemslagen te leren.', en: 'Weekly 45-minute lessons. A solid foundation for every child to become water confident and learn the first strokes.' },
  pricing_progress_title: { nl: 'Progress+', en: 'Progress+' },
  pricing_progress_price: { nl: '€170', en: '€170' },
  pricing_progress_desc: { nl: 'Twee lessen per week voor maximale resultaten. De snelste weg naar het A, B of C diploma met extra persoonlijke aandacht.', en: 'Two lessons per week for maximum results. The fastest way to A, B, or C diplomas with extra personal attention.' },
  pricing_private_title: { nl: 'Privé', en: 'Private' },
  pricing_private_price: { nl: '€50', en: '€50' },
  pricing_private_desc: { nl: 'Volledige 1-op-1 aandacht. Maatwerk per les, ideaal voor kinderen die extra hulp nodig hebben of zeer snel willen gaan.', en: 'Full 1-on-1 attention. Custom per lesson, ideal for children who need extra help or want to progress very quickly.' },
  contact_title: { nl: 'Schrijf je direct in', en: 'Register now' },
  contact_desc: { nl: 'Schrijf je kind vandaag nog in voor zwemles in Monnickendam. We nemen binnen 24 uur contact met je op.', en: 'Register your child today for swimming lessons in Monnickendam. We will contact you within 24 hours.' },
  form_name_parent: { nl: 'Naam Ouder', en: 'Parent Name' },
  form_phone: { nl: 'Telefoonnummer', en: 'Phone Number' },
  form_email: { nl: 'E-mailadres', en: 'Email Address' },
  form_child_info: { nl: 'Naam Kind & Leeftijd', en: 'Child Name & Age' },
  form_package: { nl: 'Gekozen Pakket', en: 'Chosen Package' },
  package_starter: { nl: 'Starter (1x p/w)', en: 'Starter (1x p/w)' },
  package_progress: { nl: 'Progress+ (2x p/w)', en: 'Progress+ (2x p/w)' },
  package_private: { nl: 'Privé (1-op-1)', en: 'Private (1-on-1)' },
  form_submit: { nl: 'Verstuur Aanmelding', en: 'Submit Application' },
  success_title: { nl: 'Aanmelding ontvangen!', en: 'Application received!' },
  success_desc: { nl: 'Bedankt voor je interesse. We nemen snel contact met je op.', en: 'Thanks for your interest. We will contact you soon.' },
  form_back: { nl: 'Terug naar formulier', en: 'Back to form' },
  footer_follow: { nl: 'Volg ons op', en: 'Follow us on' },
  footer_lessons: { nl: 'Lessen', en: 'Lessons' },
  footer_nav: { nl: 'Navigatie', en: 'Navigation' },
  footer_regio: { nl: 'Regio Amsterdam', en: 'Amsterdam Region' },
  footer_contact: { nl: 'Contact', en: 'Contact' },
  footer_privacy: { nl: 'Privacy', en: 'Privacy' },
  footer_terms: { nl: 'Voorwaarden', en: 'Terms' },
  footer_cookies: { nl: 'Cookies', en: 'Cookies' },
  footer_desc: { nl: 'Professionele zwemschool die bouwt aan plezier en veiligheid in het water.', en: 'Professional swimming school that builds on fun and safety in the water.' },
  area_noord: { nl: 'Amsterdam Noord', en: 'Amsterdam North' },
  area_oost: { nl: 'Amsterdam Oost', en: 'Amsterdam East' },
  area_zuid: { nl: 'Amsterdam Zuid', en: 'Amsterdam South' },
  area_west: { nl: 'Amsterdam West', en: 'Amsterdam West' },
  area_centrum: { nl: 'Amsterdam Centrum', en: 'Amsterdam Center' },
  area_zuidoost: { nl: 'Amsterdam Zuidoost', en: 'Amsterdam Southeast' }
} as const;

// Type gebaseerd op de keys van het object
type TranslationKey = keyof typeof translations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('nl');

  const t = (key: TranslationKey): string => {
    const entry = translations[key];
    if (!entry) return key; // Fallback indien key niet bestaat
    return entry[language] || entry['nl']; // Fallback naar NL als vertaling mist
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
