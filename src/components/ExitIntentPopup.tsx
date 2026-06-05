import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface ExitIntentPopupProps {
  onClose?: () => void;
}

export default function ExitIntentPopup({ onClose }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const handleMouseLeave = (e: MouseEvent) => {
      // Als de muur de bovenkant van het scherm verlaat (exit intent)
      if (e.clientY <= 0 && !isVisible) {
        // Kleine vertraging om te voorkomen dat het meteen verschijnt
        timer = setTimeout(() => {
          setIsVisible(true);
        }, 100);
      }
    };

    // Ook bij scroll naar boven (mobiel alternatief)
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY && currentScrollY < 100 && !isVisible) {
        // Gebruiker scrollt omhoog naar de top
        timer = setTimeout(() => {
          setIsVisible(true);
        }, 300);
      }
      lastScrollY = currentScrollY;
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      if (timer) clearTimeout(timer);
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full mx-4 text-center relative shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Sluiten"
        >
          <X size={22} />
        </button>
        
        {/* Dolphin icon */}
        <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-2xl flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-secondary">
            <path 
              d="M4 14C4.5 12.5 6.5 10 10 9.5C13.5 9 15 10.5 16 12.5C17 14.5 18.5 13.5 20 13C21.5 12.5 23 11.5 23 10C23 8.5 21.5 7 19.5 6.5C17 5.8 14 6.5 12 8.5C10 10.5 8.5 13 8 15C7.8 16 8.2 17 9.5 17.5C10.8 18 12 17.5 12.5 16.5L12.8 15.5" 
              stroke="#5AC1E6" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
            />
          </svg>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-black text-primary mb-3">
          {language === 'nl' ? 'Wacht! 🐬' : 'Wait! 🐬'}
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {language === 'nl' 
            ? 'Schrijf je nu in voor een gratis proefles en ontdek waarom zoveel kinderen bij Young Dolphins zwemmen.' 
            : 'Sign up now for a free trial lesson and discover why so many children swim at Young Dolphins.'}
        </p>
        
        <div className="space-y-3">
          <a 
            href="#signup-form" 
            onClick={handleClose}
            className="block w-full py-4 bg-secondary text-white rounded-2xl font-black text-lg hover:bg-secondary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('cta_register')}
          </a>
          
          <button 
            onClick={handleClose}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2"
          >
            {language === 'nl' ? 'Nee, bedankt' : 'No, thanks'}
          </button>
        </div>
        
        <p className="text-[10px] text-gray-400 mt-6">
          {language === 'nl' ? 'Geen spam • Altijd direct antwoord' : 'No spam • Always fast response'}
        </p>
      </div>
    </div>
  );
}