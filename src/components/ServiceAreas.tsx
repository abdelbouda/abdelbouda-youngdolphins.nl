import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { MapPin } from 'lucide-react';

export default function ServiceAreas() {
  const { t, language } = useLanguage();

  const areas = [
    'area_monnickendam',
    'area_noord',
    'area_oost',
    'area_zuid',
    'area_west',
    'area_centrum',
    'area_zuidoost'
  ];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-display font-black text-primary mb-6">
            {t('hero_title_1')} {t('hero_title_2')} <span className="text-secondary">{t('hero_title_3')}</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            {t('hero_desc_start')} <strong>{t('hero_desc_highlight')}</strong> {t('hero_desc_waitlist')}. 
            {t('hero_desc_end')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {areas.map((area, i) => (
            <motion.div
              key={area}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-premium transition-all"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <MapPin size={20} />
              </div>
              <span className="font-bold text-primary group-hover:text-secondary transition-colors text-sm sm:text-base leading-tight">{t(area as any)}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 lg:p-12 rounded-[3rem] shadow-premium border border-slate-100">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-display font-black text-primary mb-6">{t('bento_title')}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {language === 'nl' 
                  ? 'Waarom maanden wachten als je kind vandaag nog kan beginnen? Bij onze zwemschool in Amsterdam staan plezier en veiligheid voorop. Onze instructeurs zijn gespecialiseerd in het watervrij maken en het opleiden voor het ABC-diploma.'
                  : 'Why wait months when your child can start today? At our swim school in Amsterdam, fun and safety come first. Our instructors are specialized in making children water-confident and training for the ABC diploma.'}
                {' '}
                {language === 'nl'
                  ? 'Of je nu in Amsterdam Noord, Oost, Zuid of West woont, er is altijd een locatie in de buurt.'
                  : 'Whether you live in Amsterdam North, East, South, or West, there is always a location nearby.'}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-xs font-black uppercase tracking-widest">{t('feature_abc_title')}</span>
                <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-xs font-black uppercase tracking-widest">{t('feature_private_title')}</span>
                <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-xs font-black uppercase tracking-widest">{t('footer_regio')} {t('area_monnickendam')}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-40 bg-secondary/10 rounded-3xl flex items-center justify-center p-6 text-center shadow-sm border border-secondary/20">
                   <p className="text-2xl font-display font-black text-primary leading-tight">
                    {t('bento_card_diploma').split(' ').map((word, i) => <React.Fragment key={i}>{word}{i === 0 ? <br/> : ''}</React.Fragment>)}
                   </p>
                </div>
                <div className="h-32 bg-secondary rounded-3xl p-6 flex flex-col justify-end text-primary">
                  <p className="text-2xl font-black">100%</p>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">{t('bento_certified')}</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-32 bg-primary rounded-3xl p-6 flex flex-col justify-end text-white">
                  <p className="text-2xl font-black">{t('bento_card_direct')}</p>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">{t('bento_card_start')}</p>
                </div>
                <div className="h-40 bg-secondary/10 rounded-3xl flex items-center justify-center p-6 text-center shadow-sm border border-secondary/20">
                   <p className="text-2xl font-display font-black text-primary leading-tight">
                    {t('bento_no_waitlist').split(' ').map((word, i) => <React.Fragment key={i}>{word}{i === 0 ? <br/> : ''}</React.Fragment>)}
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
