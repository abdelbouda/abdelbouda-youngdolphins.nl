import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { Phone, ArrowRight } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const pricingCards = [
    { 
      title: t('pricing_starter_title'), 
      price: '€25', 
      unit: '/ les', 
      color: 'bg-white', 
      text: 'text-primary',
      desc: t('pricing_starter_desc')
    },
    { 
      title: t('pricing_progress_title'), 
      price: '€170', 
      unit: '/ maand', 
      color: 'bg-secondary', 
      text: 'text-white', 
      popular: true,
      desc: t('pricing_progress_desc')
    },
    { 
      title: t('pricing_private_title'), 
      price: '€50', 
      unit: '/ les', 
      color: 'bg-white', 
      text: 'text-primary',
      desc: t('pricing_private_desc')
    }
  ];

  const handleCardClick = (e: React.MouseEvent, index: number) => {
    // If it's a touch device and the card isn't active yet, just show info
    if (window.matchMedia("(max-width: 640px)").matches) {
      if (activeCard !== index) {
        e.preventDefault();
        setActiveCard(index);
      }
    }
  };

  return (
    <section id="hero" className="relative pt-6 pb-2 lg:pt-8 lg:pb-4 overflow-hidden scroll-mt-24 bg-aquatic">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            id={`bubble-${i}`}
            key={i}
            className="absolute rounded-full bg-secondary/10"
            initial={{ 
              width: Math.random() * 200 + 100, 
              height: Math.random() * 200 + 100,
              x: Math.random() * 100 + "%",
              y: "110%",
              opacity: 0.1
            }}
            animate={{ 
              y: "-20%",
              x: (Math.random() * 100 - 10) + "%",
              opacity: [0, 0.2, 0]
            }}
            transition={{ 
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: i * 3
            }}
            style={{ filter: "blur(40px)" }}
          />
        ))}

        {/* Animated Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-[200%] h-24 text-white fill-current opacity-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <motion.path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105.7,112.51,105.1,162.22,95.83,211.92,86.56,263.4,67.23,321.39,56.44Z"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto py-2 lg:py-4">
          <motion.div
            id="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-xs sm:text-sm font-black uppercase tracking-widest mb-4 shadow-sm border border-secondary/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            {t('hero_badge')}
          </motion.div>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-primary leading-[1.1] mb-2 drop-shadow-sm"
          >
            {t('hero_title').split(':').map((part, i) => (
              <span key={i} className={i === 1 ? 'block text-secondary' : ''}>
                {part.trim()}
              </span>
            ))}
          </motion.h1>

          <motion.p
            id="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 mb-4 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            {t('hero_subtitle')}
          </motion.p>

          {/* Small Pricing Cards as CTA */}
          <div id="hero-pricing-grid" className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 max-w-3xl mx-auto">
            {pricingCards.map((card, i) => (
              <motion.a 
                id={`hero-card-${i}`}
                key={i}
                href="#signup-form"
                onClick={(e) => handleCardClick(e, i)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -5, 0],
                }}
                whileHover={{ y: -10, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
                  opacity: { duration: 0.5, delay: 0.25 + (i * 0.1) },
                  scale: { duration: 0.2 }
                }}
                className={`${card.color} ${card.text} p-4 rounded-xl shadow-premium border border-slate-100 transition-all flex flex-col items-center group relative cursor-pointer overflow-hidden min-h-[120px]`}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {card.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest leading-none z-10 whitespace-nowrap">
                    Meest gekozen
                  </div>
                )}
                
                {/* Default content - hidden when active (hover/tap) */}
                <div className={`flex flex-col items-center transition-all duration-300 ${activeCard === i ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
                  <span className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">{card.title}</span>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-xl font-black tracking-tight">{card.price}</span>
                    <span className="text-[10px] font-bold opacity-60">{card.unit}</span>
                  </div>
                  <div className={`mt-2 px-3 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-wider transition-all ${card.popular ? 'bg-white text-secondary' : 'bg-secondary text-white'}`}>
                    Inschrijven
                  </div>
                </div>

                {/* Info content - visible when active (hover/tap) */}
                <div className={`absolute inset-0 p-4 flex flex-col items-center justify-center text-center transition-all duration-300 ${activeCard === i ? 'opacity-100 translate-y-0 z-20' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                  <span className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-50">{card.title}</span>
                  <p className="text-[10px] leading-tight font-bold px-1 text-inherit">
                    {card.desc}
                  </p>
                  <div className="mt-2 text-[10px] font-black underline underline-offset-2">
                    {window.matchMedia("(max-width: 640px)").matches ? 'Tik nogmaals' : 'Inschrijven →'}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            id="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <a
              id="hero-cta-main"
              href="#signup-form"
              className="group relative w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-[2rem] font-black text-lg transition-all shadow-premium gradient-shine flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">{t('cta_register')}</span>
              <ArrowRight size={22} className="relative z-10" />
            </a>
            
            <a
              id="hero-cta-phone"
              href="tel:0628421354"
              className="w-full sm:w-auto flex items-center justify-center gap-3 text-primary font-black text-lg transition-colors px-10 py-4"
            >
              <div className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center transition-colors">
                <Phone size={18} className="fill-primary text-primary transition-colors" />
              </div>
              {t('cta_contact')}
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
