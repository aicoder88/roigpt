/**
 * Privacy-focused analytics system with multiple provider support
 * Includes GDPR compliance, consent management, and event tracking
 */

import { isDevelopment, isProduction } from './env';

// Analytics event types
export interface AnalyticsEvent {
  name: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
  userId?: string;
  sessionId?: string;
  timestamp?: number;
}

// User properties for identification
export interface UserProperties {
  userId?: string;
  email?: string;
  name?: string;
  plan?: string;
  signupDate?: string;
  company?: string;
  [key: string]: any;
}

// Analytics provider configuration
export interface AnalyticsProvider {
  name: string;
  initialize: (config: any) => Promise<void>;
  track: (event: AnalyticsEvent) => Promise<void>;
  identify: (userId: string, properties: UserProperties) => Promise<void>;
  page: (pageName: string, properties?: Record<string, any>) => Promise<void>;
  setUserProperties: (properties: UserProperties) => Promise<void>;
  reset: () => Promise<void>;
}

// Analytics configuration
export interface AnalyticsConfig {
  providers: {
    googleAnalytics?: {
      measurementId: string;
      enabled: boolean;
    };
    facebookPixel?: {
      pixelId: string;
      enabled: boolean;
    };
    mixpanel?: {
      token: string;
      enabled: boolean;
    };
    amplitude?: {
      apiKey: string;
      enabled: boolean;
    };
    plausible?: {
      domain: string;
      enabled: boolean;
    };
  };
  consent: {
    required: boolean;
    cookieKey: string;
    defaultConsent: boolean;
  };
  debug: boolean;
  enableInDevelopment: boolean;
}

// Consent management
class ConsentManager {
  private consentKey: string;
  private hasConsent: boolean | null = null;

  constructor(consentKey: string = 'analytics_consent') {
    this.consentKey = consentKey;
    this.loadConsent();
  }

  private loadConsent(): void {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(this.consentKey);
      this.hasConsent = stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn('Failed to load analytics consent:', error);
      this.hasConsent = null;
    }
  }

  public getConsent(): boolean | null {
    return this.hasConsent;
  }

  public setConsent(consent: boolean): void {
    this.hasConsent = consent;

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.consentKey, JSON.stringify(consent));

        // Dispatch consent change event
        window.dispatchEvent(new CustomEvent('analytics-consent-changed', {
          detail: { consent }
        }));
      } catch (error) {
        console.warn('Failed to save analytics consent:', error);
      }
    }
  }

  public clearConsent(): void {
    this.hasConsent = null;

    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(this.consentKey);
      } catch (error) {
        console.warn('Failed to clear analytics consent:', error);
      }
    }
  }

  public hasValidConsent(): boolean {
    return this.hasConsent === true;
  }
}

// Google Analytics provider
const createGoogleAnalyticsProvider = (config: { measurementId: string }): AnalyticsProvider => ({
  name: 'Google Analytics',

  async initialize() {
    if (typeof window === 'undefined') return;

    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;

    gtag('js', new Date());
    gtag('config', config.measurementId, {
      send_page_view: false, // We'll send manually
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  },

  async track(event: AnalyticsEvent) {
    if (typeof window === 'undefined' || !(window as any).gtag) return;

    (window as any).gtag('event', event.action || event.name, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      custom_map: event.properties,
    });
  },

  async identify(userId: string, properties: UserProperties) {
    if (typeof window === 'undefined' || !(window as any).gtag) return;

    (window as any).gtag('config', config.measurementId, {
      user_id: userId,
      custom_map: properties,
    });
  },

  async page(pageName: string, properties?: Record<string, any>) {
    if (typeof window === 'undefined' || !(window as any).gtag) return;

    (window as any).gtag('config', config.measurementId, {
      page_title: pageName,
      page_location: window.location.href,
      ...properties,
    });
  },

  async setUserProperties(properties: UserProperties) {
    if (typeof window === 'undefined' || !(window as any).gtag) return;

    (window as any).gtag('set', properties);
  },

  async reset() {
    // Google Analytics doesn't have a built-in reset method
    // Clear user_id by setting it to null
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', config.measurementId, {
        user_id: null,
      });
    }
  },
});

