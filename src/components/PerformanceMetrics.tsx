"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowUpRight, BarChart3, Zap, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  target: number;
  icon: React.ReactNode;
  prefix?: string;
  suffix?: string;
}

const MetricCard = ({
  title,
  value,
  target,
  icon,
  prefix = "",
  suffix = "%",
}: MetricCardProps) => {
  const [currentValue, setCurrentValue] = useState(0);
  const progressValue = (value / target) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentValue(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    let start = 0;
    const end = Math.min(value, target);
    const duration = 1500;
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
    <Card className="bg-background border shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="p-2 rounded-full bg-primary/10">{icon}</div>
        </div>
        <div className="space-y-2">
          <div className="flex items-end">
            <span className="text-3xl font-bold">
              {prefix}
              {Math.round(currentValue)}
              {suffix}
            </span>
            <span className="ml-2 text-sm text-green-500 flex items-center">
              <ArrowUpRight className="h-4 w-4" />
              <span className="ml-1">vs target</span>
            </span>
          </div>
          <Progress value={progressValue} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {Math.round(progressValue)}% of target ({target}
            {suffix})
          </p>
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
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold">{company}</h3>
        <p className="text-sm text-muted-foreground">{industry}</p>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Challenge</h4>
        <p className="text-sm">{challenge}</p>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Solution</h4>
        <p className="text-sm">{solution}</p>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Results</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map((result, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">{result.metric}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm">
                  {result.before}
                  {result.unit}
                </span>
                <ArrowUpRight className="h-4 w-4 text-primary" />
                <span className="text-lg font-bold">
                  {result.after}
                  {result.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PerformanceMetrics = () => {
  const caseStudies = [
    {
      company: "TechGrowth Solutions",
      industry: "SaaS / B2B Technology",
      challenge:
        "Struggling with low conversion rates and poor organic traffic despite quality product offerings.",
      solution:
        "Implemented AI-driven SEO strategy with optimized NextJS website and conversion-focused copywriting.",
      results: [
        { metric: "Conversion Rate", before: 1.8, after: 5.2, unit: "%" },
        { metric: "Organic Traffic", before: 5000, after: 25000, unit: "/mo" },
        { metric: "Page Load Speed", before: 4.2, after: 0.8, unit: "s" },
      ],
    },
    {
      company: "Wellness Direct",
      industry: "Health & Wellness E-commerce",
      challenge:
        "High bounce rates and cart abandonment due to slow site performance and unclear messaging.",
      solution:
        "Rebuilt website with NextJS, implemented Hormozi-style copywriting, and optimized checkout flow.",
      results: [
        { metric: "Revenue", before: 45000, after: 120000, unit: "$/mo" },
        { metric: "Cart Abandonment", before: 78, after: 32, unit: "%" },
        { metric: "Avg. Order Value", before: 42, after: 68, unit: "$" },
      ],
    },
    {
      company: "Legal Advisors Network",
      industry: "Professional Services",
      challenge:
        "Difficulty generating qualified leads and high cost per acquisition for new clients.",
      solution:
        "Created high-converting landing pages with Gary Halbert-inspired copy and optimized for local SEO.",
      results: [
        { metric: "Lead Generation", before: 24, after: 87, unit: "/mo" },
        { metric: "Cost per Lead", before: 175, after: 45, unit: "$" },
        { metric: "Client Conversion", before: 12, after: 28, unit: "%" },
      ],
    },
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Proven Performance Metrics
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered solutions deliver measurable results that directly
            impact your bottom line.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard
            title="Average ROI Increase"
            value={287}
            target={300}
            icon={<TrendingUp className="h-5 w-5 text-primary" />}
          />
          <MetricCard
            title="Conversion Rate Improvement"
            value={142}
            target={150}
            icon={<BarChart3 className="h-5 w-5 text-primary" />}
          />
          <MetricCard
            title="Page Speed Score"
            value={96}
            target={100}
            icon={<Zap className="h-5 w-5 text-primary" />}
            suffix=""
          />
          <MetricCard
            title="SEO Ranking Boost"
            value={78}
            target={100}
            icon={<ArrowUpRight className="h-5 w-5 text-primary" />}
            prefix="+"
          />
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            Client Success Stories
          </h3>
          <Tabs defaultValue="case1" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="case1">TechGrowth Solutions</TabsTrigger>
              <TabsTrigger value="case2">Wellness Direct</TabsTrigger>
              <TabsTrigger value="case3">Legal Advisors Network</TabsTrigger>
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
      </div>
    </section>
  );
};

export default PerformanceMetrics;
