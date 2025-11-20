'use client';

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { ArrowRight, Star, Sparkles, Zap, BarChart3, PieChart } from "lucide-react";
import { Badge } from "./ui/badge";
import { FloatingOrb, GlowingParticle } from "./VisualDecorations";

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
  // Props are kept for compatibility but ignored for the new copy
  // const { t } = useLanguage(); 


  return (
    <div className="relative w-full min-h-screen bg-background flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: 'url(/images/hero-background.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />

        {/* Animated Orbs */}
        <FloatingOrb size="lg" color="primary" className="top-20 left-10 opacity-30" />
        <FloatingOrb size="xl" color="accent" className="bottom-20 right-10 opacity-20" delay={2} />
        <FloatingOrb size="lg" color="primary" className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20" delay={4} />

        {/* Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <GlowingParticle
            key={i}
            className="opacity-50"
            delay={Math.random() * 5}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 0.5 + 0.5})`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <div className="animate-slide-up-fade" style={{ animationDelay: '0.1s' }}>
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm bg-primary/10 border-primary/20 text-primary rounded-full"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered Performance Architecture
              </Badge>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
              Autonomous Revenue <br />
              <span className="gradient-text">Optimization</span> for Enterprise
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-slide-up-fade" style={{ animationDelay: '0.3s' }}>
              Leverage our AI Autonomous Revenue Scientist to analyze, optimize, and scale your digital campaigns with precision. Data-driven growth, engineered for results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up-fade" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" className="gap-2 text-lg px-8 py-6 h-auto group button-premium border-none text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Start AI Analysis
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto glass-card hover:bg-white/10 border-black/10 dark:border-white/20 text-foreground">
                View Case Studies
              </Button>
            </div>

            <div className="pt-8 animate-slide-up-fade" style={{ animationDelay: '0.5s' }}>
              <p className="text-sm text-muted-foreground mb-6 font-medium tracking-wide uppercase">
                Trusted by industry leaders
              </p>
              <div className="flex flex-wrap gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {["Microsoft", "Salesforce", "Adobe", "Oracle"].map(
                  (company, i) => (
                    <div
                      key={i}
                      className="text-foreground font-bold text-xl"
                    >
                      {company}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 perspective-1000">
            <div className="relative glass-card p-2 shadow-2xl max-w-xl mx-auto transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-700">
              <div className="absolute -top-6 -right-6 z-20">
                <Badge className="bg-accent text-accent-foreground animate-pulse px-4 py-2 text-lg shadow-lg border border-white/20">
                  <Zap className="h-4 w-4 mr-2" />
                  +340% ROI
                </Badge>
              </div>

              {/* Dashboard Image */}
              <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-inner bg-black/40 aspect-video group">
                <img
                  src="/images/dashboard-visual.png"
                  alt="ROI Dashboard Interface"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Overlay UI Elements */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="glass px-3 py-1 rounded-full text-xs text-white/70 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Live Analysis
                  </div>
                </div>

                {/* Floating Charts Overlay - Static or Subtle */}
                <div className="absolute bottom-4 left-4 glass p-3 rounded-lg animate-float-subtle" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold">Revenue</span>
                  </div>
                  <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[75%] animate-pulse" />
                  </div>
                </div>

                <div className="absolute top-1/3 right-4 glass p-3 rounded-lg animate-float-subtle" style={{ animationDelay: '2.5s' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <PieChart className="w-4 h-4 text-accent" />
                    <span className="text-xs font-semibold">Traffic</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-8 h-8 rounded-full border-4 border-accent border-t-transparent animate-spin" />
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
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-lg font-medium mb-4 leading-relaxed">
              "We were skeptical at first, but ROIGPT literally saved our Q4. The ROI dashboard is the only thing I look at every morning now."
            </p>
            <div>
              <p className="font-semibold">Sarah Jenkins</p>
              <p className="text-sm text-muted-foreground">CMO, TechStart</p>
            </div>
          </div>

          <div className="glass-card p-6 shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-lg font-medium mb-4 leading-relaxed">
              "The AI-driven insights completely transformed our campaign strategy. Incredible results!"
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