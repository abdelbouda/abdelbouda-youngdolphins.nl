import { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function ProeflesForm() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    ouderNaam: '',
    email: '',
    telefoon: '',
    kindNaam: '',
    kindLeeftijd: '',
    gewenstNiveau: '',
    gewensteDagen: [] as string[],
    notities: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    setLoading(true);
    setError('');

    try {
      // 1. Opslaan in Firestore wachtlijst
      await addDoc(collection(db, 'wachtlijst'), {
        ouderNaam: formData.ouderNaam,
        email: formData.email,
        telefoon: formData.telefoon,
        kindNaam: formData.kindNaam,
        kindLeeftijd: parseInt(formData.kindLeeftijd) || 0,
        gewenstNiveau: formData.gewenstNiveau,
        gewensteDagen: formData.gewensteDagen,
        voorkeurstaal: language,
        notities: formData.notities,
        inschrijfdatum: new Date(),
        status: 'nieuw'
      });

      // 2. Verstuur emails via bestaande /api/signup
      await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.ouderNaam,
          phone: formData.telefoon,
          email: formData.email,
          childInfo: `${formData.kindNaam} (${formData.kindLeeftijd} jaar)`,
          package: formData.gewenstNiveau || 'Niet opgegeven'
        })
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Form error:', err);
      setError(t('form_error_unknown'));
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="signup-form" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-6"
          >
            🎉
          </motion.div>
          <h2 className="text-3xl font-bold text-blue-900 mb-4">{t('success_title')}</h2>
          <p className="text-lg text-gray-600">{t('success_desc')}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="signup-form" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">{t('contact_title')}</h2>
          <p className="text-lg text-gray-600">{t('contact_desc')}</p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          {/* Ouder naam */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_name_parent')} *</label>
            <input
              type="text"
              name="ouderNaam"
              required
              value={formData.ouderNaam}
              onChange={handleChange}
              placeholder={t('form_placeholder_parent')}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_email_label')} *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder={t('form_placeholder_email')}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Telefoon */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_phone_label')} *</label>
            <input
              type="tel"
              name="telefoon"
              required
              value={formData.telefoon}
              onChange={handleChange}
              placeholder={t('form_placeholder_phone')}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Kind naam + leeftijd */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_child_info')} *</label>
              <input
                type="text"
                name="kindNaam"
                required
                value={formData.kindNaam}
                onChange={handleChange}
                placeholder={t('form_placeholder_child')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">&nbsp;</label>
              <input
                type="number"
                name="kindLeeftijd"
                required
                min="2"
                max="18"
                value={formData.kindLeeftijd}
                onChange={handleChange}
                placeholder={t('form_placeholder_age')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Niveau */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_package')}</label>
            <select
              name="gewenstNiveau"
              value={formData.gewenstNiveau}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="">{t('form_select_level')}</option>
              {niveaus.map(n => (
                <option key={n.value} value={n.value}>{t(n.key)}</option>
              ))}
            </select>
          </div>

          {/* Gewenste dagen */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_days')}</label>
            <div className="flex flex-wrap gap-2">
              {dagen.map(dag => (
                <button
                  key={dag.value}
                  type="button"
                  onClick={() => handleDagToggle(dag.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                    formData.gewensteDagen.includes(dag.value)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t(dag.key)}
                </button>
              ))}
            </div>
          </div>

          {/* Notities */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_notes')}</label>
            <textarea
              name="notities"
              value={formData.notities}
              onChange={handleChange}
              rows={3}
              placeholder={t('form_placeholder_notes')}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t('firebase_loading') : t('form_submit')}
          </button>

          <p className="text-xs text-gray-400 text-center">{t('form_footer')}</p>
        </motion.form>
      </div>
    </section>
  );
}