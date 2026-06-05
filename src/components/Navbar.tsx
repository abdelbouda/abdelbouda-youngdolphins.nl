import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import Logo from './Logo';

interface NavbarProps {
  settings?: any;
}

export default function Navbar({ settings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [isBlogPage, setIsBlogPage] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Controleer of de huidige route een blogpagina is
    setIsBlogPage(window.location.pathname.startsWith('/blog'));
  }, []);

  const navLinks = [
    { name: t('nav_home'), href: isBlogPage ? '/' : '#hero' },
    { name: t('nav_lessons'), href: isBlogPage ? '/#lessen' : '#lessen' },
    { name: t('nav_locations'), href: isBlogPage ? '/#locaties' : '#locaties' },
    { name: t('nav_pricing'), href: isBlogPage ? '/#tarieven' : '#tarieven' },
    { name: t('nav_about'), href: isBlogPage ? '/#over-ons' : '#over-ons' },
    { name: t('nav_faq'), href: isBlogPage ? '/#faq' : '#faq' },
    { name: t('nav_blog'), href: '/blog' }
  ];

  const tagline = settings?.tagline_key ? t(settings.tagline_key) : t('cta_register');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'h-16 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg' : 'h-20 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center">
            <Logo className="w-20 sm:w-24" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-sm font-bold text-primary/70 hover:text-secondary transition-colors group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
                </a>
              ))}
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
            <button 
              onClick={() => setLanguage(language === 'nl' ? 'en' : 'nl')}
              className="flex items-center gap-2 text-xs font-bold text-primary/60 hover:text-secondary uppercase tracking-widest transition-all"
              aria-label={language === 'nl' ? 'Switch to English' : 'Wissel naar Nederlands'}
            >
              <Globe size={14} aria-hidden="true" />
              {t('nav_lang_name')}
            </button>
            <a
              href={isBlogPage ? '/#signup-form' : '#signup-form'}
              className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-secondary transition-all shadow-premium gradient-shine"
            >
              {tagline}
            </a>
          </div>

          {/* Mobiele knoppen */}
          <div className="lg:hidden flex items-center gap-4">
            <button 
              onClick={() => setLanguage(language === 'nl' ? 'en' : 'nl')} 
              className="p-2 text-primary focus:outline-none focus:ring-2 focus:ring-secondary rounded-full"
              aria-label={language === 'nl' ? 'Switch to English' : 'Wissel naar Nederlands'}
            >
              <Globe size={20} aria-hidden="true" />
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-primary focus:outline-none focus:ring-2 focus:ring-secondary rounded-full"
              aria-label={isOpen ? 'Sluit menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobiel menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 overflow-hidden shadow-2xl"
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-bold text-primary/80 hover:text-secondary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href={isBlogPage ? '/#signup-form' : '#signup-form'}
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-6 py-4 bg-secondary text-white rounded-2xl font-bold text-lg shadow-premium"
              >
                {tagline}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}