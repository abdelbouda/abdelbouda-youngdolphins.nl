import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { Check } from 'lucide-react';

export default function Pricing() {
  const { t } = useLanguage();

  const plans = [
    {
      name: t('pricing_starter_title'),
      price: t('pricing_starter_price'),
      desc: t('pricing_starter_desc'),
      features: [
        'price_feat_starter_1',
        'price_feat_starter_2',
        'price_feat_starter_3',
        'price_feat_starter_4',
        'price_feat_starter_5'
      ],
      cta: t('cta_register'),
      popular: false
    },
    {
      name: t('pricing_progress_title'),
      price: t('pricing_progress_price'),
      desc: t('pricing_progress_desc'),
      features: [
        'price_feat_progress_1',
        'price_feat_progress_2',
        'price_feat_progress_3',
        'price_feat_progress_4',
        'price_feat_progress_5'
      ],
      cta: t('cta_register'),
      popular: true
    },
    {
      name: t('pricing_private_title'),
      price: t('pricing_private_price'),
      desc: t('pricing_private_desc'),
      features: [
        'price_feat_private_1',
        'price_feat_private_2',
        'price_feat_private_3',
        'price_feat_private_4',
        'price_feat_private_5'
      ],
      cta: t('cta_register'),
      popular: false
    }
  ];

  const { language } = useLanguage();

  return (
    <section id="tarieven" className="py-24 bg-slate-50 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-black text-primary mb-6">{t('pricing_title')}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">{t('pricing_subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`pricing-card-3d relative rounded-[3rem] p-8 lg:p-10 flex flex-col transition-all duration-300 ${plan.popular ? 'bg-secondary text-primary shadow-2xl scale-105 z-10' : 'bg-white text-primary shadow-premium hover:shadow-2xl hover:-translate-y-1'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[12px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-xl whitespace-nowrap">
                   {t('hero_most_popular')}
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-black mb-4 text-primary">{plan.name}</h3>
                <div className="flex items-center justify-center gap-1 mb-4">
                  <span className="text-5xl font-black tracking-tight">{plan.price}</span>
                  <span className="text-base font-bold opacity-70">{plan.name === 'Progress+' || plan.name === t('pricing_progress_title') ? t('hero_per_month') : t('hero_per_lesson')}</span>
                </div>
                <p className={`text-sm font-medium leading-relaxed min-h-[60px] ${plan.popular ? 'text-primary/90' : 'text-slate-500'}`}>
                  {plan.desc}
                </p>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-primary text-white shadow-sm' : 'bg-secondary/10 text-secondary'}`}>
                      <Check size={12} strokeWidth={4} aria-hidden="true" />
                    </div>
                    <span className={`text-sm font-bold leading-tight ${plan.popular ? 'text-primary' : 'text-slate-700'}`}>
                      {t(feat)}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#signup-form"
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl text-center flex items-center justify-center ${plan.popular ? 'bg-primary text-white hover:bg-primary/90 hover:scale-[1.02]' : 'bg-secondary text-white hover:bg-secondary/90 hover:scale-[1.02] shadow-secondary/20'}`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
