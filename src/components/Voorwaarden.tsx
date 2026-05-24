import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Voorwaarden() {
  const { language } = useLanguage();

  const content = {
    nl: {
      title: 'Algemene Voorwaarden',
      updated: 'Laatst bijgewerkt: 24 mei 2026',
      h1: '1. Definities',
      li1: 'Young Dolphins: De zwemschool, actief in de regio Amsterdam en Monnickendam.',
      li2: 'Klant: De ouder of verzorger die het kind inschrijft via de website.',
      li3: 'Leerling: Het kind dat de zwemlessen volgt.',
      h2: '2. Toepasselijkheid',
      p1: 'Inschrijving via de website youngdolphins.nl houdt in dat u akkoord gaat met deze algemene voorwaarden. Deze voorwaarden zijn van toepassing op alle overeenkomsten en lessen georganiseerd door Young Dolphins.',
      h3: '3. Inschrijving & Veiligheid',
      p2: 'De inschrijving is pas definitief zodra deze per e-mail (Resend) is bevestigd. Veiligheid staat op nummer één. Ouders en leerlingen dienen de instructies van de gecertificeerde instructeurs te allen tijde strikt op te volgen.'
    },
    en: {
      title: 'Terms & Conditions',
      updated: 'Last updated: May 24, 2026',
      h1: '1. Definitions',
      li1: 'Young Dolphins: The swim school, operating in the Amsterdam region and Monnickendam.',
      li2: 'Client: The parent or guardian registering the child via the website.',
      li3: 'Student: The child attending the swimming lessons.',
      h2: '2. Applicability',
      p1: 'Registration via the website youngdolphins.nl implies agreement with these general terms and conditions. These terms apply to all agreements and lessons organized by Young Dolphins.',
      h3: '3. Registration & Safety',
      p2: 'Registration is only final once confirmed by email (via Resend). Safety is our number one priority. Parents and students must strictly follow the instructions of the certified instructors at all times.'
    }
  };

  const t = content[language] || content.nl;

  return (
    <section id="voorwaarden" className="bg-slate-50 pt-32 pb-24 relative overflow-hidden hidden target:block">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md text-secondary mb-6 border border-slate-100">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-4xl font-black text-primary uppercase tracking-tight mb-4">{t.title}</h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{t.updated}</p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(8,_112,_184,_0.04)] border border-slate-100 text-slate-600 leading-relaxed font-medium">
          <h3 className="text-primary font-black uppercase text-sm tracking-wider mb-3">{t.h1}</h3>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>{t.li1}</li>
            <li>{t.li2}</li>
            <li>{t.li3}</li>
          </ul>

          <h3 className="text-primary font-black uppercase text-sm tracking-wider mt-8 mb-3">{t.h2}</h3>
          <p className="mb-4">{t.p1}</p>

          <h3 className="text-primary font-black uppercase text-sm tracking-wider mt-8 mb-3">{t.h3}</h3>
          <p className="mb-4">{t.p2}</p>
        </div>
      </div>
    </section>
  );
}
