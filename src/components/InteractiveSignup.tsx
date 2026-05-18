import { motion } from 'motion/react';
import { Send, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
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
    childInfo: ''
  });
  
  const { t } = useLanguage();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Er is iets misgegaan bij het versturen van uw aanmelding.');
      }

      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', childInfo: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Een onbekende fout is opgetreden.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.1),transparent_50%)]"></div>
      
      {/* Decorative Dolphin Branding */}
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="sticky top-32">
            <h2 className="text-4xl lg:text-7xl font-display font-black mb-8 leading-[1.1] text-white">
              Schrijf je <span className="text-secondary">direct in</span>
            </h2>
            <p className="text-xl text-slate-300 mb-16 max-w-md font-medium leading-relaxed">
              {t('contact_desc')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-secondary">
                  <Phone size={24} />
                </div>
                <p className="text-sm font-black uppercase tracking-widest text-slate-500">Telefoon</p>
                <a href="tel:0299651205" className="text-lg font-bold hover:text-secondary transition-colors">0299 651205</a>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-secondary">
                  <Mail size={24} />
                </div>
                <p className="text-sm font-black uppercase tracking-widest text-slate-500">Email</p>
                <a href="mailto:info@youngdolphins.nl" className="text-lg font-bold hover:text-secondary transition-colors">info@youngdolphins.nl</a>
              </div>
            </div>
            
            <div className="mt-16 pt-16 border-t border-white/5 flex items-center gap-6">
                <div>
                   <p className="font-black text-secondary">Join the Dolphins</p>
                   <p className="text-sm font-bold text-slate-400">1200+ diploma's uitgereikt</p>
                </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] p-8 lg:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.3)] text-primary relative overflow-hidden"
          >
            {/* Glassmorphism accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-3xl rounded-full"></div>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center"
              >
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <ShieldCheck size={48} />
                </div>
                <h3 className="text-3xl font-display font-black mb-4">{t('success_title')}</h3>
                <p className="text-lg text-slate-600 font-medium mb-10">{t('success_desc')}</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-4 bg-primary text-white rounded-2xl font-black shadow-premium hover:bg-secondary transition-all"
                >
                  Terug naar formulier
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <Heart className="text-accent fill-accent" size={20} />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Stap 1: Jouw Gegevens</span>
                </div>
                
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 animate-in fade-in slide-in-from-top-1">
                    {error}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_name_parent')}</label>
                    <input 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      type="text" 
                      placeholder="Bijv. Mark de Vries"
                      className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_phone')}</label>
                    <input 
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      type="tel" 
                      placeholder="06 12345678"
                      className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold placeholder:text-slate-300"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_email')}</label>
                  <input 
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email" 
                    placeholder="naam@voorbeeld.nl"
                    className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold placeholder:text-slate-300"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">{t('form_child_info')}</label>
                  <input 
                    required
                    name="childInfo"
                    value={formData.childInfo}
                    onChange={handleInputChange}
                    type="text" 
                    placeholder="Bijv. Liam (5 jaar)"
                    className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all font-bold placeholder:text-slate-300"
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-6 bg-secondary text-white rounded-[2rem] font-black text-xl shadow-premium shadow-secondary/30 transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={24} />
                      {t('form_submit')}
                    </>
                  )}
                </button>
                
                <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                   Geen inschrijfkosten • Direct antwoord
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
