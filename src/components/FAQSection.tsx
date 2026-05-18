import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language } = useLanguage();

  const faqs = [
    {
      question: { nl: "Hoe lang duurt het om een zwemdiploma te halen?", en: "How long does it take to get a swimming diploma?" },
      answer: { 
        nl: "Dit hangt af van leeftijd, zelfvertrouwen en lesfrequentie. De meeste kinderen halen diploma A in ongeveer 12–18 maanden met wekelijkse lessen.",
        en: "This depends on age, self-confidence, and lesson frequency. Most children get diploma A in about 12-18 months with weekly lessons."
      }
    },
    {
      question: { nl: "Wat moet mijn kind meenemen naar de eerste les?", en: "What should my child bring to the first lesson?" },
      answer: { 
        nl: "Een badpak of zwembroek, handdoek en slippers zijn voldoende. Wij zorgen voor alle drijfmaterialen en veiligheidsmiddelen.",
        en: "A swimsuit or swim trunks, towel, and flip-flops are enough. We provide all float materials and safety equipment."
      }
    },
    {
      question: { nl: "Kan ik direct starten met zwemles in Monnickendam?", en: "Can I start swimming lessons in Monnickendam immediately?" },
      answer: { 
        nl: "Ja! Bij Young Dolphins in Monnickendam kan je kind direct starten met zwemles. We hebben geen wachtlijsten bij Sportfondsen Monnickendam.",
        en: "Yes! At Young Dolphins in Monnickendam, your child can start swimming lessons immediately. We have no waiting lists at Sportfondsen Monnickendam."
      }
    },
    {
      question: { nl: "Mogen ouders de lessen bekijken?", en: "Can parents watch the lessons?" },
      answer: { 
        nl: "Ja! Alle zwembaden hebben kijkruimtes waar ouders comfortabel kunnen meekijken naar de vorderingen van hun kind.",
        en: "Yes! All pools have viewing areas where parents can comfortably watch their child's progress."
      }
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-black text-primary mb-6">
                Veelgestelde <span className="text-secondary">vragen</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium italic">Alles wat je moet weten over zwemles bij Young Dolphins.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="group border border-slate-100 rounded-[2rem] overflow-hidden transition-all hover:shadow-premium bg-white"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-8 text-left outline-none"
              >
                <span className="text-lg lg:text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                    {faq.question[language]}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${openIndex === index ? 'bg-secondary text-white rotate-180' : 'bg-slate-50 text-secondary'}`}>
                    <ChevronDown size={24} />
                </div>
              </button>
              {openIndex === index && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="px-8 pb-8"
                >
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    {faq.answer[language]}
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
