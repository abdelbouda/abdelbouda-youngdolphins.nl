import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// 🔥 STAP 1: Download je service account JSON uit Firebase Console
// Firebase Console → Project Settings → Service Accounts → Generate New Private Key
// Hernoem het bestand naar "service-account.json" en zet het in /scripts/

const serviceAccount = JSON.parse(
  await import('fs').then(fs => fs.readFileSync('./scripts/service-account.json', 'utf-8'))
);

const app = initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore(app);

async function setupDatabase() {
  console.log('🔄 Setting up Young Dolphins Firestore...\n');

  // ──────────────────────────────────────────
  // 1. MAAK COLLECTIES MET VOORBEELDDATA
  // ──────────────────────────────────────────

  // --- Settings ---
  await db.collection('settings').doc('general').set({
    schoolName: 'Young Dolphins',
    schoolName_nl: 'Young Dolphins',
    tagline: 'International Swim School Amsterdam',
    tagline_nl: 'Internationale Zwemschool Amsterdam',
    email: 'info@youngdolphins.nl',
    telefoon: '+31612345678',
    address: 'Amsterdam',
    languages: ['en', 'nl'],
    defaultLanguage: 'en',
    createdAt: new Date()
  });
  console.log('✅ Settings aangemaakt');

  // --- Instructeurs ---
  const docRef = await db.collection('instructeurs').add({
    naam: 'Abdel Bouda',
    email: 'abdel@youngdolphins.nl',
    telefoon: '+31612345678',
    talen: ['nl', 'en', 'fr'],
    specialisaties: ['expat_kinderen', 'angst_overwinnen', 'diploma_examinator'],
    actief: true,
    bio_en: 'Certified swim instructor with 10+ years experience, specialized in helping expat children feel at home in Dutch water.',
    bio_nl: 'Gecertificeerd zweminstructeur met 10+ jaar ervaring, gespecialiseerd in het helpen van expat-kinderen om zich thuis te voelen in het Nederlandse water.',
    foto_url: '',
    createdAt: new Date()
  });
  console.log('✅ Instructeur aangemaakt:', docRef.id);

  // --- Niveaus / Levels ---
  const niveaus = [
    { 
      id: 'niveau_1', 
      naam_en: 'Water Acclimation',
      naam_nl: 'Watergewenning',
      beschrijving_en: 'Getting comfortable with water through play. Blowing bubbles, floating, and basic water safety.',
      beschrijving_nl: 'Vertrouwd raken met water door spel. Bellen blazen, drijven en basis waterveiligheid.',
      vaardigheden: [
        { en: 'Enter water safely', nl: 'Veilig het water ingaan' },
        { en: 'Blow bubbles (mouth & nose)', nl: 'Bellen blazen (mond & neus)' },
        { en: 'Float on back (5 seconds)', nl: 'Drijven op rug (5 seconden)' },
        { en: 'Face under water (3 seconds)', nl: 'Gezicht onder water (3 seconden)' },
        { en: 'Kick with kickboard', nl: 'Benen trappelen met plankje' }
      ]
    },
    {
      id: 'niveau_2',
      naam_en: 'Basic Skills',
      naam_nl: 'Basisvaardigheden',
      beschrijving_en: 'Building confidence and learning basic strokes.',
      beschrijving_nl: 'Zelfvertrouwen opbouwen en basisslagen leren.',
      vaardigheden: [
        { en: 'Front crawl arms', nl: 'Borstcrawl armen' },
        { en: 'Backstroke float', nl: 'Rugcrawl drijven' },
        { en: 'Breaststroke legs', nl: 'Schoolslag benen' },
        { en: 'Retrieve object from pool floor', nl: 'Voorwerp van bodem halen' },
        { en: 'Swim 10 meters independently', nl: 'Zelfstandig 10 meter zwemmen' }
      ]
    },
    {
      id: 'niveau_3',
      naam_en: 'Advanced',
      naam_nl: 'Gevorderd',
      beschrijving_en: 'Refining techniques and building endurance.',
      beschrijving_nl: 'Technieken verfijnen en uithoudingsvermogen opbouwen.',
      vaardigheden: [
        { en: 'Breaststroke full stroke', nl: 'Schoolslag complete slag' },
        { en: 'Backstroke 25m', nl: 'Rugcrawl 25m' },
        { en: 'Front crawl breathing', nl: 'Borstcrawl ademhaling' },
        { en: 'Tread water 1 minute', nl: 'Watertrappen 1 minuut' },
        { en: 'Dive from pool edge', nl: 'Duiken vanaf de kant' }
      ]
    },
    {
      id: 'niveau_4',
      naam_en: 'Diploma Preparation',
      naam_nl: 'Diploma Voorbereiding',
      beschrijving_en: 'Preparing for Dutch A/B/C diploma or international equivalent.',
      beschrijving_nl: 'Voorbereiding op Nederlands A/B/C diploma of internationaal equivalent.',
      vaardigheden: [
        { en: 'Swim 50m breaststroke', nl: '50m schoolslag' },
        { en: 'Swim 25m backstroke', nl: '25m rugcrawl' },
        { en: 'Swim underwater through hoop', nl: 'Onderwater door hoepel zwemmen' },
        { en: 'Clothed swimming', nl: 'Zwemmen met kleding' },
        { en: 'Water safety rescue techniques', nl: 'Reddingstechnieken waterveiligheid' }
      ]
    }
  ];

  for (const niveau of niveaus) {
    await db.collection('niveaus').doc(niveau.id).set({
      ...niveau,
      createdAt: new Date()
    });
    console.log(`✅ Niveau aangemaakt: ${niveau.id}`);
  }

  // --- Content (voorbeeld blogpost) ---
  await db.collection('content').add({
    titel_en: 'Swimming lessons for expat children in Amsterdam: What you need to know',
    titel_nl: 'Zwemles voor expat kinderen in Amsterdam: Wat je moet weten',
    type: 'blog',
    target_audience: 'expats',
    inhoud_en: `Moving to Amsterdam with children is an exciting adventure...`,
    inhoud_nl: `Verhuizen naar Amsterdam met kinderen is een spannend avontuur...`,
    status: 'gepubliceerd',
    tags: ['expat_life', 'amsterdam', 'swimming_lessons', 'children'],
    createdAt: new Date()
  });
  console.log('✅ Voorbeeld content aangemaakt');

  // --- Email Templates ---
  const emailTemplates = [
    {
      id: 'welcome_wachtlijst',
      onderwerp_en: 'Welcome to Young Dolphins waitlist! 🐬',
      onderwerp_nl: 'Welkom op de Young Dolphins wachtlijst! 🐬',
      body_en: `Dear {ouderNaam},\n\nThank you for joining the Young Dolphins waitlist for {kindNaam}...`,
      body_nl: `Beste {ouderNaam},\n\nBedankt dat je je hebt ingeschreven op de Young Dolphins wachtlijst voor {kindNaam}...`
    },
    {
      id: 'proefles_bevestiging',
      onderwerp_en: 'Trial lesson confirmed for {kindNaam}! 🏊',
      onderwerp_nl: 'Proefles bevestigd voor {kindNaam}! 🏊',
      body_en: `Dear {ouderNaam},\n\nYour trial lesson for {kindNaam} is confirmed...`,
      body_nl: `Beste {ouderNaam},\n\nDe proefles voor {kindNaam} is bevestigd...`
    }
  ];

  for (const template of emailTemplates) {
    await db.collection('emailTemplates').doc(template.id).set({
      ...template,
      createdAt: new Date()
    });
  }
  console.log('✅ Email templates aangemaakt');

  console.log('\n🎉 Database setup complete!');
  console.log('📋 Collections created: settings, instructeurs, niveaus, content, emailTemplates');
  console.log('📋 Collections ready (empty): ouders, leerlingen, lessens, wachtlijst, facturen, gesprekken');
  console.log('\n💡 Next step: Run your React app and start building the frontend!');
}

setupDatabase().catch(console.error);
