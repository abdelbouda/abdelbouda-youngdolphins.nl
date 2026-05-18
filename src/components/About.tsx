import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function About() {
  const { language } = useLanguage();

  return (
    <section id="over-ons" className="py-24 overflow-hidden bg-slate-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-black uppercase tracking-[0.2em] mb-8">
              Onze Passie
          </div>
          <h2 className="text-5xl lg:text-7xl font-display font-black text-primary mb-8 leading-[1.1] text-center">
            Liefde voor het water, <br />
            <span className="text-secondary italic">vakkundigheid</span> in de les
          </h2>
          <div className="space-y-6 text-slate-600 text-xl leading-relaxed font-medium text-center">
            <p>
              {language === 'nl' 
                ? "Young Dolphins is ontstaan uit de passie voor zwemmen en de overtuiging dat kwalitatief zwemonderwijs toegankelijk moet zijn voor iedereen. We zagen een behoefte aan zwemlessen die verder gaan dan alleen de techniek."
                : "Young Dolphins was born from a passion for swimming and the conviction that quality swimming education should be accessible to everyone. We saw a need for swimming lessons that go beyond just technique."}
            </p>
            <p>
              {language === 'nl' 
                  ? "In Monnickendam zijn we gestart met een team van enthousiaste en gecertificeerde instructeurs. Door onze persoonlijke aanpak en kleine lesgroepen kunnen we de aandacht geven die nodig is om snelle en veilige voortgang te garanderen."
                  : "In Monnickendam, we started with a team of enthusiastic and certified instructors. Through our personal approach and small lesson groups, we can provide the attention needed to guarantee fast and safe progress."}
            </p>
          </div>
          
          <div className="mt-12 bg-white rounded-3xl p-10 shadow-premium border border-slate-100 w-full">
              <div className="grid grid-cols-2 gap-12 text-center">
                  <div>
                      <p className="text-5xl font-black text-secondary mb-1">100%</p>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Veiligheid focus</p>
                  </div>
                  <div>
                      <p className="text-5xl font-black text-secondary mb-1">Enthousiast</p>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Instructeurs team</p>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
