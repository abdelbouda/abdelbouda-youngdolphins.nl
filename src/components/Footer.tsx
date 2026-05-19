import { Waves, Instagram, Facebook, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

import Logo from './Logo';

export default function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-accent to-coral"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <Logo className="w-32 mb-8 !items-start" dark />
            <p className="text-slate-400 mb-10 max-w-sm leading-relaxed font-medium">
              {language === 'nl' 
                ? "Professionele zwemschool die bouwt aan plezier en veiligheid in het water. Direct starten zonder wachttijd in Monnickendam."
                : "Professional swimming school that builds on fun and safety in the water. Start immediately without a waiting list in Monnickendam."}
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
                  aria-label={`Volg ons op ${item.label}`}
                >
                  <item.Icon size={24} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-white mb-8 uppercase text-xs tracking-[0.3em] opacity-50">Lessen</h4>
            <ul className="space-y-5">
              {['A-B-C Diploma', 'Privé / Duo', 'Monnickendam Specials'].map((item) => (
                <li key={item}>
                  <a href="#lessen" className="text-slate-300 hover:text-secondary transition-colors font-bold flex items-center gap-2 group">
                    {item}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white mb-8 uppercase text-xs tracking-[0.3em] opacity-50">Navigatie</h4>
            <ul className="space-y-5">
              {['Home', 'Locaties', 'Over ons', 'Tarieven'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-slate-300 hover:text-secondary transition-colors font-bold">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white mb-8 uppercase text-xs tracking-[0.3em] opacity-50 text-center lg:text-left">Regio Amsterdam</h4>
            <div className="flex flex-wrap lg:flex-col gap-x-4 gap-y-3 justify-center lg:justify-start">
              {['Amsterdam Noord', 'Amsterdam Oost', 'Amsterdam Zuid', 'Amsterdam West', 'Amsterdam Centrum', 'Zuidoost'].map((area) => (
                <a 
                  key={area} 
                  href="#signup-form" 
                  className="text-slate-300 hover:text-secondary transition-colors font-bold text-xs uppercase tracking-widest whitespace-nowrap"
                >
                  {area}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-white mb-8 uppercase text-xs tracking-[0.3em] opacity-50">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary">
                    <Phone size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Telefoon Pool</p>
                    <a href="tel:0628421354" className="text-lg font-black">06-28421354</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary">
                    <Mail size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Direct contact</p>
                    <a href="mailto:info@youngdolphins.nl" className="text-lg font-black">info@youngdolphins.nl</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">
            © {currentYear} Young Dolphins Zwemschool. Built for speed.
          </p>
          <div className="flex gap-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Voorwaarden</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
