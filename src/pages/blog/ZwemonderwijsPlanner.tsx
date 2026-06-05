import { useEffect } from 'react';
import { useLanguage } from '../../lib/LanguageContext';
import Logo from '../../components/Logo';

export default function ZwemonderwijsPlanner() {
  const { language } = useLanguage();
  const isNl = language === 'nl';

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = isNl ? 'Planner voor zwemonderwijs – zo help je je kind' : 'Swim education planner – how to help your child';
  }, [isNl]);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg h-16 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          <a href="/" className="flex items-center"><Logo className="w-16 sm:w-20" /></a>
        </div>
      </nav>

      <article className="pt-32 pb-20 max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-6">
          {isNl ? 'Planner voor zwemonderwijs: hoe help je je kind aan het zwemdiploma?' : 'Swim education planner: how to help your child get their swimming diploma?'}
        </h1>
        <div className="text-sm text-slate-400 mb-8">{isNl ? '4 juni 2026 · 4 minuten lezen' : 'June 4, 2026 · 4 min read'}</div>

        <div className="prose prose-lg max-w-none">
          <p>
            {isNl 
              ? 'Zwemles is niet alleen iets van de instructeur. Ook thuis kun je je kind helpen – zonder dat je een zwembad in de tuin nodig hebt. In deze planner delen we een eenvoudig systeem om de voortgang te volgen.'
              : 'Swimming lessons are not only for the instructor. You can also help your child at home – without needing a pool in your garden. In this planner we share a simple system to track progress.'}
          </p>

          <h2>{isNl ? 'Waarom een planner?' : 'Why a planner?'}</h2>
          <p>{isNl ? 'Kinderen leren beter als ze weten wat het doel is. Een visuele planner met kleine stapjes (bijvoorbeeld: “ik kan 5 seconden drijven”) motiveert enorm. Bovendien zie jij als ouder precies waar je kind nog extra hulp bij kan gebruiken.' : 'Children learn better when they know the goal. A visual planner with small steps (e.g. “I can float for 5 seconds”) is very motivating. Moreover, you as a parent see exactly where your child may need extra help.'}</p>

          <h2>{isNl ? 'Maandelijkse checklijst (voorbeeld)' : 'Monthly checklist (example)'}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-slate-200">
              <thead><tr className="bg-slate-100"><th className="border p-2">{isNl ? 'Maand' : 'Month'}</th><th className="border p-2">{isNl ? 'Doel' : 'Goal'}</th><th className="border p-2">{isNl ? 'Tekenen dat het lukt' : 'Signs of success'}</th></tr></thead>
              <tbody>
                <tr><td className="border p-2">1-2</td><td className="border p-2">{isNl ? 'Wennen aan water, onder water kijken' : 'Get used to water, look underwater'}</td><td className="border p-2">{isNl ? 'Kind steekt hoofd onder water zonder te sputteren' : 'Child puts head under water without spluttering'}</td></tr>
                <tr><td className="border p-2">3-4</td><td className="border p-2">{isNl ? 'Drijven op buik en rug' : 'Float on belly and back'}</td><td className="border p-2">{isNl ? 'Kan zelfstandig 10 seconden drijven' : 'Can float independently for 10 seconds'}</td></tr>
                <tr><td className="border p-2">5-6</td><td className="border p-2">{isNl ? 'Zwemslagen (schoolslag, borstcrawl)' : 'Swimming strokes (breaststroke, front crawl)'}</td><td className="border p-2">{isNl ? 'Maakt 5 meter slagen zonder stoppen' : 'Swims 5 meters without stopping'}</td></tr>
                <tr><td className="border p-2">7-9</td><td className="border p-2">{isNl ? 'Uithoudingsvermogen en diploma-oefeningen' : 'Endurance and diploma exercises'}</td><td className="border p-2">{isNl ? 'Zwemt 25 meter zonder hulpmiddelen' : 'Swims 25 meters without aids'}</td></tr>
              </tbody>
            </table>
          </div>

          <h2>{isNl ? 'Wat kan jij thuis doen?' : 'What can you do at home?'}</h2>
          <ul>
            <li><strong>{isNl ? 'Praat over de les' : 'Talk about the lesson'}</strong> – {isNl ? 'Vraag: “Wat vond je vandaag het leukst?”. Zo blijft het positief.' : 'Ask: “What did you enjoy most today?” That keeps it positive.'}</li>
            <li><strong>{isNl ? 'Oefen het afdrogen en aankleden' : 'Practice drying and dressing'}</strong> – {isNl ? 'Klinkt simpel, maar veel tijd gaat zitten in het omkleden. Hoe sneller ze dat zelf kunnen, hoe meer zwemtijd overblijft.' : 'Sounds simple, but a lot of time is spent changing. The faster they can do it themselves, the more swim time remains.'}</li>
            <li><strong>{isNl ? 'Lees boekjes over zwemmen' : 'Read books about swimming'}</strong> – {isNl ? 'Bijv. “Kleine Kwal” of “Pietje Piraat gaat zwemmen”.' : 'E.g. “Little Jellyfish” or “Pirate Pete goes swimming”.'}</li>
            <li><strong>{isNl ? 'Wees geduldig' : 'Be patient'}</strong> – {isNl ? 'Elk kind heeft zijn eigen tempo. Dwing niets af.' : 'Every child has their own pace. Don’t force anything.'}</li>
          </ul>

          <div className="bg-secondary/10 p-6 rounded-2xl my-8">
            <p className="font-bold text-primary">{isNl ? 'School of Dolphins – onze aanpak' : 'School of Dolphins – our approach'}</p>
            <p>{isNl ? 'Bij Young Dolphins (door sommige kinderen liefkozend ‘School of Dolphin’ genoemd) gebruiken wij geen strakke blauwdruk, maar passen we de les aan op de behoeften van je kind. Onze instructeurs houden een digitaal logboek bij, zodat jij via de app de voortgang kunt volgen.' : 'At Young Dolphins (lovingly called ‘School of Dolphin’ by some children) we do not use a rigid blueprint, but adapt the lesson to your child’s needs. Our instructors keep a digital log so you can follow progress via the app.'}</p>
          </div>

          <p><strong>{isNl ? 'Download onze gratis planner (PDF)' : 'Download our free planner (PDF)'}</strong><br />
          {isNl ? 'Stuur een e-mail naar info@youngdolphins.nl met “Planner aanvragen” en we sturen je de PDF toe.' : 'Send an email to info@youngdolphins.nl with “Planner request” and we will send you the PDF.'}</p>

          <a href="/#signup-form" className="inline-block bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition">{isNl ? 'Vraag nu een gratis proefles aan' : 'Request a free trial lesson now'}</a>
        </div>
      </article>
    </div>
  );
}