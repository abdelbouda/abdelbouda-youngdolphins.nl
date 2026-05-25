import { Instagram, Facebook, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import Logo from './Logo';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1B365D] text-white pt-20 pb-10 overflow-hidden relative" aria-label="Footer">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00A3E0] via-cyan-400 to-[#FF6B6B]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Kolom 1: Branding */}
          <div className="lg:col-span-1">
            <Logo className="w-32 mb-6" dark />
            <p className="text-slate-300 mb-6 text-sm leading-relaxed font-medium">
              {t('footer_desc')}
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com/youngdolphins' },
                { Icon: Facebook, label: 'Facebook', href: 'https://facebook.com/youngdolphins' }
              ].map((item, i) => (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" 
                   className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#00A3E0] transition-colors"
                   aria-label={`${t('footer_follow')} ${item.label}`}>
                  <item.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Kolommen 2-5: Navigatie (Geoptimaliseerd voor leesbaarheid) */}
          {[
            { title: t('footer_lessons'), links: ['footer_link_abc', 'footer_link_private', 'footer_link_specials'] },
            { title: t('footer_nav'), links: ['nav_home', 'nav_locations', 'nav_about', 'nav_pricing'] },
            { title: t('footer_regio'), links: ['area_noord', 'area_oost', 'area_zuid', 'area_west', 'area_centrum', 'area_zuidoost'] }
          ].map((section, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-white mb-6 uppercase text-[10px] tracking-widest opacity-70">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((key) => (
                  <li key={key}>
                    <a href={`#${key}`} className="text-slate-300 hover:text-[#00A3E0] transition-colors text-sm font-bold flex items-center gap-1 group">
                      {t(key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Kolom 5: Contact */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-[10px] tracking-widest opacity-70">{t('footer_contact')}</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:0628421354" className="text-sm font-bold flex items-center gap-3 hover:text-[#00A3E0]">
                  <Phone size={16} className="text-[#00A3E0]" /> 06-28421354
                </a>
              </li>
              <li>
                <a href="mailto:info@youngdolphins.nl" className="text-sm font-bold flex items-center gap-3 hover:text-[#00A3E0]">
                  <Mail size={16} className="text-[#00A3E0]" /> info@youngdolphins.nl
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Onderste Balk */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 uppercase tracking-widest">
          <p>© {currentYear} Young Dolphins</p>
          <div className="flex gap-6">
            <a href="/#privacy" className="hover:text-white">{t('footer_privacy')}</a>
            <a href="/#voorwaarden" className="hover:text-white">{t('footer_terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
