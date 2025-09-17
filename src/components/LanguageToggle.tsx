'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const EnglandFlag = ({ className = 'h-3.5 w-5 mr-1.5' }: { className?: string }) => (
    <svg
      viewBox="0 0 60 36"
      className={className}
      role="img"
      aria-label="England flag"
    >
      <rect width="60" height="36" fill="#ffffff" />
      <rect x="0" y="14" width="60" height="8" fill="#CF142B" />
      <rect x="26" y="0" width="8" height="36" fill="#CF142B" />
    </svg>
  );

  const QuebecFlag = ({ className = 'h-3.5 w-5 mr-1.5' }: { className?: string }) => (
    <svg
      viewBox="0 0 60 36"
      className={className}
      role="img"
      aria-label="Quebec flag"
    >
      <rect width="60" height="36" fill="#002495" />
      <rect x="0" y="14" width="60" height="8" fill="#ffffff" />
      <rect x="26" y="0" width="8" height="36" fill="#ffffff" />
    </svg>
  );

  return (
    <div className="flex items-center gap-2 glass rounded-full p-1">
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={`rounded-full px-3 py-1 h-8 text-xs font-medium transition-all duration-300 ${
          language === 'en' 
            ? 'bg-primary text-primary-foreground shadow-lg' 
            : 'hover:bg-white/10 text-muted-foreground'
        }`}
      >
        <EnglandFlag />
        EN
      </Button>
      <Button
        variant={language === 'fr' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('fr')}
        className={`rounded-full px-3 py-1 h-8 text-xs font-medium transition-all duration-300 ${
          language === 'fr' 
            ? 'bg-primary text-primary-foreground shadow-lg' 
            : 'hover:bg-white/10 text-muted-foreground'
        }`}
      >
        <QuebecFlag />
        FR
      </Button>
    </div>
  );
}
