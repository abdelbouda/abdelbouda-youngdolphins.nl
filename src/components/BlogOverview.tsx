import { useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { useSettings } from '../hooks/useFirestore';
import Navbar from './Navbar';

const BLOG_POSTS = [
  {
    slug: 'zwemles-monnickendam-waterland',
    title_nl: 'Zwemles in Monnickendam en Waterland: direct starten zonder wachtlijst',
    title_en: 'Swimming lessons in Monnickendam and Waterland: start immediately',
    excerpt_nl: 'Geen maanden wachten? Bij Young Dolphins start je kind direct in Monnickendam. Lees waarom ouders uit Volendam, Purmerend en Broek in Waterland voor ons kiezen.',
    excerpt_en: 'No more waiting lists? Your child can start immediately in Monnickendam. Read why parents from Volendam, Purmerend and Broek in Waterland choose us.',
    date: '2026-06-01',
    category: 'Zwemles'
  },
  {
    slug: 'zwemles-amsterdam-diploma-kijkles',
    title_nl: 'Zwemles in Amsterdam: van kijkles tot diploma – alles wat je moet weten',
    title_en: 'Swimming lessons in Amsterdam: from trial lesson to diploma – everything you need to know',
    excerpt_nl: 'Wat kost een zwemles? Hoe lang duurt het tot het A-diploma? Lees onze gids voor Amsterdamse ouders.',
    excerpt_en: 'How much does a swimming lesson cost? How long until the A diploma? Read our guide for Amsterdam parents.',
    date: '2026-06-02',
    category: 'Zwemles'
  },
  {
    slug: 'zwemkleding-checklist',
    title_nl: 'Welke zwemkleding heeft mijn kind nodig? (checklist)',
    title_en: 'What swimwear does my child need? (checklist)',
    excerpt_nl: 'Van badpak tot badslippers – alles wat je moet meenemen naar de zwemles in Amsterdam of Monnickendam.',
    excerpt_en: 'From swimsuit to flip-flops – everything you need to bring to swimming lessons in Amsterdam or Monnickendam.',
    date: '2026-06-03',
    category: 'Tips'
  },
  {
    slug: 'planner-zwemonderwijs',
    title_nl: 'Planner voor zwemonderwijs: hoe help je je kind aan het zwemdiploma?',
    title_en: 'Swim education planner: how to help your child get their swimming diploma',
    excerpt_nl: 'Een handige planner met maandelijkse doelen, tips voor thuis en een gratis downloadbare PDF.',
    excerpt_en: 'A handy planner with monthly goals, at-home tips and a free downloadable PDF.',
    date: '2026-06-04',
    category: 'Tips'
  },
  {
    slug: 'inhaalslag-zwemlessen',
    title_nl: 'Inhaalslag zwemlessen: vangnet voor kinderen zonder zwemdiploma',
    title_en: 'Swim lesson catch-up: safety net for children without swimming diploma',
    excerpt_nl: 'Mede-eigenaar Nordin over de landelijke achterstand in zwemlessen. Direct starten zonder wachtlijst in Monnickendam en Amsterdam.',
    excerpt_en: 'Co-owner Nordin about the national backlog in swimming lessons. Start immediately without a waiting list in Monnickendam and Amsterdam.',
    date: '2026-06-14',
    category: 'Actueel'
  },
  {
    slug: 'inhaalslag-zwemlessen-volkskrant',
    title_nl: 'Inhaalslag zwemlessen: vangnet voor kinderen zonder zwemdiploma (Reactie op Volkskrant)',
    title_en: 'Swim lesson catch-up: safety net for children without swimming diploma (Response to Volkskrant)',
    excerpt_nl: 'Young Dolphins reageert op het Volkskrant-artikel over de achterstand in zwemlessen. Lees hoe wij direct kunnen starten.',
    excerpt_en: 'Young Dolphins responds to the Volkskrant article about the backlog in swimming lessons. Read how we can start immediately.',
    date: '2026-06-14',
    category: 'Actueel'
  }
];

export default function BlogOverview() {
  const { language } = useLanguage();
  const { settings } = useSettings();
  const isNl = language === 'nl';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sorteer op datum (nieuwste eerst)
  const sortedPosts = [...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-white">
      <Navbar settings={settings} />
      
      <main className="pt-32">
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-display font-black text-primary mb-6">
                {isNl ? 'Blog & Tips' : 'Blog & Tips'}
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                {isNl 
                  ? 'Praktische artikelen over zwemles, diploma’s en meer.' 
                  : 'Practical articles about swimming lessons, diplomas and more.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {sortedPosts.map(post => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block p-6 bg-slate-50 rounded-3xl hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-secondary font-black uppercase tracking-wider">
                      {new Date(post.date).toLocaleDateString(isNl ? 'nl-NL' : 'en-US')}
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider bg-white px-2 py-0.5 rounded-full">
                      {post.category}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                    {isNl ? post.title_nl : post.title_en}
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    {isNl ? post.excerpt_nl : post.excerpt_en}
                  </p>
                  <div className="mt-4 text-secondary font-bold text-sm flex items-center gap-1">
                    {isNl ? 'Lees verder →' : 'Read more →'}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}