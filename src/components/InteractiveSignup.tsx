import { motion } from 'motion/react';
import { Send, Phone, Mail, ShieldCheck, Accessibility, Users, Globe } from 'lucide-react';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useLanguage } from '../lib/LanguageContext';

export default function InteractiveSignup() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    childInfo: '',
    package: 'Progress+'
  });
  
  const { t } = useLanguage();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    // Simuleer verzending voor demo-doeleinden
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsLoading(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-[#1B365D] text-white relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-[1.1]">{t('contact_title')}</h2>
            <p className="text-lg text-slate-300 mb-12 max-w-md">{t('contact_desc')}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <a href="tel:0628421354" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#00A3E0]"><Phone size={20} /></div>
                <span className="font-bold text-lg group-hover:text-[#00A3E0] transition-colors">06-28421354</span>
              </a>
              <a href="mailto:info@youngdolphins.nl" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#00A3E0]"><Mail size={20} /></div>
                <span className="font-bold text-lg group-hover:text-[#00A3E0] transition-colors truncate">info@youngdolphins.nl</span>
              </a>
            </div>
          </div>

          <motion.div 
            id="signup-form"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] p-6 lg:p-10 text-[#1B365D] shadow-2xl"
          >
            {submitted ? (
              <div className="py-12 text-center" role="status">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><ShieldCheck size={40} /></div>
                <h3 className="text-2xl font-black mb-3">{t('success_title')}</h3>
                <p className="text-slate-600 mb-8">{t('success_desc')}</p>
                <button onClick={() => setSubmitted(false)} className="px-8 py-4 bg-[#1B365D] text-white rounded-2xl font-bold">
                  {t('form_back')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold" role="alert">{error}</div>}
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">{t('form_name_parent')}</label>
                    <input id="name" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-[#00A3E0] outline-none font-bold text-sm" placeholder={t('form_placeholder_parent')} />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">{t('form_phone')}</label>
                    <input id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-[#00A3E0] outline-none font-bold text-sm" placeholder={t('form_placeholder_phone')} />
                  </div>
                </div>

                <div className="space-y-1">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">{t('form_email')}</label>
                    <input id="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-[#00A3E0] outline-none font-bold text-sm" placeholder={t('form_placeholder_email')} />
                </div>

                <div className="space-y-1">
                    <label htmlFor="package" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">{t('form_package')}</label>
                    <select id="package" name="package" value={formData.package} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-[#00A3E0] outline-none font-bold text-sm cursor-pointer">
                        <option value="Starter">{t('package_starter')}</option>
                        <option value="Progress+">{t('package_progress')}</option>
                        <option value="Privé">{t('package_private')}</option>
                    </select>
                </div>

                <button type="submit" disabled={isLoading} className="w-full py-4 bg-[#FF6B6B] text-white rounded-xl font-bold text-lg hover:bg-[#ff5252] transition-colors flex items-center justify-center gap-2">
                  {isLoading ? '...' : <><Send size={18} /> {t('form_submit')}</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
