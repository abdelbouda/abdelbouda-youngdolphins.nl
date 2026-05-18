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
import StickyCTA, { WhatsAppWidget } from './components/ConversionWidgets';

function AppContent() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={language === 'nl' 
          ? "Zwemles Direct Zonder Wachtlijst in Monnickendam | Young Dolphins Zwemschool"
          : "Start Swimming Immediately Without Waiting List in Monnickendam | Young Dolphins Swim School"}
        description={language === 'nl'
          ? "Wil je kind direct starten met zwemles? Young Dolphins in Monnickendam biedt professionele zwemlessen voor A, B en C diploma's zonder wachttijd. Kleine groepen & warme zwembaden."
          : "Do you want your child to start swimming lessons immediately? Young Dolphins in Monnickendam offers professional swimming lessons for A, B, and C diplomas without a waiting time."}
        keywords="zwemles Monnickendam, geen wachtlijst zwemles, Sportfondsen Monnickendam zwemles, Young Dolphins Zwemschool, zwemles regio Amsterdam, ABC diploma Monnickendam"
      />

      <Navbar />
      
      <main>
        <Hero />
        <USPSection />
        <BentoFeatures />
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
