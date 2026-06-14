import { useEffect } from 'react';
import { useLanguage } from '../../lib/LanguageContext';
import { useSettings } from '../../hooks/useFirestore';
import Navbar from '../../components/Navbar';

export default function InhaalslagZwemlessen() {
  const { language } = useLanguage();
  const { settings } = useSettings();
  const isNl = language === 'nl';

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = isNl 
      ? 'Inhaalslag zwemlessen: vangnet voor kinderen zonder zwemdiploma | Young Dolphins'
      : 'Swim lesson catch-up: safety net for children without swimming diploma | Young Dolphins';
  }, [isNl]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar settings={settings} />

      <article className="pt-32 pb-20 max-w-3xl mx-auto px-4">
        {/* Afbeelding */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
          <img 
            src="/YD_Nordin_actie.webp" 
            alt="Nordin - mede-eigenaar Young Dolphins in actie tijdens zwemles"
            className="w-full h-auto object-cover"
            loading="eager"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-primary mb-6">
          {isNl 
            ? 'Inhaalslag zwemlessen: vangnet voor kinderen zonder zwemdiploma'
            : 'Swim lesson catch-up: safety net for children without swimming diploma'}
        </h1>
        
        <div className="text-sm text-slate-400 mb-8 flex items-center gap-4 flex-wrap">
          <span>{isNl ? '14 juni 2026 · 4 minuten lezen' : 'June 14, 2026 · 4 min read'}</span>
          <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold">
            {isNl ? 'Mede-eigenaar Nordin' : 'Co-owner Nordin'}
          </span>
        </div>

        <div className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-secondary">
          <p className="lead text-xl font-medium text-primary/80 border-l-4 border-secondary pl-4 italic">
            {isNl 
              ? '“Wij geloven dat ieder kind direct moet kunnen starten met zwemles. Geen wachtlijsten, geen vertraging.” – Nordin, mede-eigenaar Young Dolphins'
              : '“We believe every child should be able to start swimming lessons immediately. No waiting lists, no delays.” – Nordin, co-owner Young Dolphins'}
          </p>

          <h2>{isNl ? 'Waarom een vangnet nodig is' : 'Why a safety net is needed'}</h2>
          <p>
            {isNl 
              ? 'Uit onderzoek blijkt dat de afgelopen jaren veel kinderen zijn uitgevallen of nooit zijn begonnen met zwemles. Dit komt door maandenlange wachtlijsten bij gemeentelijke zwembaden en de gevolgen van de coronapandemie. Het risico? Kinderen die niet veilig kunnen zwemmen.'
              : 'Research shows that many children have dropped out or never started swimming lessons in recent years. This is due to months-long waiting lists at municipal pools and the consequences of the corona pandemic. The risk? Children who cannot swim safely.'}
          </p>
          <p>
            {isNl 
              ? 'Het Ministerie van Onderwijs en gemeenten trekken daarom extra geld uit voor een landelijke **inhaalslag zwemlessen**. Maar bij Young Dolphins wachten wij niet op subsidies – wij zijn nu al gestart.'
              : 'The Ministry of Education and municipalities are therefore allocating extra money for a national **catch-up of swimming lessons**. But at Young Dolphins, we don\'t wait for subsidies – we have already started.'}
          </p>

          <h2>{isNl ? 'Wat Young Dolphins doet' : 'What Young Dolphins is doing'}</h2>
          <ul>
            <li><strong>{isNl ? 'Directe start' : 'Immediate start'}</strong> – {isNl ? 'geen maanden wachten, geen wachtlijst' : 'no months of waiting, no waiting list'}</li>
            <li><strong>{isNl ? 'Kleine groepen' : 'Small groups'}</strong> – {isNl ? 'maximaal 8 kinderen per instructeur' : 'maximum 8 children per instructor'}</li>
            <li><strong>{isNl ? 'ABC-diploma traject' : 'ABC diploma track'}</strong> – {isNl ? 'van watervrij tot en met C-diploma' : 'from water-safe to C-diploma'}</li>
            <li><strong>{isNl ? 'Privélessen' : 'Private lessons'}</strong> – {isNl ? 'voor extra begeleiding of watervrees' : 'for extra guidance or fear of water'}</li>
          </ul>

          <div className="bg-primary/5 p-6 rounded-2xl my-8 border-l-4 border-secondary">
            <p className="text-lg italic text-primary font-medium">
              {isNl 
                ? '“Elke week krijg ik telefoontjes van wanhopige ouders die al maanden op een wachtlijst staan. Dat is precies waarom wij gestart zijn – om die kinderen direct te helpen.”'
                : '“Every week I get calls from desperate parents who have been on a waiting list for months. That’s exactly why we started – to help those children immediately.”'}
            </p>
            <p className="font-bold text-secondary mt-2">
              — Nordin, {isNl ? 'mede-eigenaar en zweminstructeur' : 'co-owner and swim instructor'}
            </p>
          </div>

          <div className="bg-secondary/10 p-6 rounded-2xl text-center my-8">
            <a 
              href="/#signup-form" 
              className="inline-block bg-secondary text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-secondary/90 transition-all shadow-lg"
            >
              {isNl ? '🎯 Vraag gratis proefles aan' : '🎯 Request free trial lesson'}
            </a>
            <p className="text-xs text-slate-500 mt-3">
              {isNl ? '📍 Lessen in Monnickendam en Amsterdam' : '📍 Lessons in Monnickendam and Amsterdam'}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}