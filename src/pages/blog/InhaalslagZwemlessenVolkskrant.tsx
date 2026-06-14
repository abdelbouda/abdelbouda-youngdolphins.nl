import { useEffect } from 'react';
import { useLanguage } from '../../lib/LanguageContext';
import { useSettings } from '../../hooks/useFirestore';
import Navbar from '../../components/Navbar';

export default function InhaalslagZwemlessenVolkskrant() {
  const { language } = useLanguage();
  const { settings } = useSettings();
  const isNl = language === 'nl';

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = isNl
      ? 'Inhaalslag zwemlessen: vangnet voor kinderen zonder zwemdiploma | Young Dolphins'
      : 'Swimming catch‑up: safety net for children without a diploma | Young Dolphins';
  }, [isNl]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar settings={settings} />

      <article className="pt-32 pb-20 max-w-3xl mx-auto px-4">
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
          <img
            src="/YD_Nordin_actie.webp"
            alt="Nordin – mede‑eigenaar Young Dolphins in actie"
            className="w-full h-auto object-cover"
            loading="eager"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-primary mb-6">
          {isNl
            ? 'Inhaalslag zwemlessen: vangnet voor kinderen zonder zwemdiploma'
            : 'Swimming catch‑up: safety net for children without a diploma'}
        </h1>

        <div className="text-sm text-slate-400 mb-8 flex items-center gap-4 flex-wrap">
          <span>{isNl ? '14 juni 2026 · 4 minuten lezen' : 'June 14, 2026 · 4 min read'}</span>
          <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold">
            {isNl ? 'Mede‑eigenaar Nordin' : 'Co‑owner Nordin'}
          </span>
        </div>

        <div className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-secondary">
          <p className="lead text-xl font-medium text-primary/80 border-l-4 border-secondary pl-4 italic">
            {isNl
              ? '“Wij geloven dat ieder kind direct moet kunnen starten met zwemles. Geen wachtlijsten, geen vertraging.” – Nordin, mede‑eigenaar Young Dolphins'
              : '“We believe every child should be able to start swimming lessons immediately. No waiting lists, no delays.” – Nordin, co‑owner Young Dolphins'}
          </p>

          <div className="bg-slate-50 p-5 rounded-xl border-l-4 border-secondary my-6">
            <p className="text-sm font-semibold text-primary mb-2">
              📰 {isNl ? 'Lees ook het originele artikel in de Volkskrant:' : 'Also read the original Volkskrant article:'}
            </p>
            <a
              href="https://www.volkskrant.nl/binnenland/inhaalslag-met-vangnetzwemles-voor-kinderen-zonder-zwemdiploma~b5359146/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline break-words"
            >
              Inhaalslag met vangnet: zwemles voor kinderen zonder zwemdiploma
            </a>
            <p className="text-xs text-slate-400 mt-2">
              {isNl
                ? 'Het artikel van de Volkskrant schetst de landelijke achterstand. Young Dolphins pakt dit probleem lokaal aan – zonder wachtlijst.'
                : 'The Volkskrant article outlines the national backlog. Young Dolphins tackles this problem locally – without a waiting list.'}
            </p>
          </div>

          <h2>{isNl ? 'Waarom een vangnet nodig is' : 'Why a safety net is needed'}</h2>
          <p>
            {isNl
              ? 'Uit onderzoek en berichtgeving (o.a. in de Volkskrant) blijkt dat tienduizenden kinderen nog geen zwemdiploma hebben. Lange wachtlijsten bij gemeentelijke baden en coronauitval zijn de belangrijkste oorzaken.'
              : 'Research and media reports (including in de Volkskrant) show that tens of thousands of children still do not have their swimming diploma. Long waiting lists at municipal pools and corona setbacks are the main causes.'}
          </p>

          <h2>{isNl ? 'Wat Young Dolphins doet' : 'What Young Dolphins does'}</h2>
          <ul>
            <li><strong>{isNl ? 'Directe start' : 'Immediate start'}</strong> – {isNl ? 'geen maanden wachten, geen wachtlijst' : 'no months of waiting, no waiting list'}</li>
            <li><strong>{isNl ? 'Kleine groepen' : 'Small groups'}</strong> – {isNl ? 'max. 8 kinderen per instructeur' : 'max. 8 children per instructor'}</li>
            <li><strong>{isNl ? 'ABC‑diploma traject' : 'ABC diploma track'}</strong> – {isNl ? 'van watervrij tot C‑diploma' : 'from water‑safe to C‑diploma'}</li>
            <li><strong>{isNl ? 'Privélessen' : 'Private lessons'}</strong> – {isNl ? 'voor extra begeleiding of watervrees' : 'for extra guidance or fear of water'}</li>
          </ul>

          <div className="bg-primary/5 p-6 rounded-2xl my-8 border-l-4 border-secondary">
            <p className="text-lg italic text-primary font-medium">
              {isNl
                ? '“Elke week krijg ik telefoontjes van wanhopige ouders die al maanden op een wachtlijst staan. Daarom zijn wij gestart – om die kinderen direct te helpen.”'
                : '“Every week I get calls from desperate parents who have been on a waiting list for months. That’s why we started – to help those children immediately.”'}
            </p>
            <p className="font-bold text-secondary mt-2">
              — Nordin, {isNl ? 'mede‑eigenaar en zweminstructeur' : 'co‑owner and swim instructor'}
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