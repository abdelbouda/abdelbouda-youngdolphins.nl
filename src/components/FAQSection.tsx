import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';

// Custom hook voor responsive detectie
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

export default function FAQSection() {
  const { t } = useLanguage();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: 'faq_q1', answer: 'faq_a1' },
    { question: 'faq_q2', answer: 'faq_a2' },
    { question: 'faq_q3', answer: 'faq_a3' },
    { question: 'faq_q4', answer: 'faq_a4' }
  ];

  // Voor mobiel: toggle antwoord
  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white relative scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-black text-primary mb-6">
            {t('faq_title').split(' ').map((word, i) => (
              word === 'vragen' || word === 'questions' ? 
                <span key={i} className="text-secondary ml-1">{word}</span> : 
                (i === 0 ? word : ` ${word}`)
            ))}
          </h2>
          <p className="text-lg text-slate-500 font-medium italic">{t('faq_subtitle')}</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl bg-white border border-slate-100 transition-all duration-300 ${
                !isMobile ? 'hover:shadow-xl hover:border-secondary/30 group hover:z-20' : ''
              }`}
            >
              {/* Vraag - klikbaar op mobiel, hover effect op desktop */}
              <div
                onClick={() => isMobile && toggleAnswer(index)}
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  !isMobile ? 'hover:bg-gradient-to-r hover:from-secondary/5 hover:to-transparent' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg lg:text-xl font-bold text-primary transition-colors">
                    {t(faq.question)}
                  </h3>
                  <div className={`w-8 h-8 rounded-full bg-slate-50 text-secondary flex items-center justify-center transition-all duration-300 ${
                    !isMobile ? 'group-hover:bg-secondary group-hover:text-white group-hover:rotate-180' : ''
                  } ${isMobile && openIndex === index ? 'rotate-180 bg-secondary text-white' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>

              {/* Desktop hover antwoord (boven de vraag) */}
              {!isMobile && (
                <div className="absolute left-0 right-0 -top-2 translate-y-[-100%] z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-[-110%] transition-all duration-300 pointer-events-none">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
                    <div className="p-6 text-slate-600 leading-relaxed font-medium text-base">
                      {t(faq.answer)}
                    </div>
                  </div>
                </div>
              )}

              {/* Mobiel klik antwoord (onder de vraag) */}
              {isMobile && (
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed font-medium text-base border-t border-slate-100">
                        {t(faq.answer)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}