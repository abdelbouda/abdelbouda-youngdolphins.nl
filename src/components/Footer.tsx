import { Waves, Instagram, Facebook, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

import Logo from './Logo';

export default function Footer() {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-accent to-coral"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <Logo className="w-32 mb-8 !items-start" dark />
            <p className="text-slate-200 mb-10 max-w-sm leading-relaxed font-medium">
              {t('footer_desc')}
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
                { Icon: Facebook, label: 'Facebook', href: 'https://facebook.com' }
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-secondary transition-all shadow-sm border border-white/10"
                  aria-label={`${t('footer_follow')} ${item.label}`}
                >
                  <item.Icon size={24} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-white mb-8 uppercase text-xs tracking-[0.3em] opacity-50">{t('footer_lessons')}</h4>
            <ul className="space-y-5">
              {[
                'footer_link_abc', 
                'footer_link_private', 
                'footer_link_specials'
              ].map((key) => (
                <li key={key}>
                  <a href="#lessen" className="text-slate-300 hover:text-secondary transition-colors font-bold flex items-center gap-2 group">
                    {t(key)}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white mb-8 uppercase text-xs tracking-[0.3em] opacity-50">{t('footer_nav')}</h4>
            <ul className="space-y-5">
              {[
                { key: 'nav_home', href: 'home' },
                { key: 'nav_locations', href: 'locaties' },
                { key: 'nav_about', href: 'over-ons' },
                { key: 'nav_pricing', href: 'tarieven' }
              ].map((item) => (
                <li key={item.key}>
                  <a href={`#${item.href}`} className="text-slate-300 hover:text-secondary transition-colors font-bold">
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white mb-8 uppercase text-xs tracking-[0.3em] opacity-50 text-center lg:text-left">{t('footer_regio')}</h4>
            <div className="flex flex-wrap lg:flex-col gap-x-4 gap-y-3 justify-center lg:justify-start">
              {[
                'area_noord', 'area_oost', 'area_zuid', 'area_west', 'area_centrum', 'area_zuidoost'
              ].map((key) => (
                <a 
                  key={key} 
                  href="#signup-form" 
                  className="text-slate-300 hover:text-secondary transition-colors font-bold text-xs uppercase tracking-widest whitespace-nowrap"
                >
                  {t(key)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-white mb-8 uppercase text-xs tracking-[0.3em] opacity-50">{t('footer_contact')}</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary">
                    <Phone size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">{t('footer_phone_pool')}</p>
                    <a href="tel:0628421354" className="text-lg font-black text-white hover:text-secondary transition-colors">06-28421354</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary">
                    <Mail size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">{t('footer_direct_contact')}</p>
                    <a href="mailto:info@youngdolphins.nl" className="text-lg font-black text-white hover:text-secondary transition-colors">info@youngdolphins.nl</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">
            © {currentYear} {t('footer_built')}
          </p>
          <div className="flex gap-10 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition-colors">{t('footer_privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer_terms')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer_cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
