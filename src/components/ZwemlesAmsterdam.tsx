import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Send, ShieldCheck, Accessibility, Users, Globe, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { useSettings } from '../hooks/useFirestore';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import Logo from './Logo';
import TrustBadges from './TrustBadges';
import ExitIntentPopup from './ExitIntentPopup';

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

export default function ZwemlesAmsterdam() {
  const { language, t } = useLanguage();
  const { settings } = useSettings();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExitPopup, setShowExitPopup] = useState(false);
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

  const stadsdelen = [
    { name: 'Noord', slug: 'amsterdam-noord' },
    { name: 'Oost', slug: 'amsterdam-oost' },
    { name: 'Zuid', slug: 'amsterdam-zuid' },
    { name: 'West', slug: 'amsterdam-west' },
    { name: 'Centrum', slug: 'amsterdam-centrum' },
    { name: 'Zuidoost', slug: 'amsterdam-zuidoost' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Exit intent popup timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!submitted) {
        setShowExitPopup(true);
      }
    }, 45000);
    
    return () => clearTimeout(timer);
  }, [submitted]);

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
        status: 'nieuw',
        bron: 'zwemles-amsterdam'
      });

      await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          childInfo: formData.childInfo,
          package: formData.package
        })
      });

      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', childInfo: '', package: 'Progress+', gewenstNiveau: '', tijdstip: '', notities: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : t('form_error_unknown'));
    } finally {
      setIsLoading(false);
    }
  };

  // Contactgegevens - vast ingesteld
  const phoneNumber = '06-28421354';
  const emailAddress = 'info@youngdolphins.nl';

  return (
    <div className="min-h-screen bg-white">
      <SEOZwemlesAmsterdam language={language} />

      {/* Navbar met logo */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <a href="/" className="flex items-center">
            <Logo className="w-16 sm:w-20" />
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white text-center">
        <h1 className="text-4xl lg:text-5xl font-black text-primary mb-6">
          {language === 'nl' ? 'Zwemles Amsterdam' : 'Swimming Lessons Amsterdam'}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          {language === 'nl' 
            ? 'Direct starten met zwemles in Amsterdam zonder wachtlijst. Professionele ABC-trajecten in kleine groepen. Ook in Monnickendam!'
            : 'Start swimming lessons in Amsterdam immediately without a waiting list. Professional ABC tracks in small groups. Also in Monnickendam!'
          }
        </p>
        <a
          href="#signup-form"
          className="inline-block px-8 py-4 bg-secondary text-white rounded-2xl font-black text-lg shadow-premium hover:bg-secondary/90 transition"
        >
          {language === 'nl' ? 'Gratis proefles aanvragen' : 'Request free trial lesson'}
        </a>
      </section>

      {/* Stadsdelen */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-black text-primary text-center mb-12">
          {language === 'nl' ? 'Zwemles in alle stadsdelen' : 'Swimming lessons in all districts'}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {stadsdelen.map(area => (
            <div key={area.slug} className="bg-blue-50 rounded-2xl p-6 text-center hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-primary mb-2">Amsterdam {area.name}</h3>
              <p className="text-sm text-gray-600">
                {language === 'nl'
                  ? `Zwemles in Amsterdam ${area.name}. Kleine groepen, gediplomeerde instructeurs.`
                  : `Swimming lessons in Amsterdam ${area.name}. Small groups, certified instructors.`
                }
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Voordelen */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black text-primary text-center mb-12">
            {language === 'nl' ? 'Waarom Young Dolphins?' : 'Why Young Dolphins?'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-bold text-lg mb-2">{language === 'nl' ? 'Direct Starten' : 'Start Immediately'}</h3>
              <p className="text-sm text-gray-600">{language === 'nl' ? 'Geen wachtlijst, begin direct met zwemles.' : 'No waiting list, start lessons right away.'}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h3 className="font-bold text-lg mb-2">{language === 'nl' ? 'Gediplomeerd' : 'Certified'}</h3>
              <p className="text-sm text-gray-600">{language === 'nl' ? 'Ervaren instructeurs met VOG en diploma.' : 'Experienced instructors with VOG and diploma.'}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏊</div>
              <h3 className="font-bold text-lg mb-2">{language === 'nl' ? 'Kleine Groepen' : 'Small Groups'}</h3>
              <p className="text-sm text-gray-600">{language === 'nl' ? 'Maximaal 8 kinderen per groep.' : 'Maximum 8 children per group.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact info balk */}
      <section className="py-8 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-8">
          <a href="tel:06-28421354" className="flex items-center gap-2 hover:text-secondary transition">
            <Phone size={18} />
            <span className="font-bold">06-28421354</span>
          </a>
          <a href="mailto:info@youngdolphins.nl" className="flex items-center gap-2 hover:text-secondary transition">
            <Mail size={18} />
            <span className="font-bold">info@youngdolphins.nl</span>
          </a>
          <a href="https://wa.me/31628421354" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span className="font-bold">WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Aanmeldformulier */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.1),transparent_50%)]"></div>
        
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

            <motion.div 
              id="signup-form"
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
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <DolphinIcon className="w-5 h-5" color="#5AC1E6" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t('form_direct_register')}</span>
                  </div>
                  
                  {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">{error}</div>}

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_name_parent')}</label>
                    <input required name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder={t('form_placeholder_parent')} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold placeholder:text-slate-300 text-sm" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_phone')}</label>
                      <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder={t('form_placeholder_phone')} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold placeholder:text-slate-300 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_email')}</label>
                      <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder={t('form_placeholder_email')} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold placeholder:text-slate-300 text-sm" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_child_info')}</label>
                    <input required name="childInfo" value={formData.childInfo} onChange={handleInputChange} type="text" placeholder={t('form_placeholder_child')} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold placeholder:text-slate-300 text-sm" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_package')}</label>
                      <select name="package" value={formData.package} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold text-sm appearance-none cursor-pointer">
                        <option value="Starter">{t('package_starter')}</option>
                        <option value="Progress+">{t('package_progress')}</option>
                        <option value="Privé">{t('package_private')}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_select_level')}</label>
                      <select name="gewenstNiveau" value={formData.gewenstNiveau} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold text-sm appearance-none cursor-pointer">
                        <option value="">{t('form_select_level')}</option>
                        {niveaus.map(n => (<option key={n.value} value={n.value}>{t(n.key)}</option>))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      {language === 'nl' ? 'Tijdstip zondag' : 'Sunday timeslot'}
                    </label>
                    <div className="flex gap-3">
                      {tijdstippen.map(tijd => (
                        <button key={tijd.value} type="button" onClick={() => setFormData(prev => ({ ...prev, tijdstip: tijd.value }))}
                          className={`flex-1 px-4 py-3 rounded-xl text-xs font-bold transition ${
                            formData.tijdstip === tijd.value
                              ? 'bg-secondary text-white shadow-premium shadow-secondary/30'
                              : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'
                          }`}>
                          {language === 'nl' ? tijd.label_nl.split(' ').slice(1).join(' ') : tijd.label_en.split(' ').slice(1).join(' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_notes')}</label>
                    <textarea name="notities" value={formData.notities} onChange={handleInputChange} rows={2} placeholder={t('form_placeholder_notes')} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold placeholder:text-slate-300 text-sm resize-none" />
                  </div>
                  
                  {/* Trust Badges */}
                  <TrustBadges variant="form" className="py-2" />
                  
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

      {/* Sticky contact bar onderaan */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg p-3">
        <div className="max-w-4xl mx-auto flex justify-center gap-6">
          <a href="tel:06-28421354" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-primary/90 transition">
            <Phone size={16} /> {language === 'nl' ? 'Bel' : 'Call'}
          </a>
          <a href="https://wa.me/31628421354" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-green-600 transition">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
          <a href="mailto:info@youngdolphins.nl" className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-secondary/90 transition">
            <Mail size={16} /> {language === 'nl' ? 'Mail' : 'Email'}
          </a>
        </div>
      </div>

      {/* Exit Intent Popup */}
      {showExitPopup && <ExitIntentPopup onClose={() => setShowExitPopup(false)} />}
    </div>
  );
}

// SEO component specifiek voor deze pagina
function SEOZwemlesAmsterdam({ language }: { language: 'nl' | 'en' }) {
  useEffect(() => {
    const title = language === 'nl' 
      ? 'Zwemles Amsterdam | Direct Starten Zonder Wachtlijst | Young Dolphins'
      : 'Swimming Lessons Amsterdam | Start Immediately No Waiting List | Young Dolphins';
    
    const description = language === 'nl'
      ? 'Zoek je zwemles in Amsterdam? Bij Young Dolphins start je direct zonder wachtlijst. Zwemles in Noord, Oost, Zuid, West, Centrum en Zuidoost. Gratis proefles!'
      : 'Looking for swimming lessons in Amsterdam? Start immediately at Young Dolphins without a waiting list. Swimming lessons in North, East, South, West, Center and Southeast. Free trial!';

    document.title = title;

    const metaTags = [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { name: 'robots', content: 'index, follow' },
    ];

    metaTags.forEach(tag => {
      const selector = tag.name ? `meta[name="${tag.name}"]` : `meta[property="${tag.property}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (tag.name) element.setAttribute('name', tag.name);
        if (tag.property) element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    const scriptId = 'seo-schema-zwemles';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SportsActivityLocation",
      "name": "Young Dolphins Zwemschool Amsterdam",
      "description": description,
      "url": "https://youngdolphins.nl/zwemles-amsterdam",
      "telephone": "+31628421354",
      "email": "info@youngdolphins.nl",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Amsterdam",
        "addressCountry": "NL"
      }
    });
  }, [language]);

  return null;
}