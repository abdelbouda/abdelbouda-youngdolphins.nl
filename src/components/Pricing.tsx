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
        { nl: '1 les per week (45 min)', en: '1 lesson per week (45 min)' },
        { nl: 'Groep van max. 8 kinderen', en: 'Group of max. 8 children' },
        { nl: 'Focus op watervrij maken', en: 'Focus on water confidence' },
        { nl: 'Maandelijkse voortgang', en: 'Monthly progress check' }
      ],
      cta: t('cta_register'),
      popular: false
    },
    {
      name: t('pricing_progress_title'),
      price: t('pricing_progress_price'),
      desc: t('pricing_progress_desc'),
      features: [
        { nl: '2 lessen per week (90 min totaal)', en: '2 lessons per week (90 min total)' },
        { nl: 'Snelweg naar A/B/C diploma', en: 'Fast track to A/B/C diploma' },
        { nl: 'Kleine groepen (max 6)', en: 'Small groups (max 6)' },
        { nl: 'Wekelijkse persoonlijke feedback', en: 'Weekly personal feedback' },
        { nl: 'Inhaalopties bij afwezigheid', en: 'Make-up options for absence' }
      ],
      cta: t('cta_register'),
      popular: true
    },
    {
      name: t('pricing_private_title'),
      price: t('pricing_private_price'),
      desc: t('pricing_private_desc'),
      features: [
        { nl: '1-op-1 aandacht van expert', en: '1-on-1 expert attention' },
        { nl: 'Maatwerk voor elk kind', en: 'Tailored for each child' },
        { nl: 'Ideaal bij watervrees/angst', en: 'Ideal for water fear/anxiety' },
        { nl: 'Bepaal je eigen lestijden', en: 'Choose your own lesson times' },
        { nl: 'Maximale progressie per les', en: 'Maximum progress per lesson' }
      ],
      cta: t('cta_register'),
      popular: false
    }
  ];

  const { language } = useLanguage();

  return (
    <section id="tarieven" className="py-24 bg-slate-50 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-display font-black text-primary mb-6">Pakketten & Tarieven</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">Kies het traject dat het beste bij de behoeften van jouw kind past.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`pricing-card-3d relative rounded-[2.5rem] p-6 lg:p-8 flex flex-col ${plan.popular ? 'bg-secondary text-white shadow-3xl scale-102 z-10' : 'bg-white text-primary shadow-premium'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                  Meest gekozen
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={`text-xl font-black mb-3 ${plan.popular ? 'text-white' : 'text-primary'}`}>{plan.name}</h3>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className={`text-sm font-bold opacity-70`}>{plan.name === 'Progress+' ? '/ maand' : '/ les'}</span>
                </div>
                <p className={`text-xs font-medium leading-relaxed px-2 ${plan.popular ? 'text-white/80' : 'text-slate-500'}`}>
                  {plan.desc}
                </p>
              </div>

              <div className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${plan.popular ? 'bg-white/20 text-white' : 'bg-secondary text-white'}`}>
                      <Check size={10} strokeWidth={4} />
                    </div>
                    <span className={`text-xs font-bold ${plan.popular ? 'text-white' : 'text-slate-700'}`}>
                      {feat[language]}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#signup-form"
                className={`w-full py-4 rounded-xl font-black text-base transition-all shadow-xl text-center flex items-center justify-center ${plan.popular ? 'bg-white text-secondary hover:bg-primary hover:text-white' : 'bg-secondary text-white hover:bg-primary shadow-secondary/20'}`}
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
