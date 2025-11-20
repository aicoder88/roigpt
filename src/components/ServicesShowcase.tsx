'use client';

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Code,
  Search,
  Target,
  Zap,
  BarChart3,
  MessageSquare,
  CheckCircle,
  Sparkles,
} from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  icon: React.ReactNode;
  benefits: string[];
  popular?: boolean;
}

const ServiceCard = ({
  title = "Service Title",
  description = "Service description goes here explaining the benefits and features.",
  price = "$999",
  icon = <Code className="h-6 w-6" />,
  benefits = ["Benefit 1", "Benefit 2", "Benefit 3"],
  popular = false,
}: ServiceCardProps) => {
  return (
    <Card
      className={`w-full h-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl glass-card group ${popular ? "border-primary/50 animate-glow" : "border-white/10"
        }`}
    >
      <div className="bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl">
        {popular && (
          <div className="bg-gradient-to-r from-primary to-accent text-white text-xs font-medium py-2 px-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
            <div className="relative flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3" />
              MOST POPULAR
              <Sparkles className="h-3 w-3" />
            </div>
          </div>
        )}
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl glass bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
              {icon}
            </div>
            <Badge variant="outline" className="text-sm glass border-primary/20 text-primary font-semibold">
              {price}
            </Badge>
          </div>
          <CardTitle className="mt-4 text-xl group-hover:text-primary transition-colors duration-300">
            {title}
          </CardTitle>
          <CardDescription className="text-muted-foreground leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground/90">{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full group/btn glass-card hover:scale-105 transition-all duration-300 bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default function ServicesShowcase() {
  const { t } = useLanguage();

  const services = [
    {
      title: t('services.nextjs.title'),
      description: t('services.nextjs.description'),
      price: t('services.nextjs.price'),
      icon: <Code className="h-6 w-6 text-primary" />,
      benefits: [
        "100% Lighthouse score",
        "SEO optimized structure",
        "Responsive design",
        "Fast deployment",
      ],
      popular: true,
    },
    {
      title: t('services.seo.title'),
      description: t('services.seo.description'),
      price: t('services.seo.price'),
      icon: <Search className="h-6 w-6 text-primary" />,
      benefits: [
        "Keyword research",
        "On-page optimization",
        "Technical SEO audit",
        "Monthly reporting",
      ],
    },
    {
      title: t('services.campaigns.title'),
      description: t('services.campaigns.description'),
      price: t('services.campaigns.price'),
      icon: <Target className="h-6 w-6 text-primary" />,
      benefits: [
        "Multi-channel strategy",
        "A/B testing options",
        "Real-time optimization",
        "Conversion-focused",
      ],
    },
    {
      title: "Performance Optimization",
      description: "Speed up your existing website with our performance optimization services for better user experience and SEO.",
      price: "From $1,299",
      icon: <Zap className="h-6 w-6 text-primary" />,
      benefits: [
        "Core Web Vitals improvement",
        "Image optimization",
        "Code minification",
        "Caching strategies",
      ],
    },
    {
      title: "Analytics & Reporting",
      description: "Comprehensive analytics setup and regular reporting to track your ROI and make data-driven decisions.",
      price: "From $499/mo",
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      benefits: [
        "Custom dashboard setup",
        "Conversion tracking",
        "User behavior analysis",
        "Monthly insights report",
      ],
    },
    {
      title: "Social Media Automation",
      description: "Streamline your social media presence with AI-powered content creation and scheduling tools.",
      price: "From $699/mo",
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      benefits: [
        "Content calendar creation",
        "AI-generated posts",
        "Engagement monitoring",
        "Performance analytics",
      ],
    },
  ];

  return (
    <section className="py-16 px-4 bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto max-w-7xl relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="animate-in fade-in-50 slide-in-from-bottom-10 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                price={service.price}
                icon={service.icon}
                benefits={service.benefits}
                popular={service.popular}
              />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Need a Custom Solution?
            </h3>
            <p className="text-muted-foreground mb-6">
              We create tailored AI-powered marketing strategies for businesses with unique requirements.
            </p>
            <Button size="lg" className="glass-card hover:scale-105 transition-all duration-300 animate-glow">
              Schedule Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}