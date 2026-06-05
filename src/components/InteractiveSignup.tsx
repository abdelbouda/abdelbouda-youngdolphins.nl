import { motion } from 'motion/react';
import { Send, Phone, Mail, ShieldCheck, Accessibility, Users, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const DolphinIcon = ({ className = "w-5 h-5", color = "#5AC1E6" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 14C4.5 12.5 6.5 10 10 9.5C13.5 9 15 10.5 16 12.5C17 14.5 18.5 13.5 20 13C21.5 12.5 23 11.5 23 10C23 8.5 21.5 7 19.5 6.5C17 5.8 14 6.5 12 8.5C10 10.5 8.5 13 8 15C7.8 16 8.2 17 9.5 17.5C10.8 18 12 17.5 12.5 16.5L12.8 15.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export default function InteractiveSignup() {
  const { language, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    childInfo: '',
    package: 'Progress+',
    gewenstNiveau: '',
    tijdstip: '',
    notities: '',
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const niveaus = [
    { value: 'niveau_1', key: 'niveau_1_naam' },
    { value: 'niveau_2', key: 'niveau_2_naam' },
    { value: 'niveau_3', key: 'niveau_3_naam' },
    { value: 'niveau_4', key: 'niveau_4_naam' },
  ];

  const tijdstippen = [
    { value: '16:00-17:00', label_nl: 'Zondag 16:00 - 17:00', label_en: 'Sunday 16:00 - 17:00' },
    { value: '17:00-18:00', label_nl: 'Zondag 17:00 - 18:00', label_en: 'Sunday 17:00 - 18:00' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await addDoc(collection(db, 'wachtlijst'), {
        ouderNaam: formData.name,
        email: formData.email,
        telefoon: formData.phone,
        kindNaam: formData.childInfo,
        gewenstePackage: formData.package,
        gewenstNiveau: formData.gewenstNiveau,
        gewensteDagen: ['sunday'],
        tijdstip: formData.tijdstip,
        voorkeurstaal: language,
        notities: formData.notities,
        inschrijfdatum: new Date(),
        status: 'nieuw'
      });
      await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, phone: formData.phone, email: formData.email, childInfo: formData.childInfo, package: formData.package })
      });
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', childInfo: '', package: 'Progress+', gewenstNiveau: '', tijdstip: '', notities: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : t('form_error_unknown'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-primary text-white relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.1),transparent_50%)]"></div>
      {/* Animaties alleen op desktop */}
      {!isMobile && (
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} 
          className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" 
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Linker kolom (informatie) */}
          <div className="lg:sticky lg:top-32">
            <h2 className="text-4xl lg:text-5xl font-display font-black mb-8 leading-[1.1] text-white">{t('contact_title')}</h2>
            <p className="text-xl text-slate-300 mb-16 max-w-md font-medium leading-relaxed">{t('contact_desc')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-secondary"><Phone size={24} /></div>
                <p className="text-sm font-black uppercase tracking-widest text-slate-500">{t('form_phone_label')}</p>
                <a href="tel:06-28421354" className="text-lg font-bold hover:text-secondary transition-colors">06-28421354</a>
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

          {/* Formulier – minder 3D op mobiel */}
          <motion.div 
            id="signup-form" 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.3)] text-primary relative overflow-hidden max-w-lg mx-auto lg:ml-auto transition-all duration-500"
            style={!isMobile ? { transformStyle: 'preserve-3d' } : {}}
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
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <DolphinIcon className="w-5 h-5" color="#5AC1E6" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t('form_direct_register')}</span>
                </div>
                {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold">{error}</div>}
                
                {/* Naam ouder */}
                <div className="space-y-1">
                  <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_name_parent')}</label>
                  <input id="name" required name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder={t('form_placeholder_parent')} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold text-sm" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_phone')}</label>
                    <input id="phone" required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder={t('form_placeholder_phone')} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_email')}</label>
                    <input id="email" required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder={t('form_placeholder_email')} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold text-sm" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="childInfo" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_child_info')}</label>
                    <input id="childInfo" required name="childInfo" value={formData.childInfo} onChange={handleInputChange} type="text" placeholder={t('form_placeholder_child')} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="package" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_package')}</label>
                    <select id="package" name="package" value={formData.package} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none font-bold text-sm" aria-label={t('form_package')}>
                      <option value="Starter">{t('package_starter')}</option>
                      <option value="Progress+">{t('package_progress')}</option>
                      <option value="Privé">{t('package_private')}</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="gewenstNiveau" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_select_level')}</label>
                    <select id="gewenstNiveau" name="gewenstNiveau" value={formData.gewenstNiveau} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none font-bold text-sm" aria-label={t('form_select_level')}>
                      <option value="">{t('form_select_level')}</option>
                      {niveaus.map(n => (<option key={n.value} value={n.value}>{t(n.key)}</option>))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{language === 'nl' ? 'Tijdstip' : 'Timeslot'}</label>
                    <div className="flex gap-3">
                      {tijdstippen.map(tijd => (
                        <button key={tijd.value} type="button" onClick={() => setFormData(prev => ({ ...prev, tijdstip: tijd.value }))} className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition ${formData.tijdstip === tijd.value ? 'bg-secondary text-white shadow-premium shadow-secondary/30' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'}`}>
                          {language === 'nl' ? tijd.label_nl.split(' ').slice(1).join(' ') : tijd.label_en.split(' ').slice(1).join(' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="notities" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_notes')}</label>
                  <textarea id="notities" name="notities" value={formData.notities} onChange={handleInputChange} rows={2} placeholder={t('form_placeholder_notes')} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none font-bold text-sm resize-none" />
                </div>
                
                <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2">Eenmalige inschrijfkosten EUR 25,-</div>
                
                <button type="submit" disabled={isLoading} className="w-full py-4 bg-secondary text-white rounded-2xl font-black text-lg shadow-premium shadow-secondary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50">
                  {isLoading ? <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div> : <><Send size={20} />{t('form_submit')}</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}