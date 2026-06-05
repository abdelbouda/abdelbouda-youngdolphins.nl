import { useEffect } from 'react';
import { useLanguage } from '../../lib/LanguageContext';
import Logo from '../../components/Logo';

export default function ZwemlesMonnickendamWaterland() {
  const { language } = useLanguage();
  const isNl = language === 'nl';

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = isNl 
      ? 'Zwemles Monnickendam – direct starten zonder wachtlijst | Young Dolphins'
      : 'Swimming lessons Monnickendam – start immediately | Young Dolphins';
  }, [isNl]);

  return (
    <div className="min-h-screen bg-white">
      {/* Simpele header met logo */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg h-16 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          <a href="/" className="flex items-center">
            <Logo className="w-16 sm:w-20" />
          </a>
        </div>
      </nav>

      <article className="pt-32 pb-20 max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-6">
          {isNl 
            ? 'Zwemles in Monnickendam en Waterland: eindelijk geen maanden meer wachten'
            : 'Swimming lessons in Monnickendam and Waterland: no more months of waiting'}
        </h1>
        
        <div className="text-sm text-slate-400 mb-8">
          {isNl ? '1 juni 2026 · 4 minuten lezen' : 'June 1, 2026 · 4 min read'}
        </div>

        <div className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-secondary">
          <p className="lead">
            {isNl 
              ? '“Wanneer kan mijn kind eindelijk beginnen met zwemles?” Deze vraag horen we in Monnickendam, Broek in Waterland, Volendam en Purmerend ontzettend vaak. De gemeentelijke baden hebben maandenlange wachtlijsten. Daarom zijn wij in Monnickendam gestart met een zwemschool waar je **direct** kunt beginnen.'
              : '“When can my child finally start swimming lessons?” We hear this question a lot in Monnickendam, Broek in Waterland, Volendam and Purmerend. The public pools have months-long waiting lists. That’s why we started a swim school in Monnickendam where you can start **immediately**.'}
          </p>

          <h2>{isNl ? 'Waarom juist in Monnickendam?' : 'Why Monnickendam?'}</h2>
          <p>
            {isNl 
              ? 'Onze hoofdlocatie is het **Sportfondsenbad Monnickendam** (Wilhelminalaan 54). Dit is een warm, veilig en overzichtelijk bad – ideaal voor jonge kinderen die leren zwemmen. Vanuit heel Waterland ben je er binnen een kwartier.'
              : 'Our main location is the **Sportfondsenbad Monnickendam** (Wilhelminalaan 54). This is a warm, safe and clear pool – ideal for young children learning to swim. From all over Waterland you are there within fifteen minutes.'}
          </p>
          <p className="bg-slate-50 p-4 rounded-xl">
            <strong>📍 {isNl ? 'Ook bereikbaar vanuit:' : 'Also accessible from:'}</strong> {isNl ? 'Volendam, Edam, Purmerend, Broek in Waterland, Watergang en Zuiderwoude.' : 'Volendam, Edam, Purmerend, Broek in Waterland, Watergang and Zuiderwoude.'}
          </p>

          <h2>{isNl ? 'Geen wachtlijst, wel diploma' : 'No waiting list, but a diploma'}</h2>
          <p>
            {isNl 
              ? 'Wij werken met kleine groepen (max. 8 kinderen) en gediplomeerde instructeurs. Je kind kan starten met:'
              : 'We work with small groups (max. 8 children) and certified instructors. Your child can start with:'}
          </p>
          <ul>
            <li><strong>Starter</strong> – {isNl ? '1x per week, €25 per les' : '1x per week, €25 per lesson'}</li>
            <li><strong>Progress+</strong> – {isNl ? '2x per week, versneld diploma, €170 per maand' : '2x per week, accelerated diploma, €170 per month'}</li>
            <li><strong>Privéles</strong> – {isNl ? '1-op-1, €50 per les' : '1-on-1, €50 per lesson'}</li>
          </ul>
          <p>
            {isNl 
              ? 'Het gemiddelde kind haalt bij ons diploma A binnen 12–14 maanden. Dat is sneller dan in de grote gemeentebaden, dankzij de persoonlijke aandacht en het vaste lesritme.'
              : 'The average child gets their A diploma within 12–14 months. That is faster than in the large public pools, thanks to personal attention and a fixed lesson rhythm.'}
          </p>

          <div className="bg-secondary/10 p-6 rounded-2xl my-8">
            <p className="font-bold text-primary mb-2">📣 {isNl ? 'Wat zeggen andere ouders uit Monnickendam?' : 'What do other parents from Monnickendam say?'}</p>
            <p className="italic">“Eindelijk een zwemschool zonder gedoe. Mijn zoon van 5 mocht direct starten en na 10 maanden had hij al zijn A-diploma!” – Linda uit Monnickendam</p>
            <p className="italic mt-2">“Heel fijn dat we niet eerst een jaar op een wachtlijst stonden. De juf is geduldig en enthousiast.” – Mark uit Volendam</p>
          </div>

          <h2>{isNl ? 'Direct een proefles in Monnickendam?' : 'Book a free trial lesson in Monnickendam?'}</h2>
          <p>
            {isNl 
              ? 'Wil je zelf ervaren hoe wij lesgeven? Vraag dan een **gratis proefles** aan. We kijken naar de zwemvaardigheid van je kind en plannen meteen een vast plekje.'
              : 'Do you want to experience our lessons yourself? Request a **free trial lesson**. We will assess your child’s swimming ability and immediately schedule a fixed spot.'}
          </p>
          <a 
            href="/#signup-form" 
            className="inline-block bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition"
          >
            {isNl ? '🎯 Vraag gratis proefles aan' : '🎯 Request free trial lesson'}
          </a>

          <p className="text-sm text-slate-400 mt-8">
            {isNl 
              ? 'Zoek je zwemles in Amsterdam? Lees dan ons artikel over zwemles in Amsterdam.'
              : 'Looking for swimming lessons in Amsterdam? Read our article about swimming lessons in Amsterdam.'}
          </p>
        </div>
      </article>
    </div>
  );
}