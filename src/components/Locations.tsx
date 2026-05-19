import { motion } from 'motion/react';
import { MapPin, Navigation, Map as MapIcon } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useState, useEffect, useRef } from 'react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

function MapDisplay({ inView }: { inView: boolean }) {
  if (!hasValidKey) {
    const { t } = useLanguage();
    return (
      <div className="w-full h-full bg-primary flex flex-col items-center justify-center p-8 text-center text-white">
        <MapPin size={48} className="text-secondary mb-6 opacity-50" />
        <h3 className="text-xl font-display font-black mb-4">{t('loc_maps_key_required')}</h3>
        <p className="text-sm text-slate-400 mb-8 max-w-sm">
          {t('loc_maps_desc')}
        </p>
        <div className="text-xs text-left bg-white/5 p-6 rounded-3xl border border-white/10 space-y-3 font-medium">
          <p>1. Open <strong>Settings</strong> (⚙️ gear icon)</p>
          <p>2. Selecteer <strong>Secrets</strong></p>
          <p>3. Voeg <code className="bg-white/10 px-1 rounded text-secondary">GOOGLE_MAPS_PLATFORM_KEY</code> toe</p>
          <p>4. Plak je API key en druk op Enter</p>
        </div>
      </div>
    );
  }

  // Defer Map initialization until parent is inView
  if (!inView) {
    return (
      <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center">
        <MapIcon size={32} className="text-slate-300" />
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY} version="weekly">
      <Map
        defaultCenter={{ lat: 52.45423, lng: 5.03456 }}
        defaultZoom={15}
        mapId="DEMO_MAP_ID"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{ width: '100%', height: '100%' }}
        disableDefaultUI
        gestureHandling="greedy"
      >
        <AdvancedMarker position={{ lat: 52.45423, lng: 5.03456 }}>
          <Pin background="#0ea5e9" glyphColor="#fff" borderColor="#0369a1" scale={1.5} />
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
}

export default function Locations() {
  const { language, t } = useLanguage();
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading 200px before it enters viewport
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const locations = [
    {
      city: { nl: 'Monnickendam - Direct Start', en: 'Monnickendam - Start now' },
      pool: 'Sportfondsen Monnickendam',
      address: 'Wilhelminalaan 54, 1141 CW Monnickendam',
      details: { nl: 'De ideale locatie voor zwemmen in Waterland. Geen wachtlijst!', en: 'The ideal location for swimming in Waterland. No waiting list!' },
      usps: [
        { nl: 'Sporten & Fit blijven', en: 'Sports & Staying Fit' },
        { nl: 'Ontspannen & Eigen tempo', en: 'Relaxing & Own pace' },
        { nl: 'Leren & Nieuwe vaardigheden', en: 'Learning & New skills' },
        { nl: 'Spik en span faciliteiten', en: 'Clean and tidy facilities' }
      ],
      isActive: true
    },
    {
      city: { nl: 'Amsterdam Regio', en: 'Amsterdam Region' },
      pool: 'De Mirandabad / Sloterparkbad',
      address: { nl: 'Diverse locaties in Amsterdam', en: 'Various locations in Amsterdam' },
      usps: [],
      isActive: false
    }
  ];

  return (
    <section id="locaties" ref={sectionRef} className="py-24 bg-white relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex items-center gap-24">
          <div className="lg:w-1/2 mb-16 lg:mb-0">
            <h2 className="text-4xl lg:text-5xl font-display font-black text-primary mb-8">
              {t('loc_find_us').split(' ').map((word, i) => (
                (word === 'buurt' || word === 'area' || word === 'area') ? <span key={i} className="text-secondary underline decoration-secondary/20 ml-1">{word}</span> : (i === 0 ? word : ` ${word}`)
              ))}
            </h2>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed font-medium">
                {t('loc_intro')}
            </p>

            <div className="space-y-6">
              {locations.map((loc) => (
                <motion.div 
                  key={typeof loc.city === 'string' ? loc.city : loc.city.en}
                  className={`p-8 rounded-[2.5rem] border-2 shadow-soft transition-all duration-500 relative overflow-hidden ${loc.isActive ? 'border-secondary bg-secondary/5' : 'border-slate-50 bg-white opacity-60'}`}
                >
                  <div className="flex items-start gap-6 relative z-10">
                    <div className={`p-4 rounded-2xl shadow-lg transition-transform duration-500 ${loc.isActive ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <MapPin size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-primary mb-1">{loc.city[language]}</h3>
                      <p className="font-extrabold text-secondary text-lg mb-2">{loc.pool}</p>
                      <p className="text-slate-500 text-sm mb-4 font-bold flex items-center gap-2">
                        <MapIcon size={16} /> {typeof loc.address === 'string' ? loc.address : loc.address[language]}
                      </p>
                      <div className="flex items-center justify-between">
                        {loc.isActive && (
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-black uppercase tracking-widest">
                            {t('loc_available_now')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative group">
            <div className="aspect-[4/5] bg-primary rounded-[4rem] relative overflow-hidden shadow-[0_50px_100px_rgba(0,31,63,0.2)] pricing-card-3d">
              <MapDisplay inView={inView} />
              
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 p-6 sm:p-8 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20">
                  <p className="text-secondary font-black text-lg sm:text-xl mb-1">Sportfondsen Monnickendam</p>
                  <p className="text-primary/70 text-[10px] font-black uppercase tracking-widest leading-none">{t('loc_main_location')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
