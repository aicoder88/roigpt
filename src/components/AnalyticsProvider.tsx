'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { analytics, trackEvent } from '@/lib/analytics';
import { ConsentBanner, AnalyticsStatusIndicator } from './ConsentBanner';
import { usePathname } from 'next/navigation';
import { isDevelopment } from '@/lib/env';

interface AnalyticsContextType {
  isInitialized: boolean;
  hasConsent: boolean | null;
  track: typeof trackEvent;
  identify: (userId: string, properties?: Record<string, any>) => void;
  setUserProperties: (properties: Record<string, any>) => void;
  reset: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

interface AnalyticsProviderProps {
  children: ReactNode;
  showConsentBanner?: boolean;
  consentBannerVariant?: 'minimal' | 'detailed';
  enablePageTracking?: boolean;
}

export function AnalyticsProvider({
  children,
  showConsentBanner = true,
  consentBannerVariant = 'detailed',
  enablePageTracking = true,
}: AnalyticsProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const initializeAnalytics = async () => {
      try {
        await analytics.initialize();
        setIsInitialized(true);

        const consentManager = analytics.getConsentManager();
        setHasConsent(consentManager.getConsent());
      } catch (error) {
        console.error('Failed to initialize analytics:', error);
      }
    };

    initializeAnalytics();

    // Listen for consent changes
    const handleConsentChange = (event: CustomEvent) => {
      setHasConsent(event.detail.consent);
    };

    window.addEventListener('analytics-consent-changed', handleConsentChange as EventListener);

    return () => {
      window.removeEventListener('analytics-consent-changed', handleConsentChange as EventListener);
    };
  }, []);

  // Track page views
  useEffect(() => {
    if (enablePageTracking && isInitialized && hasConsent) {
      const pageName = getPageName(pathname);
      trackEvent.pageView(pageName, {
        path: pathname,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
      });
    }
  }, [pathname, isInitialized, hasConsent, enablePageTracking]);

  const contextValue: AnalyticsContextType = {
    isInitialized,
    hasConsent,
    track: trackEvent,
    identify: async (userId: string, properties = {}) => {
      await analytics.identify(userId, properties);
    },
    setUserProperties: async (properties: Record<string, any>) => {
      await analytics.setUserProperties(properties);
    },
    reset: async () => {
      await analytics.reset();
    },
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}

      {/* Consent banner */}
      {showConsentBanner && (
        <ConsentBanner variant={consentBannerVariant} />
      )}

      {/* Development status indicator */}
      {isDevelopment() && <AnalyticsStatusIndicator />}
    </AnalyticsContext.Provider>
  );
}

// Hook for using analytics
export function useAnalytics() {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }

  return context;
}

// Hook for tracking with automatic consent checking
export function useTracking() {
  const { track, hasConsent, isInitialized } = useAnalytics();

  return {
    track: hasConsent && isInitialized ? track : createNoOpTracker(),
    canTrack: hasConsent && isInitialized,
    hasConsent,
    isInitialized,
  };
}

// Helper function to get page name from pathname
function getPageName(pathname: string): string {
  const pathMap: Record<string, string> = {
    '/': 'Home',
    '/about': 'About',
    '/services': 'Services',
    '/contact': 'Contact',
    '/privacy-policy': 'Privacy Policy',
    '/terms': 'Terms of Service',
    '/blog': 'Blog',
  };

  return pathMap[pathname] || `Page: ${pathname}`;
}

// No-op tracker for when consent is not given
function createNoOpTracker() {
  return {
    pageView: () => Promise.resolve(),
    buttonClick: () => Promise.resolve(),
    formStart: () => Promise.resolve(),
    formSubmit: () => Promise.resolve(),
    linkClick: () => Promise.resolve(),
    leadGeneration: () => Promise.resolve(),
    downloadStart: () => Promise.resolve(),
    newsletterSignup: () => Promise.resolve(),
    videoPlay: () => Promise.resolve(),
    error: () => Promise.resolve(),
  };
}