import { Shield, CreditCard, Clock, Award } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface TrustBadgesProps {
  variant?: 'form' | 'footer' | 'inline';
  className?: string;
}

export default function TrustBadges({ variant = 'form', className = '' }: TrustBadgesProps) {
  const { language } = useLanguage();

  const badges = {
    form: [
      { icon: Shield, text: language === 'nl' ? 'Veilige betaling' : 'Secure payment' },
      { icon: Clock, text: language === 'nl' ? 'Antwoord binnen 24u' : 'Reply within 24h' },
      { icon: Award, text: language === 'nl' ? 'Gecertificeerd' : 'Certified' },
    ],
    inline: [
      { icon: Shield, text: language === 'nl' ? '100% veilig' : '100% secure' },
      { icon: CreditCard, text: language === 'nl' ? 'Geen verrassingen' : 'No surprises' },
      { icon: Clock, text: language === 'nl' ? 'Direct starten' : 'Start immediately' },
    ],
    footer: [
      { icon: Shield, text: language === 'nl' ? 'AVG compliant' : 'GDPR compliant' },
      { icon: Award, text: language === 'nl' ? 'NRZ erkend' : 'NRZ certified' },
    ],
  };

  const selectedBadges = badges[variant] || badges.form;

  return (
    <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
      {selectedBadges.map((badge, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <badge.icon size={16} />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {badge.text}
          </span>
        </div>
      ))}
    </div>
  );
}