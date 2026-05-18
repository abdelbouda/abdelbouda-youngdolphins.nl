import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { Award, Star, Shield, Users, Clock, Heart } from 'lucide-react';

export default function BentoFeatures() {
  const { t } = useLanguage();

  const features = [
    {
      title: 'Zwemles A-B-C',
      desc: 'Complete begeleiding van eerste spetter tot officieel diploma.',
      icon: Award,
      size: 'lg:col-span-2 lg:row-span-2',
      color: 'bg-secondary/10 text-secondary',
      image: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Kleine Groepen',
      desc: 'Maximale aandacht voor elk kind.',
      icon: Users,
      color: 'bg-primary/5 text-primary'
    },
    {
      title: 'Direct Starten',
      desc: 'In Monnickendam starten we zonder wachttijden.',
      icon: Clock,
      color: 'bg-coral/10 text-coral'
    },
    {
      title: 'Privé lessen',
      desc: '1-op-1 coaching voor supersnelle progressie.',
      icon: Star,
      size: 'lg:col-span-2',
      color: 'bg-accent/10 text-accent'
    }
  ];

  return (
    <section id="lessen" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-display font-black text-primary mb-6"
          >
            {t('features_title')}
          </motion.h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            {t('features_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${f.size || ''} relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-premium transition-all duration-500`}
            >
              <div className={`${f.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                <f.icon size={28} />
              </div>
              
              <h3 className="text-2xl font-bold text-primary mb-4">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
