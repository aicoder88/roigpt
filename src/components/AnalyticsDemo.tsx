'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  TrackedButton,
  TrackedLink,
  TrackedForm,
  TrackedDownload,
  TrackedNewsletterWrapper,
} from './ui/tracked-components';
import { useTracking, useAnalytics } from './AnalyticsProvider';
import {
  BarChart3,
  Shield,
  Eye,
  MousePointer,
  FileText,
  Download,
  Play,
  Users,
  TrendingUp,
  Activity,
  Settings,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export function AnalyticsDemo() {
  const { track, canTrack, hasConsent } = useTracking();
  const { isInitialized } = useAnalytics();
  const [eventLog, setEventLog] = useState<string[]>([]);

  const addToLog = (event: string) => {
    setEventLog(prev => [`${new Date().toLocaleTimeString()}: ${event}`, ...prev.slice(0, 9)]);
  };

  const handleDemoTracking = (eventType: string, details: string) => {
    addToLog(`${eventType} - ${details}`);
  };

  return (
    <section className="py-16 px-4 bg-background/50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics Tracking Demo
          </Badge>
          <h2 className="text-3xl font-bold gradient-text mb-4">
            Privacy-First Analytics System
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Comprehensive analytics with GDPR compliance, consent management, and intelligent tracking
            across multiple providers while respecting user privacy.
          </p>
        </div>

        {/* Status indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${isInitialized ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="font-medium">Analytics System</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {isInitialized ? 'Initialized' : 'Not Initialized'}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${
                  hasConsent === true ? 'bg-green-500' :
                  hasConsent === false ? 'bg-red-500' : 'bg-yellow-500'
                }`} />
                <span className="font-medium">User Consent</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {hasConsent === true ? 'Granted' : hasConsent === false ? 'Declined' : 'Pending'}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${canTrack ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="font-medium">Tracking Status</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {canTrack ? 'Active' : 'Disabled'}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="components" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
            <TabsTrigger value="components" className="flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              Components
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Event Log
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Features
            </TabsTrigger>
          </TabsList>

          {/* Tracked Components Demo */}
          <TabsContent value="components" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Button Tracking */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MousePointer className="h-5 w-5 text-primary" />
                    Button Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Automatically track button clicks with context and user journey data.
                  </p>

                  <div className="space-y-3">
                    <TrackedButton
                      trackingName="Get Started CTA"
                      trackingLocation="Analytics Demo"
                      onTrackingClick={() => handleDemoTracking('Button Click', 'Get Started CTA')}
                      className="w-full"
                    >
                      Get Started (Tracked)
                    </TrackedButton>

                    <TrackedButton
                      trackingName="Secondary Action"
                      trackingLocation="Analytics Demo"
                      variant="outline"
                      onTrackingClick={() => handleDemoTracking('Button Click', 'Learn More Button')}
                      className="w-full"
                    >
                      Learn More (Tracked)
                    </TrackedButton>

                    <TrackedButton
                      trackingName="Newsletter Signup"
                      trackingLocation="Analytics Demo"
                      variant="secondary"
                      onTrackingClick={() => handleDemoTracking('Button Click', 'Newsletter Signup')}
                      className="w-full"
                    >
                      Subscribe to Newsletter (Tracked)
                    </TrackedButton>
                  </div>
                </CardContent>
              </Card>

              {/* Link Tracking */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Link Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Track internal and external link clicks with destination tracking.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <TrackedLink
                        href="/services"
                        trackingName="Services Page"
                        onClick={() => handleDemoTracking('Link Click', 'Internal: Services Page')}
                      >
                        View Our Services (Internal)
                      </TrackedLink>
                    </div>

                    <div>
                      <TrackedLink
                        href="https://github.com"
                        trackingName="GitHub Repository"
                        external
                        onClick={() => handleDemoTracking('Link Click', 'External: GitHub')}
                      >
                        Visit GitHub (External)
                      </TrackedLink>
                    </div>

                    <div>
                      <TrackedLink
                        href="#contact"
                        trackingName="Contact Section"
                        onClick={() => handleDemoTracking('Link Click', 'Anchor: Contact Section')}
                      >
                        Contact Us (Anchor)
                      </TrackedLink>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Form Tracking */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Form Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Track form interactions from start to completion with success/error states.
                  </p>

                  <TrackedForm
                    formName="Demo Contact Form"
                    onFormStart={() => handleDemoTracking('Form Start', 'Demo Contact Form')}
                    onFormSubmitSuccess={() => handleDemoTracking('Form Submit', 'Success')}
                    onFormSubmitError={() => handleDemoTracking('Form Submit', 'Error')}
                    onSubmit={(e) => {
                      e.preventDefault();
                      // Simulate form submission
                      setTimeout(() => {
                        handleDemoTracking('Form Submit', 'Demo submission completed');
                      }, 500);
                    }}
                    className="space-y-3"
                  >
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full p-2 border rounded-md bg-background"
                      required
                    />
                    <TrackedButton
                      type="submit"
                      trackingName="Form Submit"
                      trackingLocation="Analytics Demo Form"
                      className="w-full"
                    >
                      Submit Form (Tracked)
                    </TrackedButton>
                  </TrackedForm>
                </CardContent>
              </Card>

              {/* Download Tracking */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    Download Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Monitor file downloads with automatic file type detection.
                  </p>

                  <div className="space-y-3">
                    <TrackedDownload
                      href="/api/download/whitepaper.pdf"
                      fileName="ROI Optimization Whitepaper"
                      fileType="PDF"
                      onClick={() => handleDemoTracking('Download', 'Whitepaper PDF')}
                    >
                      Download Whitepaper
                    </TrackedDownload>

                    <TrackedDownload
                      href="/api/download/case-study.docx"
                      fileName="Customer Case Study"
                      onClick={() => handleDemoTracking('Download', 'Case Study DOCX')}
                    >
                      Download Case Study
                    </TrackedDownload>

                    <TrackedDownload
                      href="/api/download/roi-calculator.xlsx"
                      fileName="ROI Calculator"
                      onClick={() => handleDemoTracking('Download', 'ROI Calculator XLSX')}
                    >
                      Download ROI Calculator
                    </TrackedDownload>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Event Log */}
          <TabsContent value="events" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Real-time Event Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {eventLog.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Interact with the tracked components above to see events appear here
                    </p>
                  ) : (
                    eventLog.map((event, index) => (
                      <div
                        key={index}
                        className="p-3 bg-muted/50 rounded-lg text-sm font-mono"
                      >
                        {event}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Features */}
          <TabsContent value="privacy" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Privacy Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">GDPR Compliant</p>
                        <p className="text-sm text-muted-foreground">
                          Full consent management and data protection
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">No Cross-site Tracking</p>
                        <p className="text-sm text-muted-foreground">
                          Data stays within our domain
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Anonymous by Default</p>
                        <p className="text-sm text-muted-foreground">
                          No personal data collection without consent
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Data Minimization</p>
                        <p className="text-sm text-muted-foreground">
                          Only collect what's necessary
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    User Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <TrackedButton
                      trackingName="Consent Management"
                      trackingLocation="Analytics Demo"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        // This would open consent preferences
                        handleDemoTracking('User Action', 'Opened consent preferences');
                      }}
                    >
                      Manage Consent Preferences
                    </TrackedButton>

                    <TrackedButton
                      trackingName="Data Export"
                      trackingLocation="Analytics Demo"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        handleDemoTracking('User Action', 'Requested data export');
                      }}
                    >
                      Export My Data
                    </TrackedButton>

                    <TrackedButton
                      trackingName="Data Deletion"
                      trackingLocation="Analytics Demo"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        handleDemoTracking('User Action', 'Requested data deletion');
                      }}
                    >
                      Delete My Data
                    </TrackedButton>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      All user data requests are processed within 30 days in accordance
                      with GDPR requirements.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Features Overview */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Multi-Provider Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Google Analytics 4</li>
                    <li>• Plausible Analytics</li>
                    <li>• Mixpanel (configurable)</li>
                    <li>• Custom providers</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Privacy First</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• GDPR compliance</li>
                    <li>• Consent management</li>
                    <li>• Data anonymization</li>
                    <li>• No third-party cookies</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>User Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Non-intrusive tracking</li>
                    <li>• Fast performance</li>
                    <li>• Easy opt-out</li>
                    <li>• Transparent data use</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}