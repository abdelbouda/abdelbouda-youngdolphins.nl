import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { useState, useEffect } from 'react';
import { MessageSquare, Mail } from 'lucide-react';

export default function StickyCTA() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const contactSection = document.getElementById('contact');
      
      let isVisibleValue = scrollY > 600;
      
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        // Hide if the contact section starts entering the viewport
        if (rect.top < window.innerHeight - 100) {
          isVisibleValue = false;
        }
      }
      
      setIsVisible(isVisibleValue);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-xl"
        >
          <div className="glass-card rounded-[2rem] p-3 sm:p-4 flex items-center justify-between gap-4 border-white/40">
            <div className="hidden sm:block ml-4">
              <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest mb-0.5">Young Dolphins</p>
              <p className="text-sm font-bold text-primary truncate">{t('sticky_bar_text')}</p>
            </div>
            <a
              href="#signup-form"
              className="flex-1 sm:flex-none px-8 py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-premium hover:bg-secondary transition-all active:scale-95 whitespace-nowrap text-center"
              aria-label={t('cta_register')}
            >
              🚀 {t('cta_register')}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function WhatsAppWidget() {
  const { t, language } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="absolute bottom-full right-0 mb-4 bg-primary text-white text-xs font-bold py-2 px-4 rounded-xl shadow-2xl whitespace-nowrap"
          >
            {t('whatsapp_tooltip')}
            <div className="absolute top-full right-4 transform w-0 height-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-primary"></div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.a
        href="https://wa.me/31628421354"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="block w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl relative mb-4"
        aria-label={language === 'nl' ? 'WhatsApp ons' : 'WhatsApp us'}
      >
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-25"></div>
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <MessageSquare size={28} aria-hidden="true" />
        </div>
      </motion.a>

      <motion.a
        href="mailto:info@youngdolphins.nl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="block w-14 h-14 bg-secondary text-white rounded-full shadow-2xl relative"
        aria-label={language === 'nl' ? 'Stuur een e-mail' : 'Send an email'}
      >
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <Mail size={28} aria-hidden="true" />
        </div>
      </motion.a>
    </div>
  );
}