'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.services': 'Services',
    'nav.examples': 'Examples',
    'nav.metrics': 'Metrics',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.title': 'AI-Powered Marketing That Delivers Real ROI',
    'hero.subtitle': 'Transform your digital presence with cutting-edge AI solutions that boost conversions, optimize SEO, and create compelling campaigns that convert.',
    'hero.cta': 'Get Started Today',
    'hero.testimonial': '"ROIGPT increased our conversion rate by 340% in just 3 months!"',
    'hero.testimonial.author': 'Sarah Johnson, CEO of TechStart',

    // Services
    'services.title': 'Our AI-Powered Services',
    'services.subtitle': 'Leverage cutting-edge AI technology to boost your ROI with our comprehensive suite of digital marketing services.',
    'services.nextjs.title': 'NextJS Websites',
    'services.nextjs.description': 'Lightning-fast, SEO-optimized websites built with modern technology',
    'services.nextjs.price': 'Starting at $2,999',
    'services.seo.title': 'SEO Optimization',
    'services.seo.description': 'AI-driven SEO strategies that get you to the top of search results',
    'services.seo.price': 'Starting at $1,499/month',
    'services.campaigns.title': 'Campaign Optimization',
    'services.campaigns.description': 'Data-driven strategies that maximize your marketing ROI',
    'services.campaigns.price': 'Starting at $499/month',

    // Performance Metrics
    'metrics.title': 'Proven Results',
    'metrics.subtitle': 'Our AI-powered solutions deliver measurable improvements in ROI, page speed, and conversion rates.',
    'metrics.roi': 'Average ROI Increase',
    'metrics.speed': 'Page Speed Score',
    'metrics.conversion': 'Conversion Rate Boost',
    'metrics.clients': 'Happy Clients',

    // CTA Section
    'cta.title': 'Ready to Transform Your Digital Presence?',
    'cta.subtitle': 'Join the AI revolution and watch your ROI soar with our cutting-edge solutions.',
    'cta.button': 'Get Started Today',

    // Footer
    'footer.tagline': 'AI-Powered Marketing Solutions',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.about': 'About Us',
    'footer.case-studies': 'Case Studies',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.copyright': 'All rights reserved.',
  },
  fr: {
    // Navigation
    'nav.services': 'Services',
    'nav.examples': 'Exemples',
    'nav.metrics': 'Métriques',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.title': 'Marketing IA qui Génère un ROI Réel',
    'hero.subtitle': 'Transformez votre présence numérique avec des solutions IA de pointe qui augmentent les conversions, optimisent le SEO et créent des campagnes convaincantes.',
    'hero.cta': 'Commencer Aujourd\'hui',
    'hero.testimonial': '"ROIGPT a augmenté notre taux de conversion de 340% en seulement 3 mois!"',
    'hero.testimonial.author': 'Sarah Johnson, PDG de TechStart',

    // Services
    'services.title': 'Nos Services Alimentés par l\'IA',
    'services.subtitle': 'Exploitez la technologie IA de pointe pour augmenter votre ROI avec notre suite complète de services de marketing numérique.',
    'services.nextjs.title': 'Sites Web NextJS',
    'services.nextjs.description': 'Sites web ultra-rapides et optimisés SEO construits avec une technologie moderne',
    'services.nextjs.price': 'À partir de 2 999$',
    'services.seo.title': 'Optimisation SEO',
    'services.seo.description': 'Stratégies SEO pilotées par IA qui vous mènent au sommet des résultats de recherche',
    'services.seo.price': 'À partir de 1 499$/mois',
    'services.campaigns.title': 'Optimisation de Campagne',
    'services.campaigns.description': 'Stratégies basées sur les données qui maximisent votre ROI marketing',
    'services.campaigns.price': 'À partir de 499$/mois',

    // Performance Metrics
    'metrics.title': 'Résultats Prouvés',
    'metrics.subtitle': 'Nos solutions alimentées par IA offrent des améliorations mesurables du ROI, de la vitesse des pages et des taux de conversion.',
    'metrics.roi': 'Augmentation Moyenne du ROI',
    'metrics.speed': 'Score de Vitesse de Page',
    'metrics.conversion': 'Amélioration du Taux de Conversion',
    'metrics.clients': 'Clients Satisfaits',

    // CTA Section
    'cta.title': 'Prêt à Transformer Votre Présence Numérique?',
    'cta.subtitle': 'Rejoignez la révolution IA et regardez votre ROI s\'envoler avec nos solutions de pointe.',
    'cta.button': 'Commencer Aujourd\'hui',

    // Footer
    'footer.tagline': 'Solutions de Marketing Alimentées par IA',
    'footer.services': 'Services',
    'footer.company': 'Entreprise',
    'footer.legal': 'Légal',
    'footer.about': 'À Propos',
    'footer.case-studies': 'Études de Cas',
    'footer.contact': 'Contact',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': 'Conditions d\'Utilisation',
    'footer.copyright': 'Tous droits réservés.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
