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
  const [selectedTab, setSelectedTab] = useState("all");

  const copywriters: Record<string, CopywriterExample> = {
    hormozi: {
      name: "Alex Hormozi",
      specialty: "Direct Response & Value Stacking",
      style: "Direct, punchy, and results-focused with clear value propositions",
      headline: "The Only 3 Ways To Get More Customers Online (And How We 10X Each One With AI)",
      body: "Look, there are only three ways to get customers online: they find you on Google, they see your ads, or someone refers them. That's it. Most agencies focus on just one and charge you separately for everything else. We do ALL THREE with our Next.js websites that rank #1 on Google, our AI copywriting that converts 3x better than human writers, and our social media automation that builds referrals while you sleep. Result? Our clients get 287% more leads in 90 days for less than they were paying before.",
      callToAction: "Get Your Free ROI Projection (See Your Numbers)",
    },
    carlton: {
      name: "John Carlton",
      specialty: "Story-Driven Sales",
      style: "Story-driven with a focus on pain points and dramatic transformations",
      headline: "How A Plumber From Nebraska Stole 73% Market Share Using This 'Weird' AI Copywriting Trick",
      body: "It was embarrassing. Mike was losing customers to competitors who charged MORE than he did. Their websites looked like garbage, but somehow they got all the leads. Then Mike discovered our AI copywriting system that writes like the best sales letters ever created. Now his ads sound like Gary Halbert wrote them, his website converts like David Ogilvy designed it, and his emails get opened like Alex Hormozi sent them. Result? Mike went from 12 jobs a month to 47 jobs a month in 60 days. Same prices, same services, different words.",
      callToAction: "See Mike's Before/After Copy (Real Screenshots)",
    },
    halbert: {
      name: "Gary Halbert",
      specialty: "Psychological Triggers",
      style: "Conversational, direct, with powerful psychological triggers",
      headline: "WARNING: Your Website Is Bleeding Money Every Second It Loads Slowly!",
      body: "Listen up, hotshot. While you're reading this, your slow website just cost you another sale. Google's data shows that 53% of mobile users abandon sites that take longer than 3 seconds to load. But here's the kicker—most 'fast' websites still load in 8-12 seconds. Our Next.js performance optimization gets you to 0.8 seconds. That's not just fast, that's lightning. We've increased client revenues by 67% just by making their sites faster. Same products, same prices, same everything—just faster loading speeds.",
      callToAction: "Test Your Site Speed (Free 30-Second Check)",
    },
    ogilvy: {
      name: "David Ogilvy",
      specialty: "Brand Building & Facts",
      style: "Sophisticated, fact-based, with meticulous attention to detail",
      headline: "At 100 Points On Lighthouse, The Only Thing Faster Than This New Next.js Website Is The ROI",
      body: "When we delivered our first 100/100 Lighthouse score Next.js website, we measured it against 23 performance metrics. The results were extraordinary. Page load speeds: 0.6 seconds. SEO ranking improvements: 340% increase in organic traffic within 90 days. Conversion rates: 156% improvement from technical optimization alone. The secret lies in Next.js 14's advanced optimization features combined with our proprietary deployment architecture. Unlike WordPress sites that struggle to break 40/100 on mobile, our Next.js builds consistently achieve perfect scores while maintaining sophisticated design and functionality.",
      callToAction: "View Our Lighthouse Score Portfolio",
    },
    bencivenga: {
      name: "Gary Bencivenga",
      specialty: "Educational Selling",
      style: "Thoughtful, educational, with compelling proof and credibility",
      headline: "The Mathematical Truth About Marketing ROI That Most Agencies Will Never Tell You",
      body: "If you're making marketing decisions without data, you're essentially gambling with your business. After analyzing 2,847 marketing campaigns through our advanced analytics dashboard, a disturbing pattern emerged: 73% of marketing budgets produce negative ROI simply because businesses don't track the right metrics. Our analytics system reveals the mathematical truth—which channels convert, which messages resonate, and which audiences actually buy. For instance, Client A discovered their 'best performing' Facebook ads had a -34% ROI, while their 'underperforming' email campaigns generated 312% ROI. The difference? Proper attribution tracking and lifetime value calculations.",
      callToAction: "Access Our Free Marketing ROI Audit Tool",
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
          defaultValue="all"
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <div className="flex justify-center mb-12">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2 glass-card p-2 bg-background/50">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
              >
                {t('examples.all')}
              </TabsTrigger>
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
                {t('examples.ogilvy')}
              </TabsTrigger>
              <TabsTrigger 
                value="bencivenga"
                className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
              >
                {t('examples.bencivenga')}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* All styles at once */}
          <TabsContent value="all" className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(copywriters).map(([key, copywriter]) => (
                <Card key={key} className="glass-card border-white/10 shadow-2xl overflow-hidden">
                  <CardHeader className="pb-6 bg-gradient-to-r from-primary/5 to-accent/5">
                    <div className="space-y-3">
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <Sparkles className="h-3 w-3 mr-1" />
                        {copywriter.specialty}
                      </Badge>
                      <CardTitle className="text-2xl gradient-text">
                        {copywriter.name} Style
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {copywriter.style}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="glass p-6 rounded-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
                      <div className="relative">
                        <h3 className="text-xl md:text-2xl font-bold mb-4 leading-tight">
                          {copywriter.headline}
                        </h3>
                        <p className="mb-6 text-muted-foreground leading-relaxed">
                          {copywriter.body}
                        </p>
                        <div className="flex justify-center">
                          <Button size="sm" className="px-6 h-9 group glass-card hover:scale-105 transition-all duration-300">
                            {copywriter.callToAction}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

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
