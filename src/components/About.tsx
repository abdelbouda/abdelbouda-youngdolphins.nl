import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="over-ons" className="py-24 overflow-hidden bg-slate-50 scroll-mt-24" aria-label="Over ons">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3E0]/10 text-[#0077A3] text-xs font-bold uppercase tracking-[0.2em] mb-8">
              {t('about_passion')}
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-black text-[#1B365D] mb-8 leading-[1.1] text-center">
            {t('about_title_1')} <br />
            <span className="text-[#00A3E0] italic">{t('about_title_2')}</span>
          </h2>
          
          <div className="space-y-6 text-slate-700 text-lg leading-relaxed font-medium text-center">
            <p>{t('about_text_1')}</p>
            <p>{t('about_text_2')}</p>
          </div>
          
          <div className="mt-12 bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-100 w-full">
              <div className="grid grid-cols-2 gap-8 text-center">
                  <div>
                      <p className="text-4xl sm:text-5xl font-black text-[#00A3E0] mb-1">100%</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('about_safety_focus')}</p>
                  </div>
                  <div>
                      <p className="text-4xl sm:text-5xl font-black text-[#00A3E0] mb-1">{t('about_team_title')}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('about_team_subtitle')}</p>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
