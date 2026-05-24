import React from 'react';
import { useLanguage } from '../lib/LanguageContext';

export default function RegioSEO() {
  const { language } = useLanguage();

  // Content switch op basis van de geselecteerde taal
  const isNl = language === 'nl';

  return (
    <section id="regios" className="py-20 bg-slate-50 text-[#1B365D] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#00A3E0] font-semibold text-sm uppercase tracking-wider block mb-2">
            {isNl ? 'Locaties & Regio\'s' : 'Our Locations'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-sora">
            {isNl ? 'Zwemles in jouw Regio' : 'Swimming Lessons in your Area'}
          </h2>
          <p className="font-jakarta text-slate-600 mt-4">
            {isNl 
              ? 'Young Dolphins biedt professionele zwemlessen zonder wachtlijst. Ontdek onze focus per locatie.' 
              : 'Young Dolphins provides professional swimming lessons without any waiting lists. Discover our focus per location.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Amsterdam Blok */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">📍</span>
                <h3 className="text-2xl font-bold font-sora">Amsterdam</h3>
              </div>
              <p className="font-jakarta text-slate-600 leading-relaxed mb-6">
                {isNl ? (
                  <>
                    Het vinden van een geschikte zwemschool in Amsterdam kan een flinke uitdaging zijn, vooral door de ellenlange wachtlijsten bij de grotere gemeentelijke baden. Bij Young Dolphins geloven we dat ieder kind direct recht heeft op veilig en plezierig zwemonderwijs. Daarom hanteren wij <strong className="text-[#1B365D] font-bold">geen wachtlijsten</strong> en kan je kind direct starten in kleine, overzichtelijke lesgroepen.
                  </>
                ) : (
                  <>
                    Finding a suitable swimming school in Amsterdam can be a major challenge, especially due to long waiting lists at larger public pools. At Young Dolphins, we believe every child deserves immediate access to safe and fun swimming lessons. That is why we have <strong className="text-[#1B365D] font-bold">no waiting lists</strong>, allowing your child to start immediately in small, supervised groups.
                  </>
                )}
              </p>
              <div className="mb-6">
                <h4 class="font-semibold text-[#00A3E0] mb-3 font-sora">
                  {isNl ? 'Ideaal bereikbaar voor:' : 'Perfectly accessible for:'}
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 font-jakarta text-sm text-slate-700">
                    <span class="text-[#00A3E0] font-bold">✓</span> {isNl ? 'Amsterdam Noord (vlakbij de Ring A10)' : 'Amsterdam North (near Ring A10)'}
                  </li>
                  <li className="flex items-center gap-2 font-jakarta text-sm text-slate-700">
                    <span class="text-[#00A3E0] font-bold">✓</span> {isNl ? 'Amsterdam Oost' : 'Amsterdam East'}
                  </li>
                  <li className="flex items-center gap-2 font-jakarta text-sm text-slate-700">
                    <span class="text-[#00A3E0] font-bold">✓</span> {isNl ? 'Privélessen & kleine groepen' : 'Private lessons & small groups'}
                  </li>
                </ul>
              </div>
            </div>
            <a href="#signup" className="inline-block text-center bg-[#1B365D] hover:bg-[#234373] text-white font-medium py-3 px-6 rounded-xl transition-colors w-full">
              {isNl ? 'Meld je aan in Amsterdam' : 'Sign up in Amsterdam'}
            </a>
          </div>

          {/* Monnickendam Blok */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">⛵</span>
                <h3 className="text-2xl font-bold font-sora">Monnickendam & Waterland</h3>
              </div>
              <p className="font-jakarta text-slate-600 leading-relaxed mb-6">
                {isNl ? (
                  <>
                    Zoek je een betrouwbare en kwalitatieve zwemschool in Monnickendam, Broek in Waterland, Marken of Volendam? Young Dolphins biedt persoonlijke en kleinschalige zwemlessen aan waarbij jouw kind centraal staat. Geen massale klassen, maar deskundige instructeurs die zorgen dat kinderen met veel plezier, zelfvertrouwen en zonder stress snel hun ABC-diploma's behalen.
                  </>
                ) : (
                  <>
                    Are you looking for a reliable, high-quality swimming school in Monnickendam, Broek in Waterland, Marken, or Volendam? Young Dolphins offers personal and small-scale lessons focused entirely on your child. No massive classes, just expert instructors who ensure that children achieve their ABC diplomas quickly with joy and confidence.
                  </>
                )}
              </p>
              <div className="mb-6">
                <h4 class="font-semibold text-[#00A3E0] mb-3 font-sora">
                  {isNl ? 'Regionale dekking:' : 'Regional coverage:'}
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 font-jakarta text-sm text-slate-700">
                    <span class="text-[#00A3E0] font-bold">✓</span> Monnickendam ({isNl ? 'Centrum & Wijken' : 'Center & Neighborhoods'})
                  </li>
                  <li className="flex items-center gap-2 font-jakarta text-sm text-slate-700">
                    <span class="text-[#00A3E0] font-bold">✓</span> Broek in Waterland & Marken
                  </li>
                  <li className="flex items-center gap-2 font-jakarta text-sm text-slate-700">
                    <span class="text-[#00A3E0] font-bold">✓</span> Volendam & Zuiderwoude
                  </li>
                </ul>
              </div>
            </div>
            <a href="#signup" className="inline-block text-center bg-[#00A3E0] hover:bg-[#0082B3] text-white font-medium py-3 px-6 rounded-xl transition-colors w-full">
              {isNl ? 'Meld je aan in Monnickendam' : 'Sign up in Monnickendam'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
