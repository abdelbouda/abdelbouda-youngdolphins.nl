import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { Phone, ArrowRight, MapPin } from 'lucide-react';

interface HeroProps {
  settings?: any;
}

export default function Hero({ settings }: HeroProps) {
  const { t, language } = useLanguage();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pricingCards = useMemo(() => [
    { title: t('pricing_starter_title'), price: '€25', unit: '/ les', color: 'bg-white', text: 'text-primary', desc: t('pricing_starter_desc'), popular: false },
    { title: t('pricing_progress_title'), price: '€170', unit: '/ maand', color: 'bg-secondary', text: 'text-white', desc: t('pricing_progress_desc'), popular: true },
    { title: t('pricing_private_title'), price: '€50', unit: '/ les', color: 'bg-white', text: 'text-primary', desc: t('pricing_private_desc'), popular: false }
  ], [t]);

  const handleCardClick = (e: React.MouseEvent, index: number) => {
    if (isMobile && activeCard !== index) {
      e.preventDefault();
      setActiveCard(index);
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-2 lg:pt-40 lg:pb-4 overflow-hidden scroll-mt-24 bg-aquatic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto py-2 lg:py-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-white text-xs sm:text-sm font-black uppercase tracking-widest mb-4 shadow-md">
            🚀 {t('hero_badge')}
          </div>

          {/* Titel */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-primary leading-[1.1] mb-2">
            {t('hero_title')}
          </h1>

          {/* Subtitel */}
          <p className="text-lg sm:text-xl text-slate-600 mb-4 max-w-2xl mx-auto leading-relaxed font-medium">
            {t('hero_subtitle')}
          </p>

          {/* Locatie links */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <a href="/zwemles-amsterdam" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 text-primary rounded-full font-bold text-sm shadow-md hover:bg-white transition border border-slate-100">
              <MapPin size={16} className="text-secondary" />
              {language === 'nl' ? 'Zwemles Amsterdam' : 'Swimming Lessons Amsterdam'}
              <ArrowRight size={14} className="opacity-50" />
            </a>
            <a href="/zwemles-monnickendam" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 text-primary rounded-full font-bold text-sm shadow-md hover:bg-white transition border border-slate-100">
              <MapPin size={16} className="text-secondary" />
              {language === 'nl' ? 'Zwemles Monnickendam' : 'Swimming Lessons Monnickendam'}
              <ArrowRight size={14} className="opacity-50" />
            </a>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 max-w-3xl mx-auto">
            {pricingCards.map((card, i) => (
              <div key={i} className={`${card.color} ${card.text} p-4 rounded-xl shadow-premium border border-slate-100 flex flex-col items-center min-h-[120px] relative`}>
                {card.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
                    {t('hero_most_popular')}
                  </div>
                )}
                <span className="text-[10px] font-black uppercase tracking-widest mb-1 text-primary">{card.title}</span>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-xl font-black tracking-tight">{card.price}</span>
                  <span className="text-[10px] font-bold text-primary/80">{card.popular ? t('hero_per_month') : t('hero_per_lesson')}</span>
                </div>
                <a href="#signup-form" className="mt-2 px-3 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-wider bg-primary text-white">
                  {t('hero_register_btn')}
                </a>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a href="#signup-form" className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-[2rem] font-black text-lg shadow-premium flex items-center justify-center gap-2">
              {t('cta_register')} <ArrowRight size={22} />
            </a>
            <a href="tel:0628421354" className="w-full sm:w-auto flex items-center justify-center gap-3 text-primary font-black text-lg px-10 py-4">
              <div className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center">
                <Phone size={18} />
              </div>
              {t('cta_contact')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}