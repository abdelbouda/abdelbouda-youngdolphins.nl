import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language, t } = useLanguage();

  const faqs = [
    {
      question: 'faq_q1',
      answer: 'faq_a1'
    },
    {
      question: 'faq_q2',
      answer: 'faq_a2'
    },
    {
      question: 'faq_q3',
      answer: 'faq_a3'
    },
    {
      question: 'faq_q4',
      answer: 'faq_a4'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white relative scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-black text-primary mb-6">
                {t('faq_title').split(' ').map((word, i) => (
                  word === 'vragen' || word === 'questions' ? <span key={i} className="text-secondary ml-1">{word}</span> : (i === 0 ? word : ` ${word}`)
                ))}
            </h2>
            <p className="text-lg text-slate-500 font-medium italic">{t('faq_subtitle')}</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="group border border-slate-100 rounded-[2rem] overflow-hidden transition-all hover:shadow-premium bg-white"
            >
              <button 
                id={`faq-btn-${index}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-content-${index}`}
                className="w-full flex items-center justify-between p-8 text-left outline-none"
              >
                <span className="text-lg lg:text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                    {t(faq.question)}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${openIndex === index ? 'bg-secondary text-white rotate-180' : 'bg-slate-50 text-secondary'}`}>
                    <ChevronDown size={24} aria-hidden="true" />
                </div>
              </button>
              {openIndex === index && (
                <motion.div 
                  id={`faq-content-${index}`}
                  role="region"
                  aria-labelledby={`faq-btn-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="px-8 pb-8"
                >
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    {t(faq.answer)}
                  </p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
