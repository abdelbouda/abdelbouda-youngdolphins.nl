import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function About() {
  const { language, t } = useLanguage();

  return (
    <section id="over-ons" className="py-24 overflow-hidden bg-slate-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-black uppercase tracking-[0.2em] mb-8">
              {t('about_passion')}
          </div>
          <h2 className="text-5xl lg:text-7xl font-display font-black text-primary mb-8 leading-[1.1] text-center">
            {t('about_title_1')} <br />
            <span className="text-secondary italic">{t('about_title_2')}</span>
          </h2>
          <div className="space-y-6 text-slate-600 text-xl leading-relaxed font-medium text-center">
            <p>
              {t('about_text_1')}
            </p>
            <p>
              {t('about_text_2')}
            </p>
          </div>
          
          <div className="mt-12 bg-white rounded-3xl p-10 shadow-premium border border-slate-100 w-full">
              <div className="grid grid-cols-2 gap-12 text-center">
                  <div>
                      <p className="text-5xl font-black text-secondary mb-1">100%</p>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('about_safety_focus')}</p>
                  </div>
                  <div>
                      <p className="text-5xl font-black text-secondary mb-1">{t('about_team_title')}</p>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('about_team_subtitle')}</p>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
