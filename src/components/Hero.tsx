import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { Phone, ArrowRight, MapPin } from 'lucide-react';

interface HeroProps {
  settings?: any; // Wordt niet gebruikt in de component, maar nodig voor de prop van App.tsx
}

export default function Hero({ settings }: HeroProps) {
  const { t, language } = useLanguage();
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
  ], [t]);

  const handleCardClick = (e: React.MouseEvent, index: number) => {
    if (isMobile) {
      if (activeCard !== index) {
        e.preventDefault();
        setActiveCard(index);
      }
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-2 lg:pt-40 lg:pb-4 overflow-hidden scroll-mt-24 bg-aquatic">
      {/* De rest van je JSX blijft exact hetzelfde - geen enkele wijziging nodig */}
      {/* ... */}
    </section>
  );
}