// Plausible provider (privacy-focused)
const createPlausibleProvider = (config: { domain: string }): AnalyticsProvider => ({
  name: 'Plausible',

  async initialize() {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://plausible.io/js/script.js';
    script.setAttribute('data-domain', config.domain);
    document.head.appendChild(script);
  },

  async track(event: AnalyticsEvent) {
    if (typeof window === 'undefined' || !(window as any).plausible) return;

    (window as any).plausible(event.name, {
      props: {
        category: event.category,
        label: event.label,
        value: event.value,
        ...event.properties,
      }
    });
  },

  async identify() {
    // Plausible doesn't support user identification (privacy-focused)
  },

  async page(pageName: string) {
    if (typeof window === 'undefined' || !(window as any).plausible) return;

    (window as any).plausible('pageview', {
      props: { page: pageName }
    });
  },

  async setUserProperties() {
    // Plausible doesn't support user properties (privacy-focused)
  },

  async reset() {
    // Plausible doesn't require reset (no user data stored)
  },
});

// Main Analytics class
class Analytics {
  private providers: AnalyticsProvider[] = [];
  private consentManager: ConsentManager;
  private config: AnalyticsConfig;
  private initialized = false;
  private eventQueue: AnalyticsEvent[] = [];

  constructor(config: AnalyticsConfig) {
    this.config = config;
    this.consentManager = new ConsentManager(config.consent.cookieKey);

    // Listen for consent changes
    if (typeof window !== 'undefined') {
      window.addEventListener('analytics-consent-changed', this.handleConsentChange.bind(this) as EventListener);
    }
  }

  private handleConsentChange = (event: CustomEvent) => {
    if (event.detail.consent) {
      this.initialize();
      this.flushEventQueue();
    } else {
      this.reset();
    }
  };

  private shouldTrack(): boolean {
    // Don't track in development unless explicitly enabled
    if (isDevelopment() && !this.config.enableInDevelopment) {
      return false;
    }

    // Check consent if required
    if (this.config.consent.required) {
      return this.consentManager.hasValidConsent();
    }

    return true;
  }

  private log(...args: any[]): void {
    if (this.config.debug || isDevelopment()) {
      console.log('[Analytics]', ...args);
    }
  }

  public async initialize(): Promise<void> {
    if (this.initialized || !this.shouldTrack()) {
      return;
    }

    this.log('Initializing analytics providers...');

    // Initialize Google Analytics
    if (this.config.providers.googleAnalytics?.enabled) {
      const provider = createGoogleAnalyticsProvider(this.config.providers.googleAnalytics);
      this.providers.push(provider);
      await provider.initialize(this.config.providers.googleAnalytics);
      this.log('Google Analytics initialized');
    }

    // Initialize Plausible
    if (this.config.providers.plausible?.enabled) {
      const provider = createPlausibleProvider(this.config.providers.plausible);
      this.providers.push(provider);
      await provider.initialize(this.config.providers.plausible);
      this.log('Plausible initialized');
    }

    this.initialized = true;
    this.log(`Analytics initialized with ${this.providers.length} providers`);
  }

  private async executeOnProviders<T>(
    method: keyof AnalyticsProvider,
    ...args: any[]
  ): Promise<void> {
    if (!this.shouldTrack()) {
      return;
    }

    const promises = this.providers.map(async (provider) => {
      try {
        await (provider[method] as any)(...args);
      } catch (error) {
        console.error(`Error in ${provider.name} ${method}:`, error);
      }
    });

    await Promise.all(promises);
  }

  private flushEventQueue(): void {
    if (this.eventQueue.length > 0) {
      this.log(`Flushing ${this.eventQueue.length} queued events`);
      const events = [...this.eventQueue];
      this.eventQueue = [];

      events.forEach(event => this.track(event));
    }
  }

