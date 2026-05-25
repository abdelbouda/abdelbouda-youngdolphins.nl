import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Mail } from 'lucide-react';

export default function StickyCTA() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  // Gebruik useCallback voor stabiele event listener
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const contactSection = document.getElementById('contact');
    let isVisibleValue = scrollY > 600;
    
    if (contactSection) {
      const rect = contactSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) isVisibleValue = false;
    }
    
    // Alleen state updaten als de waarde echt verandert
    if (isVisibleValue !== isVisible) setIsVisible(isVisibleValue);
  }, [isVisible]);

  useEffect(() => {
    // Gebruik 'passive: true' voor betere scroll-performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-xl"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-3 sm:p-4 flex items-center justify-between gap-4 border border-white shadow-2xl">
            <div className="hidden sm:block ml-4">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Young Dolphins</p>
              <p className="text-sm font-bold text-[#1B365D] truncate">{t('sticky_bar_text')}</p>
            </div>
            <a
              href="#signup-form"
              className="flex-1 sm:flex-none px-8 py-4 bg-[#1B365D] text-white rounded-2xl font-bold text-sm shadow-md hover:bg-[#234373] transition-all active:scale-95 whitespace-nowrap text-center"
              aria-label={t('cta_register')}
            >
              {t('cta_register')}
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
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-4 bg-[#1B365D] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-lg whitespace-nowrap"
          >
            {t('whatsapp_tooltip')}
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.a
        href="https://wa.me/31628421354"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="block w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center mb-4 hover:scale-105 transition-transform"
        aria-label={language === 'nl' ? 'WhatsApp ons' : 'WhatsApp us'}
      >
        <MessageSquare size={28} />
      </motion.a>

      <motion.a
        href="mailto:info@youngdolphins.nl"
        className="block w-14 h-14 bg-[#00A3E0] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        aria-label={language === 'nl' ? 'Stuur een e-mail' : 'Send an email'}
      >
        <Mail size={28} />
      </motion.a>
    </div>
  );
}
