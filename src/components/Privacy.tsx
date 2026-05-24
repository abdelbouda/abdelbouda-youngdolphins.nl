import { Shield } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Privacy() {
  const { language } = useLanguage();

  const content = {
    nl: {
      title: 'Privacybeleid',
      updated: 'Laatst bijgewerkt: 24 mei 2026',
      intro: 'Bij onze zwemschool hechten wij de hoogste waarde aan de bescherming en vertrouwelijkheid van uw persoonsgegevens en die van uw kind(eren). Wij verwerken alle persoonsgegevens in strikte overeenstemming met de Algemene Verordening Gegevensbescherming (AVG) en de overige relevante Nederlandse privacywetgeving.',
      h1: '1. Identiteit en Contactgegevens',
      p1: 'Voor vragen, verzoeken of opmerkingen met betrekking tot de verwerking van uw persoonsgegevens, kunt u rechtstreeks contact opnemen met de verantwoordelijke voor de gegevensverwerking via info@youngdolphins.nl of telefonisch via 06-28421354.',
      h2: '2. Welke Gegevens Verzamelen Wij?',
      p2: 'Wij verzamelen en verwerken uitsluitend gegevens die noodzakelijk zijn voor de uitvoering van onze overeenkomst, de administratie en het waarborgen van de veiligheid tijdens de zwemlessen:',
      li1: 'Gegevens van de ouder / wettelijk vertegenwoordiger: Volledige voor- en achternaam, adresgegevens t.b.v. facturatie, telefoonnummer en e-mailadres.',
      li2: 'Gegevens van de leerling: Volledige voor- en achternaam, geboortedatum (noodzakelijk voor de groepsindeling en diplomaregistratie) en zwemvaardigheden.',
      li3: 'Medische bijzonderheden: Gegevens over eventuele fysieke of mentale condities (bijv. epilepsie of astma) worden uitsluitend met uw uitdrukkelijke toestemming verwerkt om de veiligheid in het water te kunnen garanderen.',
      h3: '3. Grondslag en Doeleinden',
      p3: 'Wij gebruiken uw gegevens voor de organisatie en planning van de zwemlessen, het bijhouden van het leerlingvolgsysteem ter voorbereiding op het zwemdiploma, de financiële administratie en om u te informeren over lesroosters en noodzakelijke wijzigingen.',
      h4: '4. Delen van Gegevens met Derden',
      p4: 'Wij verkopen of delen uw gegevens in geen geval met derden voor commerciële doeleinden. Uw gegevens worden uitsluitend gedeeld met externe partijen als dit strikt noodzakelijk is voor de bedrijfsvoering, zoals de Nationale Raad Zwemveiligheid (NRZ) voor de officiële registratie en uitgifte van de zwemdiploma\'s, of wanneer wij hier op grond van de wet toe verplicht worden.',
      h5: '5. Beveiliging en Bewaartermijnen',
      p5: 'Wij nemen de bescherming van uw gegevens uiterst serieus en maken gebruik van passende technische en organisatorische maatregelen om misbruik te voorkomen. Wij bewaren persoonsgegevens niet langer dan strikt noodzakelijk is om de doelen te realiseren waarvoor uw gegevens worden verzameld, met een maximale termijn van 2 jaar na beëindiging van de lessen, tenzij er een wettelijke (fiscale) bewaarplicht van 7 jaar geldt.',
      h6: '6. Uw Wettelijke Rechten',
      p6: 'Onder de AVG beschikt u over het recht op inzage, rectificatie, gegevenswissing (\'vergetelheid\'), beperking van de verwerking en het recht op bezwaar. U kunt een schriftelijk verzoek indienen via info@youngdolphins.nl. Indien u van mening bent dat wij niet correct omgaan met uw privacy, heeft u het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens (AP).'
    },
    en: {
      title: 'Privacy Policy',
      updated: 'Last updated: May 24, 2026',
      intro: 'At our swim school, we attach the highest value to the protection and confidentiality of your personal data and that of your child(ren). We process all personal data in strict accordance with the General Data Protection Regulation (GDPR) and other relevant Dutch privacy legislation.',
      h1: '1. Identity and Contact Details',
      p1: 'For questions, requests, or remarks regarding the processing of your personal data, you can contact the data controller directly via info@youngdolphins.nl or by phone at 06-28421354.',
      h2: '2. What Data Do We Collect?',
      p2: 'We only collect and process data that is strictly necessary for the execution of our agreement, administration, and ensuring safety during swimming lessons:',
      li1: 'Parent / legal guardian details: Full first and last name, address details for invoicing, phone number, and email address.',
      li2: 'Student details: Full first and last name, date of birth (necessary for group assignment and diploma registration), and swimming progress.',
      li3: 'Medical particulars: Data regarding any physical or mental conditions (e.g., epilepsy or asthma) are processed exclusively with your explicit consent to guarantee safety in the water.',
      h3: '3. Legal Basis and Purposes',
      p3: 'We use your data for organizing and scheduling swimming lessons, maintaining the pupil tracking system in preparation for the swimming diploma, financial administration, and informing you about lesson schedules and urgent changes.',
      h4: '4. Sharing Data with Third Parties',
      p4: 'We do not sell or share your data with third parties for commercial purposes. Your data is only shared with external parties if strictly necessary for business operations, such as the National Council for Swimming Safety (NRZ) for the official registration and issuance of swimming diplomas, or when legally required.',
      h5: '5. Security and Retention Periods',
      p5: 'We take the protection of your data very seriously and utilize appropriate technical and organizational measures to prevent misuse. We retain personal data no longer than strictly necessary to achieve the collection purposes, with a maximum period of 2 years after ending lessons, unless a legal (fiscal) retention obligation of 7 years applies.',
      h6: '6. Your Legal Rights',
      p6: 'Under the GDPR, you have the right to access, rectification, erasure (\'right to be forgotten\'), restriction of processing, and the right to object. You can submit a written request via info@youngdolphins.nl. If you believe we are not handling your privacy correctly, you have the right to file a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).'
    }
  };

  const t = content[language] || content.nl;

  return (
    <section id="privacy" className="bg-slate-50 pt-32 pb-24 relative overflow-hidden hidden target:block">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md text-secondary mb-6 border border-slate-100">
            <Shield size={32} />
          </div>
          <h2 className="text-4xl font-black text-primary uppercase tracking-tight mb-4">{t.title}</h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{t.updated}</p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(8,_112,_184,_0.04)] border border-slate-100 text-slate-600 leading-relaxed font-medium text-sm md:text-base space-y-6">
          <p className="text-slate-700 font-semibold">{t.intro}</p>
          
          <hr className="border-slate-100" />

          <div>
            <h3 className="text-primary font-black uppercase text-sm tracking-wider mb-2">{t.h1}</h3>
            <p>{t.p1}</p>
          </div>

          <div>
            <h3 className="text-primary font-black uppercase text-sm tracking-wider mb-2">{t.h2}</h3>
            <p className="mb-3">{t.p2}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t.li1}</li>
              <li>{t.li2}</li>
              <li>{t.li3}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-primary font-black uppercase text-sm tracking-wider mb-2">{t.h3}</h3>
            <p>{t.p3}</p>
          </div>

          <div>
            <h3 className="text-primary font-black uppercase text-sm tracking-wider mb-2">{t.h4}</h3>
            <p>{t.p4}</p>
          </div>

          <div>
            <h3 className="text-primary font-black uppercase text-sm tracking-wider mb-2">{t.h5}</h3>
            <p>{t.p5}</p>
          </div>

          <div>
            <h3 className="text-primary font-black uppercase text-sm tracking-wider mb-2">{t.h6}</h3>
            <p>{t.p6}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
