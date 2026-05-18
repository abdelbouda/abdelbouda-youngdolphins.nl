import { LanguageProvider, useLanguage } from './lib/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoFeatures from './components/BentoFeatures';
import Locations from './components/Locations';
import USPSection from './components/USPSection';
import About from './components/About';
import FAQSection from './components/FAQSection';
import InteractiveSignup from './components/InteractiveSignup';
import Footer from './components/Footer';
import Pricing from './components/Pricing';
import SEO from './components/SEO';
import ServiceAreas from './components/ServiceAreas';
import StickyCTA, { WhatsAppWidget } from './components/ConversionWidgets';

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
        <BentoFeatures />
        <ServiceAreas />
        <Pricing />
        <About />
        <Locations />
        <FAQSection />
        <InteractiveSignup />
      </main>

      <Footer />
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
