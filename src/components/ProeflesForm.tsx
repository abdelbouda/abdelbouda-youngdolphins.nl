import { motion } from 'motion/react';
import { Send, Phone, Mail, ShieldCheck, Accessibility, Users, Globe } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const DolphinIcon = ({ className = "w-5 h-5", color = "#5AC1E6" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path 
      d="M4 14C4.5 12.5 6.5 10 10 9.5C13.5 9 15 10.5 16 12.5C17 14.5 18.5 13.5 20 13C21.5 12.5 23 11.5 23 10C23 8.5 21.5 7 19.5 6.5C17 5.8 14 6.5 12 8.5C10 10.5 8.5 13 8 15C7.8 16 8.2 17 9.5 17.5C10.8 18 12 17.5 12.5 16.5L12.8 15.5" 
      stroke={color} 
      strokeWidth="2.5" 
      strokeLinecap="round" 
    />
  </svg>
);

export default function ProeflesForm() {
  const { language, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    ouderNaam: '',
    email: '',
    telefoon: '',
    kindNaam: '',
    kindLeeftijd: '',
    selectedPackage: 'Progress+',
    gewenstNiveau: '',
    gewensteDagen: [] as string[],
    notities: '',
  });

  const dagen = [
    { value: 'monday', key: 'dag_maandag' },
    { value: 'tuesday', key: 'dag_dinsdag' },
    { value: 'wednesday', key: 'dag_woensdag' },
    { value: 'thursday', key: 'dag_donderdag' },
    { value: 'friday', key: 'dag_vrijdag' },
    { value: 'saturday', key: 'dag_zaterdag' },
    { value: 'sunday', key: 'dag_zondag' },
  ];

  const niveaus = [
    { value: 'niveau_1', key: 'niveau_1_naam' },
    { value: 'niveau_2', key: 'niveau_2_naam' },
    { value: 'niveau_3', key: 'niveau_3_naam' },
    { value: 'niveau_4', key: 'niveau_4_naam' },
  ];

  const packages = [
    { value: 'Starter', key: 'package_starter' },
    { value: 'Progress+', key: 'package_progress' },
    { value: 'Privé', key: 'package_private' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDagToggle = (dag: string) => {
    setFormData(prev => ({
      ...prev,
      gewensteDagen: prev.gewensteDagen.includes(dag)
        ? prev.gewensteDagen.filter(d => d !== dag)
        : [...prev.gewensteDagen, dag]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Opslaan in Firestore wachtlijst (MET package veld)
      await addDoc(collection(db, 'wachtlijst'), {
        ouderNaam: formData.ouderNaam,
        email: formData.email,
        telefoon: formData.telefoon,
        kindNaam: formData.kindNaam,
        kindLeeftijd: parseInt(formData.kindLeeftijd) || 0,
        gewenstePackage: formData.selectedPackage,
        gewenstNiveau: formData.gewenstNiveau,
        gewensteDagen: formData.gewensteDagen,
        voorkeurstaal: language,
        notities: formData.notities,
        inschrijfdatum: new Date(),
        status: 'nieuw'
      });

      // 2. Verstuur emails via bestaande API
      await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.ouderNaam,
          phone: formData.telefoon,
          email: formData.email,
          childInfo: `${formData.kindNaam} (${formData.kindLeeftijd} jaar)`,
          package: formData.selectedPackage
        })
      });

      setSubmitted(true);
      setFormData({ ouderNaam: '', email: '', telefoon: '', kindNaam: '', kindLeeftijd: '', selectedPackage: 'Progress+', gewenstNiveau: '', gewensteDagen: [], notities: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : t('form_error_unknown'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="proefles" className="py-24 bg-primary text-white relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.1),transparent_50%)]"></div>
      
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="lg:sticky lg:top-32">
            <h2 className="text-4xl lg:text-5xl font-display font-black mb-8 leading-[1.1] text-white">
              {t('contact_title')}
            </h2>
            <p className="text-xl text-slate-300 mb-16 max-w-md font-medium leading-relaxed">
              {t('contact_desc')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-secondary"><Phone size={24} /></div>
                <p className="text-sm font-black uppercase tracking-widest text-slate-500">{t('form_phone_label')}</p>
                <a href="tel:0628421354" className="text-lg font-bold hover:text-secondary transition-colors">06-28421354</a>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-secondary"><Mail size={24} /></div>
                <p className="text-sm font-black uppercase tracking-widest text-slate-500">{t('form_email_label')}</p>
                <a href="mailto:info@youngdolphins.nl" className="text-lg font-bold hover:text-secondary transition-colors">info@youngdolphins.nl</a>
              </div>
            </div>
            <div className="mt-16 pt-16 border-t border-white/5 space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary/60"><Accessibility size={16} /></div>
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary/60"><Users size={16} /></div>
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary/60"><Globe size={16} /></div>
              </div>
              <div>
                <p className="font-black text-secondary uppercase tracking-wider text-sm">Join the Dolphins</p>
                <p className="text-sm font-bold text-slate-400">{t('form_diplomas')}</p>
              </div>
            </div>
          </div>

          <motion.div 
            id="proefles-form"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01, boxShadow: "0 40px 80px rgba(0,0,0,0.2)" }}
            viewport={{ once: true }}
            className="bg-white rounded-[2.5rem] p-6 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] text-primary relative overflow-hidden max-w-lg mx-auto lg:ml-auto transition-all duration-500 scroll-mt-24"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 blur-3xl rounded-full pointer-events-none"></div>
            
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-lg"><ShieldCheck size={40} /></div>
                <h3 className="text-2xl font-display font-black mb-3">{t('success_title')}</h3>
                <p className="text-base text-slate-600 font-medium mb-8">{t('success_desc')}</p>
                <button onClick={() => setSubmitted(false)} className="px-8 py-4 bg-primary text-white rounded-2xl font-black shadow-premium hover:bg-secondary transition-all">{t('form_back')}</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <DolphinIcon className="w-5 h-5" color="#5AC1E6" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t('form_direct_register')}</span>
                </div>
                
                {error && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">{error}</div>
                )}

                {/* Naam ouder + Telefoon */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_name_parent')}</label>
                    <input required name="ouderNaam" value={formData.ouderNaam} onChange={handleInputChange} type="text" placeholder={t('form_placeholder_parent')} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold placeholder:text-slate-300 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_phone')}</label>
                    <input required name="telefoon" value={formData.telefoon} onChange={handleInputChange} type="tel" placeholder={t('form_placeholder_phone')} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold placeholder:text-slate-300 text-sm" />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_email')}</label>
                  <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder={t('form_placeholder_email')} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold placeholder:text-slate-300 text-sm" />
                </div>

                {/* Kind + Leeftijd */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_child_info')}</label>
                    <input required name="kindNaam" value={formData.kindNaam} onChange={handleInputChange} type="text" placeholder={t('form_placeholder_child')} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold placeholder:text-slate-300 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_placeholder_age')}</label>
                    <input required name="kindLeeftijd" value={formData.kindLeeftijd} onChange={handleInputChange} type="number" min="2" max="18" placeholder={t('form_placeholder_age')} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold placeholder:text-slate-300 text-sm" />
                  </div>
                </div>

                {/* PACKAGE (Starter/Progress+/Privé) - standaard Progress+ */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_package')}</label>
                  <select
                    name="selectedPackage"
                    value={formData.selectedPackage}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold text-sm appearance-none cursor-pointer"
                  >
                    {packages.map(pkg => (
                      <option key={pkg.value} value={pkg.value}>{t(pkg.key)}</option>
                    ))}
                  </select>
                </div>

                {/* Niveau */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_select_level')}</label>
                  <select name="gewenstNiveau" value={formData.gewenstNiveau} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold text-sm appearance-none cursor-pointer">
                    <option value="">{t('form_select_level')}</option>
                    {niveaus.map(n => (
                      <option key={n.value} value={n.value}>{t(n.key)}</option>
                    ))}
                  </select>
                </div>

                {/* Gewenste dagen */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_days')}</label>
                  <div className="flex flex-wrap gap-2">
                    {dagen.map(dag => (
                      <button key={dag.value} type="button" onClick={() => handleDagToggle(dag.value)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition ${formData.gewensteDagen.includes(dag.value) ? 'bg-secondary text-white shadow-premium shadow-secondary/30' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'}`}>
                        {t(dag.key)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notities */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_notes')}</label>
                  <textarea name="notities" value={formData.notities} onChange={handleInputChange} rows={3} placeholder={t('form_placeholder_notes')} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold placeholder:text-slate-300 text-sm resize-none" />
                </div>
                
                <button type="submit" disabled={isLoading}
                  className="w-full py-4 bg-secondary text-white rounded-2xl font-black text-lg shadow-premium shadow-secondary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? (
                    <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <><Send size={20} />{t('form_submit')}</>
                  )}
                </button>
                
                <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('form_footer')}</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}