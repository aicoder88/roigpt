'use client';

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { ArrowRight, Star, Sparkles, Zap } from "lucide-react";
import { Badge } from "./ui/badge";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
}

const HeroSection = ({
  title,
  subtitle,
  ctaText,
}: HeroSectionProps = {}) => {
  const { t } = useLanguage();

  const displayTitle = title || t('hero.title');
  const displaySubtitle = subtitle || t('hero.subtitle');
  const displayCtaText = ctaText || t('hero.cta');

  return (
    <div className="relative w-full min-h-screen bg-background flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: 'url(/images/hero-background.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <Badge
              variant="outline"
              className="px-4 py-2 text-sm glass-card border-primary/20 animate-glow"
            >
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              AI-First Marketing Solutions
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text leading-tight">
              {displayTitle}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {displaySubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2 text-lg px-8 py-6 h-auto group glass-card button-hover animate-glow">
                {displayCtaText}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto glass-card button-hover">
                {t('nav.services')}
              </Button>
            </div>

            <div className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by Fortune 500 companies worldwide
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                {["Microsoft", "Salesforce", "Adobe", "Oracle"].map(
                  (company, i) => (
                    <div
                      key={i}
                      className="text-muted-foreground/70 font-semibold hover:text-primary transition-colors cursor-pointer"
                    >
                      {company}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative glass-card p-8 shadow-2xl max-w-md mx-auto animate-float">
              <div className="absolute -top-3 -right-3">
                <Badge className="bg-primary text-primary-foreground animate-pulse">
                  <Zap className="h-3 w-3 mr-1" />
                  AI-Powered
                </Badge>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center animate-glow">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">ROIGPT Assistant</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                      Online now
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="glass p-4 rounded-2xl rounded-tl-sm max-w-[85%] animate-in slide-in-from-left-5 duration-500">
                    <p className="text-sm">How can I help improve your marketing ROI today?</p>
                  </div>

                  <div className="glass bg-primary/10 p-4 rounded-2xl rounded-tr-sm ml-auto max-w-[85%] animate-in slide-in-from-right-5 duration-700">
                    <p className="text-sm">I need better converting copy for my landing page.</p>
                  </div>

                  <div className="glass p-4 rounded-2xl rounded-tl-sm max-w-[85%] animate-in slide-in-from-left-5 duration-900">
                    <p className="text-sm">I can generate high-converting copy in the style of Alex Hormozi, John Carlton, or Gary Halbert. Which would you prefer?</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-lg font-medium mb-4 leading-relaxed">
              "{t('hero.testimonial')}"
            </p>
            <div>
              <p className="font-semibold">{t('hero.testimonial.author')}</p>
              <p className="text-sm text-muted-foreground">CEO, TechStart</p>
            </div>
          </div>

          <div className="glass-card p-6 shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-lg font-medium mb-4 leading-relaxed">
              "The AI-generated copy reads exactly like the masters. Game changer!"
            </p>
            <div>
              <p className="font-semibold">Michael Chen</p>
              <p className="text-sm text-muted-foreground">Growth Partners</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;