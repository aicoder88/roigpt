"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  ArrowUpRight, 
  BarChart3, 
  Zap, 
  TrendingUp, 
  Target,
  Sparkles,
  Award,
  Users
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  target: number;
  icon: React.ReactNode;
  prefix?: string;
  suffix?: string;
  color?: string;
}

const MetricCard = ({
  title,
  value,
  target,
  icon,
  prefix = "",
  suffix = "%",
  color = "primary",
}: MetricCardProps) => {
  const [currentValue, setCurrentValue] = useState(0);
  const progressValue = Math.min((value / target) * 100, 100);

  useEffect(() => {
    let start = 0;
    const end = Math.min(value, target);
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      setCurrentValue(Math.min(start, end));

      if (start >= end) {
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, target]);

  return (
    <Card className="glass-card border-white/10 shadow-lg hover:scale-105 transition-all duration-500 group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </h3>
          <div className={`p-3 rounded-xl glass bg-${color}/10 group-hover:bg-${color}/20 transition-colors duration-300`}>
            {icon}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold gradient-text">
              {prefix}
              {Math.round(currentValue)}
              {suffix}
            </span>
            <div className="flex items-center text-green-500 text-sm font-medium">
              <ArrowUpRight className="h-4 w-4" />
              <span className="ml-1">vs target</span>
            </div>
          </div>
          <div className="space-y-2">
            <Progress 
              value={progressValue} 
              className="h-3 bg-muted/50" 
            />
            <p className="text-xs text-muted-foreground">
              {Math.round(progressValue)}% of target ({target}{suffix})
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface CaseStudyProps {
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    before: number;
    after: number;
    unit: string;
    improvement: number;
  }[];
}

const CaseStudy = ({
  company,
  industry,
  challenge,
  solution,
  results,
}: CaseStudyProps) => {
  return (
    <div className="glass-card p-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold gradient-text">{company}</h3>
          <Badge variant="outline" className="mt-2 glass border-primary/20">
            {industry}
          </Badge>
        </div>
        <Award className="h-8 w-8 text-primary" />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Challenge
            </h4>
            <p className="text-muted-foreground leading-relaxed">{challenge}</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              Solution
            </h4>
            <p className="text-muted-foreground leading-relaxed">{solution}</p>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            Results
          </h4>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="glass p-4 rounded-xl">
                <p className="text-sm text-muted-foreground mb-2">{result.metric}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {result.before}{result.unit}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                  <span className="text-xl font-bold text-primary">
                    {result.after}{result.unit}
                  </span>
                </div>
                <div className="mt-2">
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                    +{result.improvement}% improvement
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PerformanceMetrics = () => {
  const { t } = useLanguage();

  const caseStudies = [
    {
      company: "TechGrowth Solutions",
      industry: "SaaS / B2B Technology",
      challenge: "Struggling with low conversion rates and poor organic traffic despite quality product offerings.",
      solution: "Implemented AI-driven SEO strategy with optimized NextJS website and conversion-focused copywriting.",
      results: [
        { metric: "Conversion Rate", before: 1.8, after: 5.2, unit: "%", improvement: 189 },
        { metric: "Organic Traffic", before: 5000, after: 25000, unit: "/mo", improvement: 400 },
        { metric: "Page Load Speed", before: 4.2, after: 0.8, unit: "s", improvement: 81 },
      ],
    },
    {
      company: "Wellness Direct",
      industry: "Health & Wellness E-commerce",
      challenge: "High bounce rates and cart abandonment due to slow site performance and unclear messaging.",
      solution: "Rebuilt website with NextJS, implemented Hormozi-style copywriting, and optimized checkout flow.",
      results: [
        { metric: "Revenue", before: 45000, after: 120000, unit: "$/mo", improvement: 167 },
        { metric: "Cart Abandonment", before: 78, after: 32, unit: "%", improvement: 59 },
        { metric: "Avg. Order Value", before: 42, after: 68, unit: "$", improvement: 62 },
      ],
    },
    {
      company: "Legal Advisors Network",
      industry: "Professional Services",
      challenge: "Difficulty generating qualified leads and high cost per acquisition for new clients.",
      solution: "Created high-converting landing pages with Gary Halbert-inspired copy and optimized for local SEO.",
      results: [
        { metric: "Lead Generation", before: 24, after: 87, unit: "/mo", improvement: 263 },
        { metric: "Cost per Lead", before: 175, after: 45, unit: "$", improvement: 74 },
        { metric: "Client Conversion", before: 12, after: 28, unit: "%", improvement: 133 },
      ],
    },
  ];

  return (
    <section className="py-16 px-4 bg-background relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto max-w-7xl relative">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <MetricCard
            title={t('metrics.roi')}
            value={287}
            target={300}
            icon={<TrendingUp className="h-6 w-6 text-primary" />}
            color="primary"
          />
          <MetricCard
            title={t('metrics.conversion')}
            value={142}
            target={150}
            icon={<BarChart3 className="h-6 w-6 text-accent" />}
            color="accent"
          />
          <MetricCard
            title={t('metrics.speed')}
            value={96}
            target={100}
            icon={<Zap className="h-6 w-6 text-primary" />}
            suffix=""
            color="primary"
          />
          <MetricCard
            title={t('metrics.clients')}
            value={150}
            target={200}
            icon={<Users className="h-6 w-6 text-accent" />}
            prefix="+"
            suffix=""
            color="accent"
          />
        </div>

        {/* Case Studies */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Client Success Stories</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Real Results from Real Clients
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how our AI-powered solutions have transformed businesses across different industries.
            </p>
          </div>

          <Tabs defaultValue="case1" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 glass-card bg-background/50">
              <TabsTrigger 
                value="case1"
                className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
              >
                TechGrowth Solutions
              </TabsTrigger>
              <TabsTrigger 
                value="case2"
                className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
              >
                Wellness Direct
              </TabsTrigger>
              <TabsTrigger 
                value="case3"
                className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
              >
                Legal Advisors Network
              </TabsTrigger>
            </TabsList>
            <TabsContent value="case1">
              <CaseStudy {...caseStudies[0]} />
            </TabsContent>
            <TabsContent value="case2">
              <CaseStudy {...caseStudies[1]} />
            </TabsContent>
            <TabsContent value="case3">
              <CaseStudy {...caseStudies[2]} />
            </TabsContent>
          </Tabs>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-muted-foreground mb-6">
              Let's discuss how we can achieve similar results for your business.
            </p>
            <Button size="lg" className="glass-card hover:scale-105 transition-all duration-300 animate-glow">
              Schedule Your Strategy Call
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceMetrics;