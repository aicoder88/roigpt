'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

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
        <span className="mr-1.5">🇺🇸</span>
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
        <span className="mr-1.5">🇨🇦</span>
        FR
      </Button>
    </div>
  );
}