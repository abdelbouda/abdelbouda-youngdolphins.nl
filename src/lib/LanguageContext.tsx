import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'nl' | 'en';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  hero_badge: {
    nl: '🚀 Nu geopend in Monnickendam - Beperkte plekken',
    en: '🚀 Now open in Monnickendam - Limited spots',
  },
  hero_title: {
    nl: 'Dé Zwemschool in Monnickendam & Regio Amsterdam',
    en: 'The Swim School in Monnickendam & Amsterdam Region',
  },
  hero_subtitle: {
    nl: 'Bij Young Dolphins in Monnickendam starten kinderen direct met zwemles. Geen wachtlijsten, veilig leren zwemmen met plezier voor A-, B- en C-diploma.',
    en: 'At Young Dolphins in Monnickendam, children start swimming lessons immediately. No waiting lists, safely learn to swim with fun for A, B, and C diplomas.',
  },
  cta_register: {
    nl: 'Schrijf je direct in',
    en: 'Register Now',
  },
  cta_contact: {
    nl: '0299 651205',
    en: 'Call 0299 651205',
  },
  sticky_bar_text: {
    nl: 'Nieuwe groepen starten in Monnickendam!',
    en: 'New groups starting in Monnickendam!',
  },
  whatsapp_tooltip: {
    nl: 'Vraag stellen via WhatsApp?',
    en: 'Ask a question via WhatsApp?',
  },
  nav_home: { nl: 'Home', en: 'Home' },
  nav_lessons: { nl: 'Zwemlessen', en: 'Lessons' },
  nav_locations: { nl: 'Locaties', en: 'Locations' },
  nav_about: { nl: 'Over ons', en: 'About us' },
  nav_faq: { nl: 'FAQ', en: 'FAQ' },
  pricing_starter_title: { nl: 'Starter', en: 'Starter' },
  pricing_starter_price: { nl: '€25', en: '€25' },
  pricing_starter_desc: { nl: 'Perfect voor kennismaking en eerste zwemlessen.', en: 'Perfect for introduction and first swimming lessons.' },
  pricing_progress_title: { nl: 'Progress+', en: 'Progress+' },
  pricing_progress_price: { nl: '€170', en: '€170' },
  pricing_progress_desc: { nl: 'Sneller leren met extra begeleiding.', en: 'Learn faster with extra guidance.' },
  pricing_private_title: { nl: 'Privé', en: 'Private' },
  pricing_private_price: { nl: '€50', en: '€50' },
  pricing_private_desc: { nl: '1-op-1 begeleiding voor maximale progressie.', en: '1-on-1 guidance for maximum progression.' },
  features_title: { nl: 'Zwemlessen voor elke leeftijd', en: 'Swimming lessons for all ages' },
  features_subtitle: { nl: 'Gevestigd in Monnickendam bieden wij kwalitatief zwemonderwijs voor de regio Amsterdam en Waterland.', en: 'Based in Monnickendam, we offer quality swimming education for the Amsterdam and Waterland region.' },
  why_monnickendam_title: { nl: 'Waarom kiezen voor Young Dolphins in Monnickendam?', en: 'Why choose Young Dolphins in Monnickendam?' },
  no_waiting_list: { nl: 'Geen Wachtlijst!', en: 'No Waiting List!' },
  contact_title: { nl: 'Schrijf je direct in', en: 'Register now' },
  contact_desc: { nl: 'Schrijf je kind vandaag nog in voor zwemles in Monnickendam. We nemen binnen 24 uur contact met je op.', en: 'Register your child today for swimming lessons in Monnickendam. We will contact you within 24 hours.' },
  form_name_parent: { nl: 'Naam Ouder', en: 'Parent Name' },
  form_phone: { nl: 'Telefoonnummer', en: 'Phone Number' },
  form_email: { nl: 'E-mailadres', en: 'Email Address' },
  form_child_info: { nl: 'Naam Kind & Leeftijd', en: 'Child Name & Age' },
  form_submit: { nl: 'Verstuur Aanmelding', en: 'Submit Application' },
  success_title: { nl: 'Aanmelding ontvangen!', en: 'Application received!' },
  success_desc: { nl: 'Bedankt voor je interesse. We nemen snel contact met je op.', en: 'Thanks for your interest. We will contact you soon.' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('nl');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
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
