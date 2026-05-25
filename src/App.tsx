import React, { Suspense, lazy } from 'react';
import { LanguageProvider, useLanguage } from './lib/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero'; // Boven de vouw: direct laden
import USPSection from './components/USPSection'; // Boven de vouw: direct laden
import SEO from './components/SEO';
import StickyCTA, { WhatsAppWidget } from './components/ConversionWidgets';
import Privacy from './components/Privacy';
import Voorwaarden from './components/Voorwaarden';
import Cookies from './components/Cookies';

// Lazy load non-critical components (Below the fold)
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

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={t('seo_title')}
        description={t('seo_description')}
      />

      <Navbar />
      
      <main>
        {/* Deze twee laden direct, geen Suspense nodig */}
        <Hero />
        <USPSection />
        
        {/* Alles eronder is lazy, wat nu perfect werkt door je nieuwe vite.config.ts */}
        <Suspense fallback={<div className="h-20"></div>}>
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
        <Footer />
      </Suspense>
      
      <StickyCTA />
      <WhatsAppWidget />
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
