import React, { Suspense, lazy, useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './lib/LanguageContext';
import { useSettings } from './hooks/useFirestore';
import { db } from './firebase'; // alleen Firestore, geen auth

// Kritische componenten direct laden
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import USPSection from './components/USPSection';
import SEO from './components/SEO';
import ZwemlesAmsterdam from './components/ZwemlesAmsterdam';
import ZwemlesMonnickendam from './components/ZwemlesMonnickendam';

// Blog imports
import BlogOverview from './components/BlogOverview';
import ZwemlesMonnickendamWaterland from './pages/blog/ZwemlesMonnickendamWaterland';
import ZwemlesAmsterdamDiplomaKijkles from './pages/blog/ZwemlesAmsterdamDiplomaKijkles';
import ZwemkledingChecklist from './pages/blog/ZwemkledingChecklist';
import ZwemonderwijsPlanner from './pages/blog/ZwemonderwijsPlanner';

// Lazy load non‑critical components
const StickyCTA = lazy(() => import('./components/ConversionWidgets').then(m => ({ default: m.default })));
const WhatsAppWidget = lazy(() => import('./components/ConversionWidgets').then(m => ({ default: m.WhatsAppWidget })));
const Privacy = lazy(() => import('./components/Privacy'));
const Voorwaarden = lazy(() => import('./components/Voorwaarden'));
const Cookies = lazy(() => import('./components/Cookies'));
const RegioSEO = lazy(() => import('./components/RegioSEO'));
const BentoFeatures = lazy(() => import('./components/BentoFeatures'));
const Locations = lazy(() => import('./components/Locations'));
const About = lazy(() => import('./components/About'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const InteractiveSignup = lazy(() => import('./components/InteractiveSignup'));
const Footer = lazy(() => import('./components/Footer'));
const Pricing = lazy(() => import('./components/Pricing'));
const ServiceAreas = lazy(() => import('./components/ServiceAreas'));

// Admin componenten (lazy, want alleen bij #admin)
const AdminLogin = lazy(() => import('./components/AdminLogin'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

interface Settings {
  schoolName?: string;
  tagline_key?: string;
  telefoon?: string;
  email?: string;
  [key: string]: any;
}

function AppContent() {
  const { t } = useLanguage();
  const { settings } = useSettings() as { settings: Settings | null; loading: boolean };

  const title = settings?.schoolName ? `${settings.schoolName} - ${t('seo_title')}` : t('seo_title');

  return (
    <div className="min-h-screen bg-white">
      <SEO title={title} description={settings?.tagline_key ? t(settings.tagline_key) : t('seo_description')} keywords={t('seo_keywords')} />
      <Navbar settings={settings} />
      <main>
        <Hero settings={settings} />
        <USPSection />
        <Suspense fallback={<div className="h-40 flex items-center justify-center"><div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div></div>}>
          <RegioSEO /><BentoFeatures /><ServiceAreas /><Pricing /><About /><Locations /><FAQSection /><InteractiveSignup />
          <Privacy /><Voorwaarden /><Cookies />
        </Suspense>
      </main>
      <Suspense fallback={null}><Footer settings={settings} /></Suspense>
      <Suspense fallback={null}><StickyCTA settings={settings} /></Suspense>
      <Suspense fallback={null}><WhatsAppWidget settings={settings} /></Suspense>
    </div>
  );
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [hash, setHash] = useState('');
  const [pathname, setPathname] = useState('');

  // Volg hash en pathname wijzigingen
  useEffect(() => {
    const handleRouteChange = () => {
      setHash(window.location.hash);
      setPathname(window.location.pathname);
    };
    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // 🔥 Lazy load Firebase Auth ALLEEN bij admin route
  useEffect(() => {
    const isAdminRoute = hash === '#admin';
    if (!isAdminRoute) {
      setCheckingAuth(false);
      return;
    }

    let unsubscribe: (() => void) | null = null;
    let mounted = true;

    const initAdminAuth = async () => {
      try {
        // Dynamisch de auth module laden (gebeurt pas als je naar #admin gaat)
        const { getAuthModule } = await import('./firebase');
        const auth = await getAuthModule();
        const { onAuthStateChanged } = await import('firebase/auth');
        
        if (!mounted) return;
        unsubscribe = onAuthStateChanged(auth, (user) => {
          if (mounted) {
            setIsAdmin(!!user);
            setCheckingAuth(false);
          }
        });
      } catch (err) {
        if (mounted) {
          console.error('Admin auth init failed', err);
          setCheckingAuth(false);
        }
      }
    };

    initAdminAuth();
    return () => {
      mounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, [hash]);

  // Route checks
  const isAdminRoute = hash === '#admin';
  const isZwemlesAmsterdam = pathname === '/zwemles-amsterdam';
  const isZwemlesMonnickendam = pathname === '/zwemles-monnickendam';
  const isBlogOverview = pathname === '/blog' || pathname === '/blog/';
  const isBlogPost = pathname.startsWith('/blog/') && !isBlogOverview;

  // Landingspagina's
  if (isZwemlesAmsterdam) return <LanguageProvider><ZwemlesAmsterdam /></LanguageProvider>;
  if (isZwemlesMonnickendam) return <LanguageProvider><ZwemlesMonnickendam /></LanguageProvider>;
  if (isBlogOverview) return <LanguageProvider><BlogOverview /></LanguageProvider>;
  if (isBlogPost) {
    const slug = pathname.replace('/blog/', '').replace(/\/$/, '');
    switch (slug) {
      case 'zwemles-monnickendam-waterland': return <LanguageProvider><ZwemlesMonnickendamWaterland /></LanguageProvider>;
      case 'zwemles-amsterdam-diploma-kijkles': return <LanguageProvider><ZwemlesAmsterdamDiplomaKijkles /></LanguageProvider>;
      case 'zwemkleding-checklist': return <LanguageProvider><ZwemkledingChecklist /></LanguageProvider>;
      case 'planner-zwemonderwijs': return <LanguageProvider><ZwemonderwijsPlanner /></LanguageProvider>;
      default: return <LanguageProvider><BlogOverview /></LanguageProvider>;
    }
  }

  // 🔥 Admin route (lazy loaded)
  if (isAdminRoute) {
    if (checkingAuth) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      );
    }
    if (isAdmin) {
      return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>}>
          <AdminDashboard />
        </Suspense>
      );
    }
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>}>
        <AdminLogin onLogin={() => setIsAdmin(true)} />
      </Suspense>
    );
  }

  // Default: normale site (zonder Firebase Auth)
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}