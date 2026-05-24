import { Instagram, Facebook, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

import Logo from './Logo';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-24 pb-12 overflow-hidden relative">
      {/* Premium Gradient Top Border Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-cyan-400 to-coral"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid veranderd naar 5 kolommen op grote schermen voor betere verdeling */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          
          {/* Kolom 1: Branding & Socials */}
          <div className="lg:col-span-1">
            <Logo className="w-32 mb-8 !items-start" dark />
            <p className="text-slate-200 mb-8 max-w-sm leading-relaxed font-medium text-sm">
              {t('footer_desc')}
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com/youngdolphins' },
                { Icon: Facebook, label: 'Facebook', href: 'https://facebook.com/youngdolphins' }
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-secondary hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-white/10"
                  aria-label={`${t('footer_follow')} ${item.label}`}
                >
                  <item.Icon size={20} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Kolom 2: Aanbod */}
          <div>
            <h4 className="font-black text-white mb-6 uppercase text-xs tracking-[0.25em] opacity-60">{t('footer_lessons')}</h4>
            <ul className="space-y-4">
              {[
                'footer_link_abc', 
                'footer_link_private', 
                'footer_link_specials'
              ].map((key) => (
                <li key={key}>
                  <a href="#lessen" className="text-slate-300 hover:text-secondary transition-colors font-bold text-sm flex items-center gap-1.5 group">
                    {t(key)}
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Navigatie */}
          <div>
            <h4 className="font-black text-white mb-6 uppercase text-xs tracking-[0.25em] opacity-60">{t('footer_nav')}</h4>
            <ul className="space-y-4">
              {[
                { key: 'nav_home', href: 'home' },
                { key: 'nav_locations', href: 'locaties' },
                { key: 'nav_about', href: 'over-ons' },
                { key: 'nav_pricing', href: 'tarieven' }
              ].map((item) => (
                <li key={item.key}>
                  <a href={`#${item.href}`} className="text-slate-300 hover:text-secondary transition-colors font-bold text-sm">
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Regio's & SEO Targeting */}
          <div>
            <h4 className="font-black text-white mb-6 uppercase text-xs tracking-[0.25em] opacity-60">{t('footer_regio')}</h4>
            <div className="flex flex-col gap-3.5">
              {/* Lokale SEO Focus Hotspot */}
              <a 
                href="#signup-form" 
                className="text-secondary hover:text-cyan-300 transition-colors font-extrabold text-xs uppercase tracking-widest flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>
                Monnickendam (Nieuw!)
              </a>
              {[
                'area_noord', 'area_oost', 'area_zuid', 'area_west', 'area_centrum', 'area_zuidoost'
              ].map((key) => (
                <a 
                  key={key} 
                  href="#signup-form" 
                  className="text-slate-300 hover:text-white transition-colors font-bold text-xs uppercase tracking-widest"
                >
                  {t(key)}
                </a>
              ))}
            </div>
          </div>

          {/* Kolom 5: Direct Contact */}
          <div>
            <h4 className="font-black text-white mb-6 uppercase text-xs tracking-[0.25em] opacity-60">{t('footer_contact')}</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-secondary border border-white/5">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{t('footer_phone_pool')}</p>
                  <a href="tel:0628421354" className="text-base font-black text-white hover:text-secondary transition-colors">06-28421354</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-secondary border border-white/5">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{t('footer_direct_contact')}</p>
                  <a href="mailto:info@youngdolphins.nl" className="text-base font-black text-white hover:text-secondary transition-colors break-all">info@youngdolphins.nl</a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Onderste Balk: Copyright & Juridische Links */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] text-center md:text-left">
            © {currentYear} {t('footer_built')}
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <a href="/privacy" className="hover:text-secondary transition-colors">{t('footer_privacy')}</a>
            <a href="/voorwaarden" className="hover:text-secondary transition-colors">{t('footer_terms')}</a>
            <a href="#cookies" className="hover:text-secondary transition-colors">{t('footer_cookies')}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
