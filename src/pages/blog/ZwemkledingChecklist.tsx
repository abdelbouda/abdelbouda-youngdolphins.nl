import { useEffect } from 'react';
import { useLanguage } from '../../lib/LanguageContext';
import Logo from '../../components/Logo';

export default function ZwemkledingChecklist() {
  const { language } = useLanguage();
  const isNl = language === 'nl';

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = isNl ? 'Zwemkleding checklist – wat meenemen naar zwemles?' : 'Swimwear checklist – what to bring to swimming lessons?';
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
          {isNl ? 'Welke zwemkleding heeft mijn kind nodig? (checklist)' : 'What swimwear does my child need? (checklist)'}
        </h1>
        <div className="text-sm text-slate-400 mb-8">{isNl ? '3 juni 2026 · 3 minuten lezen' : 'June 3, 2026 · 3 min read'}</div>

        <div className="prose prose-lg max-w-none">
          <p>
            {isNl 
              ? 'Veel ouders (in Amsterdam, maar ook in Monnickendam) vragen ons: “Wat moet mijn kind aan naar de eerste zwemles?” Geen zorgen – hier is een heldere lijst.'
              : 'Many parents (in Amsterdam and also in Monnickendam) ask us: “What should my child wear to the first swimming lesson?” No worries – here is a clear list.'}
          </p>

          <h2>{isNl ? 'Basisbenodigdheden (verplicht)' : 'Basic necessities (mandatory)'}</h2>
          <ul>
            <li><strong>{isNl ? 'Badpak / zwembroek' : 'Swimsuit / swim trunks'}</strong> – {isNl ? 'Kies liever geen losse zwemshorts; die kunnen afzakken. Een strakke zwembroek of badpak zit beter en is veiliger.' : 'Prefer not loose swim shorts; they can slip down. A tight swimsuit or trunks fits better and is safer.'}</li>
            <li><strong>{isNl ? 'Handdoek' : 'Towel'}</strong> – {isNl ? 'Groot genoeg om goed af te drogen. Een badjas is ook handig voor na het zwemmen.' : 'Large enough to dry off well. A bathrobe is also handy after swimming.'}</li>
            <li><strong>{isNl ? 'Badslippers' : 'Flip-flops'}</strong> – {isNl ? 'Voor hygiëne en om uitglijden te voorkomen. Geen teenslippers, maar stevige slippers met profiel.' : 'For hygiene and to prevent slipping. Not thongs, but sturdy slippers with profile.'}</li>
            <li><strong>{isNl ? 'Zwemmut' : 'Swim cap'}</strong> – {isNl ? 'Verplicht in bijna alle baden. Houdt haar uit het gezicht en beschermt de filters.' : 'Mandatory in almost all pools. Keeps hair out of the face and protects filters.'}</li>
            <li><strong>{isNl ? 'Haarelastiek' : 'Hair tie'}</strong> – {isNl ? 'Voor lang haar, anders glijdt de muts steeds af.' : 'For long hair, otherwise the cap keeps sliding off.'}</li>
          </ul>

          <h2>{isNl ? 'Optioneel, maar handig' : 'Optional but handy'}</h2>
          <ul>
            <li><strong>{isNl ? 'Zwembril' : 'Goggles'}</strong> – {isNl ? 'Mag, maar is niet verplicht. Sommige kinderen vinden het fijn, anderen niet.' : 'Allowed but not mandatory. Some children like them, others not.'}</li>
            <li><strong>{isNl ? 'Drinkflesje' : 'Water bottle'}</strong> – {isNl ? 'Na het zwemmen is je kind vaak dorstig.' : 'After swimming your child is often thirsty.'}</li>
            <li><strong>{isNl ? 'Klein tasje voor natte kleding' : 'Small bag for wet clothes'}</strong> – {isNl ? 'Een aparte plastic zak voor het natte badpak, zodat de rest van de tas droog blijft.' : 'A separate plastic bag for the wet swimsuit, so the rest of the bag stays dry.'}</li>
          </ul>

          <h2>{isNl ? 'Wat mag NIET in het zwembad?' : 'What is NOT allowed in the pool?'}</h2>
          <ul>
            <li>❌ {isNl ? 'Geen sieraden (kettingen, armbandjes, piercings) – kunnen blijven haken.' : 'No jewelry (necklaces, bracelets, piercings) – they can get caught.'}</li>
            <li>❌ {isNl ? 'Geen gewone kleding (korte broek, shirt) – alleen speciale zwemkleding.' : 'No regular clothes (shorts, t-shirts) – only special swimwear.'}</li>
            <li>❌ {isNl ? 'Geen luiers zonder zwemluier – voor nog niet zindelijke kinderen zijn speciale zwemluiers verplicht.' : 'No diapers without swim diaper – for children not yet toilet trained, special swim diapers are mandatory.'}</li>
          </ul>

          <div className="bg-secondary/10 p-6 rounded-2xl my-8">
            <p className="font-bold text-primary">{isNl ? 'Klaar voor de eerste zwemles?' : 'Ready for the first swimming lesson?'}</p>
            <p>{isNl ? 'Nu je weet wat je moet meenemen, kun je met vertrouwen naar de les. Vergeet niet: zwemmen leer je door te doen, niet door de perfecte outfit.' : 'Now that you know what to bring, you can go to the lesson with confidence. Don’t forget: you learn to swim by doing, not by the perfect outfit.'}</p>
            <a href="/#signup-form" className="inline-block bg-secondary text-white px-5 py-2 rounded-xl font-bold mt-2">{isNl ? 'Meld je kind direct aan' : 'Register your child now'}</a>
          </div>
        </div>
      </article>
    </div>
  );
}