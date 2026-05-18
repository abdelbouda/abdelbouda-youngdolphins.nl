import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { CheckCircle2, Waves, MapPin } from 'lucide-react';

export default function USPSection() {
  const { t, language } = useLanguage();

  const points = [
    { nl: "Direct starten met zwemles - geen wachttijd", en: "Start swimming lessons immediately - no waiting list" },
    { nl: "Kleine groepen voor maximale aandacht", en: "Small groups for maximum attention" },
    { nl: "Gediplomeerde en ervaren instructeurs", en: "Certified and experienced instructors" },
    { nl: "Warme en veilige zwembaden in Monnickendam", en: "Warm and safe pools in Monnickendam" },
    { nl: "Plezier en vertrouwen staan centraal", en: "Fun and trust are central" }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary shadow-premium rounded-[3rem] p-8 lg:p-20 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 p-20 text-white/5 pointer-events-none">
            <Waves size={200} />
          </div>
          
          <div className="flex flex-col items-center relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-display font-black text-white mb-10 leading-tight text-center">
              {t('why_monnickendam_title')}
            </h2>
            <div className="space-y-6 w-full">
              {points.map((point, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 group justify-center"
                >
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-xl bg-secondary text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="text-lg lg:text-xl text-white/90 font-bold leading-relaxed">{point[language]}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 bg-coral text-white p-6 lg:p-8 rounded-3xl font-black text-xl lg:text-3xl shadow-premium border-4 border-white inline-flex items-center gap-4">
               🚀 {t('no_waiting_list')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
