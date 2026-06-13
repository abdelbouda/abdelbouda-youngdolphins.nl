import { MapPin, Map as MapIcon, ExternalLink } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useState, useEffect, useRef } from 'react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

function MapDisplay({ inView }: { inView: boolean }) {
  const { t } = useLanguage();

  if (!hasValidKey) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex flex-col items-center justify-center p-8 text-center text-white">
        <MapPin size={64} className="text-white/80 mb-6" />
        <h3 className="text-2xl font-black mb-2">Sportfondsenbad Monnickendam</h3>
        <p className="text-white/80 mb-1">Wilhelminalaan 54</p>
        <p className="text-white/80 mb-6">1141 CW Monnickendam</p>
        <a 
          href="https://maps.google.com/?q=Sportfondsenbad+Monnickendam+Wilhelminalaan+54+Monnickendam"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-bold hover:bg-secondary hover:text-white transition-all"
        >
          <ExternalLink size={18} /> Route in Google Maps openen
        </a>
      </div>
    );
  }

  if (!inView) {
    return (
      <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center">
        <MapIcon size={48} className="text-slate-300" />
        <p className="text-slate-400 text-sm ml-2">Laden van kaart...</p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY} version="weekly">
      <Map
        defaultCenter={{ lat: 52.4632, lng: 5.0347 }}
        defaultZoom={16}
        mapId="YOUNG_DOLPHINS_MAP"
        style={{ width: '100%', height: '100%' }}
        disableDefaultUI={false}
        gestureHandling="greedy"
        mapTypeControl={false}
        fullscreenControl={true}
        zoomControl={true}
      >
        <AdvancedMarker position={{ lat: 52.4632, lng: 5.0347 }}>
          <Pin background="#0c8ec6" glyphColor="#ffffff" borderColor="#1B365D" scale={1.2} />
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
}

export default function Locations() {
  const { t } = useLanguage();
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const locations = [
    {
      city: 'loc_monnickendam_title',
      pool: 'Sportfondsen Monnickendam',
      address: 'Wilhelminalaan 54, 1141 CW Monnickendam',
      details: 'loc_monnickendam_desc',
      isActive: true,
      mapsUrl: 'https://maps.google.com/?q=Sportfondsenbad+Monnickendam+Wilhelminalaan+54+Monnickendam'
    },
    {
      city: 'loc_amsterdam_title',
      pool: 'De Mirandabad / Sloterparkbad',
      address: 'Diverse locaties in Amsterdam',
      isActive: false,
      mapsUrl: 'https://maps.google.com/?q=Zwembad+Amsterdam'
    }
  ];

  return (
    <section id="locaties" ref={sectionRef} className="py-24 bg-white relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex items-center gap-24">
          <div className="lg:w-1/2 mb-16 lg:mb-0">
            <h2 className="text-4xl lg:text-5xl font-display font-black text-primary mb-8">
              {t('loc_find_us')}
            </h2>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed font-medium">
              {t('loc_intro')}
            </p>

            <div className="space-y-6">
              {locations.map((loc) => (
                <div 
                  key={loc.city}
                  className={`p-8 rounded-[2.5rem] border-2 transition-all duration-500 relative overflow-hidden ${
                    loc.isActive ? 'border-secondary bg-secondary/5' : 'border-slate-50 bg-white opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-6 relative z-10">
                    <div className={`p-4 rounded-2xl shadow-lg transition-transform duration-500 ${loc.isActive ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <MapPin size={28} aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-primary mb-1">{t(loc.city)}</h3>
                      <p className="font-extrabold text-secondary text-lg mb-2">{loc.pool}</p>
                      <p className="text-slate-500 text-sm mb-4 font-bold flex items-center gap-2">
                        <MapIcon size={16} aria-hidden="true" /> {loc.address}
                      </p>
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        {loc.isActive && (
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-black uppercase tracking-widest">
                            ✅ {t('loc_available_now')}
                          </div>
                        )}
                        <a
                          href={loc.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:text-primary transition-colors"
                        >
                          Route plannen <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative group">
            <div className="aspect-[4/5] bg-primary rounded-[4rem] relative overflow-hidden shadow-[0_50px_100px_rgba(0,31,63,0.2)]">
              <MapDisplay inView={inView} />
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 p-6 sm:p-8 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20">
                <p className="text-secondary font-black text-lg sm:text-xl mb-1">Sportfondsen Monnickendam</p>
                <p className="text-primary/70 text-[10px] font-black uppercase tracking-widest leading-none">Hoofdlocatie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}