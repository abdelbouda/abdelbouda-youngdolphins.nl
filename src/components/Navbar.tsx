import { motion, AnimatePresence } from 'motion/react';
import { Waves, Menu, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';

import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav_home'), href: '#hero' },
    { name: t('nav_lessons'), href: '#lessen' },
    { name: t('nav_locations'), href: '#locaties' },
    { name: t('nav_pricing'), href: '#tarieven' },
    { name: t('nav_about'), href: '#over-ons' },
    { name: t('nav_faq'), href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'h-16 glass-morphism' : 'h-20 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Logo className="w-20 sm:w-24" />
          </motion.div>

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

            {/* Language Switcher */}
            <button 
              onClick={() => setLanguage(language === 'nl' ? 'en' : 'nl')}
              className="flex items-center gap-2 text-xs font-bold text-primary/60 hover:text-secondary uppercase tracking-widest transition-all"
            >
              <Globe size={14} />
              {language === 'nl' ? 'English' : 'Nederlands'}
            </button>

            <a
              href="#signup-form"
              className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-secondary transition-all shadow-premium gradient-shine"
            >
              {t('cta_register')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button 
              onClick={() => setLanguage(language === 'nl' ? 'en' : 'nl')}
              className="p-2 text-primary"
            >
              <Globe size={20} />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-primary">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 overflow-hidden shadow-2xl"
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-bold text-primary/80 hover:text-secondary"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#signup-form"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-6 py-4 bg-secondary text-white rounded-2xl font-bold text-lg shadow-premium"
              >
                {t('cta_register')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
