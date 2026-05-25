import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { Phone, ArrowRight } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(max-width: 640px)");
    setIsMobile(m.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    m.addEventListener('change', handler);
    return () => m.removeEventListener('change', handler);
  }, []);

  const pricingCards = useMemo(() => [
    { title: t('pricing_starter_title'), price: '€25', unit: '/ les', color: 'bg-white', text: 'text-[#1B365D]', desc: t('pricing_starter_desc') },
    { title: t('pricing_progress_title'), price: '€170', unit: '/ maand', color: 'bg-[#00A3E0]', text: 'text-white', popular: true, desc: t('pricing_progress_desc') },
    { title: t('pricing_private_title'), price: '€50', unit: '/ les', color: 'bg-white', text: 'text-[#1B365D]', desc: t('pricing_private_desc') }
  ], [t]);

  return (
    <section id="hero" className="relative pt-24 pb-12 overflow-hidden bg-aquatic" aria-label="Hero sectie">
      {/* Background bubbles (geoptimaliseerd voor performance) */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/20 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00A3E0] text-white text-xs font-bold uppercase tracking-widest mb-6 shadow-lg"
          >
            {t('hero_badge')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl sm:text-6xl font-black text-[#1B365D] leading-[1.1] mb-6"
          >
            {t('hero_title').split(':').map((part, i) => (
              <span key={i} className={i === 1 ? 'block text-[#00A3E0]' : ''}>{part.trim()}</span>
            ))}
          </motion.h1>

          <p className="text-lg sm:text-xl text-slate-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('hero_subtitle')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
            {pricingCards.map((card, i) => (
              <a 
                key={i}
                href="#signup-form"
                className={`${card.color} ${card.text} p-4 rounded-2xl shadow-sm border border-slate-200 block transition-transform hover:scale-105`}
              >
                <span className="text-[10px] font-bold uppercase">{card.title}</span>
                <div className="text-2xl font-black">{card.price}</div>
              </a>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#signup-form" className="w-full sm:w-auto px-8 py-4 bg-[#1B365D] text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#234373] transition-colors">
              {t('cta_register')} <ArrowRight size={20} />
            </a>
            <a href="tel:0628421354" className="text-[#1B365D] font-bold flex items-center gap-2 px-8 py-4">
              <Phone size={20} /> {t('cta_contact')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
