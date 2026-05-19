import React, { Suspense, lazy } from 'react';
import { LanguageProvider, useLanguage } from './lib/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import USPSection from './components/USPSection';
import SEO from './components/SEO';
import StickyCTA, { WhatsAppWidget } from './components/ConversionWidgets';

// Lazy load non-critical components
const BentoFeatures = lazy(() => import('./components/BentoFeatures'));
const Locations = lazy(() => import('./components/Locations'));
const About = lazy(() => import('./components/About'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const InteractiveSignup = lazy(() => import('./components/InteractiveSignup'));
const Footer = lazy(() => import('./components/Footer'));
const Pricing = lazy(() => import('./components/Pricing'));
const ServiceAreas = lazy(() => import('./components/ServiceAreas'));

function AppContent() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={language === 'nl' 
          ? "Zwemles Amsterdam & Monnickendam | Direct Starten - Geen Wachtlijst | Young Dolphins"
          : "Swimming Lessons Amsterdam & Monnickendam | Start Immediately - No Waiting List | Young Dolphins"}
        description={language === 'nl'
          ? "Zoek je zwemles in Amsterdam (Noord, Oost, Zuid, West) of Monnickendam? Bij Young Dolphins kun je direct starten zonder wachtlijst. Professionele ABC-diploma zwemlessen in kleine groepen."
          : "Looking for swimming lessons in Amsterdam or Monnickendam? At Young Dolphins you can start immediately without a waiting list. Professional ABC diploma swimming lessons in small groups."}
        keywords="zwemles Amsterdam, zwemles Monnickendam, direct starten zwemles, geen wachtlijst zwemles, ABC diploma Amsterdam, zwemles Amsterdam Noord, zwemles Amsterdam Oost, zwemles Amsterdam Zuid, zwemles Amsterdam West"
      />

      <Navbar />
      
      <main>
        <Hero />
        <USPSection />
        
        <Suspense fallback={<div className="h-40 flex items-center justify-center"><div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div></div>}>
          <BentoFeatures />
          <ServiceAreas />
          <Pricing />
          <About />
          <Locations />
          <FAQSection />
          <InteractiveSignup />
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
