import React, { Suspense, lazy } from 'react';
import { LanguageProvider, useLanguage } from './lib/LanguageContext';
import { useSettings } from './hooks/useFirestore';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import USPSection from './components/USPSection';
import SEO from './components/SEO';
import StickyCTA, { WhatsAppWidget } from './components/ConversionWidgets';
import Privacy from './components/Privacy';
import Voorwaarden from './components/Voorwaarden';
import Cookies from './components/Cookies';

// Lazy load non-critical components
const RegioSEO = lazy(() => import('./components/RegioSEO'));
const BentoFeatures = lazy(() => import('./components/BentoFeatures'));
const Locations = lazy(() => import('./components/Locations'));
const About = lazy(() => import('./components/About'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const InteractiveSignup = lazy(() => import('./components/InteractiveSignup'));
const Footer = lazy(() => import('./components/Footer'));
const Pricing = lazy(() => import('./components/Pricing'));
const ServiceAreas = lazy(() => import('./components/ServiceAreas'));

function AppContent() {
  const { t } = useLanguage();
  const { settings } = useSettings();

  const title = settings?.schoolName 
    ? `${settings.schoolName} - ${t('seo_title')}` 
    : t('seo_title');

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={title}
        description={settings?.tagline || t('seo_description')}
        keywords={t('seo_keywords')}
      />

      <Navbar settings={settings} />
      
      <main>
        <Hero settings={settings} />
        <USPSection />
        
        <Suspense fallback={<div className="h-40 flex items-center justify-center"><div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div></div>}>
          <RegioSEO />
          <BentoFeatures />
          <ServiceAreas />
          <Pricing />
          <About />
          <Locations />
          <FAQSection />
          <InteractiveSignup />
          
          <Privacy />
          <Voorwaarden />
          <Cookies />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer settings={settings} />
      </Suspense>
      
      <StickyCTA settings={settings} />
      <WhatsAppWidget settings={settings} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}