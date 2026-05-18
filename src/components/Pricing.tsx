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
        { nl: '1 les per week', en: '1 lesson per week' },
        { nl: 'Kleine groepen', en: 'Small groups' },
        { nl: 'Warm zwembad', en: 'Warm pool' },
        { nl: 'Gecertificeerde instructeurs', en: 'Certified instructors' }
      ],
      cta: t('cta_register'),
      popular: false
    },
    {
      name: t('pricing_progress_title'),
      price: t('pricing_progress_price'),
      desc: t('pricing_progress_desc'),
      features: [
        { nl: '2 lessen per week', en: '2 lessons per week' },
        { nl: 'Voortgangsrapportage', en: 'Progress reporting' },
        { nl: 'Extra persoonlijke aandacht', en: 'Extra personal attention' },
        { nl: 'Toegang tot alle locaties', en: 'Access to all locations' },
        { nl: 'Diploma A/B/C begeleiding', en: 'Diploma A/B/C guidance' }
      ],
      cta: t('cta_register'),
      popular: true
    },
    {
      name: t('pricing_private_title'),
      price: t('pricing_private_price'),
      desc: t('pricing_private_desc'),
      features: [
        { nl: 'Privéles 1-op-1', en: '1-on-1 private lessons' },
        { nl: 'Snellere vooruitgang', en: 'Faster progress' },
        { nl: 'Persoonlijk lesplan', en: 'Personal lesson plan' },
        { nl: 'Flexibele tijden', en: 'Flexible times' },
        { nl: 'Diploma A/B/C versneld traject', en: 'Diploma A/B/C accelerated track' }
      ],
      cta: t('cta_register'),
      popular: false
    }
  ];

  const { language } = useLanguage();

  return (
    <section id="tarieven" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-display font-black text-primary mb-6">Pakketten & Tarieven</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">Kies het traject dat het beste bij de behoeften van jouw kind past.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`pricing-card-3d relative rounded-[2.5rem] p-10 flex flex-col ${plan.popular ? 'bg-secondary text-white shadow-3xl scale-105 z-10' : 'bg-white text-primary shadow-premium'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-xl">
                  Meest gekozen
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className={`text-2xl font-black mb-4 ${plan.popular ? 'text-white' : 'text-primary'}`}>{plan.name}</h3>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <span className="text-5xl font-black">{plan.price}</span>
                  <span className={`text-lg font-bold opacity-70`}>{plan.name === 'Progress+' ? '/ maand' : '/ les'}</span>
                </div>
                <p className={`text-sm font-medium leading-relaxed px-4 ${plan.popular ? 'text-white/80' : 'text-slate-500'}`}>
                  {plan.desc}
                </p>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-white/20 text-white' : 'bg-secondary text-white'}`}>
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <span className={`text-sm font-bold ${plan.popular ? 'text-white' : 'text-slate-700'}`}>
                      {feat[language]}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl text-center flex items-center justify-center ${plan.popular ? 'bg-white text-secondary hover:bg-primary hover:text-white' : 'bg-secondary text-white hover:bg-primary shadow-secondary/20'}`}
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
