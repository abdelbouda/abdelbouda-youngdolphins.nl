import { useEffect } from 'react';
import { useLanguage } from '../../lib/LanguageContext';
import Logo from '../../components/Logo';

export default function ZwemlesAmsterdamDiplomaKijkles() {
  const { language } = useLanguage();
  const isNl = language === 'nl';

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = isNl 
      ? 'Zwemles Amsterdam – van kijkles tot diploma | Young Dolphins'
      : 'Swimming lessons Amsterdam – from trial to diploma | Young Dolphins';
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
          {isNl 
            ? 'Zwemles in Amsterdam: van kijkles tot diploma – alles wat je moet weten'
            : 'Swimming lessons in Amsterdam: from trial lesson to diploma – everything you need to know'}
        </h1>
        <div className="text-sm text-slate-400 mb-8">{isNl ? '2 juni 2026 · 5 minuten lezen' : 'June 2, 2026 · 5 min read'}</div>

        <div className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-secondary">
          <p>
            {isNl 
              ? 'Amsterdam heeft tientallen zwembaden en zwemscholen. Maar hoe kies je er één waar je kind echt veilig en met plezier leert zwemmen? En wat is een **kijkles**? En hoe lang duurt het tot het **diploma**? Wij leggen het uit.'
              : 'Amsterdam has dozens of pools and swim schools. But how do you choose one where your child learns safely and with pleasure? What is a **trial lesson**? How long does it take to get a **diploma**? We explain.'}
          </p>

          <h2>{isNl ? 'Waar moet je op letten bij een zwemschool in Amsterdam?' : 'What to look for in a swim school in Amsterdam?'}</h2>
          <ol>
            <li><strong>{isNl ? 'Geen wachtlijst' : 'No waiting list'}</strong> – {isNl ? 'Sommige scholen laten je maanden wachten. Kies liever een school waar direct gestart kan worden, zoals Young Dolphins.' : 'Some schools make you wait months. Choose a school where you can start immediately, like Young Dolphins.'}</li>
            <li><strong>{isNl ? 'Kleine groepen' : 'Small groups'}</strong> – {isNl ? 'Maximaal 8 kinderen per instructeur. Dan is er écht aandacht voor jouw kind.' : 'Maximum 8 children per instructor. Then your child gets real attention.'}</li>
            <li><strong>{isNl ? 'Diplomagarantie' : 'Diploma guarantee'}</strong> – {isNl ? 'Een goede school begeleidt je kind van watervrij tot en met C-diploma. Vraag naar de slagingspercentages.' : 'A good school guides your child from water acclimation to the C diploma. Ask about pass rates.'}</li>
            <li><strong>{isNl ? 'Kijkles / proefles' : 'Trial lesson'}</strong> – {isNl ? 'De meeste scholen bieden een gratis of betaalde kijkles aan. Maak hier gebruik van! Je ziet meteen of de klik er is.' : 'Most schools offer a free or paid trial lesson. Use it! You’ll immediately see if there’s a click.'}</li>
          </ol>

          <h2>{isNl ? 'Wat kost een zwemles in Amsterdam?' : 'How much does a swimming lesson cost in Amsterdam?'}</h2>
          <p>{isNl ? 'De prijzen variëren van €20 tot €35 per les. Wij rekenen:' : 'Prices range from €20 to €35 per lesson. We charge:'}</p>
          <ul>
            <li>Starter: €25 {isNl ? 'per les' : 'per lesson'}</li>
            <li>Progress+ (2x p/w): €170 {isNl ? 'per maand' : 'per month'}</li>
            <li>Privéles: €50 {isNl ? 'per les' : 'per lesson'}</li>
          </ul>
          <p><strong>{isNl ? 'Eenmalige inschrijfkosten: €25' : 'One-time registration fee: €25'}</strong> – {isNl ? 'geen verborgen kosten.' : 'no hidden costs.'}</p>

          <h2>{isNl ? 'Hoe lang duurt het tot het zwemdiploma (A/B/C)?' : 'How long until the swimming diploma (A/B/C)?'}</h2>
          <p>
            {isNl 
              ? 'Gemiddeld doen kinderen er 12–18 maanden over om diploma A te halen als ze 1x per week les hebben. Met 2x per week (Progress+) kan dat terug naar 8–12 maanden. Het B- en C-diploma gaan daarna sneller, vaak binnen 6 maanden per niveau.'
              : 'On average, children take 12–18 months to get their A diploma with 1 lesson per week. With 2 lessons per week (Progress+), that can be reduced to 8–12 months. The B and C diplomas then go faster, often within 6 months per level.'}
          </p>

          <h2>{isNl ? 'Welke zwemkleding heb je nodig?' : 'What swimwear do you need?'}</h2>
          <p>
            {isNl 
              ? 'Lees onze complete [gids met zwemkledingtips voor Amsterdamse zwemlessen](/blog/zwemkleding-checklist) – van badpak tot badslippers.'
              : 'Read our complete [guide to swimwear tips for Amsterdam swimming lessons](/blog/zwemkleding-checklist) – from swimsuit to flip-flops.'}
          </p>

          <div className="bg-secondary/10 p-6 rounded-2xl my-8">
            <p className="font-bold text-primary">{isNl ? 'Direct een kijkles in Amsterdam?' : 'Book a trial lesson in Amsterdam right now?'}</p>
            <p>{isNl ? 'Wij geven ook les aan Amsterdamse kinderen (o.a. in samenwerking met zwembaden in Noord, Oost en Zuid). Onze lessen zijn Nederlands- of Engelstalig – ideaal voor expats.' : 'We also teach children in Amsterdam (e.g. in cooperation with pools in North, East and South). Our lessons are in Dutch or English – ideal for expats.'}</p>
            <a href="/#signup-form" className="inline-block bg-secondary text-white px-5 py-2 rounded-xl font-bold mt-2 hover:bg-secondary/90 transition">{isNl ? 'Vraag gratis kijkles aan' : 'Request free trial lesson'}</a>
          </div>
        </div>
      </article>
    </div>
  );
}