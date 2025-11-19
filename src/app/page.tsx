
'use client';

import React from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesShowcase from "@/components/ServicesShowcase";
import CopywritingExamples from "@/components/CopywritingExamples";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLoading } from "@/contexts/LoadingContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { CardSkeleton, MetricSkeleton, HeroSkeleton, CopywritingExamplesSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ServiceErrorBoundary } from "@/components/ServiceErrorBoundary";
import { CopywritingErrorBoundary } from "@/components/CopywritingErrorBoundary";
import { EnterpriseROIDashboard } from "@/components/EnterpriseROIDashboard";
import { EnterpriseCaseStudies } from "@/components/EnterpriseCaseStudies";
import { TrustIndicators } from "@/components/TrustIndicators";
import { ContactForm } from "@/components/ContactForm";
import { NewsletterForm } from "@/components/NewsletterForm";
import { TrackedButton } from "@/components/ui/tracked-components";

function HomeContent() {
  const { t } = useLanguage();
  const { isLoading, componentLoading } = useLoading();

  return (
    <main className="flex min-h-screen flex-col items-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <Header />

      {/* Hero Section */}
      <section className="pt-20">
        {isLoading ? (
          <HeroSkeleton />
        ) : (
          <ErrorBoundary>
            <HeroSection />
          </ErrorBoundary>
        )}
      </section>

      {/* Services Showcase */}
      <section id="services" className="w-full py-20 px-4 md:px-8 lg:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t('nav.services')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              {t('services.title')}
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : (
            <ServiceErrorBoundary>
              <ServicesShowcase />
            </ServiceErrorBoundary>
          )}
        </div>
      </section>

      {/* Copywriting Examples */}
      <section id="examples" className="w-full py-20 px-4 md:px-8 lg:px-12 relative">
        <div className="absolute inset-0 glass opacity-30"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">{t('nav.examples')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              {t('examples.title')}
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {t('examples.subtitle')}
            </p>
          </div>
          {isLoading ? (
            <CopywritingExamplesSkeleton />
          ) : (
            <CopywritingErrorBoundary>
              <CopywritingExamples />
            </CopywritingErrorBoundary>
          )}
        </div>
      </section>

      {/* Performance Metrics */}
      <section id="metrics" className="w-full py-20 px-4 md:px-8 lg:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t('nav.metrics')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              {t('metrics.title')}
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {t('metrics.subtitle')}
            </p>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricSkeleton />
              <MetricSkeleton />
              <MetricSkeleton />
              <MetricSkeleton />
            </div>
          ) : (
            <PerformanceMetrics />
          )}
        </div>
      </section>

      {/* Enterprise ROI Dashboard */}
      <section className="w-full">
        <EnterpriseROIDashboard />
      </section>

      {/* Trust Indicators */}
      <section className="w-full">
        <TrustIndicators />
      </section>

      {/* Enterprise Case Studies */}
      <section className="w-full">
        <EnterpriseCaseStudies />
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-20 px-4 md:px-8 lg:px-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Get Started</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Ready to Boost Your ROI?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Let's discuss your project and create a customized strategy to maximize your marketing ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <ContactForm />

            <div className="space-y-8">
              {/* Why Choose Us */}
              <div className="glass-card p-8">
                <h3 className="text-2xl font-semibold mb-6 gradient-text">Why Choose ROIGPT?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">AI-Powered Insights</h4>
                      <p className="text-muted-foreground text-sm">
                        Leverage cutting-edge AI to optimize every aspect of your marketing funnel.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Proven Results</h4>
                      <p className="text-muted-foreground text-sm">
                        Our clients see an average 340% increase in ROI within 90 days.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Expert Team</h4>
                      <p className="text-muted-foreground text-sm">
                        Work with experienced marketers and developers who understand ROI.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter Signup */}
              <NewsletterForm
                variant="card"
                size="md"
                onSubmit={async (data) => {
                  console.log('Newsletter signup from contact page:', data);
                  await new Promise(resolve => setTimeout(resolve, 1500));
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="w-full py-24 px-4 md:px-8 lg:px-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-3xl"></div>
        <div className="max-w-4xl mx-auto text-center relative glass-card p-12 md:p-16">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-2xl"></div>
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              {t('cta.title')}
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-muted-foreground leading-relaxed">
              {t('cta.subtitle')}
            </p>
            <TrackedButton
              size="lg"
              className="text-lg px-8 py-6 h-auto group glass-card hover:scale-105 transition-all duration-300 animate-glow"
              trackingName="Main CTA"
              trackingLocation="CTA Section"
            >
              {t('cta.button')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </TrackedButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-16 px-4 md:px-8 lg:px-12 glass border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold gradient-text">ROIGPT</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                {t('footer.tagline')}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground">{t('footer.services')}</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {t('services.nextjs.title')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {t('services.seo.title')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {t('services.copywriting.title')}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground">{t('footer.company')}</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {t('footer.about')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {t('footer.case-studies')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {t('footer.contact')}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} ROIGPT. {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <LoadingProvider>
        <HomeContent />
      </LoadingProvider>
    </LanguageProvider>
  );
}
