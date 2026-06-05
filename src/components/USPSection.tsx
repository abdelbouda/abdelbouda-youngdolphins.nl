import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

export default function USPSection() {
  const { t } = useLanguage();

  const points = [
    'usp_point_1',
    'usp_point_2',
    'usp_point_3',
    'usp_point_4',
    'usp_point_5'
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary shadow-premium rounded-[3rem] p-8 lg:p-20 relative overflow-hidden group">
          {/* Animated Background Blobs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [0, 50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-[80px] pointer-events-none"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              x: [0, -30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/10 rounded-full blur-[60px] pointer-events-none"
          />
          
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
                    <CheckCircle2 size={18} aria-hidden="true" />
                  </div>
                  <p className="text-lg lg:text-xl text-white/90 font-bold leading-relaxed">{t(point)}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 bg-coral text-primary p-6 lg:p-8 rounded-3xl font-black text-xl lg:text-3xl shadow-premium border-4 border-white inline-flex items-center gap-4">
               🚀 {t('no_waiting_list')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}