  public async track(event: AnalyticsEvent): Promise<void> {
    const fullEvent: AnalyticsEvent = {
      ...event,
      timestamp: event.timestamp || Date.now(),
      sessionId: this.getSessionId(),
    };

    this.log('Tracking event:', fullEvent);

    if (!this.initialized) {
      this.eventQueue.push(fullEvent);
      return;
    }

    await this.executeOnProviders('track', fullEvent);
  }

  public async identify(userId: string, properties: UserProperties = {}): Promise<void> {
    this.log('Identifying user:', userId, properties);
    await this.executeOnProviders('identify', userId, properties);
  }

  public async page(pageName: string, properties?: Record<string, any>): Promise<void> {
    this.log('Page view:', pageName, properties);
    await this.executeOnProviders('page', pageName, properties);
  }

  public async setUserProperties(properties: UserProperties): Promise<void> {
    this.log('Setting user properties:', properties);
    await this.executeOnProviders('setUserProperties', properties);
  }

  public async reset(): Promise<void> {
    this.log('Resetting analytics');
    await this.executeOnProviders('reset');
    this.eventQueue = [];
  }

  public getConsentManager(): ConsentManager {
    return this.consentManager;
  }

  private getSessionId(): string {
    if (typeof window === 'undefined') return 'server';

    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }
}

// Default configuration
const defaultConfig: AnalyticsConfig = {
  providers: {
    googleAnalytics: {
      measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
      enabled: !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    },
    plausible: {
      domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'roigpt.com',
      enabled: !!process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    },
  },
  consent: {
    required: process.env.NEXT_PUBLIC_ANALYTICS_CONSENT_REQUIRED === 'true',
    cookieKey: 'roigpt_analytics_consent',
    defaultConsent: false,
  },
  debug: isDevelopment(),
  enableInDevelopment: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS_IN_DEV === 'true',
};

// Create singleton instance
export const analytics = new Analytics(defaultConfig);

// Convenience functions for common events
export const trackEvent = {
  // Page navigation
  pageView: (pageName: string, properties?: Record<string, any>) =>
    analytics.page(pageName, properties),

  // User actions
  buttonClick: (buttonName: string, location?: string) =>
    analytics.track({
      name: 'button_click',
      category: 'engagement',
      action: 'click',
      label: buttonName,
      properties: { location },
    }),

  // Form interactions
  formStart: (formName: string) =>
    analytics.track({
      name: 'form_start',
      category: 'forms',
      action: 'start',
      label: formName,
    }),

  formSubmit: (formName: string, success: boolean = true) =>
    analytics.track({
      name: 'form_submit',
      category: 'forms',
      action: success ? 'submit_success' : 'submit_error',
      label: formName,
    }),

  // Content engagement
  linkClick: (linkText: string, destination: string) =>
    analytics.track({
      name: 'link_click',
      category: 'engagement',
      action: 'click',
      label: linkText,
      properties: { destination },
    }),

  // Business metrics
  leadGeneration: (source: string, formType: string) =>
    analytics.track({
      name: 'lead_generated',
      category: 'conversion',
      action: 'lead',
      label: source,
      properties: { form_type: formType },
    }),

  // Download tracking
  downloadStart: (fileName: string, fileType: string) =>
    analytics.track({
      name: 'download_start',
      category: 'content',
      action: 'download',
      label: fileName,
      properties: { file_type: fileType },
    }),

  // Newsletter signup
  newsletterSignup: (source: string) =>
    analytics.track({
      name: 'newsletter_signup',
      category: 'conversion',
      action: 'signup',
      label: source,
    }),

  // Video interactions
  videoPlay: (videoTitle: string, duration?: number) =>
    analytics.track({
      name: 'video_play',
      category: 'content',
      action: 'play',
      label: videoTitle,
      properties: { duration },
    }),

  // Error tracking
  error: (errorType: string, errorMessage: string, location: string) =>
    analytics.track({
      name: 'error',
      category: 'errors',
      action: errorType,
      label: location,
      properties: { message: errorMessage },
    }),
};