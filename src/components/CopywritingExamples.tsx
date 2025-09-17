"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Copy, ArrowRight } from "lucide-react";

interface CopywriterExample {
  name: string;
  style: string;
  headline: string;
  body: string;
  callToAction: string;
  specialty: string;
}

const CopywritingExamples = () => {
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState("hormozi");

  const copywriters: Record<string, CopywriterExample> = {
    hormozi: {
      name: "Alex Hormozi",
      specialty: "Direct Response & Value Stacking",
      style: "Direct, punchy, and results-focused with clear value propositions",
      headline: "The Only 3 Ways To Grow Any Business (And How AI Multiplies Each One)",
      body: "Look, there are only three ways to grow any business: get more customers, increase transaction value, or increase purchase frequency. That's it. Most businesses focus on just one and leave money on the table. Our AI systems optimize all three simultaneously, creating compound growth that traditional marketing can't match. We've helped 127 businesses increase revenue by an average of 287% in under 90 days using this exact framework.",
      callToAction: "Book Your AI Growth Strategy Call (Limited Spots)",
    },
    carlton: {
      name: "John Carlton",
      specialty: "Story-Driven Sales",
      style: "Story-driven with a focus on pain points and dramatic transformations",
      headline: "How A Frustrated Business Owner Discovered The 'AI Advantage' That Doubled His Revenue While Working Half The Hours",
      body: "It was embarrassing. There I was, a supposedly 'successful' business owner, working 80-hour weeks while watching competitors with inferior products steal my customers. The worst part? They weren't smarter than me—they just had better marketing. Then I discovered the 'AI Advantage'—a simple 3-step system that automatically identifies your ideal customers, creates irresistible offers they can't refuse, and delivers them through channels that actually work. Now my business runs itself while I focus on what matters.",
      callToAction: "Grab Your Free 'AI Advantage' Roadmap Now",
    },
    halbert: {
      name: "Gary Halbert",
      specialty: "Psychological Triggers",
      style: "Conversational, direct, with powerful psychological triggers",
      headline: "WARNING: Do NOT Hire Any Marketing Agency Until You Read This Letter!",
      body: "Let me tell you something most marketing 'experts' won't admit: 90% of what they do is guesswork. They test headlines, fiddle with ad copy, and pray something works before your budget runs out. But what if you could eliminate the guesswork entirely? Our AI-powered system has analyzed over 10,000 successful marketing campaigns across 23 industries to identify exactly what works and what doesn't. We don't guess—we KNOW what will convert for your specific business. And we guarantee results in writing or you pay nothing.",
      callToAction: "Claim Your Free Marketing AI Analysis ($997 Value)",
    },
    ogilvy: {
      name: "David Ogilvy",
      specialty: "Brand Building & Facts",
      style: "Sophisticated, fact-based, with meticulous attention to detail",
      headline: "At 60 Miles An Hour, The Loudest Noise In This New Website Comes From The Electric Clock",
      body: "When we designed our first AI-powered website for a luxury brand client, we tested it against 17 different metrics. The results were remarkable. Visitors stayed 3.7 times longer. Conversion rates increased by 212%. Customer acquisition costs dropped by 67%. Why such dramatic improvements? Because unlike conventional websites that present the same experience to everyone, our AI-driven approach personalizes every element—from headlines to images to offers—based on each visitor's unique behavior patterns. The result is a website that feels custom-built for each individual visitor.",
      callToAction: "Request Our Detailed Case Study Portfolio",
    },
    bencivenga: {
      name: "Gary Bencivenga",
      specialty: "Educational Selling",
      style: "Thoughtful, educational, with compelling proof and credibility",
      headline: "The Astonishing ROI Secret That Makes Traditional Marketing Obsolete",
      body: "If you're still using traditional marketing methods, I have news that might disturb you: you're likely wasting 70% of your budget. After analyzing data from 1,324 marketing campaigns across multiple industries, we've discovered that AI-optimized approaches consistently outperform traditional methods by a minimum of 3:1 in ROI. This isn't theory—it's mathematical certainty. By applying advanced algorithmic testing to every element of your marketing, we can identify the exact messages, offers, and channels that will maximize your returns. The proof? Our clients average a 431% increase in marketing ROI within 90 days.",
      callToAction: "Download Our Free ROI Calculator Tool",
    },
  };

  return (
    <section className="w-full py-16 bg-background relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <Tabs
          defaultValue="hormozi"
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <div className="flex justify-center mb-12">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 glass-card p-2 bg-background/50">
              <TabsTrigger 
                value="hormozi" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
              >
                {t('examples.hormozi')}
              </TabsTrigger>
              <TabsTrigger 
                value="carlton"
                className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
              >
                {t('examples.carlton')}
              </TabsTrigger>
              <TabsTrigger 
                value="halbert"
                className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
              >
                {t('examples.halbert')}
              </TabsTrigger>
              <TabsTrigger 
                value="ogilvy"
                className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
              >
                Ogilvy
              </TabsTrigger>
              <TabsTrigger 
                value="bencivenga"
                className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
              >
                Bencivenga
              </TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(copywriters).map(([key, copywriter]) => (
            <TabsContent key={key} value={key} className="mt-2">
              <Card className="glass-card border-white/10 shadow-2xl overflow-hidden">
                <CardHeader className="pb-6 bg-gradient-to-r from-primary/5 to-accent/5">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary/20 text-primary border-primary/30">
                          <Sparkles className="h-3 w-3 mr-1" />
                          {copywriter.specialty}
                        </Badge>
                      </div>
                      <CardTitle className="text-3xl gradient-text">
                        {copywriter.name} Style
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {copywriter.style}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="glass border-primary/20 hover:bg-primary/10">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Style
                      </Button>
                      <Button className="glass-card bg-primary/20 hover:bg-primary text-primary hover:text-white">
                        Use This Style
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="glass p-8 rounded-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
                    <div className="relative">
                      <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
                        {copywriter.headline}
                      </h3>
                      <p className="mb-8 text-muted-foreground leading-relaxed text-lg">
                        {copywriter.body}
                      </p>
                      <Separator className="my-8 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                      <div className="flex justify-center">
                        <Button size="lg" className="text-lg px-8 py-6 h-auto group glass-card hover:scale-105 transition-all duration-300 animate-glow">
                          {copywriter.callToAction}
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-2xl font-bold gradient-text">Custom AI Training</h3>
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Our AI can be trained on your brand voice or emulate any successful copywriting style. 
              Get copy that sounds exactly like your brand while leveraging proven conversion techniques.
            </p>
            <Button size="lg" className="text-lg px-8 py-6 h-auto group glass-card hover:scale-105 transition-all duration-300 animate-glow">
              Get Custom AI Copywriting
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CopywritingExamples;