import React, { Suspense, lazy, useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './lib/LanguageContext';
import { useSettings } from './hooks/useFirestore';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import USPSection from './components/USPSection';
import SEO from './components/SEO';
import StickyCTA, { WhatsAppWidget } from './components/ConversionWidgets';
import Privacy from './components/Privacy';
import Voorwaarden from './components/Voorwaarden';
import Cookies from './components/Cookies';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

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
        description={settings?.tagline_key ? t(settings.tagline_key) : t('seo_description')}
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const isAdminRoute = typeof window !== 'undefined' && window.location.hash === '#admin';

  if (isAdminRoute) {
    if (checkingAuth) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      );
    }

    if (isAdmin) {
      return <AdminDashboard />;
    }

    return (
      <LanguageProvider>
        <AdminLogin onLogin={() => setIsAdmin(true)} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}