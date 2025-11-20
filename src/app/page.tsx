
'use client';

import React from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesShowcase from "@/components/ServicesShowcase";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLoading } from "@/contexts/LoadingContext";
// import { Sparkles, PieChart, BarChart3 } from "lucide-react"; // Removed duplicate
import { CardSkeleton, MetricSkeleton, HeroSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ServiceErrorBoundary } from "@/components/ServiceErrorBoundary";
import { EnterpriseROIDashboard } from "@/components/EnterpriseROIDashboard";
import { EnterpriseCaseStudies } from "@/components/EnterpriseCaseStudies";
import { TrustIndicators } from "@/components/TrustIndicators";
import { ContactForm } from "@/components/ContactForm";
import { NewsletterForm } from "@/components/NewsletterForm";
import { TrackedButton } from "@/components/ui/tracked-components";
import { FloatingOrb, GridPattern, SectionDivider } from "@/components/VisualDecorations";
import { AnimatedMetricsChart } from "@/components/AnimatedMetricsChart";
import { Sparkles, PieChart, BarChart3, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function HomeContent() {
  const { t } = useLanguage();
  const { isLoading } = useLoading();

  return (
    <main className="flex min-h-screen flex-col items-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        <GridPattern className="opacity-20" />
      </div>

      <Header />

      {/* Hero Section */}
      <section className="pt-20 w-full">
        {isLoading ? (
          <HeroSkeleton />
        ) : (
          <ErrorBoundary>
            <HeroSection />
          </ErrorBoundary>
        )}
      </section>

      <SectionDivider />

      {/* The "Bleeding Neck" Problem Section */}
      <section className="w-full py-20 px-4 md:px-8 lg:px-12 relative bg-black/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-red-500 tracking-tight">
            WARNING: You Are Burning Money Every Single Day
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p>
              Most businesses are <strong className="text-white">invisible</strong>. They spend thousands on ads, SEO, and content, only to get crickets.
            </p>
            <p>
              Why? Because your website is a leaky bucket. It's slow, it's confusing, and it doesn't <em>sell</em>.
            </p>
            <p className="text-white font-semibold">
              Every visitor that leaves without buying is money flushed down the toilet.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Services Showcase (The Solution) */}
      <section id="services" className="w-full py-20 px-4 md:px-8 lg:px-12 relative">
        <FloatingOrb size="lg" color="accent" className="top-20 right-0 opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 animate-glow">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">THE SOLUTION</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              We Don't Just "Do Marketing."<br />We Engineer Revenue.
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Forget "brand awareness." We focus on one thing: <strong>Putting money in your bank account.</strong> Here is exactly how we do it:
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

      {/* Visual Features Showcase */}
      <section className="w-full py-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
        <GridPattern className="opacity-30" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
                <PieChart className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">Total Visibility</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                See The Money In Real-Time
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                No more spreadsheets. No more guessing. Our dashboard shows you exactly how much profit you made today, yesterday, and this month.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="glass p-6 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Profit Tracking</h3>
                  <p className="text-sm text-muted-foreground">Watch your bank balance grow in real-time.</p>
                </div>
                <div className="glass p-6 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <PieChart className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Leak Detection</h3>
                  <p className="text-sm text-muted-foreground">Instantly spot where you are losing customers.</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 relative">
              <FloatingOrb size="md" color="primary" className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20" />
              <h3 className="text-xl font-semibold mb-6 text-center">Revenue Sources</h3>
              <AnimatedMetricsChart
                data={[
                  { label: 'Paid Ads', value: 45, color: 'hsl(var(--primary))' },
                  { label: 'SEO', value: 30, color: 'hsl(var(--accent))' },
                  { label: 'Email', value: 15, color: 'hsl(217, 91%, 60%)' },
                  { label: 'Social', value: 10, color: 'hsl(280, 100%, 70%)' },
                ]}
                type="radar"
                height={300}
                showLabels={true}
              />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

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

      <SectionDivider />

      {/* The "Grand Slam" Offer Section */}
      <section className="w-full py-24 px-4 md:px-8 lg:px-12 relative bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-8 md:p-12 border-primary/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white px-8 py-2 transform rotate-45 translate-x-10 translate-y-6 font-bold shadow-lg">
              LIMITED SPOTS
            </div>

            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                The "Double Your ROI" Offer
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                We are so confident in our AI systems that we take all the risk.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Complete AI Funnel Build</h3>
                    <p className="text-muted-foreground">We build your entire conversion engine from scratch. Copy, design, tech, analytics. Done.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">90-Day Growth Sprint</h3>
                    <p className="text-muted-foreground">Our team manages your ads and optimization daily for 3 full months.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">24/7 Revenue Dashboard</h3>
                    <p className="text-muted-foreground">Access to the "Truth" dashboard to see your profits in real-time.</p>
                  </div>
                </div>
              </div>

              <div className="glass bg-black/40 p-8 rounded-2xl border border-white/10 text-center">
                <h3 className="text-2xl font-bold mb-4 text-white">The Guarantee</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  If we don't generate at least <span className="text-white font-bold">300% ROI</span> on your ad spend within 90 days...
                </p>
                <div className="text-3xl font-bold text-primary mb-2">WE PAY YOU</div>
                <p className="text-sm text-muted-foreground mb-8">
                  We will refund our entire fee AND pay for your ad spend.
                </p>
                <Button size="lg" className="w-full text-lg py-8 button-premium animate-glow">
                  Claim This Offer Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  *Only 3 spots available for this guarantee this month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise ROI Dashboard */}
      <section className="w-full">
        <EnterpriseROIDashboard />
      </section>

      <SectionDivider />

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
        <GridPattern className="opacity-20" />

        <div className="max-w-6xl mx-auto relative z-10">
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
          <FloatingOrb size="lg" color="primary" className="top-0 left-0 opacity-30" />

          <div className="relative z-10">
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
                    {t('services.campaigns.title')}
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

