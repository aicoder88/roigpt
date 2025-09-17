import React from "react";
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
  Globe,
  Pencil,
  Search,
  Zap,
  BarChart3,
  MessageSquare,
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
      className={`w-full h-full overflow-hidden transition-all duration-300 hover:shadow-lg ${popular ? "border-primary" : "border-border"}`}
    >
      <div className="bg-background">
        {popular && (
          <div className="bg-primary text-primary-foreground text-xs font-medium py-1 px-3 text-center">
            MOST POPULAR
          </div>
        )}
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-md bg-muted">{icon}</div>
            <Badge variant="outline" className="text-sm">
              {price}
            </Badge>
          </div>
          <CardTitle className="mt-4">{title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-2 mt-1 h-4 w-4 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full group">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default function ServicesShowcase() {
  const services = [
    {
      title: "NextJS Website Development",
      description:
        "Custom, high-performance websites built with NextJS for lightning-fast page loads and exceptional user experience.",
      price: "From $2,499",
      icon: <Code className="h-6 w-6" />,
      benefits: [
        "100% Lighthouse score",
        "SEO optimized structure",
        "Responsive design",
        "Fast deployment",
      ],
      popular: true,
    },
    {
      title: "SEO Optimization",
      description:
        "Comprehensive SEO services to boost your visibility in search engines and drive organic traffic.",
      price: "From $999/mo",
      icon: <Search className="h-6 w-6" />,
      benefits: [
        "Keyword research",
        "On-page optimization",
        "Technical SEO audit",
        "Monthly reporting",
      ],
    },
    {
      title: "AI Copywriting",
      description:
        "Persuasive, conversion-focused copy in the style of world-class copywriters like Hormozi, Carlton, and Halbert.",
      price: "From $799",
      icon: <Pencil className="h-6 w-6" />,
      benefits: [
        "Multiple copywriting styles",
        "A/B testing options",
        "Unlimited revisions",
        "Conversion-focused",
      ],
    },
    {
      title: "Performance Optimization",
      description:
        "Speed up your existing website with our performance optimization services for better user experience and SEO.",
      price: "From $1,299",
      icon: <Zap className="h-6 w-6" />,
      benefits: [
        "Core Web Vitals improvement",
        "Image optimization",
        "Code minification",
        "Caching strategies",
      ],
    },
    {
      title: "Analytics & Reporting",
      description:
        "Comprehensive analytics setup and regular reporting to track your ROI and make data-driven decisions.",
      price: "From $499/mo",
      icon: <BarChart3 className="h-6 w-6" />,
      benefits: [
        "Custom dashboard setup",
        "Conversion tracking",
        "User behavior analysis",
        "Monthly insights report",
      ],
    },
    {
      title: "Social Media Automation",
      description:
        "Streamline your social media presence with AI-powered content creation and scheduling tools.",
      price: "From $699/mo",
      icon: <MessageSquare className="h-6 w-6" />,
      benefits: [
        "Content calendar creation",
        "AI-generated posts",
        "Engagement monitoring",
        "Performance analytics",
      ],
    },
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Boost your online presence and ROI with our AI-powered marketing
            solutions tailored to your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              price={service.price}
              icon={service.icon}
              benefits={service.benefits}
              popular={service.popular}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
