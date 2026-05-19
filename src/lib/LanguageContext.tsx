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
    nl: 'Zwemles in Amsterdam & Monnickendam: Direct Starten',
    en: 'Swimming Lessons Amsterdam & Monnickendam: Start Now',
  },
  hero_subtitle: {
    nl: 'Bij Young Dolphins zwemschool starten kinderen direct met zwemles zonder wachtlijst. Professionele ABC-trajecten in Amsterdam (Noord, Oost, Zuid, West) en Monnickendam.',
    en: 'At Young Dolphins swim school, children start swimming lessons immediately without a waiting list. Professional ABC tracks in Amsterdam and Monnickendam.',
  },
  cta_register: {
    nl: 'Schrijf je direct in',
    en: 'Register Now',
  },
  cta_contact: {
    nl: '06-28421354',
    en: 'Call 06-28421354',
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
  features_title: { nl: 'Zwemlessen voor elke leeftijd', en: 'Swimming lessons for all ages' },
  features_subtitle: { nl: 'Gevestigd in Monnickendam bieden wij kwalitatief zwemonderwijs voor de regio Amsterdam en Waterland.', en: 'Based in Monnickendam, we offer quality swimming education for the Amsterdam and Waterland region.' },
  why_monnickendam_title: { nl: 'Waarom kiezen voor Young Dolphins?', en: 'Why choose Young Dolphins?' },
  no_waiting_list: { nl: 'Direct starten - Geen Wachtlijst!', en: 'Start immediately - No Waiting List!' },
  area_monnickendam: { nl: 'Monnickendam', en: 'Monnickendam' },
  area_noord: { nl: 'Amsterdam Noord', en: 'Amsterdam North' },
  area_oost: { nl: 'Amsterdam Oost', en: 'Amsterdam East' },
  area_zuid: { nl: 'Amsterdam Zuid', en: 'Amsterdam South' },
  area_west: { nl: 'Amsterdam West', en: 'Amsterdam West' },
  area_centrum: { nl: 'Amsterdam Centrum', en: 'Amsterdam Center' },
  area_zuidoost: { nl: 'Amsterdam Zuidoost', en: 'Amsterdam Southeast' },
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
  
  // Locations component
  loc_maps_key_required: { nl: 'Google Maps API Key vereist', en: 'Google Maps API Key required' },
  loc_maps_desc: { nl: 'Om de locatie op de kaart te zien, voeg je een Google Maps API key toe aan de Secrets van het project.', en: 'To see the location on the map, add a Google Maps API key to the project Secrets.' },
  loc_find_us: { nl: 'Vind ons bij jou in de buurt', en: 'Find us in your area' },
  loc_main_location: { nl: 'Hoofdlocatie', en: 'Main Location' },
  loc_available_now: { nl: 'Nu Beschikbaar', en: 'Available Now' },

  // Hero component extra
  hero_most_popular: { nl: 'Meest gekozen', en: 'Most Popular' },
  hero_register_btn: { nl: 'Inschrijven', en: 'Register Now' },
  hero_tap_again: { nl: 'Tik nogmaals', en: 'Tap again' },
  hero_per_lesson: { nl: '/ les', en: '/ lesson' },
  hero_per_month: { nl: '/ maand', en: '/ month' },

  // Pricing component
  pricing_title: { nl: 'Pakketten & Tarieven', en: 'Packages & Pricing' },
  pricing_subtitle: { nl: 'Investeer in de veiligheid en het plezier van je kind in het water.', en: 'Invest in your child\'s safety and fun in the water.' },

  // InteractiveSignup component extra
  form_phone_label: { nl: 'Telefoon', en: 'Phone' },
  form_email_label: { nl: 'Email', en: 'Email' },
  form_diplomas: { nl: '1200+ diploma\'s uitgereikt', en: '1200+ diplomas awarded' },
  form_back: { nl: 'Terug naar formulier', en: 'Back to form' },
  form_direct_register: { nl: 'Direct aanmelden', en: 'Register now' },
  form_placeholder_parent: { nl: 'Bijv. Mark de Vries', en: 'e.g. John Doe' },
  form_placeholder_phone: { nl: '06 12345678', en: '06 12345678' },
  form_placeholder_email: { nl: 'naam@voorbeeld.nl', en: 'name@example.com' },
  form_placeholder_child: { nl: 'Bijv. Liam (5 jaar)', en: 'e.g. Liam (5 years old)' },
  form_footer: { nl: 'Geen inschrijfkosten • Direct antwoord', en: 'No registration fees • Immediate response' },
  form_error_conn: { nl: 'Verbinding mislukt', en: 'Connection failed' },
  form_error_server: { nl: 'Server fout', en: 'Server error' },
  form_error_unknown: { nl: 'Een onbekende fout is opgetreden.', en: 'An unknown error occurred.' },

  // About component extra
  about_passion: { nl: 'Onze Passie', en: 'Our Passion' },
  about_title_1: { nl: 'Liefde voor het water,', en: 'Love for the water,' },
  about_title_2: { nl: 'vakkundigheid in de les', en: 'professionalism in the lesson' },
  about_safety_focus: { nl: 'Veiligheid focus', en: 'Safety focus' },
  about_team_title: { nl: 'Enthousiast', en: 'Enthusiastic' },
  about_team_subtitle: { nl: 'Instructeurs team', en: 'Instructors team' },

  // FAQ section extra
  faq_title: { nl: 'Veelgestelde vragen', en: 'Frequently asked questions' },
  faq_subtitle: { nl: 'Alles wat je moet weten over zwemles bij Young Dolphins.', en: 'Everything you need to know about swimming lessons at Young Dolphins.' },

  // Bento features extra
  feature_abc_title: { nl: 'Zwemles A-B-C', en: 'Swimming Lessons A-B-C' },
  feature_abc_desc: { nl: 'Complete begeleiding van eerste spetter tot officieel diploma.', en: 'Complete guidance from the first splash to the official diploma.' },
  feature_groups_title: { nl: 'Kleine Groepen', en: 'Small Groups' },
  feature_groups_desc: { nl: 'Maximale aandacht voor elk kind.', en: 'Maximum attention for every child.' },
  feature_start_title: { nl: 'Direct Starten', en: 'Start Immediately' },
  feature_start_desc: { nl: 'In Monnickendam starten we zonder wachttijden.', en: 'In Monnickendam, we start without waiting times.' },
  feature_private_title: { nl: 'Privé lessen', en: 'Private Lessons' },
  feature_private_desc: { nl: '1-op-1 coaching voor supersnelle progressie.', en: '1-on-1 coaching for super-fast progression.' },

  // Footer extra
  footer_follow: { nl: 'Volg ons op', en: 'Follow us on' },
  footer_lessons: { nl: 'Lessen', en: 'Lessons' },
  footer_nav: { nl: 'Navigatie', en: 'Navigation' },
  footer_regio: { nl: 'Regio Amsterdam', en: 'Amsterdam Region' },
  footer_contact: { nl: 'Contact', en: 'Contact' },
  footer_phone_pool: { nl: 'Telefoon Pool', en: 'Pool Phone' },
  footer_direct_contact: { nl: 'Direct contact', en: 'Direct contact' },
  footer_privacy: { nl: 'Privacy', en: 'Privacy' },
  footer_terms: { nl: 'Voorwaarden', en: 'Terms' },
  footer_cookies: { nl: 'Cookies', en: 'Cookies' },
  footer_whatsapp: { nl: 'WhatsApp ons', en: 'WhatsApp us' },
  footer_email_us: { nl: 'Stuur een e-mail', en: 'Send an email' },
  footer_built: { nl: 'Young Dolphins Zwemschool. Gebouwd voor snelheid.', en: 'Young Dolphins Swim School. Built for speed.' },
  logo_subtitle: { nl: 'Amsterdam', en: 'Amsterdam' },

  // Long descriptive texts
  footer_desc: {
    nl: 'Professionele zwemschool die bouwt aan plezier en veiligheid in het water. Direct starten zonder wachttijd in Monnickendam.',
    en: 'Professional swimming school that builds on fun and safety in the water. Start immediately without a waiting list in Monnickendam.'
  },
  about_text_1: {
    nl: 'Young Dolphins is ontstaan uit de passie voor zwemmen en de overtuiging dat kwalitatief zwemonderwijs toegankelijk moet zijn voor iedereen. We zagen een behoefte aan zwemlessen die verder gaan dan alleen de techniek.',
    en: 'Young Dolphins was born from a passion for swimming and the conviction that quality swimming education should be accessible to everyone. We saw a need for swimming lessons that go beyond just technique.'
  },
  about_text_2: {
    nl: 'In Monnickendam zijn we gestart met een team van enthousiaste en gecertificeerde instructeurs. Door onze persoonlijke aanpak en kleine lesgroepen kunnen we de aandacht geven die nodig is om snelle en veilige voortgang te garanderen.',
    en: 'In Monnickendam, we started with a team of enthusiastic and certified instructors. Through our personal approach and small lesson groups, we can provide the attention needed to guarantee fast and safe progress.'
  },
  loc_intro: {
    nl: 'We geven les in moderne, warme zwembaden. Onze belangrijkste locatie is momenteel Monnickendam, waar we direct kunnen starten zonder wachtlijst.',
    en: 'We teach in modern, warm pools. Our main location is currently Monnickendam, where we can start immediately without a waiting list.'
  }
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
