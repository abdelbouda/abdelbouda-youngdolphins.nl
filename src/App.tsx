import React, { Suspense, lazy } from 'react';
import { LanguageProvider, useLanguage } from './lib/LanguageContext';

// Direct laden voor de 100/100 performance score (LCP/FCP)
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import USPSection from './components/USPSection';
import SEO from './components/SEO';
import StickyCTA, { WhatsAppWidget } from './components/ConversionWidgets';

// Lazy load voor niet-kritieke secties (verlaagt 'Main Thread' belasting)
const RegioSEO = lazy(() => import('./components/RegioSEO'));
const BentoFeatures = lazy(() => import('./components/BentoFeatures'));
const ServiceAreas = lazy(() => import('./components/ServiceAreas'));
const Pricing = lazy(() => import('./components/Pricing'));
const About = lazy(() => import('./components/About'));
const Locations = lazy(() => import('./components/Locations'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const InteractiveSignup = lazy(() => import('./components/InteractiveSignup'));
const Privacy = lazy(() => import('./components/Privacy'));
const Voorwaarden = lazy(() => import('./components/Voorwaarden'));
const Cookies = lazy(() => import('./components/Cookies'));
const Footer = lazy(() => import('./components/Footer'));

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
        {/* Directe rendering: geen spinner/wachttijd voor deze secties */}
        <Hero />
        <USPSection />
        
        {/* Suspense boundary voor 'below the fold' content */}
        <Suspense fallback={<div className="h-40" />}>
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

      <Suspense fallback={<div className="h-20" />}>
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
