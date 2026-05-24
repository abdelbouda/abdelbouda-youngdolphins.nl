import { Waves } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Privacy() {
  const { language } = useLanguage();

  const content = {
    nl: {
      title: 'Privacyverklaring',
      updated: 'Laatst bijgewerkt: 24 mei 2026',
      intro: 'Zwemschool Young Dolphins is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring. Wij respecteren de privacy van onze websitebezoekers, ouders en leerlingen en zorgen ervoor dat de persoonlijke informatie die u ons verschaft vertrouwelijk en conform de Algemene Verordening Gegevensbescherming (AVG) wordt behandeld.',
      h1: '1. Persoonsgegevens die wij verwerken',
      p1: 'Wanneer u gebruikmaakt van onze website, het inschrijfformulier invult of contact met ons opneemt via WhatsApp, kunnen wij de volgende persoonsgegevens verwerken:',
      li1: 'Gegevens van de ouder/verzorger: Voor- en achternaam, adresgegevens, telefoonnummer, e-mailadres.',
      li2: 'Gegevens van de leerling (het kind): Voor- en achternaam, geboortedatum (noodzakelijk voor de groepsindeling en diplomering).',
      li3: 'Technische gegevens: IP-adres, browsertype, locatiegegevens en interactiegegevens via onze hostingpartij (Vercel).',
      h2: '2. Doel en grondslag van de gegevensverwerking',
      p2: 'Young Dolphins verwerkt uw persoonsgegevens voor de volgende doelen:',
      li4: 'Om de inschrijving van uw kind voor zwemlessen in Monnickendam/regio Amsterdam administratief te verwerken.',
      li5: 'Om contact met u op te nemen via e-mail (Resend), telefoon of WhatsApp over lestijden en wijzigingen.',
      li6: 'Om wettelijke verplichtingen na te komen, zoals onze financiële administratie.',
      h3: '3. Delen van gegevens',
      p3: 'Young Dolphins verkoopt uw gegevens niet aan derden. Wij delen uw gegevens uitsluitend met betrouwbare verwerkers die noodzakelijk zijn voor onze bedrijfsvoering zoals Vercel (hosting) en Resend (e-mail).'
    },
    en: {
      title: 'Privacy Policy',
      updated: 'Last updated: May 24, 2026',
      intro: 'Swim School Young Dolphins is responsible for processing personal data as shown in this privacy statement. We respect the privacy of our website visitors, parents, and students and ensure that the personal information you provide is treated confidentially and in accordance with the General Data Protection Regulation (GDPR).',
      h1: '1. Personal data we process',
      p1: 'When you use our website, fill out the registration form, or contact us via WhatsApp, we may process the following personal data:',
      li1: 'Parent/guardian details: First and last name, address, phone number, email address.',
      li2: 'Student (child) details: First and last name, date of birth (necessary for group assignment and certification).',
      li3: 'Technical data: IP address, browser type, location data, and interaction data via our hosting partner (Vercel).',
      h2: '2. Purpose and legal basis for processing',
      p2: 'Young Dolphins processes your personal data for the following purposes:',
      li4: 'To administratively process the registration of your child for swimming lessons in Monnickendam/Amsterdam region.',
      li5: 'To contact you via email (Resend), phone, or WhatsApp regarding lesson times and updates.',
      li6: 'To comply with statutory obligations, such as our financial administration.',
      h3: '3. Sharing data with third parties',
      p3: 'Young Dolphins does not sell your data to third parties. We only share your data with reliable processors necessary for our business operations, such as Vercel (hosting) and Resend (email).'
    }
  };

  const t = content[language] || content.nl;

  return (
    <section id="privacy" className="bg-slate-50 pt-32 pb-24 relative overflow-hidden hidden target:block">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md text-secondary mb-6 border border-slate-100">
            <Waves size={32} />
          </div>
          <h2 className="text-4xl font-black text-primary uppercase tracking-tight mb-4">{t.title}</h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{t.updated}</p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(8,_112,_184,_0.04)] border border-slate-100 text-slate-600 leading-relaxed font-medium">
          <p className="mb-6">{t.intro}</p>
          
          <h3 className="text-primary font-black uppercase text-sm tracking-wider mt-8 mb-3">{t.h1}</h3>
          <p className="mb-4">{t.p1}</p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>{t.li1}</li>
            <li>{t.li2}</li>
            <li>{t.li3}</li>
          </ul>

          <h3 className="text-primary font-black uppercase text-sm tracking-wider mt-8 mb-3">{t.h2}</h3>
          <p className="mb-4">{t.p2}</p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>{t.li4}</li>
            <li>{t.li5}</li>
            <li>{t.li6}</li>
          </ul>

          <h3 className="text-primary font-black uppercase text-sm tracking-wider mt-8 mb-3">{t.h3}</h3>
          <p className="mb-4">{t.p3}</p>
        </div>
      </div>
    </section>
  );
}
