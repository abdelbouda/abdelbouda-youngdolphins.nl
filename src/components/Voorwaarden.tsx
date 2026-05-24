import { ShieldAlert } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Voorwaarden() {
  const { language } = useLanguage();

  const content = {
    nl: {
      title: 'Algemene Voorwaarden',
      updated: 'Laatst bijgewerkt: 24 mei 2026',
      h1: 'Artikel 1: Inschrijving en Totstandkoming Overeenkomst',
      p1: 'Inschrijving voor de zwemlessen geschiedt online via het officiële inschrijfformulier op de website. De overeenkomst tussen de zwemschool en de opdrachtgever komt definitief tot stand zodra de inschrijving schriftelijk of per e-mail is bevestigd. Inschrijving verplicht tot betaling van de verschuldigde lesgelden.',
      h2: 'Artikel 2: Lesgelden, Facturatie en Betaling',
      p2: 'Alle gehanteerde tarieven staan vermeld op de website. De betaling van het lesgeld dient strikt binnen de op de factuur vermelde termijn te worden voldaan. Bij een achterstand in de betaling is de zwemschool gerechtigd de leerling de toegang tot de zwemles te ontzeggen totdat de volledige betaling is ontvangen. Restitutie van reeds voldane lesgelden is in principe niet mogelijk.',
      h3: 'Artikel 3: Planning, Aanwezigheid en Inhaallessen',
      p3: 'De opdrachtgever wordt geacht de leerling tijdig (minimaal 10 minuten voor aanvang) naar de locatie te brengen. Indien een leerling wegens ziekte niet aanwezig kan zijn, dient dit uiterlijk 24 uur van tevoren te worden gemeld. Bij een tijdige afmelding kan er, op basis van beschikbaarheid binnen de overige groepen, een inhaalles worden ingepland. Bij afmeldingen korter dan 24 uur vervalt dit recht.',
      h4: 'Artikel 4: Overmacht en Langdurige Ziekte',
      p4: 'In geval van een langdurige medische situatie (langer dan 3 aaneengesloten weken) kan de overeenkomst in overleg tijdelijk worden bevroren. Indien de zwemschool door overmacht (bijv. technische storingen aan het bad of extreme weersomstandigheden) genoodzaakt is lessen te annuleren, zal er in eerste instantie worden gezocht naar een passend inhaalmoment.',
      h5: 'Artikel 5: Veiligheid, Gezondheid en Huisregels',
      p5: 'De opdrachtgever verklaart dat de leerling fysiek en mentaal in staat is deel te nemen aan de lessen. Eventuele medische bijzonderheden dienen direct gemeld te worden. De opdrachtgever en leerling zijn verplicht om de specifieke huisregels van de zwemlocatie strikt na te leven. Aanwijzingen van de instructeurs dienen onmiddellijk te worden opgevolgd.',
      h6: 'Artikel 6: Aansprakelijkheid',
      p6: 'Het betreden van de zwemlocatie en deelname geschiedt geheel op eigen risico. De zwemschool aanvaardt geen enkele aansprakelijkheid voor diefstal, verlies of beschadiging van persoonlijke eigendommen. De aansprakelijkheid van de zwemschool voor materiële of immateriële schade is te allen tijde beperkt tot het bedrag dat door de professionele aansprakelijkheidsverzekering wordt uitgekeerd.',
      h7: 'Artikel 7: Examens en Wijzigingen',
      p7: 'De beoordeling of een leerling klaar is voor het afzwemmen ligt uitsluitend bij de professionele expertise van de zweminstructeurs. De zwemschool biedt een hoogwaardige opleiding, maar kan nooit een resultaatsgarantie afgeven binnen een vastgestelde termijn. Op alle overeenkomsten is uitsluitend het Nederlands recht van toepassing en geschillen worden voorgelegd aan de bevoegde rechter in Amsterdam.'
    },
    en: {
      title: 'Terms & Conditions',
      updated: 'Last updated: May 24, 2026',
      h1: 'Article 1: Registration and Agreement',
      p1: 'Registration for swimming lessons takes place online via the official registration form on the website. The agreement between the swim school and the client is finalized once confirmed in writing or by email. Registration obligates the client to pay the applicable lesson fees.',
      h2: 'Article 2: Fees, Invoicing, and Payment',
      p2: 'All applied rates are listed on the website. Payment of the lesson fee must be fulfilled strictly within the period stated on the invoice. In the event of a payment arrear, the swim school is entitled to deny the student access to the lessons until full payment is received. Refunds of fees already paid are generally not possible.',
      h3: 'Article 3: Scheduling, Attendance, and Make-up Lessons',
      p3: 'The client is expected to bring the student to the location on time (at least 10 minutes before start). If a student cannot attend due to illness, this must be reported at least 24 hours in advance. In case of timely cancellation, a make-up lesson can be scheduled based on availability within other groups. For notifications shorter than 24 hours, this right expires.',
      h4: 'Article 4: Force Majeure and Long-term Illness',
      p4: 'In the event of a long-term medical situation (longer than 3 consecutive weeks), the agreement may be temporarily frozen in consultation. If the swim school is forced to cancel lessons due to force majeure (e.g., technical pool failures or extreme weather conditions), a suitable make-up moment will be sought in the first instance.',
      h5: 'Article 5: Safety, Health, and House Rules',
      p5: 'The client declares that the student is physically and mentally fit to participate in the lessons. Any medical particulars must be reported immediately. The client and student are obliged to strictly comply with the specific house rules of the swim location. Instructions from instructors must be followed immediately.',
      h6: 'Article 6: Liability',
      p6: 'Entering the swim location and participation is entirely at your own risk. The swim school accepts no liability whatsoever for theft, loss, or damage to personal belongings. The liability of the swim school for material or immaterial damage is at all times limited to the amount paid out by its professional liability insurance.',
      h7: 'Article 7: Examinations and Amendments',
      p7: 'The assessment of whether a student is ready for the swimming exam rests exclusively with the professional expertise of the swim instructors. The swim school offers high-quality training but can never issue a performance guarantee within a fixed term. All agreements are exclusively governed by Dutch law, and disputes shall be submitted to the competent court in Amsterdam.'
    }
  };

  const t = content[language] || content.nl;

  return (
    <section id="voorwaarden" className="bg-slate-50 pt-32 pb-24 relative overflow-hidden hidden target:block">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md text-secondary mb-6 border border-slate-100">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-4xl font-black text-primary uppercase tracking-tight mb-4">{t.title}</h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{t.updated}</p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(8,_112,_184,_0.04)] border border-slate-100 text-slate-600 leading-relaxed font-medium text-sm md:text-base space-y-6">
          <div>
            <h3 className="text-primary font-black uppercase text-sm tracking-wider mb-2">{t.h1}</h3>
            <p>{t.p1}</p>
          </div>

          <div>
            <h3 className="text-primary font-black uppercase text-sm tracking-wider mb-2">{t.h2}</h3>
            <p>{t.p2}</p>
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

          <div>
            <h3 className="text-primary font-black uppercase text-sm tracking-wider mb-2">{t.h7}</h3>
            <p>{t.p7}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
