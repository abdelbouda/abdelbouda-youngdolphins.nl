import { Cookie } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Cookies() {
  const { language } = useLanguage();

  const content = {
    nl: {
      title: 'Cookiebeleid',
      updated: 'Laatst bijgewerkt: 24 mei 2026',
      intro: 'Onze website maakt gebruik van cookies om de gebruikerservaring te verbeteren, het websiteverkeer te analyseren en ervoor te zorgen dat de website naar behoren functioneert. In dit beleid leggen we uit welke cookies we gebruiken en waarom.',
      h1: '1. Wat zijn cookies?',
      p1: 'Cookies zijn kleine tekstbestanden die door een website op uw computer, tablet of mobiele telefoon worden geplaatst op het moment dat u de website bezoekt. Deze bestanden slaan informatie op over uw websitebezoek om u bij een volgend bezoek te herkennen.',
      h2: '2. Welke cookies gebruiken wij?',
      p2: 'Wij maken uitsluitend gebruik van de volgende categorieën cookies:',
      li1: 'Functionele (noodzakelijke) cookies: Deze cookies zijn essentieel voor de technische werking van de website. Ze zorgen ervoor dat basisfuncties zoals paginanavigatie en taalkeuze (Nederlands/Engels) feilloos onthouden worden.',
      li2: 'Analytische cookies: Wij gebruiken geanonimiseerde analytische cookies om te begrijpen hoe bezoekers onze website gebruiken (bijvoorbeeld welke pagina\'s het meest bezocht worden). Deze gegevens zijn volledig geanonimiseerd en herleiden niet naar een persoon.',
      h3: '3. Beheer en verwijdering van cookies',
      p3: 'U kunt uw browser zo instellen dat cookies worden geweigerd of dat u een melding krijgt wanneer er een cookie wordt geplaatst. Reeds geplaatste cookies kunt u handmatig via de instellingen van uw internetbrowser verwijderen. Let op: het uitschakelen van functionele cookies kan de werking en het comfort van onze website beïnvloeden.'
    },
    en: {
      title: 'Cookie Policy',
      updated: 'Last updated: May 24, 2026',
      intro: 'Our website uses cookies to improve the user experience, analyze website traffic, and ensure that the website functions properly. In this policy, we explain which cookies we use and why.',
      h1: '1. What are cookies?',
      p1: 'Cookies are small text files placed on your computer, tablet, or mobile phone by a website when you visit it. These files store information about your website visit to recognize you during a subsequent visit.',
      h2: '2. Which cookies do we use?',
      p2: 'We exclusively use the following categories of cookies:',
      li1: 'Functional (necessary) cookies: These cookies are essential for the technical operation of the website. They ensure that basic functions like page navigation and language choice (Dutch/English) are flawlessly remembered.',
      li2: 'Analytical cookies: We use anonymized analytical cookies to understand how visitors use our website (for example, which pages are visited most frequently). This data is completely anonymized and cannot be traced back to an individual.',
      h3: '3. Managing and deleting cookies',
      p3: 'You can configure your browser to reject cookies or to notify you when a cookie is being placed. Already placed cookies can be deleted manually via the settings of your internet browser. Note: disabling functional cookies may impact the operation and user experience of our website.'
    }
  };

  const t = content[language] || content.nl;

  return (
    <section id="cookies" className="bg-slate-50 pt-32 pb-24 relative overflow-hidden hidden target:block">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md text-secondary mb-6 border border-slate-100">
            <Cookie size={32} />
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
            </ul>
          </div>

          <div>
            <h3 className="text-primary font-black uppercase text-sm tracking-wider mb-2">{t.h3}</h3>
            <p>{t.p3}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
