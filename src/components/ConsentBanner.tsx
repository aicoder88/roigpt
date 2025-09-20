'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { analytics } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import {
  Shield,
  Check,
  X,
  Settings,
  Eye,
  Lock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ConsentBannerProps {
  className?: string;
  position?: 'bottom' | 'top';
  variant?: 'minimal' | 'detailed';
}

export function ConsentBanner({
  className,
  position = 'bottom',
  variant = 'detailed',
}: ConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const consentManager = analytics.getConsentManager();
    const currentConsent = consentManager.getConsent();

    if (currentConsent === null) {
      setIsVisible(true);
    }

    setConsent(currentConsent);
  }, []);

  const handleAccept = () => {
    const consentManager = analytics.getConsentManager();
    consentManager.setConsent(true);
    setConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    const consentManager = analytics.getConsentManager();
    consentManager.setConsent(false);
    setConsent(false);
    setIsVisible(false);
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  if (!isVisible) {
    return null;
  }

  const positionClasses = {
    bottom: 'bottom-4 left-4 right-4 md:left-6 md:right-6',
    top: 'top-4 left-4 right-4 md:left-6 md:right-6',
  };

  if (variant === 'minimal') {
    return (
      <div
        className={cn(
          'fixed z-50 max-w-md mx-auto',
          positionClasses[position],
          className
        )}
      >
        <Card className="glass-card border-border/50 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-sm text-foreground">
                  We use analytics to improve your experience. Your privacy is important to us.
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleAccept}
                    className="flex-1"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDecline}
                    className="flex-1"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Decline
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'fixed z-50 max-w-2xl mx-auto',
        positionClasses[position],
        className
      )}
    >
      <Card className="glass-card border-border/50 shadow-2xl">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Privacy & Analytics</h3>
                <Badge variant="outline" className="mt-1">
                  <Lock className="h-3 w-3 mr-1" />
                  GDPR Compliant
                </Badge>
              </div>
            </div>

            {/* Main message */}
            <p className="text-muted-foreground leading-relaxed">
              We use privacy-focused analytics to understand how you interact with our website
              and improve your experience. We never sell your data or use it for advertising.
            </p>

            {/* Details toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleDetails}
              className="p-0 h-auto text-sm text-primary hover:text-primary/80"
            >
              <Eye className="h-4 w-4 mr-1" />
              {showDetails ? 'Hide' : 'Show'} what we track
              {showDetails ? (
                <ChevronUp className="h-4 w-4 ml-1" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-1" />
              )}
            </Button>

            {/* Expandable details */}
            {showDetails && (
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-sm">What we collect:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Page views and navigation patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Button clicks and form interactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Time spent on pages (anonymized)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Device type and browser information</span>
                  </li>
                </ul>

                <h4 className="font-medium text-sm mt-4">What we DON'T collect:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Personal information without consent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Cross-site tracking or advertising data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Sensitive personal or financial data</span>
                  </li>
                </ul>

                <p className="text-xs text-muted-foreground mt-3 p-2 bg-background/50 rounded border-l-2 border-primary/20">
                  <Lock className="h-3 w-3 inline mr-1" />
                  You can withdraw consent at any time in the footer of our website.
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={handleAccept}
                className="flex-1 sm:flex-none"
              >
                <Check className="h-4 w-4 mr-2" />
                Accept Analytics
              </Button>

              <Button
                variant="outline"
                onClick={handleDecline}
                className="flex-1 sm:flex-none"
              >
                <X className="h-4 w-4 mr-2" />
                Decline
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => {
                  // Link to privacy policy
                  window.open('/privacy-policy', '_blank');
                }}
              >
                <Settings className="h-3 w-3 mr-1" />
                Privacy Policy
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-4 pt-3 border-t border-border/50">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                GDPR Compliant
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                Data Encrypted
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Eye className="h-3 w-3" />
                No Ads
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Analytics status indicator for development
export function AnalyticsStatusIndicator() {
  const [consent, setConsent] = useState<boolean | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consentManager = analytics.getConsentManager();
    setConsent(consentManager.getConsent());

    const handleConsentChange = (event: CustomEvent) => {
      setConsent(event.detail.consent);
    };

    window.addEventListener('analytics-consent-changed', handleConsentChange as EventListener);

    // Show in development mode
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }

    return () => {
      window.removeEventListener('analytics-consent-changed', handleConsentChange as EventListener);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  const getStatusColor = () => {
    if (consent === null) return 'bg-yellow-500';
    if (consent === true) return 'bg-green-500';
    return 'bg-red-500';
  };

  const getStatusText = () => {
    if (consent === null) return 'Pending';
    if (consent === true) return 'Accepted';
    return 'Declined';
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Badge variant="outline" className="glass-card">
        <div className={cn('w-2 h-2 rounded-full mr-2', getStatusColor())} />
        Analytics: {getStatusText()}
      </Badge>
    </div>
  );
}